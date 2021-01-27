import { t } from '@superset-ui/translation';

export default {
  controlPanelSections: [
    {
      label: '配置选项',
      expanded: true,
      controlSetRows: [
        ['x_axis'],
        ['y_axis_left'],
        ['y_axis_right'],
        ['adhoc_filters'],
      ],
    },
    {
      label: '样式配置',
      controlSetRows: [
        ['echarts_mixed_type'],
        ['x_axis_label', 'echarts_rotate'],
        ['y_axis_left_label', 'y_axis_right_label'],
        ['echarts_checkbox'],
      ],
    },
    {
      label: t('Theme'),
      controlSetRows: [
        ['echarts_theme'],
      ],
    },
  ],
  controlOverrides: {
    x_axis_label: {
      renderTrigger: false,
    },
    echarts_checkbox: {
      label: 'X 轴标签是否需要格式化时间',
      default: true,
    },
  },
};
