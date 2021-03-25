import echartsVis from '../../utils/echarts';
import { formatDate } from '../../utils/dates';
import { formatColor } from '../../utils/colors';
import { groupby } from '../../utils/groupby';

function drawChart(chart, propsConfig, teamData, teamIndex) {
  let chartData = teamData[teamIndex];
  if (propsConfig.echarts_groupby) {
    chartData = groupby(
      chartData,
      propsConfig.echarts_groupby,
      propsConfig.echarts_groupby_aggregate,
      propsConfig.x_axis,
      propsConfig.echarts_select,
    );
  }
  if (propsConfig.echarts_sort) {
    chartData.sort((a, b) => a[propsConfig.echarts_sort] - b[propsConfig.echarts_sort]);
  }
  const series = propsConfig.echarts_indicators.map(item => ({
    type: 'line',
    name: item,
    symbol: propsConfig.echarts_series_symbol,
    symbolSize: [
      propsConfig.echarts_series_symbol_size_width,
      propsConfig.echarts_series_symbol_size_height,
    ],
    symbolRotate: propsConfig.echarts_series_symbol_rotate,
    stack: propsConfig.echarts_series_stack,
    step: propsConfig.echarts_series_step,
    lineStyle: {
      width: propsConfig.echarts_series_line_style_width,
      type: propsConfig.echarts_series_line_style_type,
    },
    areaStyle: {
      opacity: propsConfig.echarts_series_area_style_opacity ? 0.6 : 0,
    },
    smooth: propsConfig.echarts_series_smooth,
    data: chartData.map(data => data[item]),
  })).concat(propsConfig.y_axis_right.map(item => ({
    type: 'line',
    name: item,
    yAxisIndex: 1,
    symbol: propsConfig.echarts_series_2_symbol,
    symbolSize: [
      propsConfig.echarts_series_2_symbol_size_width,
      propsConfig.echarts_series_2_symbol_size_height,
    ],
    symbolRotate: propsConfig.echarts_series_2_symbol_rotate,
    stack: propsConfig.echarts_series_2_stack,
    step: propsConfig.echarts_series_2_step,
    lineStyle: {
      width: propsConfig.echarts_series_2_line_style_width,
      type: propsConfig.echarts_series_2_line_style_type,
    },
    areaStyle: {
      opacity: propsConfig.echarts_series_2_area_style_opacity ? 0.6 : 0,
    },
    smooth: propsConfig.echarts_series_2_smooth,
    data: chartData.map(data => data[item]),
  })));
  chart.setOption({
    legend: {
      type: propsConfig.echarts_legend_type === '普通图例' ? 'plain' : 'scroll',
      data: propsConfig.echarts_indicators.concat(propsConfig.y_axis_right),
      icon: propsConfig.echarts_legend_icon,
      itemGap: propsConfig.echarts_legend_item_gap,
      itemWidth: propsConfig.echarts_legend_item_width,
      itemHeight: propsConfig.echarts_legend_item_height,
      top: propsConfig.echarts_legend_top,
      bottom: propsConfig.echarts_legend_bottom,
      left: propsConfig.echarts_legend_left,
      right: propsConfig.echarts_legend_right,
    },
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
      type: 'category',
      name: propsConfig.echarts_x_axis_name,
      nameLocation: propsConfig.echarts_x_axis_name_location,
      nameGap: propsConfig.echarts_x_axis_name_gap,
      nameRotate: propsConfig.echarts_x_axis_name_rotate,
      inverse: propsConfig.echarts_x_axis_inverse,
      boundaryGap: false,
      axisLabel: {
        interval: 0,
        rotate: propsConfig.echarts_x_axis_label_rotate,
      },
      data: chartData.map((data) => {
        if (propsConfig.echarts_x_axis_data_format) {
          return formatDate.formateDay(data[propsConfig.x_axis]);
        }
        return data[propsConfig.x_axis];
      }),
    },
    yAxis: [
      {
        type: 'value',
        name: propsConfig.echarts_y_axis_name,
        nameLocation: propsConfig.echarts_y_axis_name_location,
        nameGap: propsConfig.echarts_y_axis_name_gap,
        nameRotate: propsConfig.echarts_y_axis_name_rotate,
        inverse: propsConfig.echarts_y_axis_inverse,
        axisLabel: {
          interval: 0,
          rotate: propsConfig.echarts_y_axis_label_rotate,
        },
      },
      {
        type: 'value',
        name: propsConfig.echarts_y_axis_2_name,
        nameLocation: propsConfig.echarts_y_axis_2_name_location,
        nameGap: propsConfig.echarts_y_axis_2_name_gap,
        nameRotate: propsConfig.echarts_y_axis_2_name_rotate,
        inverse: propsConfig.echarts_y_axis_2_inverse,
        axisLabel: {
          interval: 0,
          rotate: propsConfig.echarts_y_axis_2_label_rotate,
        },
      },
    ],
    tooltip: {
      show: propsConfig.echarts_tooltip_show,
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
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

function echartsCustomLineVis(element, props) {
  echartsVis(element, props, drawChart);
}

export default echartsCustomLineVis;
