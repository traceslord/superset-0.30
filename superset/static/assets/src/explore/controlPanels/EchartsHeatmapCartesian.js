import { t } from '@superset-ui/translation';

export default {
  controlPanelSections: [
    {
      label: '配置选项',
      expanded: true,
      controlSetRows: [
        ['x_axis'],
        ['y_axis_left'],
        ['echarts_indicator'],
        ['adhoc_filters'],
      ],
    },
    {
      label: '样式配置',
      controlSetRows: [
        ['echarts_rotate'],
        ['echarts_checkbox'],
      ],
    },
    {
      label: '工具箱',
      controlSetRows: [
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
    echarts_checkbox: {
      label: '格式化 X 轴分时排序',
      description: '仅适用于分时开发热度图，格式化后的排序为：12a、1a、2a、3a、4a、5a、6a、7a、8a、9a、10a、11a、12p、1p、2p、3p、4p、5p、6p、7p、8p、9p、10p、11p',
      default: false,
    },
  },
};
