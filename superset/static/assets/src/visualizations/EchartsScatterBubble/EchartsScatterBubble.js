import d3 from 'd3';
import echarts from 'echarts';
import ecStat from 'echarts-stat';

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

function echartsCumulativeFlowVis(element, props) {
  const x = props.data.x_axis;
  const y = props.data.echarts_indicator;
  const name = props.data.echarts_name;
  const radius = props.data.echarts_radius;
  const data = props.data.data.map(item => [
    item[x],
    item[y],
    item[name],
    radius ? item[radius] : item[y] / item[x],
  ]);
  const series = [];
  series[0] = {
    type: 'scatter',
    name: 'scatter',
    symbolSize: params => params[3],
    label: {
      show: true,
      position: 'top',
      formatter: params => params.data[2],
    },
    itemStyle: {
      color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
        {
          offset: 0,
          color: 'rgb(251, 118, 123)',
        },
        {
          offset: 1,
          color: 'rgb(204, 46, 72)',
        },
      ]),
      shadowBlur: 10,
      shadowColor: 'rgba(120, 36, 50, 0.5)',
      shadowOffsetY: 5,
    },
    data,
    markLine: {
      lineStyle: {
        normal: {
          color: '#909399',
          type: 'dashed',
        },
      },
      data: [
        { type: 'average', name: '平均值' },
        { type: 'average', valueDim: 'x' },
      ],
    },
  };
  if (props.data.echarts_regression_type) {
    const lineData = props.data.data.map(item => [
      item[x],
      item[y],
    ]);
    const myRegression = ecStat.regression(props.data.echarts_regression_type, lineData);
    myRegression.points.sort((a, b) => a[0] - b[0]);
    series[1] = {
      type: 'line',
      name: 'line',
      showSymbol: false,
      lineStyle: {
        normal: {
          color: '#2f4554',
        },
      },
      data: myRegression.points,
      markPoint: {
        itemStyle: {
          color: 'transparent',
        },
        label: {
          show: true,
          position: 'left',
          formatter: myRegression.expression,
          color: '#333',
          fontSize: 14,
        },
        data: [
          {
            coord: myRegression.points[myRegression.points.length - 1],
          },
        ],
      },
    };
  }
  const div = d3.select(element);
  const randomNumber = Math.round(Math.random() * 1000);
  const html = `<div
    id="echarts-scatter-bubble-${randomNumber}"
    style="width: ${props.width}px; height: ${props.height}px"
  ></div>`;
  div.html(html);
  const myChart = echarts.init(document.getElementById(`echarts-scatter-bubble-${randomNumber}`), props.theme);
  myChart.setOption({
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'cross',
      },
      formatter: params => `${params.value[2]}：<br />故事点：${params.value[1]}<br />工时：${params.value[0]} 小时`,
    },
    grid: {
      left: '3%',
      right: '8%',
      top: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'value',
        name: props.data.x_axis_label,
        scale: true,
        splitLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: props.data.y_axis_label,
        scale: true,
        splitLine: {
          show: false,
        },
      },
    ],
    series,
  });
}

export default echartsCumulativeFlowVis;
