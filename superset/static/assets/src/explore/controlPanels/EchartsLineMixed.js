import { t } from '@superset-ui/translation';

export default {
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        ['metrics', 'groupby'],
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
