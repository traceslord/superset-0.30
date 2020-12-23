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

import { formatDate } from '../../utils/dates';

function echartsLineMixedVis(element, props) {
  const legendData = [props.data.y_axis_left].concat(props.data.y_axis_right);
  const series = [
    {
      name: props.data.y_axis_left,
      type: 'line',
      data: props.data.data.map(data => data[props.data.y_axis_left]),
    },
  ].concat(props.data.y_axis_right.map(item => ({
      name: item,
      type: 'line',
      yAxisIndex: 1,
      smooth: true,
      itemStyle: {
        normal: {
          lineStyle: {
            type: 'dotted',
          },
        },
      },
      areaStyle: {},
      data: props.data.data.map(data => data[item]),
    })));
  const div = d3.select(element);
  const randomNumber = Math.round(Math.random() * 1000);
  const html = `<div
    id="echarts-line-mixed-${randomNumber}"
    style="width: ${props.width}px; height: ${props.height}px"
  ></div>`;
  div.html(html);
  const myChart = echarts.init(document.getElementById(`echarts-line-mixed-${randomNumber}`), props.theme);
  myChart.setOption({
    tooltip: {
      trigger: 'axis',
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    legend: {
      data: legendData,
      align: 'right',
      right: 60,
      top: 10,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.data.data.map(data => formatDate.formateDay(data[props.data.x_axis])),
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
      {
        type: 'value',
      },
    ],
    series,
  });
}

export default echartsLineMixedVis;
