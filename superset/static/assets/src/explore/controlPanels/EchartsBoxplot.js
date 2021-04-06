import { t } from '@superset-ui/translation';

export default {
  controlPanelSections: [
    {
      label: '配置选项',
      expanded: true,
      controlSetRows: [
        ['x_axis'],
        [
          'echarts_boxplot_min',
          'echarts_boxplot_q1',
          'echarts_boxplot_q2',
          'echarts_boxplot_q3',
          'echarts_boxplot_max',
        ],
        ['echarts_select'],
        ['echarts_groupby', 'echarts_groupby_aggregate'],
        ['echarts_sort', 'echarts_order'],
        ['adhoc_filters'],
        ['echarts_background_color'],
      ],
    },
    {
      label: '箱线图配置',
      controlSetRows: [
        ['echarts_series_box_min_width', 'echarts_series_box_max_width'],
      ],
    },
    {
      label: '网格组件',
      controlSetRows: [
        ['echarts_grid_width', 'echarts_grid_height'],
        ['echarts_grid_top', 'echarts_grid_bottom', 'echarts_grid_left', 'echarts_grid_right'],
        ['echarts_grid_border_width'],
        ['echarts_grid_border_color', 'echarts_grid_background_color'],
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
        ['echarts_data_zoom'],
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
    echarts_grid_left: {
      default: '3%',
    },
    echarts_grid_right: {
      default: '4%',
    },
    echarts_data_zoom: {
      default: true,
    },
  },
};
