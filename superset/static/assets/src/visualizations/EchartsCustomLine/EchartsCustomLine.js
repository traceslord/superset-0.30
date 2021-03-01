import echartsVis from '../../utils/echarts';
import { formatDate } from '../../utils/dates';

function drawChart(chart, propsData, teamData, teamIndex) {
  const chartData = teamData[teamIndex];
  const series = propsData.indicators.map(item => ({
      type: 'line',
      name: item,
      data: chartData.map(data => data[item]),
    }));
  chart.setOption({
    toolbox: {
      feature: {
        dataView: {
          show: propsData.data_view,
        },
        saveAsImage: {
          show: propsData.save_as_image,
        },
      },
    },
    xAxis: {
      type: 'category',
      data: chartData.map((data) => {
        if (propsData.formate_day) return formatDate.formateDay(data[propsData.x_axis]);
        return data[propsData.x_axis];
      }),
    },
    yAxis: {
      type: 'value',
    },
    series,
  });
}

function echartsCustomLineVis(element, props) {
  echartsVis(element, props, drawChart);
}

export default echartsCustomLineVis;
