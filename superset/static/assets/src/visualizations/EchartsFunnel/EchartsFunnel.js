import d3 from 'd3';
import echarts from 'echarts';

import 'echarts/theme/azul';
import 'echarts/theme/bee-inspired';
import 'echarts/theme/blue';
import 'echarts/theme/caravan';
import 'echarts/theme/carp';
import 'echarts/theme/dark';
import 'echarts/theme/dark-blue';
import 'echarts/theme/dark-bold';
import 'echarts/theme/dark-digerati';
import 'echarts/theme/dark-fresh-cut';
import 'echarts/theme/dark-mushroom';
import 'echarts/theme/eduardo';
import 'echarts/theme/fresh-cut';
import 'echarts/theme/forest';
import 'echarts/theme/fruit';
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

function echartsFunnelVis(payload, slice) {
  const div = d3.select(payload);
  const html = '<div id="main" style="width: ' + slice.width + 'px; height: ' + slice.height + 'px"></div>';
  div.html(html);
  const myChart = echarts.init(document.getElementById('main'), slice.theme);
  const option = {
    title: {
      text: '',
      subtext: '纯属虚构',
      left: 'left',
      top: 'bottom',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}%',
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      top: 'center',
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: [],
    },
    calculable: true,
    series: [
      {
        name: '漏斗图',
        type: 'funnel',
        width: '40%',
        height: '45%',
        left: '5%',
        top: '50%',
        funnelAlign: 'right',
        center: ['25%', '25%'],
        data: [],
      },
      {
        name: '金字塔',
        type: 'funnel',
        width: '40%',
        height: '45%',
        left: '5%',
        top: '5%',
        sort: 'ascending',
        funnelAlign: 'right',
        center: ['25%', '75%'],
        data: [],
      },
      {
        name: '漏斗图',
        type: 'funnel',
        width: '40%',
        height: '45%',
        left: '55%',
        top: '5%',
        funnelAlign: 'left',
        center: ['75%', '25%'],
        data: [],
      },
      {
        name: '金字塔',
        type: 'funnel',
        width: '40%',
        height: '45%',
        left: '55%',
        top: '50%',
        sort: 'ascending',
        funnelAlign: 'left',
        center: ['75%', '75%'],
        data: [],
      },
    ],
  };
  myChart.setOption(option);

  const json = slice.data;
  const dataName = [];
  let maxValue = 0;
  const data = json;
  data.forEach(function (item) {
    dataName.push(item.name);
    if (item.value > maxValue) {
      maxValue = item.value;
    }
  });
  const tmpSeries = [];
  for (let i = 1; i < 5; i++) {
    tmpSeries.push({
      data,
    });
  }
  const option2 = {
    legend: { data: dataName },
    series: tmpSeries,
  };

  myChart.setOption(option2);
}

export default echartsFunnelVis;
