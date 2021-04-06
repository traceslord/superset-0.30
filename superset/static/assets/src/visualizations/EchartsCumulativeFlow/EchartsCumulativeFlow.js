import echartsVis from '../../utils/echartsSelectLayout';
import { formatDate } from '../../utils/dates';

function drawChart(chart, teamData, teamIndex, propsConfig, propsLabel) {
  const chartData = teamData[teamIndex];
  const series = propsConfig.echarts_indicators.map(item => ({
    name: propsLabel[item],
    type: 'line',
    stack: 'stack',
    areaStyle: {},
    data: chartData.map(data => data[item]),
  })).reverse();
  chart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    toolbox: {
      feature: {
        dataZoom: {
          title: {
            zoom: '缩放',
            back: '还原',
          },
          yAxisIndex: false,
        },
        dataView: {
          show: propsConfig.echarts_data_view,
        },
        saveAsImage: {
          show: propsConfig.echarts_save_as_image,
        },
      },
    },
    legend: {
      data: propsConfig.echarts_indicators.map(data => propsLabel[data]),
      icon: 'roundRect',
      itemGap: 25,
      itemWidth: 15,
      itemHeight: 15,
      right: '4%',
      top: 40,
    },
    grid: {
      left: '3%',
      right: '4%',
      top: 70,
      bottom: 70,
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        name: propsConfig.x_axis_label,
        boundaryGap: false,
        data: chartData.map(data => formatDate.formateDay(data[propsConfig.x_axis])),
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: propsConfig.y_axis_label,
      },
    ],
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: 0,
      },
      {
        type: 'slider',
        xAxisIndex: 0,
        height: 20,
        handleIcon:
          'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      },
    ],
    series,
  });
}

function echartsCumulativeFlowVis(element, props) {
  echartsVis(element, props, drawChart);
}

export default echartsCumulativeFlowVis;
