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

import './echartsSelect.css';

function echartsVis(element, props, drawChart) {
  const propsConfig = props.config || {};
  const propsLabel = props.label || {};
  const teams = [];
  props.data.forEach((data) => {
    if (teams.indexOf(data[propsConfig.echarts_select]) === -1) {
      teams.push(data[propsConfig.echarts_select]);
    }
  });
  teams.forEach((data, index, self) => {
    if (data === '') {
      self.splice(index, 1);
      self.push(data);
    }
    if (data === 'ALL') {
      self.splice(index, 1);
      self.unshift(data);
    }
  });
  const teamData = teams.map(t => props.data.filter(d => d[propsConfig.echarts_select] === t));

  const div = d3.select(element);
  const randomNumber = Math.round(Math.random() * 1000000000000000);
  const selectItem = teams.map((data, index) => `<div class="echarts-select-dropdown-item ${index === 0 ? 'selected' : ''}" data-index="${index}">${data}</div>`).join('');
  const selectHtml = propsConfig.echarts_select ? `
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
    id="echarts-${randomNumber}"
    style="width: ${props.width}px; height: ${props.height}px"
  ></div>`;
  div.html(html);
  const chart = echarts.init(document.getElementById(`echarts-${randomNumber}`), props.theme);

  if (propsConfig.echarts_select) {
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
        drawChart(chart, teamData, currentIndex, propsConfig, propsLabel);
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

    drawChart(chart, teamData, 0, propsConfig, propsLabel);
    echartsSelect.value = teams[0];
  } else {
    drawChart(chart, teamData, 0, propsConfig, propsLabel);
  }
}

export default echartsVis;
