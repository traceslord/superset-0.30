import echartsVis from '../../utils/echartsSelectLayout';
import { formatDate } from '../../utils/dates';
import { formatColor } from '../../utils/colors';
import { groupby } from '../../utils/groupby';

function drawChart(chart, teamData, teamIndex, propsConfig, propsLabel) {
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
    if (propsConfig.echarts_order === '升序') {
      chartData.sort((a, b) => a[propsConfig.echarts_sort] - b[propsConfig.echarts_sort]);
    } else {
      chartData.sort((a, b) => b[propsConfig.echarts_sort] - a[propsConfig.echarts_sort]);
    }
  }
  const series = propsConfig.echarts_indicators.map(item => ({
    type: 'bar',
    name: propsLabel[item],
    stack: propsConfig.echarts_series_stack,
    barWidth: propsConfig.echarts_series_bar_width,
    barMaxWidth: propsConfig.echarts_series_bar_max_width,
    barMinWidth: propsConfig.echarts_series_bar_min_width,
    barMinHeight: propsConfig.echarts_series_bar_min_height,
    barGap: propsConfig.echarts_series_bar_gap,
    barCategoryGap: propsConfig.echarts_series_bar_category_gap,
    data: chartData.map(data => data[item]),
  }));
  chart.setOption({
    legend: {
      type: propsConfig.echarts_legend_type === '普通图例' ? 'plain' : 'scroll',
      data: propsConfig.echarts_indicators.map(data => propsLabel[data]),
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
    yAxis: {
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
    tooltip: {
      show: propsConfig.echarts_tooltip_show,
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
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

function echartsCustomBarVis(element, props) {
  echartsVis(element, props, drawChart);
}

export default echartsCustomBarVis;
