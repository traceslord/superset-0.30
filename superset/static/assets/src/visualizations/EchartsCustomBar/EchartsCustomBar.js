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
    type: 'bar',
    name: item,
    stack: propsData.series_stack,
    barWidth: propsData.series_bar_width,
    barMaxWidth: propsData.series_bar_max_width,
    barMinWidth: propsData.series_bar_min_width,
    barMinHeight: propsData.series_bar_min_height,
    barGap: propsData.series_bar_gap,
    barCategoryGap: propsData.series_bar_category_gap,
    data: chartData.map(data => data[item]),
  }));
  chart.setOption({
    legend: {
      type: propsData.legend_type === '普通图例' ? 'plain' : 'scroll',
      data: propsData.indicators,
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
      axisLabel: {
        interval: 0,
        rotate: propsData.x_axis_label_rotate,
      },
      data: chartData.map((data) => {
        if (propsData.x_axis_data_format) return formatDate.formateDay(data[propsData.x_axis]);
        return data[propsData.x_axis];
      }),
    },
    yAxis: {
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
    tooltip: {
      show: propsData.tooltip_show,
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
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

function echartsCustomBarVis(element, props) {
  echartsVis(element, props, drawChart);
}

export default echartsCustomBarVis;
