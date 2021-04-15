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
      controlSetRows: [
        ['echarts_series_symbol', 'echarts_series_symbol_rotate'],
        ['echarts_series_symbol_size_width', 'echarts_series_symbol_size_height'],
        ['echarts_series_line_style_width', 'echarts_series_line_style_type'],
        ['echarts_series_line_style_opacity', 'echarts_series_area_style_opacity'],
      ],
    },
    {
      label: '雷达图坐标系组件',
      controlSetRows: [
        ['echarts_radar_center_1', 'echarts_radar_center_2'],
        ['echarts_radar_radius_1', 'echarts_radar_radius_2'],
        ['echarts_radar_start_angle', 'echarts_radar_name_gap'],
        ['echarts_radar_split_number', 'echarts_radar_shape'],
        ['echarts_radar_split_line_show', 'echarts_radar_split_area_show'],
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
    x_axis: {
      label: '分类',
      description: '图例分类',
    },
    y_axis_right: {
      label: '指标最大值',
      description: '指标的最大值',
    },
    echarts_series_symbol: {
      default: 'none',
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
