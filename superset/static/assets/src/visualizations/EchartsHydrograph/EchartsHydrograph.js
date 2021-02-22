import d3 from 'd3';
import echarts from 'echarts';
import 'echarts-liquidfill';

function echartsHydrographVis(element, props) {
  const data = props.data.data.map(item => item[props.data.echarts_indicator]);
  const div = d3.select(element);
  const randomNumber = Math.round(Math.random() * 10000000000000000);
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
        data,
        label: {
          color: '#5971c0',
          insideColor: '#fff',
          textStyle: {
            fontSize: 36,
          },
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
                color: ['#5971c0'],
              },
              {
                offset: 0,
                color: ['#7bd7f5'],
              },
            ],
          },
        ],
        outline: {
          show: false,
          borderDistance: 3,
          itemStyle: {
            borderColor: '#5971c0',
            borderWidth: 5,
          },
        },
      },
    ],
  });
}

export default echartsHydrographVis;
