import { t } from '@superset-ui/translation';

export default {
  controlPanelSections: [
    {
      label: '配置选项',
      expanded: true,
      controlSetRows: [
        ['x_axis'],
        ['echarts_indicators'],
        ['y_axis_right'],
        ['echarts_select'],
        ['echarts_groupby', 'echarts_groupby_aggregate'],
        ['echarts_sort', 'echarts_order'],
        ['adhoc_filters'],
        ['echarts_background_color'],
      ],
    },
    {
      label: '雷达图配置',
      controlSetRows: [],
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
    x_axis: {
      label: '分类',
      description: '图例分类',
    },
    y_axis_right: {
      label: '指标最大值',
      description: '指标的最大值',
    },
    echarts_background_color: {
      default: { r: 22, g: 22, b: 39, a: 100 },
    },
    echarts_legend_icon: {
      default: 'circle',
    },
    echarts_legend_item_gap: {
      default: 20,
    },
    echarts_legend_bottom: {
      default: 15,
    },
    echarts_legend_left: {
      default: 'center',
    },
  },
};
