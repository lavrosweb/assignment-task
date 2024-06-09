import { DivComponent } from '../../src/common/div-component';
import './tableInputData.css'

export class TableInputData extends DivComponent {
  constructor(state) {
    super();
    this.state = state;
  }

  createTableData(rows, cols) {
    this.el.innerHTML = '';

    const table = document.createElement('table');
    table.id = 'dynamicTable';

    for (let i = 0; i < rows; i++) {
      const tr = document.createElement('tr');
      for (let j = 0; j < cols; j++) {
        const td = document.createElement('td');
        const input = document.createElement('input');
        input.type = 'number';
        input.value = '';
        input.dataset.row = i;
        input.dataset.col = j;
        td.appendChild(input);
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }

    this.el.appendChild(table);
  }

  getTableData() {
    const inputs = this.el.querySelectorAll('input');
    const dataInput = Array.from({ length: this.state.rows }, () =>
      Array(this.state.cols).fill(0)
    );

    inputs.forEach((input) => {
      const row = parseInt(input.dataset.row, 10);
      const col = parseInt(input.dataset.col, 10);
      dataInput[row][col] = parseFloat(input.value) || 0;
    });
    return dataInput;
  }

  render() {
    this.el.classList.add('table-input');
    this.createTableData(this.state.rows, this.state.cols);
    return this.el;
  }
}
