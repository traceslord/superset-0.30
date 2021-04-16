import echartsVis from '../../utils/echartsSelectLayout';
import { formatColor } from '../../utils/colors';
import { groupby } from '../../utils/groupby';
import { sort } from '../../utils/sort';

function drawChart(chart, teamData, teamIndex, propsConfig, propsLabel) {
  let chartData = teamData[teamIndex];
  if (propsConfig.echarts_groupby) {
    chartData = groupby(
      chartData,
      propsConfig.echarts_groupby,
      propsConfig.echarts_groupby_aggregate,
      propsConfig.echarts_select,
    );
  }
  if (propsConfig.echarts_sort) {
    sort(chartData, propsConfig.echarts_sort, propsConfig.echarts_order);
  }
  const legendNotSelected = {};
  propsConfig.echarts_legend_not_selected.forEach((data) => {
    legendNotSelected[propsLabel[data]] = false;
  });
  const seriesValues = propsConfig.echarts_indicators.map(data => chartData[0][data]);
  const series = [{
    type: 'pie',
    legendHoverLink: propsConfig.echarts_series_legend_hover_link,
    hoverAnimation: propsConfig.echarts_series_hover_animation,
    hoverOffset: propsConfig.echarts_series_hover_offset,
    clockwise: propsConfig.echarts_pie_clockwise,
    startAngle: propsConfig.echarts_pie_start_angle,
    minAngle: propsConfig.echarts_pie_min_angle,
    minShowLabelAngle: propsConfig.echarts_pie_min_show_label_angle,
    roseType: propsConfig.echarts_pie_rose_type,
    avoidLabelOverlap: propsConfig.echarts_pie_avoid_label_overlap,
    stillShowZeroSum: propsConfig.echarts_pie_still_show_zero_sum,
    top: propsConfig.echarts_pie_top,
    bottom: propsConfig.echarts_pie_bottom,
    left: propsConfig.echarts_pie_left,
    right: propsConfig.echarts_pie_right,
    width: propsConfig.echarts_pie_width,
    height: propsConfig.echarts_pie_height,
    label: {
      show: propsConfig.echarts_pie_label_show,
      position: propsConfig.echarts_pie_label_position,
    },
    center: [propsConfig.echarts_series_center_1, propsConfig.echarts_series_center_2],
    radius: [propsConfig.echarts_series_radius_1, propsConfig.echarts_series_radius_2],
    data: propsConfig.echarts_indicators.map((data, index) => ({
      name: propsLabel[data],
      value: seriesValues[index],
    })),
  }];
  if (propsConfig.echarts_series_name) series[0].name = propsConfig.echarts_series_name;
  chart.setOption({
    legend: {
      type: propsConfig.echarts_legend_type === '普通图例' ? 'plain' : 'scroll',
      selected: legendNotSelected,
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
    tooltip: {
      show: propsConfig.echarts_tooltip_show,
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

function echartsPieVis(element, props) {
  echartsVis(element, props, drawChart);
}

export default echartsPieVis;
