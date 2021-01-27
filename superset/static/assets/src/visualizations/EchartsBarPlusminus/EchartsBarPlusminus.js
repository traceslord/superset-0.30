import d3 from 'd3';
import echarts from 'echarts';

import 'echarts/theme/azul';
import 'echarts/theme/bee-inspired';
import 'echarts/theme/blue';
import 'echarts/theme/caravan';
import 'echarts/theme/carp';
import 'echarts/theme/cool';
import 'echarts/theme/dark';
import 'echarts/theme/dark-blue';
import 'echarts/theme/dark-bold';
import 'echarts/theme/dark-digerati';
import 'echarts/theme/dark-fresh-cut';
import 'echarts/theme/dark-mushroom';
import 'echarts/theme/eduardo';
import 'echarts/theme/fresh-cut';
import 'echarts/theme/fruit';
import 'echarts/theme/forest';
import 'echarts/theme/gray';
import 'echarts/theme/green';
import 'echarts/theme/helianthus';
import 'echarts/theme/infographic';
import 'echarts/theme/inspired';
import 'echarts/theme/jazz';
import 'echarts/theme/london';
import 'echarts/theme/macarons';
import 'echarts/theme/macarons2';
import 'echarts/theme/mint';
import 'echarts/theme/red';
import 'echarts/theme/red-velvet';
import 'echarts/theme/roma';
import 'echarts/theme/royal';
import 'echarts/theme/sakura';
import 'echarts/theme/shine';
import 'echarts/theme/tech-blue';
import 'echarts/theme/vintage';

function echartsBarPlusminusVis(element, props) {
  const div = d3.select(element);
  const randomNumber = Math.round(Math.random() * 1000);
  const html = `<div
    id="echarts-bar-plusminus-${randomNumber}"
    style="width: ${props.width}px; height: ${props.height}px"
  ></div>`;
  div.html(html);
  const myChart = echarts.init(document.getElementById(`echarts-bar-plusminus-${randomNumber}`), props.theme);
  myChart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '8%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      name: props.data.x_axis_label,
    },
    yAxis: [
      {
        type: 'category',
        name: props.data.y_axis_label,
        axisTick: {
          show: false,
        },
        data: props.data.data.map(data => data.name),
      },
    ],
    series: [
      {
        name: props.data.echarts_plus_label,
        type: 'bar',
        stack: 'stack',
        label: {
          show: true,
          position: 'insideRight',
          formatter: params => (params.value === 0 ? '' : params.value),
        },
        data: props.data.data.map(data => data.plus),
      },
      {
        name: props.data.echarts_minus_label,
        type: 'bar',
        stack: 'stack',
        label: {
          show: true,
          position: 'insideLeft',
          formatter: params => (params.value === 0 ? '' : params.value),
        },
        data: props.data.data.map(data => data.minus),
      },
    ],
  });
}

export default echartsBarPlusminusVis;
