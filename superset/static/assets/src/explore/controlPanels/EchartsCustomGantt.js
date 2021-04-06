export default {
  controlPanelSections: [
    {
      label: '配置选项',
      expanded: true,
      controlSetRows: [
        ['echarts_indicator'],
        ['echarts_start_time'],
        ['echarts_end_time', 'echarts_gantt_plan_period'],
        ['x_axis'],
        ['echarts_indicators'],
        ['echarts_select'],
        ['echarts_groupby', 'echarts_groupby_aggregate'],
        ['echarts_sort', 'echarts_order'],
        ['adhoc_filters'],
        ['echarts_background_color'],
      ],
    },
    {
      label: '甘特图配置',
      controlSetRows: [
        ['echarts_gantt_progress', 'echarts_gantt_period', 'echarts_gantt_hidden'],
      ],
    },
    {
      label: '网格组件',
      controlSetRows: [
        ['echarts_grid_width', 'echarts_grid_height'],
        ['echarts_grid_top', 'echarts_grid_bottom', 'echarts_grid_left', 'echarts_grid_right'],
        ['echarts_grid_border_width'],
        ['echarts_grid_border_color', 'echarts_grid_background_color'],
        ['echarts_grid_contain_label'],
      ],
    },
    {
      label: 'X 轴',
      controlSetRows: [
        ['echarts_x_axis_name'],
        ['echarts_x_axis_name_location', 'echarts_x_axis_name_gap'],
        ['echarts_x_axis_name_rotate', 'echarts_x_axis_label_rotate'],
        ['echarts_x_axis_inverse'],
      ],
    },
    {
      label: 'Y 轴',
      controlSetRows: [
        ['echarts_y_axis_name'],
        ['echarts_y_axis_name_location', 'echarts_y_axis_name_gap'],
        ['echarts_y_axis_name_rotate', 'echarts_y_axis_label_rotate'],
        ['echarts_y_axis_label_formatter'],
        ['echarts_y_axis_inverse'],
      ],
    },
    {
      label: '提示框组件',
      controlSetRows: [
        ['echarts_tooltip_show'],
        ['echarts_tooltip_formatter'],
        [
          'echarts_tooltip_padding_top',
          'echarts_tooltip_padding_bottom',
          'echarts_tooltip_padding_left',
          'echarts_tooltip_padding_right',
        ],
        ['echarts_tooltip_border_width'],
        ['echarts_tooltip_border_color', 'echarts_tooltip_background_color'],
      ],
    },
    {
      label: '工具箱',
      controlSetRows: [
        ['echarts_data_view'],
        ['echarts_save_as_image'],
      ],
    },
  ],
  controlOverrides: {
    echarts_indicator: {
      label: 'Y 轴',
      description: 'Y 轴要显示的列',
    },
    x_axis: {
      label: '当前进度',
      description: '计划当前的进度',
    },
    echarts_indicators: {
      label: '其他指标',
      description: '提示框要显示的其他指标',
    },
    echarts_grid_top: {
      default: '60',
    },
    echarts_grid_bottom: {
      default: '3%',
    },
    echarts_grid_left: {
      default: '3%',
    },
    echarts_grid_right: {
      default: '4%',
    },
    echarts_y_axis_label_formatter: {
      default: `value => {
  let newValue = '';
  const num = 15;
  const row = Math.ceil(value.length / num);
  if (value.length > num) {
    for (let i = 0; i < row; i++) {
      let valueSlice = '';
      if (i === row - 1) {
        valueSlice = value.slice(num * i, value.length);
      } else {
        valueSlice = value.slice(num * i, num * (i + 1)) + '\\n';
      }
      newValue += valueSlice;
    }
  } else {
    newValue = value;
  }
  return newValue;
};`,
    },
    echarts_tooltip_formatter: {
      default: `params => {
  const formatNumber = (num) => {
    const n = num.toString();
    return n[1] ? n : '0' + n;
  };
  const formateDay = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [year, month, day].map(formatNumber).join('-');
  };
  const progress = ((params[1].value - params[2].value) / (params[0].value - params[2].value)) * 100;
  const otherData = Object.keys(params[3].data).map((data, index) => {
    return params[4].data[data] + '：' + Object.values(params[3].data)[index] + '<br />';
  }).join('');
  let res = params[0].name + '：<br />';
  res += '计划开始时间：' + formateDay(params[2].value) + '<br />';
  res += '计划结束时间：' + formateDay(params[0].value) + '<br />';
  res += params[1].seriesName + '：' + progress + '<br />';
  res += otherData;
  return res;
};`,
    },
  },
};
