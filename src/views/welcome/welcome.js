import { WelcomeComp } from '../../../components/welcomeComp/welcomeComp';
import { AbstractView } from '../../common/view';

export class Welcome extends AbstractView {
  constructor() {
    super();
    this.setTitle('Welcome');
  }

  render() {
	this.app.innerHTML = '';
	this.app.append(new WelcomeComp().render())
  }
}