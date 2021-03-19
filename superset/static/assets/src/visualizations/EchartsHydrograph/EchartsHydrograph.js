import d3 from 'd3';
import echarts from 'echarts';
import 'echarts-liquidfill';
import { formatColor } from '../../utils/colors';

function echartsHydrographVis(element, props) {
  const warningThreshold = Number(props.config.echarts_hydrograph_warning_threshold);
  const dangerThreshold = Number(props.config.echarts_hydrograph_danger_threshold);
  let color = props.config.echarts_hydrograph_theme_color;
  let gradientColor = props.config.echarts_hydrograph_theme_color_gradient;
  if (warningThreshold && props.data < warningThreshold) {
    color = props.config.echarts_hydrograph_warning_color;
    gradientColor = props.config.echarts_hydrograph_warning_color_gradient;
  }
  if (dangerThreshold && props.data < dangerThreshold) {
    color = props.config.echarts_hydrograph_danger_color;
    gradientColor = props.config.echarts_hydrograph_danger_color_gradient;
  }
  const div = d3.select(element);
  const randomNumber = Math.round(Math.random() * 1000000000000000);
  const html = `<div
    id="echarts-hydrograph-${randomNumber}"
    style="width: ${props.width}px; height: ${props.height}px"
  ></div>`;
  div.html(html);
  const myChart = echarts.init(document.getElementById(`echarts-hydrograph-${randomNumber}`));
  myChart.setOption({
    series: [
      {
        type: 'liquidFill',
        data: [props.data],
        shape: props.config.echarts_hydrograph_shape,
        label: {
          color: formatColor(color),
          insideColor: formatColor(props.config.echarts_hydrograph_inside_color),
          textStyle: {
            fontSize: props.config.echarts_hydrograph_font_size,
            fontWeight: props.config.echarts_hydrograph_font_weight,
          },
        },
        emphasis: {
          itemStyle: {
            opacity: 0.8,
          },
        },
        backgroundStyle: {
          color: formatColor(props.config.echarts_hydrograph_background_color),
        },
        color: [
          {
            type: 'linear',
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 1,
                color: [formatColor(color)],
              },
              {
                offset: 0,
                color: [formatColor(gradientColor)],
              },
            ],
          },
        ],
        outline: {
          show: props.config.echarts_hydrograph_outline_show,
          borderDistance: props.config.echarts_hydrograph_outline_border_distance,
          itemStyle: {
            borderColor: formatColor(color),
            borderWidth: props.config.echarts_hydrograph_outline_border_width,
          },
        },
      },
    ],
  });
}

export default echartsHydrographVis;
