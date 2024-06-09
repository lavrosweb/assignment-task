import { TableDecision } from '../../../components/tableDecision/tableDecision';
import { AbstractView } from '../../common/view';

export class Decision extends AbstractView {
  constructor(data) {
    super();
    this.setTitle('Решение');
    this.data = data || [];
  }

  async postMatrix() {
    const dataPostOb = {
      cost_matrix: this.data
    };
    console.log('postMatrix', dataPostOb);
    console.log(`Sending data: ${JSON.stringify(dataPostOb)}`);
    try {
      const response = await fetch('http://127.0.0.1:5000/solve_assignment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataPostOb),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      const message = document.createElement('p');
      message.textContent = error;
      this.app.append(message)
      console.log(message);
      return message;
    }
  }

  backWindow() {
    window.location.href = '#sizeMatrix';
  }

  createButton() {
    const backButton = document.createElement('button');
    this.app.append(backButton);
    backButton.textContent = 'Назад';
    backButton.addEventListener('click', () => {
      this.backWindow();
    });
  }

  async render() {
    this.app.innerHTML = '';
    if (this.data.length) {
      console.log('decision:', this.data);
      const postData = await this.postMatrix();
      const tableDecisionComponent = new TableDecision(this.data, postData);
      this.app.append(tableDecisionComponent.render());
    } else {
      const message = document.createElement('p');
      message.textContent = 'Данные отсутствуют.';
      this.app.appendChild(message);
      this.createButton();
    }
  }
}
