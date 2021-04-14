export default {
  controlPanelSections: [
    {
      label: '配置选项',
      expanded: true,
      controlSetRows: [
        ['metric'],
        ['adhoc_filters'],
      ],
    },
    {
      label: '仪表盘配置',
      controlSetRows: [
        ['echarts_gauge_radius', 'echarts_gauge_split_number'],
        ['echarts_gauge_start_angle', 'echarts_gauge_end_angle'],
        ['echarts_series_min', 'echarts_series_max'],
        ['echarts_gauge_clockwise'],
      ],
    },
  ],
  controlOverrides: {
    echarts_series_name: {
      default: 'Pressure',
    },
    echarts_series_min: {
      label: '最小的数据值',
    },
    echarts_series_max: {
      label: '最大的数据值',
    },
  },
};
