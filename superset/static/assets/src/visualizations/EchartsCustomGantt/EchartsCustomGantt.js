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
  const planData = chartData.map((item) => {
    const startTime = new Date(item[propsConfig.echarts_start_time]).getTime();
    const endTime = new Date(item[propsConfig.echarts_end_time]).getTime();
    return {
      yAxis: item[propsConfig.echarts_indicator],
      startTime,
      endTime: item[propsConfig.echarts_end_time] ? endTime : startTime + 86400000 * 100,
      progress: item[propsConfig.x_axis],
    };
  });
  const currentProgress = planData.map(data => (
    ((data.endTime - data.startTime) * data.progress) / 100 +
    data.startTime
  ));
  const otherData = chartData.map((item) => {
    const obj = {};
    propsConfig.echarts_indicators.forEach((data) => {
      obj[data] = item[data];
    });
    return obj;
  });
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
      type: 'time',
      name: propsConfig.echarts_x_axis_name,
      nameLocation: propsConfig.echarts_x_axis_name_location,
      nameTextStyle: {
        color: '#303133',
      },
      nameGap: propsConfig.echarts_x_axis_name_gap,
      nameRotate: propsConfig.echarts_x_axis_name_rotate,
      inverse: propsConfig.echarts_x_axis_inverse,
      axisLine: {
        lineStyle: {
          color: formatColor(propsConfig.echarts_grid_border_color),
          width: 0,
        },
      },
      axisLabel: {
        rotate: propsConfig.echarts_x_axis_label_rotate,
        margin: 12,
        formatter: value => formatDate.formateDay(value),
        color: '#303133',
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: 'category',
      name: propsConfig.echarts_y_axis_name,
      nameLocation: propsConfig.echarts_y_axis_name_location,
      nameTextStyle: {
        color: '#303133',
      },
      nameGap: propsConfig.echarts_y_axis_name_gap,
      nameRotate: propsConfig.echarts_y_axis_name_rotate,
      inverse: propsConfig.echarts_y_axis_inverse,
      axisLine: {
        lineStyle: {
          color: formatColor(propsConfig.echarts_grid_border_color),
          width: 0,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        interval: 0,
        rotate: propsConfig.echarts_y_axis_label_rotate,
        formatter: (value) => {
          let newValue = '';
          const num = 15;
          const row = Math.ceil(value.length / num);
          if (value.length > num) {
            for (let i = 0; i < row; i++) {
              let valueSlice = '';
              if (i === row - 1) {
                valueSlice = value.slice(num * i, value.length);
              } else {
                valueSlice = value.slice(num * i, num * (i + 1)) + '\n';
              }
              newValue += valueSlice;
            }
          } else {
            newValue = value;
          }
          return newValue;
        },
        color: '#303133',
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#eaeaea',
        },
      },
      data: planData.map(item => item.yAxis),
    },
    tooltip: {
      show: propsConfig.echarts_tooltip_show,
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
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
    series: [
      {
        type: 'bar',
        name: '计划周期',
        stack: 'time',
        itemStyle: {
          normal: {
            color: formatColor(propsConfig.echarts_gantt_period),
            barBorderColor: formatColor(propsConfig.echarts_gantt_hidden),
          },
          emphasis: {
            color: formatColor(propsConfig.echarts_gantt_period),
            barBorderColor: formatColor(propsConfig.echarts_gantt_hidden),
          },
        },
        barWidth: 15,
        zlevel: -1,
        data: planData.map(item => item.endTime),
        markLine: {
          symbol: ['none', 'none'],
          label: {
            formatter: params => '今天：' + formatDate.formateDay(params.value),
          },
          lineStyle: {
            color: '#909399',
          },
          data: [{ xAxis: new Date() }],
        },
      },
      {
        type: 'bar',
        name: '当前进度',
        stack: 'time',
        itemStyle: {
          normal: {
            color: formatColor(propsConfig.echarts_gantt_progress),
            barBorderColor: formatColor(propsConfig.echarts_gantt_hidden),
          },
          emphasis: {
            color: formatColor(propsConfig.echarts_gantt_progress),
            barBorderColor: formatColor(propsConfig.echarts_gantt_hidden),
          },
        },
        barWidth: 15,
        zlevel: -1,
        z: 2,
        data: currentProgress,
      },
      {
        type: 'bar',
        name: '隐藏',
        stack: 'time',
        itemStyle: {
          normal: {
            color: formatColor(propsConfig.echarts_gantt_hidden),
            barBorderColor: formatColor(propsConfig.echarts_gantt_hidden),
          },
          emphasis: {
            color: formatColor(propsConfig.echarts_gantt_hidden),
            barBorderColor: formatColor(propsConfig.echarts_gantt_hidden),
          },
        },
        barWidth: 15,
        zlevel: -1,
        z: 3,
        data: planData.map(item => item.startTime),
      },
      {
        type: 'bar',
        name: '其他指标',
        data: otherData,
      },
    ],
    backgroundColor: formatColor(propsConfig.echarts_background_color),
  });
}

function echartsCustomGanttVis(element, props) {
  echartsVis(element, props, drawChart);
}

export default echartsCustomGanttVis;