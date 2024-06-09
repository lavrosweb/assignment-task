import { DivComponent } from '../../src/common/div-component';
import './tableDecision.css'

export class TableDecision extends DivComponent {
  constructor(data, postData) {
    super();
    this.data = data || [];
    this.postData = postData;
  }

  backWindow() {
    window.location.href = '#sizeMatrix';
  }

  createButton() {
    const backButton = document.createElement('button');
    backButton.classList.add('button_back')
    this.el.append(backButton);
    backButton.textContent = 'Назад';
    backButton.addEventListener('click', () => {
      this.backWindow();
    });
  }

  displayTotalCost(response) {
    const cost = document.createElement('div');
    cost.classList.add('cost');
    cost.innerHTML = `Время выполнения работ составит: ${response.total_cost}`;
    return cost;
  }

  displayOptimalPlan(response) {
    const planWrapper = document.createElement('div');
    planWrapper.classList.add('plan');
    const header = document.createElement('h3');
    header.innerText = 'Оптимальный план';
    planWrapper.appendChild(header);

    response.optimal_plan.forEach((plan) => {
      const planRow = document.createElement('p');
      planRow.innerText = `(${plan[0]}i -> ${plan[1]}j)`;
      planWrapper.appendChild(planRow);
    });

    return planWrapper;
  }

  createHtmlTable(step, index) {
    const tableWrapper = document.createElement('div');
    tableWrapper.classList.add('table-wrapper');
    // Создаем заголовок для каждого шага
    const stepHeader = document.createElement('h3');
    stepHeader.innerText = `${index + 1}. ${step.description}`;
    tableWrapper.appendChild(stepHeader);

    // Создаем таблицу для текущей матрицы
    const table = document.createElement('table');
    table.classList.add('table-decision')

    step.matrix.forEach((row) => {
      const tr = document.createElement('tr');
      row.forEach((cell) => {
        const td = document.createElement('td');
        const p =document.createElement('p')
        p.classList.add('table-decision-value')
        p.innerText = cell;
        td.appendChild(p)
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
    tableWrapper.appendChild(table);

    return tableWrapper;
  }

  render() {
    this.el.classList.add('decision-table');
    this.el.innerHTML = '<h2>Результаты решения задачи</h2>';

    if (this.data.length) {
      this.postData.steps.map((step, index) => {
        this.el.appendChild(this.createHtmlTable(step, index));
      });
      this.el.appendChild(this.displayOptimalPlan(this.postData));
      this.el.appendChild(this.displayTotalCost(this.postData));
      this.createButton();
    } else {
      const message = document.createElement('p');
      message.textContent = 'Данные отсутствуют.';
      this.el.appendChild(message);
    }

    return this.el;
  }
}
