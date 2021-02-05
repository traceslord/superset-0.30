import { t } from '@superset-ui/translation';

export default {
  controlPanelSections: [
    {
      label: '配置选项',
      expanded: true,
      controlSetRows: [
        ['metric'],
        ['metric_2'],
        ['echarts_name'],
        ['groupby'],
        ['adhoc_filters'],
      ],
    },
    {
      label: '样式配置',
      controlSetRows: [
        ['echarts_radius'],
        ['x_axis_label', 'y_axis_label'],
        ['echarts_regression_type'],
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
    metric: {
      label: 'X 轴',
      description: 'X 轴要显示的列',
    },
    metric_2: {
      label: 'Y 轴',
      description: 'Y 轴要显示的列',
    },
    x_axis_label: {
      renderTrigger: false,
    },
    y_axis_label: {
      renderTrigger: false,
    },
  },
};
