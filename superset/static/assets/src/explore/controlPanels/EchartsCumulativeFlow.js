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
      label: t('Theme'),
      controlSetRows: [
        ['echarts_theme'],
      ],
    },
  ],
  controlOverrides: {
    echarts_select: {
      mapStateToProps: state => ({
        choices: (state.datasource) ? state.datasource.filterable_cols : [],
      }),
    },
  },
};
