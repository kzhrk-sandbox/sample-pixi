import * as config from '../../config';
import * as Filters from 'pixi-filters';

const filters = {};

filters[config.filter.alpha] = new PIXI.filters.AlphaFilter(0.5);
filters[config.filter.blur] = new PIXI.filters.BlurFilter(2, 0, 0, 5);

filters[config.filter.sepia] = new Filters.OldFilmFilter({
  sepia: 1,
  noise: 0,
  scratch: 0,
  vignetting: 0
});

filters[config.filter.dot] = new Filters.DotFilter(0.75, 5);
filters[config.filter.mosaic] = new Filters.PixelateFilter(10);

filters[config.filter.monoqlo] = new PIXI.filters.ColorMatrixFilter();
filters[config.filter.monoqlo].blackAndWhite();
// filters[config.filter.monoqlo].desaturate();

filters[config.filter.emboss] = new Filters.EmbossFilter(3);

filters[config.filter.convolution] = new Filters.ConvolutionFilter(
  [
    0, -1, 0,
    -1, 5, -1,
    0, -1, 0
  ],
  100,
  100
);

filters[config.filter.zoom_blur] = new Filters.ZoomBlurFilter();

filters[config.filter.yellow] = new PIXI.filters.ColorMatrixFilter();
filters[config.filter.yellow].matrix = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 0, 0,
  0, 0, 0, 1
];

filters[config.filter.noise] = new PIXI.filters.NoiseFilter();


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
