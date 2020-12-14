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
      label: t('Theme'),
      controlSetRows: [
        ['echarts_theme'],
      ],
    },
  ],
};
