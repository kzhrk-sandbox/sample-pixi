import * as config from '../config';

const filters = {};
filters[config.filter.alpha] = new PIXI.filters.AlphaFilter(0.5);
filters[config.filter.blur] = new PIXI.filters.BlurFilter(0.75, 0, 0, 5);

export default class Filter {
  constructor(app) {
    this.app = app;
    this.storage = [];
  }

  add(name) {
    const filter = filters[name];

    if (typeof filter === 'undefined') return;
    if (this.storage.indexOf(filter) !== -1) return;

    this.storage.push(filter);

    this.app.stage.filters = this.storage;
  }

  remove(name) {
    const filter = filters[name];

    if (typeof filter === 'undefined') return;
    if (this.storage.indexOf(filter) === -1) return;

    this.storage.splice(this.storage.indexOf(filter), 1);

    this.app.stage.filters = this.storage;
  }
}
