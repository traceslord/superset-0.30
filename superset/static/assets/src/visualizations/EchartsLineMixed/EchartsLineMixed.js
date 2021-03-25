import echartsVis from '../../utils/echarts';
import { formatDate } from '../../utils/dates';

const LineMixedFun = {
  formatName(name) {
    switch (name) {
      case 'remain_story_point':
        return '剩余故事点';
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
  drawChart(chart, propsConfig, teamData, teamIndex) {
    const chartData = teamData[teamIndex];
    const legendData = [propsConfig.y_axis_left].concat(propsConfig.y_axis_right);
    const series = [
      {
        name: LineMixedFun.formatName(propsConfig.y_axis_left),
        type: 'line',
        data: chartData.map(data => data[propsConfig.y_axis_left]),
      },
    ].concat(propsConfig.y_axis_right.map((item) => {
      if (propsConfig.echarts_mixed_type === '混合堆叠柱状图') {
        return {
          name: LineMixedFun.formatName(item),
          type: 'bar',
          stack: '堆叠',
          yAxisIndex: 1,
          data: chartData.map(data => data[item]),
        };
      } else if (propsConfig.echarts_mixed_type === '混合多柱状图') {
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
          type: propsConfig.echarts_mixed_type === '混合曲线填充图' ? 'line' : 'shadow',
        },
      },
      toolbox: {
        feature: {
          dataView: {
            show: propsConfig.echarts_data_view,
          },
          saveAsImage: {
            show: propsConfig.echarts_save_as_image,
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
          name: propsConfig.x_axis_label,
          boundaryGap: propsConfig.echarts_mixed_type !== '混合曲线填充图',
          axisLabel: {
            interval: 0,
            rotate: propsConfig.echarts_rotate,
          },
          data: chartData.map((data) => {
            if (propsConfig.echarts_checkbox) {
              return formatDate.formateDay(data[propsConfig.x_axis]);
            }
            return data[propsConfig.x_axis];
          }),
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: propsConfig.y_axis_left_label,
        },
        {
          type: 'value',
          name: propsConfig.y_axis_right_label,
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
