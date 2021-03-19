export default {
  controlPanelSections: [
    {
      label: '配置选项',
      expanded: true,
      controlSetRows: [
        ['metric'],
        ['adhoc_filters'],
      ],
    },
    {
      label: '水位图配置',
      controlSetRows: [
        ['echarts_hydrograph_shape'],
        ['echarts_hydrograph_font_size', 'echarts_hydrograph_font_weight'],
        ['echarts_hydrograph_inside_color', 'echarts_hydrograph_background_color'],
        ['echarts_hydrograph_warning_threshold', 'echarts_hydrograph_danger_threshold', 'echarts_hydrograph_threshold_sort'],
        ['echarts_hydrograph_theme_color', 'echarts_hydrograph_warning_color', 'echarts_hydrograph_danger_color'],
        [
          'echarts_hydrograph_theme_color_gradient',
          'echarts_hydrograph_warning_color_gradient',
          'echarts_hydrograph_danger_color_gradient',
        ],
        ['echarts_hydrograph_outline_show'],
        ['echarts_hydrograph_outline_border_width', 'echarts_hydrograph_outline_border_distance'],
      ],
    },
  ],
};
