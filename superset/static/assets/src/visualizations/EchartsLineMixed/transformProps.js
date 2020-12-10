export default function transformProps(chartProps) {
  const { width, height, payload } = chartProps;
  // console.log(chartProps);
  return {
    width,
    height,
    data: payload.data,
    theme: payload.form_data.echarts_theme,
  };
}
