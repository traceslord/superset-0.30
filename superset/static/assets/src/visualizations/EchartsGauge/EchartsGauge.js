import d3 from 'd3';
import echarts from 'echarts';

function echartsGaugeVis(element, props) {
  const div = d3.select(element);
  const randomNumber = Math.round(Math.random() * 1000000000000000);
  const html = `<div
    id="echarts-gauge-${randomNumber}"
    style="width: ${props.width}px; height: ${props.height}px"
  ></div>`;
  div.html(html);
  const myChart = echarts.init(document.getElementById(`echarts-gauge-${randomNumber}`));
  myChart.setOption({
    series: [{
      type: 'gauge',
      radius: props.config.echarts_gauge_radius,
      startAngle: props.config.echarts_gauge_start_angle,
      endAngle: props.config.echarts_gauge_end_angle,
      clockwise: props.config.echarts_gauge_clockwise,
      data: [props.data],
      min: props.config.echarts_series_min,
      max: props.config.echarts_series_max,
      splitNumber: props.config.echarts_gauge_split_number,
    }],
  });
}

export default echartsGaugeVis;
