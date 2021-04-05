import ecStat from 'echarts-stat';
import echartsVis from '../../utils/echarts';
import { formatColor } from '../../utils/colors';
import { groupby } from '../../utils/groupby';

function drawChart(chart, propsConfig, teamData, teamIndex) {
  let chartData = teamData[teamIndex];
  if (propsConfig.echarts_groupby) {
    chartData = groupby(
      chartData,
      propsConfig.echarts_groupby,
      propsConfig.echarts_groupby_aggregate,
      propsConfig.echarts_select,
    );
  }
  const x = propsConfig.x_axis;
  const y = propsConfig.echarts_indicator;
  const data = chartData.map(item => [
    item[x],
    item[y],
    item[propsConfig.echarts_name],
    item[y] / item[x] * propsConfig.echarts_radius,
  ]);
  const series = [{
    type: 'scatter',
    name: 'scatter',
    symbolSize: params => params[3],
    label: {
      show: true,
      position: 'top',
      formatter: params => params.data[2],
    },
    itemStyle: {
      shadowBlur: 10,
      shadowColor: 'rgba(0, 0, 0, 0.4)',
      shadowOffsetY: 5,
    },
    data,
    markLine: {
      lineStyle: {
        normal: {
          color: '#909399',
          type: 'dashed',
        },
      },
      data: [
        { type: 'average', name: '平均值' },
        { type: 'average', valueDim: 'x' },
      ],
    },
  }];
  if (propsConfig.echarts_regression_type) {
    const lineData = chartData.map(item => [
      item[x],
      item[y],
    ]);
    const myRegression = ecStat.regression(propsConfig.echarts_regression_type, lineData);
    myRegression.points.sort((a, b) => a[0] - b[0]);
    series.push({
      type: 'line',
      name: 'line',
      showSymbol: false,
      lineStyle: {
        color: '#2f4554',
      },
      data: myRegression.points,
      markPoint: {
        label: {
          show: true,
          position: 'left',
          formatter: myRegression.expression,
          color: '#333',
          fontSize: 14,
        },
        itemStyle: {
          color: 'transparent',
        },
        data: [
          {
            coord: myRegression.points[myRegression.points.length - 1],
          },
        ],
      },
    });
  }
  chart.setOption({
    grid: {
      show: true,
      width: propsConfig.echarts_grid_width,
      height: propsConfig.echarts_grid_height,
      backgroundColor: formatColor(propsConfig.echarts_grid_background_color),
      borderColor: formatColor(propsConfig.echarts_grid_border_color),
      borderWidth: propsConfig.echarts_grid_border_width,
      top: propsConfig.echarts_grid_top,
      bottom: propsConfig.echarts_grid_bottom,
      left: propsConfig.echarts_grid_left,
      right: propsConfig.echarts_grid_right,
      containLabel: propsConfig.echarts_grid_contain_label,
    },
    xAxis: {
      type: 'value',
      name: propsConfig.echarts_x_axis_name,
      nameLocation: propsConfig.echarts_x_axis_name_location,
      nameGap: propsConfig.echarts_x_axis_name_gap,
      nameRotate: propsConfig.echarts_x_axis_name_rotate,
      inverse: propsConfig.echarts_x_axis_inverse,
      scale: true,
      axisLabel: {
        interval: 0,
        rotate: propsConfig.echarts_x_axis_label_rotate,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      name: propsConfig.echarts_y_axis_name,
      nameLocation: propsConfig.echarts_y_axis_name_location,
      nameGap: propsConfig.echarts_y_axis_name_gap,
      nameRotate: propsConfig.echarts_y_axis_name_rotate,
      inverse: propsConfig.echarts_y_axis_inverse,
      scale: true,
      axisLabel: {
        interval: 0,
        rotate: propsConfig.echarts_y_axis_label_rotate,
      },
      splitLine: {
        show: false,
      },
    },
    tooltip: {
      show: propsConfig.echarts_tooltip_show,
      trigger: 'item',
      axisPointer: {
        type: 'cross',
      },
      // eslint-disable-next-line no-new-func
      formatter: new Function('return ' + propsConfig.echarts_tooltip_formatter)(),
      backgroundColor: formatColor(propsConfig.echarts_tooltip_background_color),
      borderColor: formatColor(propsConfig.echarts_tooltip_border_color),
      borderWidth: propsConfig.echarts_tooltip_border_width,
      padding: [
        propsConfig.echarts_tooltip_padding_top,
        propsConfig.echarts_tooltip_padding_right,
        propsConfig.echarts_tooltip_padding_bottom,
        propsConfig.echarts_tooltip_padding_left,
      ],
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
    series,
    backgroundColor: formatColor(propsConfig.echarts_background_color),
  });
}

function echartsCustomScatterVis(element, props) {
  echartsVis(element, props, drawChart);
}

export default echartsCustomScatterVis;
