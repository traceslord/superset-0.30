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

import './EchartsBarDataset.css';

const BarDatasetFun = {
  formatName(name) {
    switch (name) {
      case 'estimated_value':
        return '预估';
      case 'completed_value':
        return '实际';
      default:
        return name;
    }
  },
  drawChart(chart, propsData, teamData, teamIndex) {
    const chartData = teamData[teamIndex];
    const indicatorName = propsData.echarts_indicators.map(data => BarDatasetFun.formatName(data));
    const indicatorValue = chartData.map(item => ([
      item[propsData.echarts_name],
    ].concat(propsData.echarts_indicators.map(data => (item[data])))));
    const source = [['故事线'].concat(indicatorName)].concat(indicatorValue);
    const series = propsData.echarts_indicators.map(() => ({
      type: 'bar',
      barWidth: propsData.bar_width,
    }));
    chart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
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
      legend: { top: 25 },
      grid: {
        left: '3%',
        right: '4%',
        top: 70,
        bottom: 80,
        containLabel: true,
      },
      dataset: { source },
      xAxis: {
        type: 'category',
        name: propsData.x_axis_label,
        axisLabel: {
          interval: 0,
          rotate: propsData.rotate,
        },
      },
      yAxis: { name: propsData.y_axis_label },
      series,
    });
  },
};

function echartsBarDatasetVis(element, props) {
  const propsData = props.data;
  const teams = [];
  propsData.data.forEach((data) => {
    if (teams.indexOf(data[propsData.echarts_select]) === -1) {
      teams.push(data[propsData.echarts_select]);
    }
  });
  teams.forEach((data, index, self) => {
    if (data === '') {
      self.splice(index, 1);
      self.push(data);
    }
  });
  const teamData = teams.map(t => propsData.data.filter(d => d[propsData.echarts_select] === t));

  const div = d3.select(element);
  const randomNumber = Math.round(Math.random() * 10000000000000000);
  const selectItem = teams.map((data, index) => `<div class="echarts-select-dropdown-item ${index === 0 ? 'selected' : ''}" data-index="${index}">${data}</div>`).join('');
  const selectHtml = propsData.echarts_select ? `
    <div class="echarts-select">
      <div class="echarts-select-content">
        <input class="echarts-select-content-input" id="echarts-select-input-${randomNumber}" type="text" readonly="readonly" autocomplete="off" placeholder="请选择小队" />
        <div class="echarts-select-content-suffix">
          <div class="echarts-select-content-suffix-icon"></div>
        </div>
      </div>
      <div class="echarts-select-dropdown">
        <div class="echarts-select-dropdown-list" id="echarts-select-dropdown-${randomNumber}">${selectItem}</div>
        <div class="echarts-select-dropdown-arrow"></div>
      </div>
    </div>
  ` : '';
  const html = `${selectHtml}<div
    id="echarts-bar-dataset-${randomNumber}"
    style="width: ${props.width}px; height: ${props.height}px"
  ></div>`;
  div.html(html);
  const chart = echarts.init(document.getElementById(`echarts-bar-dataset-${randomNumber}`), props.theme);

  if (propsData.echarts_select) {
    const echartsSelect = document.getElementById(`echarts-select-input-${randomNumber}`);
    const selectItemArr = document.getElementById(`echarts-select-dropdown-${randomNumber}`).children;
    echartsSelect.addEventListener('click', function (e) {
      const selectDropdown = e.target.parentNode.parentNode.children[1];
      if (selectDropdown.style.display) return;
      const timer = setTimeout(() => {
        selectDropdown.style.display = 'block';
        clearTimeout(timer);
      }, 100);
    });
    for (let i = 0; i < selectItemArr.length; i++) {
      selectItemArr[i].addEventListener('click', function (e) {
        const currentIndex = Number(e.target.dataset.index);
        BarDatasetFun.drawChart(chart, propsData, teamData, currentIndex);
        echartsSelect.value = teams[currentIndex];
        const children = e.target.parentNode.children;
        for (let j = 0; j < children.length; j++) {
          if (currentIndex === j) children[j].className = 'echarts-select-dropdown-item selected';
          else children[j].className = 'echarts-select-dropdown-item';
        }
      });
    }
    document.addEventListener('click', function () {
      const selectDropdownArr = document.getElementsByClassName('echarts-select-dropdown');
      for (let i = 0; i < selectDropdownArr.length; i++) {
        if (selectDropdownArr[i].style.display === 'block') selectDropdownArr[i].style.display = '';
      }
    });

    BarDatasetFun.drawChart(chart, propsData, teamData, 0);
    echartsSelect.value = teams[0];
  } else {
    BarDatasetFun.drawChart(chart, propsData, teamData, 0);
  }
}

export default echartsBarDatasetVis;
