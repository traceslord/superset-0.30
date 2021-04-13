import echartsVis from '../../utils/echartsSelectLayout';
import { formatDate } from '../../utils/dates';
import { formatColor } from '../../utils/colors';
import { groupby } from '../../utils/groupby';
import { sort } from '../../utils/sort';

function drawChart(chart, teamData, teamIndex, propsConfig) {
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
    sort(chartData, propsConfig.echarts_sort, propsConfig.echarts_order);
  }
  const series = [
    {
      type: 'boxplot',
      name: '箱线图',
      boxWidth: [
        propsConfig.echarts_series_box_min_width,
        propsConfig.echarts_series_box_max_width,
      ],
      data: chartData.map(data => [
        data[propsConfig.echarts_boxplot_min],
        data[propsConfig.echarts_boxplot_q1],
        data[propsConfig.echarts_boxplot_q2],
        data[propsConfig.echarts_boxplot_q3],
        data[propsConfig.echarts_boxplot_max],
      ]),
    },
  ];
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
      trigger: 'item',
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
        dataZoom: {
          show: propsConfig.echarts_data_zoom,
          title: {
            zoom: '缩放',
            back: '还原',
          },
          yAxisIndex: false,
        },
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

function echartsBoxplotVis(element, props) {
  echartsVis(element, props, drawChart);
}

export default echartsBoxplotVis;
