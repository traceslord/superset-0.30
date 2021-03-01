import { t } from '@superset-ui/translation';

export default {
  controlPanelSections: [
    {
      label: '配置选项',
      expanded: true,
      controlSetRows: [
        ['x_axis'],
        ['echarts_indicators'],
        ['echarts_select'],
        ['adhoc_filters'],
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
  },
};
