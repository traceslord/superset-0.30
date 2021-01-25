import { t } from '@superset-ui/translation';

export default {
  controlPanelSections: [
    {
      label: '配置选项',
      expanded: true,
      controlSetRows: [
        ['echarts_name'],
        ['echarts_start_time'],
        ['echarts_end_time'],
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
  controlOverrides: {
    echarts_name: {
      description: '所要显示的项目名称',
    },
    echarts_indicator: {
      label: '当前进度',
      description: '计划当前的进度',
    },
  },
};
