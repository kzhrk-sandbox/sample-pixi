import * as util from '../../helper/util';

export default class Upload {
  constructor() {
    this.button = document.getElementById('js-file');
    this.reader = new FileReader();
  }

  init() {
  }

  addEvent() {
    const options = util.enablePassiveEventListeners() ? {
      passive: true
    } : false;

    this.button.addEventListener('change', this.start.bind(this), options);
    this.reader.addEventListener('load', this.loaded.bind(this), options);
  }

  start() {
    this.reader.readAsDataURL(this.button.files[0], 'UTF-16');
  }

  loaded(e) {
    const tmpImg = new Image();
    tmpImg.src = e.target.result;
  }
}
