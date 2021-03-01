import echartsVis from '../../utils/echarts';

const BarDatasetFun = {
  formatName(name) {
    switch (name) {
      case 'estimated_value':
        return '预估';
      case 'completed_value':
        return '实际';
      default:
        return name;
    }
  },
  drawChart(chart, propsData, teamData, teamIndex) {
    const chartData = teamData[teamIndex];
    const indicatorName = propsData.echarts_indicators.map(data => BarDatasetFun.formatName(data));
    const indicatorValue = chartData.map(item => ([
      item[propsData.echarts_name],
    ].concat(propsData.echarts_indicators.map(data => (item[data])))));
    const source = [['故事线'].concat(indicatorName)].concat(indicatorValue);
    const series = propsData.echarts_indicators.map(() => ({
      type: 'bar',
      barWidth: propsData.bar_width,
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
            show: propsData.data_view,
          },
          saveAsImage: {
            show: propsData.save_as_image,
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
        name: propsData.x_axis_label,
        axisLabel: {
          interval: 0,
          rotate: propsData.rotate,
        },
      },
      yAxis: { name: propsData.y_axis_label },
      series,
    });
  },
};

function echartsBarDatasetVis(element, props) {
  echartsVis(element, props, BarDatasetFun.drawChart);
}

export default echartsBarDatasetVis;
