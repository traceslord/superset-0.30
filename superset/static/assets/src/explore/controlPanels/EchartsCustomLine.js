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
        ['echarts_background_color'],
      ],
    },
    {
      label: '折线配置',
      controlSetRows: [
        ['echarts_series_symbol', 'echarts_series_symbol_rotate'],
        ['echarts_series_symbol_size_width', 'echarts_series_symbol_size_height'],
        ['echarts_series_step'],
        ['echarts_series_line_style_width', 'echarts_series_line_style_type'],
        ['echarts_series_stack', 'echarts_series_area_style_opacity', 'echarts_series_smooth'],
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
      label: '网格组件',
      controlSetRows: [
        ['echarts_grid_width', 'echarts_grid_height'],
        ['echarts_grid_background_color', 'echarts_grid_border_color', 'echarts_grid_border_width'],
        ['echarts_grid_top', 'echarts_grid_bottom', 'echarts_grid_left', 'echarts_grid_right'],
        ['echarts_grid_contain_label'],
      ],
    },
    {
      label: 'X 轴',
      controlSetRows: [
        ['echarts_x_axis_name'],
        ['echarts_x_axis_name_location', 'echarts_x_axis_name_gap'],
        ['echarts_x_axis_name_rotate', 'echarts_x_axis_label_rotate'],
        ['echarts_x_axis_inverse'],
        ['echarts_x_axis_data_format'],
      ],
    },
    {
      label: 'Y 轴',
      controlSetRows: [
        ['echarts_y_axis_name'],
        ['echarts_y_axis_name_location', 'echarts_y_axis_name_gap'],
        ['echarts_y_axis_name_rotate', 'echarts_y_axis_label_rotate'],
        ['echarts_y_axis_inverse'],
      ],
    },
    {
      label: '提示框组件',
      controlSetRows: [
        ['echarts_tooltip_show'],
        ['echarts_tooltip_formatter'],
        ['echarts_tooltip_background_color', 'echarts_tooltip_border_color', 'echarts_tooltip_border_width'],
        [
          'echarts_tooltip_padding_top',
          'echarts_tooltip_padding_bottom',
          'echarts_tooltip_padding_left',
          'echarts_tooltip_padding_right',
        ],
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
    echarts_legend_item_gap: {
      default: '25',
    },
    echarts_legend_item_width: {
      default: '15',
    },
    echarts_legend_item_height: {
      default: '15',
    },
    echarts_legend_top: {
      default: '35',
    },
    echarts_legend_right: {
      default: '4%',
    },
    echarts_grid_top: {
      default: '70',
    },
    echarts_grid_bottom: {
      default: '50',
    },
    echarts_grid_left: {
      default: '3%',
    },
    echarts_grid_right: {
      default: '4%',
    },
  },
};
