import onChange from 'on-change';
import { AbstractView } from '../../common/view';
import { Select } from '../../../components/select/select';
import { TableInputData } from '../../../components/tableInputData/tableInputData';
import './sizeMatrix.css'

export class SizeMatrix extends AbstractView {
  state = {
    rows: 3,
    cols: 4,
  };
  constructor(data, updateData) {
    super();
    this.setTitle('Размерность');
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.data = data;
    this.updateData = updateData;
  }

  stateHook(path) {
    if (path === 'rows' || path === 'cols') {
      console.log('Размерность изменилась');
      console.log(this.state);
      this.updateTable();
    }
  }

  openDecision() {
    window.location.href = '#decision';
  }

  updateLocal = (tableData) => {
    this.updateData(tableData);
  };

  render() {
    this.app.innerHTML = '';
    const sizeMatrixWrapper = document.createElement('div');
    sizeMatrixWrapper.classList.add('size-matrix-wapper');

    this.selectComponent = new Select(this.state);
    this.tableInputDataComponent = new TableInputData(this.state);

    sizeMatrixWrapper.append(this.selectComponent.render());
    sizeMatrixWrapper.append(this.tableInputDataComponent.render());

    const solveButton = document.createElement('button');
    solveButton.classList.add('button_next');
    solveButton.textContent = 'Решить задачу';
    sizeMatrixWrapper.append(solveButton);
    solveButton.addEventListener('click', async () => {
      const tableData = this.tableInputDataComponent.getTableData();
      this.updateLocal(tableData);
      this.openDecision();
    });
    this.app.append(sizeMatrixWrapper);
  }

  destroy() {
    onChange.unsubscribe(this.state);
  }

  updateTable() {
    this.tableInputDataComponent.createTableData(
      this.state.rows,
      this.state.cols
    );
  }
}
