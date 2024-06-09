import { DivComponent } from '../../src/common/div-component';
import './select.css'

export class Select extends DivComponent {
  constructor(state) {
    super();
    this.state = state;
  }

  updateRows() {
    this.state.rows = parseInt(this.el.querySelector('#rows').value);
  }

  updateCols() {
    this.state.cols = parseInt(this.el.querySelector('#cols').value);
  }

  render() {
    this.el.classList.add('select');
    this.el.innerHTML = `
      <h2>Введите размерность и заполните таблицу</h2>
      <div class="select-container">
        <div class="select-item">
          <label for="rows">Количество строк:</label>
          <select id="rows" name="rows">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3"${this.state.rows === 3 ? ' selected="selected"' : ''}>3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <div class="select-item">
          <label for="cols">Количество столбцов:</label>
          <select id="cols" name="cols">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4"${this.state.cols === 4 ? ' selected="selected"' : ''}>4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>
    `;

    this.attachEventListeners();
    return this.el;
  }

  attachEventListeners() {
    const rowsSelect = this.el.querySelector('#rows');
    const colsSelect = this.el.querySelector('#cols');
    rowsSelect.addEventListener('change', this.updateRows.bind(this));
    colsSelect.addEventListener('change', this.updateCols.bind(this));
  }
}
