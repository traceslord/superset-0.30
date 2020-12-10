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

function echartsLineMixedVis(payload, slice) {
  // console.log(slice);
  const div = d3.select(payload);
  var html = '<div id="main" style="width: ' + slice.width + 'px; height: ' + slice.height + 'px"></div>';
  div.html(html);
  var myChart = echarts.init(document.getElementById('main'), slice.theme);
  myChart.setOption({
    title: {
      text: "",
      left: 20
    },
    tooltip: {
      trigger: "axis"
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    legend: {
      data: [
        "remain_story_point",
        "done_story_point",
        "added_story_point",
        "adjusted_story_point",
        "removed_story_point"
      ],
      align: "right",
      right: 60,
      top: 20
    },
    grid: {
      left: "3%",
      right: "4%",
      top: 80,
      bottom: "3%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: []
      }
    ],
    yAxis: [
      {
        type: "value"
      },
      {
        type: "value"
      }
    ],
    series: [
      {
        name: "remain_story_point",
        type: "line",
        data: []
      },
      {
        name: "done_story_point",
        type: "line",
        yAxisIndex: 1,
        smooth: true,
        itemStyle: {
          normal: {
            lineStyle: {
              type: "dotted"
            }
          }
        },
        areaStyle: {},
        data: []
      },
      {
        name: "added_story_point",
        type: "line",
        yAxisIndex: 1,
        smooth: true,
        itemStyle: {
          normal: {
            lineStyle: {
              type: "dotted"
            }
          }
        },
        areaStyle: {},
        data: []
      },
      {
        name: "adjusted_story_point",
        type: "line",
        yAxisIndex: 1,
        smooth: true,
        itemStyle: {
          normal: {
            lineStyle: {
              type: "dotted"
            }
          }
        },
        areaStyle: {},
        data: []
      },
      {
        name: "removed_story_point",
        type: "line",
        yAxisIndex: 1,
        smooth: true,
        itemStyle: {
          normal: {
            lineStyle: {
              type: "dotted"
            }
          }
        },
        areaStyle: {},
        data: []
      }
    ]
  });
}

export default echartsLineMixedVis;
