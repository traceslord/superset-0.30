export default function transformProps(chartProps) {
  const { width, height, formData, payload } = chartProps;
  const { metric } = formData;
  const metricName = metric && metric.label ? metric.label : metric;
  return {
    width,
    height,
    config: payload.form_data,
    data: payload.data[0][metricName],
  };
}
