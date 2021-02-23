import { t } from '@superset-ui/translation';

export default {
  controlPanelSections: [
    {
      label: '配置选项',
      expanded: true,
      controlSetRows: [
        ['x_axis'],
        ['echarts_indicators'],
        ['adhoc_filters'],
      ],
    },
    {
      label: '样式配置',
      controlSetRows: [
        ['echarts_select'],
        ['echarts_graphic_type'],
        ['x_axis_label', 'y_axis_label'],
        ['echarts_rotate'],
        ['echarts_checkbox', 'echarts_stack'],
        ['echarts_area', 'echarts_smooth'],
        ['echarts_bar_width'],
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
    echarts_indicators: {
      label: 'Y 轴',
      description: 'Y 轴要显示的列',
    },
    echarts_select: {
      mapStateToProps: state => ({
        choices: (state.datasource) ? state.datasource.filterable_cols : [],
      }),
    },
    x_axis_label: {
      renderTrigger: false,
    },
    y_axis_label: {
      renderTrigger: false,
    },
    echarts_checkbox: {
      label: '格式化 X 轴时间',
      default: false,
    },
    echarts_area: {
      label: '区域填充（仅在折线图生效）',
    },
    echarts_smooth: {
      label: '平滑曲线（仅在折线图生效）',
    },
    echarts_bar_width: {
      label: '柱条宽度（仅在柱状图生效）',
    },
  },
};
