import * as util from '../../helper/util';
/**
 * Photo class
 */
export default class Photo {
  /**
   * @param {object} app - PIXI.Application
   */
  constructor(app) {
    this.app = app;

    this.container = new PIXI.Container();

    this.button = document.getElementById('js-file');
    this.reader = new FileReader();

    this.guide = new PIXI.Graphics();
    this.guide.lineStyle(1, '#000', 1);
    this.guide.drawRect(10, 10, 300, 300);

    this.maskArea = new PIXI.Graphics();
    this.maskArea.beginFill(0, 0);
    this.maskArea.drawRect(10, 10, 300, 300);
  }

  init() {
  }
  /**
   * イベント定義
   */
  addEvent() {
    const options = util.enablePassiveEventListeners() ? {
      passive: true
    } : false;

    this.button.addEventListener('change', this.onChange.bind(this), options);
    this.reader.addEventListener('load', this.onLoad.bind(this), options);
  }
  /**
   * input[type=file]のchange event
   */
  onChange() {
    this.reader.readAsDataURL(this.button.files[0], 'UTF-16');
  }
  /**
   * input[type=file]のFileのload event
   */
  onLoad(e) {
    this.container.addChild(new PIXI.Sprite(PIXI.Texture.fromImage(e.target.result)));
    // this.container.addChild(this.guide);
    this.app.stage.addChild(this.container);
  }
  /**
   * アップロードされた写真のマスク
   */
  mask() {
    this.container.mask = this.maskArea;
  }
}
