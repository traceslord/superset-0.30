import echartsVis from '../../utils/echartsSelectLayout';
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
    name: {
      textStyle: {
        color: 'rgb(238, 197, 102)',
      },
    },
    shape: 'circle',
    axisLine: {
      lineStyle: {
        color: 'rgba(238, 197, 102, 0.5)',
      },
    },
    splitLine: {
      lineStyle: {
        color: [
          'rgba(238, 197, 102, 0.1)',
          'rgba(238, 197, 102, 0.2)',
          'rgba(238, 197, 102, 0.4)',
          'rgba(238, 197, 102, 0.6)',
          'rgba(238, 197, 102, 0.8)',
          'rgba(238, 197, 102, 1)',
        ].reverse(),
      },
    },
    splitArea: {
      show: false,
    },
    indicator: propsConfig.echarts_indicators.map((data, index) => ({
      name: propsLabel[data],
      max: radarIndicatorMax[index],
    })),
  };
  const series = formatData.map(data => ({
    name: data.name,
    type: 'radar',
    lineStyle: {
      width: 1,
      opacity: 0.5,
    },
    data: data.data,
    symbol: 'none',
    itemStyle: {
      color: '#F9713C',
    },
    areaStyle: {
      opacity: 0.1,
    },
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
      textStyle: {
        color: '#fff',
        fontSize: 14,
      },
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
    // visualMap: {
    //   show: true,
    //   min: 0,
    //   max: 20,
    //   dimension: 6,
    //   inRange: {
    //     colorLightness: [0.5, 0.8],
    //   },
    // },
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
