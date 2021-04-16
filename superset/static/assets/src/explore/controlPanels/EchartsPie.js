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
      label: '饼图配置',
      controlSetRows: [
        ['echarts_series_legend_hover_link'],
        ['echarts_series_hover_animation'],
        ['echarts_series_name', 'echarts_series_hover_offset'],
        ['echarts_pie_start_angle', 'echarts_pie_min_angle', 'echarts_pie_min_show_label_angle'],
        ['echarts_pie_rose_type'],
        ['echarts_pie_top', 'echarts_pie_bottom', 'echarts_pie_left', 'echarts_pie_right'],
        ['echarts_pie_width', 'echarts_pie_height'],
        ['echarts_series_center_1', 'echarts_series_center_2'],
        ['echarts_series_radius_1', 'echarts_series_radius_2'],
        ['echarts_pie_label_show'],
        ['echarts_pie_label_position'],
        ['echarts_pie_clockwise'],
        ['echarts_pie_avoid_label_overlap'],
        ['echarts_pie_still_show_zero_sum'],
      ],
    },
    {
      label: '图例组件',
      controlSetRows: [
        ['echarts_legend_type', 'echarts_legend_icon'],
        ['echarts_legend_item_gap', 'echarts_legend_item_width', 'echarts_legend_item_height'],
        ['echarts_legend_top', 'echarts_legend_bottom', 'echarts_legend_left', 'echarts_legend_right'],
        ['echarts_legend_not_selected'],
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
    echarts_series_hover_animation: {
      label: '是否开启 hover 在扇区上的放大动画效果',
    },
    echarts_legend_left: {
      default: 'center',
    },
  },
};
