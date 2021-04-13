export default function transformProps(chartProps) {
  const { width, height, payload, datasource } = chartProps;
  return {
    width,
    height,
    data: payload.data,
    config: payload.form_data,
    label: datasource.verboseMap,
    theme: payload.form_data.echarts_theme,
  };
}
