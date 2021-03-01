import echartsVis from '../../utils/echarts';
import { formatDate } from '../../utils/dates';

const LineMixedFun = {
  formatName(name) {
    switch (name) {
      case 'remain_story_point':
        return '主要故事点';
      case 'done_story_point':
        return '完成故事点';
      case 'added_story_point':
        return '新增故事点';
      case 'adjusted_story_point':
        return '调整故事点';
      case 'removed_story_point':
        return '删除故事点';
      default:
        return name;
    }
  },
  drawChart(chart, propsData, teamData, teamIndex) {
    const chartData = teamData[teamIndex];
    const legendData = [propsData.y_axis_left].concat(propsData.y_axis_right);
    const series = [
      {
        name: LineMixedFun.formatName(propsData.y_axis_left),
        type: 'line',
        data: chartData.map(data => data[propsData.y_axis_left]),
      },
    ].concat(propsData.y_axis_right.map((item) => {
      if (propsData.type === '混合堆叠柱状图') {
        return {
          name: LineMixedFun.formatName(item),
          type: 'bar',
          stack: '堆叠',
          yAxisIndex: 1,
          data: chartData.map(data => data[item]),
        };
      } else if (propsData.type === '混合多柱状图') {
        return {
          name: LineMixedFun.formatName(item),
          type: 'bar',
          yAxisIndex: 1,
          data: chartData.map(data => data[item]),
        };
      }
        return {
          name: LineMixedFun.formatName(item),
          type: 'line',
          yAxisIndex: 1,
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: {
                type: 'dotted',
              },
            },
          },
          areaStyle: {},
          data: chartData.map(data => data[item]),
        };
    }));
    chart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: propsData.type === '混合曲线填充图' ? 'line' : 'shadow',
        },
      },
      toolbox: {
        feature: {
          dataView: {
            show: propsData.data_view,
          },
          saveAsImage: {
            show: propsData.save_as_image,
          },
        },
      },
      legend: {
        data: legendData.map(data => LineMixedFun.formatName(data)),
        icon: 'roundRect',
        itemGap: 25,
        itemWidth: 15,
        itemHeight: 15,
        right: '4%',
        top: 35,
      },
      grid: {
        left: '3%',
        right: '4%',
        top: 70,
        bottom: 50,
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          name: propsData.x_axis_label,
          boundaryGap: propsData.type !== '混合曲线填充图',
          axisLabel: {
            interval: 0,
            rotate: propsData.rotate,
          },
          data: chartData.map((data) => {
            if (propsData.formate_day) return formatDate.formateDay(data[propsData.x_axis]);
            return data[propsData.x_axis];
          }),
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: propsData.y_axis_left_label,
        },
        {
          type: 'value',
          name: propsData.y_axis_right_label,
        },
      ],
      series,
    });
  },
};

function echartsLineMixedVis(element, props) {
  echartsVis(element, props, LineMixedFun.drawChart);
}

export default echartsLineMixedVis;
