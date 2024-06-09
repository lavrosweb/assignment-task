import { Decision } from './views/decision/decision';
import { SizeMatrix } from './views/sizeMatrix/sizeMatrix';
import { Welcome } from './views/welcome/welcome';

class App {
  routes = [
    { path: '', view: Welcome },
    { path: '#sizeMatrix', view: SizeMatrix },
    { path: '#decision', view: Decision },
  ];
  constructor() {
    this.data = this.loadData();
    window.addEventListener('hashchange', this.route.bind(this));
    this.route();
  }

  updateData(newData) {
    this.data = newData;
    this.saveData(this.data);
    console.log('App data updated:', this.data);
  }

  saveData(data) {
    localStorage.setItem('appData', JSON.stringify(data));
  }

  loadData() {
    const data = localStorage.getItem('appData');
    return data ? JSON.parse(data) : null;
  }

  clearData() {
    localStorage.removeItem('appData');
    this.data = null;
  }

  async route() {
    if (this.currentView) {
      this.currentView.destroy();
    }
    const route = this.routes.find((r) => r.path === location.hash);
    if (route) {
      const View = route.view;

      if (route.path === '#sizeMatrix') {
        this.clearData();
      }
      this.currentView = new View(
        this.data,
        this.updateData.bind(this),
      );
      await this.currentView.render();
    }
  }
}

new App();