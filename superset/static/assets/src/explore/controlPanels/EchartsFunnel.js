import { t } from '@superset-ui/translation';

export default {
  controlPanelSections: [
    {
      label: '配置选项',
      expanded: true,
      controlSetRows: [
        ['echarts_indicators'],
        ['echarts_select'],
        ['echarts_groupby', 'echarts_groupby_aggregate'],
        ['echarts_sort', 'echarts_order'],
        ['adhoc_filters'],
        ['echarts_background_color'],
      ],
    },
    {
      label: '漏斗图配置',
      controlSetRows: [
        ['echarts_series_name', 'echarts_funnel_gap'],
        ['echarts_series_min', 'echarts_series_max'],
        ['echarts_funnel_min_size', 'echarts_funnel_max_size'],
        ['echarts_funnel_orient', 'echarts_funnel_align'],
        ['echarts_funnel_top', 'echarts_funnel_bottom', 'echarts_funnel_left', 'echarts_funnel_right'],
        ['echarts_funnel_width', 'echarts_funnel_height'],
        ['echarts_funnel_label_show'],
        ['echarts_funnel_label_position'],
      ],
    },
    {
      label: '图例组件',
      controlSetRows: [
        ['echarts_legend_type', 'echarts_legend_icon'],
        ['echarts_legend_item_gap', 'echarts_legend_item_width', 'echarts_legend_item_height'],
        ['echarts_legend_top', 'echarts_legend_bottom', 'echarts_legend_left', 'echarts_legend_right'],
      ],
    },
    {
      label: '提示框组件',
      controlSetRows: [
        ['echarts_tooltip_show'],
        ['echarts_tooltip_formatter'],
        [
          'echarts_tooltip_padding_top',
          'echarts_tooltip_padding_bottom',
          'echarts_tooltip_padding_left',
          'echarts_tooltip_padding_right',
        ],
        ['echarts_tooltip_border_width'],
        ['echarts_tooltip_border_color', 'echarts_tooltip_background_color'],
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
    echarts_funnel_gap: {
      default: 2,
    },
    echarts_series_min: {
      description: '指定的数据最小值',
    },
    echarts_series_max: {
      description: '指定的数据最大值',
    },
    echarts_legend_item_gap: {
      default: 25,
    },
    echarts_legend_item_width: {
      default: 15,
    },
    echarts_legend_item_height: {
      default: 15,
    },
    echarts_legend_left: {
      default: 'center',
    },
  },
};
