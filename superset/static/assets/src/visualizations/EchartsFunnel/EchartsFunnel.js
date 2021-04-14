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
  const seriesValues = propsConfig.echarts_indicators.map(data => chartData[0][data]);
  const series = [{
    type: 'funnel',
    min: propsConfig.echarts_series_min,
    max: propsConfig.echarts_series_max,
    minSize: propsConfig.echarts_funnel_min_size,
    maxSize: propsConfig.echarts_funnel_max_size,
    orient: propsConfig.echarts_funnel_orient,
    gap: propsConfig.echarts_funnel_gap,
    funnelAlign: propsConfig.echarts_funnel_align,
    top: propsConfig.echarts_funnel_top,
    bottom: propsConfig.echarts_funnel_bottom,
    left: propsConfig.echarts_funnel_left,
    right: propsConfig.echarts_funnel_right,
    width: propsConfig.echarts_funnel_width,
    height: propsConfig.echarts_funnel_height,
    label: {
      show: propsConfig.echarts_funnel_label_show,
      position: propsConfig.echarts_funnel_label_position,
    },
    data: propsConfig.echarts_indicators.map((data, index) => ({
      name: propsLabel[data],
      value: seriesValues[index],
    })),
  }];
  if (propsConfig.echarts_series_name) series[0].name = propsConfig.echarts_series_name;
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

function echartsFunnelVis(element, props) {
  echartsVis(element, props, drawChart);
}

export default echartsFunnelVis;
