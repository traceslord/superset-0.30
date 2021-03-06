import echartsVis from '../../utils/echarts';
import { formatDate } from '../../utils/dates';

function drawChart(chart, propsData, teamData, teamIndex) {
  const rotate = propsData.rotate;
  const chartData = teamData[teamIndex];
  let xAxisData = [];
  const yAxisData = [];
  chartData.forEach((data) => {
    if (xAxisData.indexOf(data[propsData.x_axis]) === -1) {
      xAxisData.push(data[propsData.x_axis]);
    }
    if (yAxisData.indexOf(data[propsData.y_axis_left]) === -1) {
      yAxisData.push(data[propsData.y_axis_left]);
    }
  });
  xAxisData.sort();
  yAxisData.sort();
  if (propsData.format_time) {
    xAxisData = ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'];
  }
  const data = chartData.map(item => [
    xAxisData.indexOf(item[propsData.x_axis]),
    yAxisData.indexOf(item[propsData.y_axis_left]),
    item[propsData.echarts_indicator] || '-',
  ]);
  chart.setOption({
    tooltip: {
      position: 'top',
    },
    toolbox: {
      feature: {
        saveAsImage: {
          show: propsData.save_as_image,
        },
      },
    },
    animation: false,
    grid: {
      left: '3%',
      right: '4%',
      top: 40,
      bottom: 120,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        interval: 0,
        rotate,
      },
      splitArea: { show: true },
      data: xAxisData,
    },
    yAxis: {
      type: 'category',
      splitArea: { show: true },
      data: yAxisData.map(item => formatDate.formateDay(item)),
    },
    visualMap: {
      min: 0,
      max: 15,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 50,
    },
    series: [
      {
        name: '贡献',
        type: 'heatmap',
        data,
        label: {
          show: true,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  });
}

function echartsHeatmapCartesianVis(element, props) {
  echartsVis(element, props, drawChart);
}

export default echartsHeatmapCartesianVis;
