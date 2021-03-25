export default function transformProps(chartProps) {
  const { width, height, payload } = chartProps;
  return {
    width,
    height,
    data: payload.data,
    config: payload.form_data,
    theme: payload.form_data.echarts_theme,
  };
}
