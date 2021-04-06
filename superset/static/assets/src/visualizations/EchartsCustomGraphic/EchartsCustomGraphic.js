import echartsVis from '../../utils/echartsSelectLayout';
import { formatDate } from '../../utils/dates';

function drawChart(chart, teamData, teamIndex, propsConfig, propsLabel) {
  const chartData = teamData[teamIndex];
  const series = propsConfig.echarts_indicators.map((item) => {
    if (propsConfig.echarts_graphic_type === '柱状图') {
      return {
        type: 'bar',
        name: propsLabel[item],
        stack: propsConfig.echarts_stack,
        barWidth: propsConfig.echarts_bar_width,
        data: chartData.map(data => data[item]),
      };
    }
      return {
        type: 'line',
        name: propsLabel[item],
        stack: propsConfig.echarts_stack,
        areaStyle: {
          opacity: propsConfig.echarts_area ? 0.6 : 0,
        },
        smooth: propsConfig.echarts_smooth,
        data: chartData.map(data => data[item]),
      };
  });
  chart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: propsConfig.echarts_graphic_type === '折线图' ? 'line' : 'shadow',
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
      data: propsConfig.echarts_indicators.map(data => propsLabel[data]),
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
      name: propsConfig.x_axis_label,
      boundaryGap: propsConfig.echarts_graphic_type !== '折线图',
      axisLabel: {
        interval: 0,
        rotate: propsConfig.echarts_rotate,
      },
      data: chartData.map((data) => {
        if (propsConfig.echarts_checkbox) return formatDate.formateDay(data[propsConfig.x_axis]);
        return data[propsConfig.x_axis];
      }),
    },
    yAxis: {
      type: 'value',
      name: propsConfig.y_axis_label,
    },
    series,
  });
}

function echartsCustomGraphicVis(element, props) {
  echartsVis(element, props, drawChart);
}

export default echartsCustomGraphicVis;
