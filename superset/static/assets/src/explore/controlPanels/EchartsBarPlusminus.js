import { t } from '@superset-ui/translation';

export default {
  controlPanelSections: [
    {
      label: '配置选项',
      expanded: true,
      controlSetRows: [
        ['echarts_name'],
        ['echarts_indicator'],
        ['adhoc_filters'],
      ],
    },
    {
      label: '样式配置',
      controlSetRows: [
        ['x_axis_label', 'y_axis_label'],
        ['echarts_plus_label', 'echarts_minus_label'],
      ],
    },
    {
      label: '工具箱',
      controlSetRows: [
        ['echarts_data_view'],
        ['echarts_save_as_image'],
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
    y_axis_label: {
      renderTrigger: false,
    },
  },
};
