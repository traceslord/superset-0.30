import echartsVis from '../../utils/echartsSelectLayout';
import { formatDate } from '../../utils/dates';

function drawChart(chart, teamData, teamIndex, propsConfig, propsLabel) {
  const chartData = teamData[teamIndex];
  const legendData = [propsConfig.y_axis_left].concat(propsConfig.y_axis_right);
  const series = [
    {
      name: propsLabel[propsConfig.y_axis_left],
      type: 'line',
      data: chartData.map(data => data[propsConfig.y_axis_left]),
    },
  ].concat(propsConfig.y_axis_right.map((item) => {
    if (propsConfig.echarts_mixed_type === '混合堆叠柱状图') {
      return {
        name: propsLabel[item],
        type: 'bar',
        stack: '堆叠',
        yAxisIndex: 1,
        data: chartData.map(data => data[item]),
      };
    } else if (propsConfig.echarts_mixed_type === '混合多柱状图') {
      return {
        name: propsLabel[item],
        type: 'bar',
        yAxisIndex: 1,
        data: chartData.map(data => data[item]),
      };
    }
      return {
        name: propsLabel[item],
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
      data: legendData.map(data => propsLabel[data]),
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
            return formatDate.formatDay(data[propsConfig.x_axis]);
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
}

function echartsLineMixedVis(element, props) {
  echartsVis(element, props, drawChart);
}

export default echartsLineMixedVis;
