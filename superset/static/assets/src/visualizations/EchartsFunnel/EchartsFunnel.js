import echarts from 'echarts';

import azul from 'echarts/theme/azul';
import carp from 'echarts/theme/carp';
import darkbold from 'echarts/theme/dark-bold';
import eduardo from 'echarts/theme/eduardo';
import gray from 'echarts/theme/gray';
import inspired from 'echarts/theme/inspired';
import macarons2 from 'echarts/theme/macarons2';
import roma from 'echarts/theme/roma';
import techblue from 'echarts/theme/tech-blue';
import beeinspired from 'echarts/theme/bee-inspired';
import darkdigerati from 'echarts/theme/dark-digerati';
import forest from 'echarts/theme/forest';
import green from 'echarts/theme/green';
import jazz from 'echarts/theme/jazz';
import mint from 'echarts/theme/mint';
import royal from 'echarts/theme/royal';
import vintage from 'echarts/theme/vintage';
import blue from 'echarts/theme/blue';
import dark from 'echarts/theme/dark';
import darkfreshcut from 'echarts/theme/dark-fresh-cut';
import freshcut from 'echarts/theme/fresh-cut';
import helianthus from 'echarts/theme/helianthus';
import london from 'echarts/theme/london';
import red from 'echarts/theme/red';
import sakura from 'echarts/theme/sakura';
import caravan from 'echarts/theme/caravan';
import darkblue from 'echarts/theme/dark-blue';
import darkmushroom from 'echarts/theme/dark-mushroom';
import fruit from 'echarts/theme/fruit';
import infographic from 'echarts/theme/infographic';
import macarons from 'echarts/theme/macarons';
import redvelvet from 'echarts/theme/red-velvet';
import shine from 'echarts/theme/shine';

function echartsFunnelVis(payload, slice) {
  const div = d3.select(payload);
  var html = '<div id="main" style="width: ' + slice.width + 'px; height: ' + slice.height + 'px"></div>';
  div.html(html);
  var myChart = echarts.init(document.getElementById('main'), slice.theme);
  var option = {
    title: {
      text: '',
      subtext: '纯属虚构',
      left: 'left',
      top: 'bottom'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      top: 'center',
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
      }
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: []
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
        data: []
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
        data: []
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
        data: []
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
        data: []
      }
    ]
  };
  myChart.setOption(option);

  const json = slice.data;
  var data_name = [];
  var max_value = 0;
  const data = json;
  data.forEach(function(item) {
    data_name.push(item['name']);
    if (item['value'] > max_value) {
      max_value = item['value'];
    }
  });
  var tmp_series = [];
  for (var i = 1; i < 5; i++) {
    tmp_series.push({
      data: data
    });
  }
  var option2 = {
    legend: { data: data_name },
    series: tmp_series
  };

  myChart.setOption(option2);
}

export default echartsFunnelVis;
