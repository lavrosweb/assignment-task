import { DivComponent } from '../../src/common/div-component';
import './welcomeComp.css';

export class WelcomeComp extends DivComponent {
  constructor() {
    super();
  }

  openCalculate() {
    window.location.href = '#sizeMatrix';
  }

  render() {
    this.el.classList.add('welcome-comp');
    this.el.innerHTML = `
			<h1>Добро пожаловать в калькулятор "Решение задач о назначениях"</h1>
			<button class="button">Открыть калькулятор</button>
		`;
    this.el
      .querySelector('button')
      .addEventListener('click', this.openCalculate.bind(this));
    return this.el;
  }
}