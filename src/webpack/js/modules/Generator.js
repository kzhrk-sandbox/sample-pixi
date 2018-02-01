export default class Canvas {
  constructor() {
    this.app = new PIXI.Application();
  }

  init() {
    document.body.appendChild(this.app.view);
  }

  addEvent() {

  }

  onResize() {

  }

  reset() {

  }

  getImage() {
    const tmpCanvas = document.createElement('canvas');

    tmpCanvas.width = this.app.view.width;
    tmpCanvas.height = this.app.view.height;

    const context = tmpCanvas.getContext('2d');

    this.app.render(this.app.stage);

    context.drawImage(this.app.view, 0, 0);

    return tmpCanvas.toDataURL();
  }
}
