import echartsVis from '../../utils/echarts';
import { formatDate } from '../../utils/dates';
import { formatColor } from '../../utils/colors';
import { groupby } from '../../utils/groupby';

function drawChart(chart, propsData, teamData, teamIndex) {
  let chartData = teamData[teamIndex];
  if (propsData.echarts_groupby) {
    chartData = groupby(
      chartData,
      propsData.echarts_groupby,
      propsData.groupby_aggregate,
      propsData.x_axis,
      propsData.echarts_select,
    );
  }
  const series = propsData.indicators.map(item => ({
    type: 'line',
    name: item,
    symbol: propsData.series_symbol,
    symbolSize: [propsData.series_symbol_size_width, propsData.series_symbol_size_height],
    symbolRotate: propsData.series_symbol_rotate,
    stack: propsData.series_stack,
    step: propsData.series_step,
    lineStyle: {
      width: propsData.series_line_style_width,
      type: propsData.series_line_style_type,
    },
    areaStyle: {
      opacity: propsData.series_area_style_opacity ? 0.6 : 0,
    },
    smooth: propsData.series_smooth,
    data: chartData.map(data => data[item]),
  })).concat(propsData.indicators_2.map(item => ({
    type: 'line',
    name: item,
    yAxisIndex: 1,
    symbol: propsData.series_2_symbol,
    symbolSize: [propsData.series_2_symbol_size_width, propsData.series_2_symbol_size_height],
    symbolRotate: propsData.series_2_symbol_rotate,
    stack: propsData.series_2_stack,
    step: propsData.series_2_step,
    lineStyle: {
      width: propsData.series_2_line_style_width,
      type: propsData.series_2_line_style_type,
    },
    areaStyle: {
      opacity: propsData.series_2_area_style_opacity ? 0.6 : 0,
    },
    smooth: propsData.series_2_smooth,
    data: chartData.map(data => data[item]),
  })));
  chart.setOption({
    legend: {
      type: propsData.legend_type === '普通图例' ? 'plain' : 'scroll',
      data: propsData.indicators.concat(propsData.indicators_2),
      icon: propsData.legend_icon,
      itemGap: propsData.legend_item_gap,
      itemWidth: propsData.legend_item_width,
      itemHeight: propsData.legend_item_height,
      top: propsData.legend_top,
      bottom: propsData.legend_bottom,
      left: propsData.legend_left,
      right: propsData.legend_right,
    },
    grid: {
      show: true,
      width: propsData.grid_width,
      height: propsData.grid_height,
      backgroundColor: formatColor(propsData.grid_background_color),
      borderColor: formatColor(propsData.grid_border_color),
      borderWidth: propsData.grid_border_width,
      top: propsData.grid_top,
      bottom: propsData.grid_bottom,
      left: propsData.grid_left,
      right: propsData.grid_right,
      containLabel: propsData.grid_contain_label,
    },
    xAxis: {
      type: 'category',
      name: propsData.x_axis_name,
      nameLocation: propsData.x_axis_name_location,
      nameGap: propsData.x_axis_name_gap,
      nameRotate: propsData.x_axis_name_rotate,
      inverse: propsData.y_axis_inverse,
      boundaryGap: false,
      axisLabel: {
        interval: 0,
        rotate: propsData.x_axis_label_rotate,
      },
      data: chartData.map((data) => {
        if (propsData.x_axis_data_format) return formatDate.formateDay(data[propsData.x_axis]);
        return data[propsData.x_axis];
      }),
    },
    yAxis: [
      {
        type: 'value',
        name: propsData.y_axis_name,
        nameLocation: propsData.y_axis_name_location,
        nameGap: propsData.y_axis_name_gap,
        nameRotate: propsData.y_axis_name_rotate,
        inverse: propsData.y_axis_inverse,
        axisLabel: {
          interval: 0,
          rotate: propsData.y_axis_label_rotate,
        },
      },
      {
        type: 'value',
        name: propsData.y_axis_2_name,
        nameLocation: propsData.y_axis_2_name_location,
        nameGap: propsData.y_axis_2_name_gap,
        nameRotate: propsData.y_axis_2_name_rotate,
        inverse: propsData.y_axis_2_inverse,
        axisLabel: {
          interval: 0,
          rotate: propsData.y_axis_2_label_rotate,
        },
      },
    ],
    tooltip: {
      show: propsData.tooltip_show,
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      formatter: new Function('return ' + propsData.tooltip_formatter)(),
      backgroundColor: formatColor(propsData.tooltip_background_color),
      borderColor: formatColor(propsData.tooltip_border_color),
      borderWidth: propsData.tooltip_border_width,
      padding: [
        propsData.tooltip_padding_top,
        propsData.tooltip_padding_right,
        propsData.tooltip_padding_bottom,
        propsData.tooltip_padding_left,
      ],
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
    series,
    backgroundColor: formatColor(propsData.background_color),
  });
}

function echartsCustomLineVis(element, props) {
  echartsVis(element, props, drawChart);
}

export default echartsCustomLineVis;
