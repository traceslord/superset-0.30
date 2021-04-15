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
      propsConfig.x_axis,
      propsConfig.echarts_select,
    );
  }
  if (propsConfig.echarts_sort) {
    sort(chartData, propsConfig.echarts_sort, propsConfig.echarts_order);
  }
  const radarIndicatorMax = propsConfig.y_axis_right.map(data => chartData[0][data]);
  const legendData = [];
  chartData.forEach((data) => {
    if (legendData.indexOf(data[propsConfig.x_axis]) === -1) {
      legendData.push(data[propsConfig.x_axis]);
    }
  });
  const filterData = legendData.map(t => chartData.filter(d => d[propsConfig.x_axis] === t));
  const formatData = filterData.map(data => ({
      name: data[0][propsConfig.x_axis],
      data: data.map(subdata => propsConfig.echarts_indicators.map(item => subdata[item])),
    }));
  const radar = {
    center: [propsConfig.echarts_radar_center_1, propsConfig.echarts_radar_center_2],
    radius: [propsConfig.echarts_radar_radius_1, propsConfig.echarts_radar_radius_2],
    startAngle: propsConfig.echarts_radar_start_angle,
    nameGap: propsConfig.echarts_radar_name_gap,
    splitNumber: propsConfig.echarts_radar_split_number,
    shape: propsConfig.echarts_radar_shape,
    splitLine: {
      show: propsConfig.echarts_radar_split_line_show,
    },
    splitArea: {
      show: propsConfig.echarts_radar_split_area_show,
    },
    indicator: propsConfig.echarts_indicators.map((data, index) => ({
      name: propsLabel[data],
      max: radarIndicatorMax[index],
    })),
  };
  const series = formatData.map(data => ({
    type: 'radar',
    name: data.name,
    symbol: propsConfig.echarts_series_symbol,
    symbolSize: [
      propsConfig.echarts_series_symbol_size_width,
      propsConfig.echarts_series_symbol_size_height,
    ],
    symbolRotate: propsConfig.echarts_series_symbol_rotate,
    lineStyle: {
      width: propsConfig.echarts_series_line_style_width,
      type: propsConfig.echarts_series_line_style_type,
      opacity: propsConfig.echarts_series_line_style_opacity,
    },
    areaStyle: {
      opacity: propsConfig.echarts_series_area_style_opacity,
    },
    data: data.data,
  }));
  chart.setOption({
    legend: {
      type: propsConfig.echarts_legend_type === '普通图例' ? 'plain' : 'scroll',
      data: legendData,
      icon: propsConfig.echarts_legend_icon,
      itemGap: propsConfig.echarts_legend_item_gap,
      itemWidth: propsConfig.echarts_legend_item_width,
      itemHeight: propsConfig.echarts_legend_item_height,
      top: propsConfig.echarts_legend_top,
      bottom: propsConfig.echarts_legend_bottom,
      left: propsConfig.echarts_legend_left,
      right: propsConfig.echarts_legend_right,
      selectedMode: 'single',
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
    radar,
    series,
    backgroundColor: formatColor(propsConfig.echarts_background_color),
  });
}

function echartsRadarVis(element, props) {
  echartsVis(element, props, drawChart);
}

export default echartsRadarVis;
