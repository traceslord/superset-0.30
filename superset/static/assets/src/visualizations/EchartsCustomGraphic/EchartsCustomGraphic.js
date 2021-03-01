import echartsVis from '../../utils/echarts';
import { formatDate } from '../../utils/dates';

function drawChart(chart, propsData, teamData, teamIndex) {
  const chartData = teamData[teamIndex];
  const series = propsData.indicators.map((item) => {
    if (propsData.type === '柱状图') {
      return {
        type: 'bar',
        name: item,
        stack: propsData.stack,
        barWidth: propsData.bar_width,
        data: chartData.map(data => data[item]),
      };
    }
      return {
        type: 'line',
        name: item,
        stack: propsData.stack,
        areaStyle: {
          opacity: propsData.area ? 0.6 : 0,
        },
        smooth: propsData.smooth,
        data: chartData.map(data => data[item]),
      };
  });
  chart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: propsData.type === '折线图' ? 'line' : 'shadow',
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
      data: propsData.indicators,
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
    xAxis: {
      type: 'category',
      name: propsData.x_axis_label,
      boundaryGap: propsData.type !== '折线图',
      axisLabel: {
        interval: 0,
        rotate: propsData.rotate,
      },
      data: chartData.map((data) => {
        if (propsData.formate_day) return formatDate.formateDay(data[propsData.x_axis]);
        return data[propsData.x_axis];
      }),
    },
    yAxis: {
      type: 'value',
      name: propsData.y_axis_label,
    },
    series,
  });
}

function echartsCustomGraphicVis(element, props) {
  echartsVis(element, props, drawChart);
}

export default echartsCustomGraphicVis;
