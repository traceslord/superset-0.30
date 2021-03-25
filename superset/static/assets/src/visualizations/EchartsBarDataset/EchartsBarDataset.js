import echartsVis from '../../utils/echarts';

function formatName(name) {
  switch (name) {
    case 'estimated_value':
      return '预估';
    case 'completed_value':
      return '实际';
    default:
      return name;
  }
}

function drawChart(chart, propsConfig, teamData, teamIndex) {
  const chartData = teamData[teamIndex];
  const indicatorName = propsConfig.echarts_indicators.map(data => formatName(data));
  const indicatorValue = chartData.map(item => ([
    item[propsConfig.echarts_name],
  ].concat(propsConfig.echarts_indicators.map(data => (item[data])))));
  const source = [['故事线'].concat(indicatorName)].concat(indicatorValue);
  const series = propsConfig.echarts_indicators.map(() => ({
    type: 'bar',
    barWidth: propsConfig.echarts_bar_width,
  }));
  chart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
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
    legend: { top: 25 },
    grid: {
      left: '3%',
      right: '4%',
      top: 70,
      bottom: 80,
      containLabel: true,
    },
    dataset: { source },
    xAxis: {
      type: 'category',
      name: propsConfig.x_axis_label,
      axisLabel: {
        interval: 0,
        rotate: propsConfig.echarts_rotate,
      },
    },
    yAxis: { name: propsConfig.y_axis_label },
    series,
  });
}

function echartsBarDatasetVis(element, props) {
  echartsVis(element, props, drawChart);
}

export default echartsBarDatasetVis;
