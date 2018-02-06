export default class Text {
  constructor(app) {
    this.app = app;

    this.container = new PIXI.Container();
    this.style = new PIXI.TextStyle();
    this.target = new PIXI.Text();
  }

  setText(text) {
    this.target.text = text;
  }

  setFontSize(size, suffix = 'px') {
    this.style.fontSize = `${size}${suffix}`;
  }

  setFontFamily(families) {
    if (families instanceof Array === false) {
      this.style.fontFamily = families.replace(/\s?,\s?/g, ',').split(',');
    }
    else {
      this.style.fontFamily = families;
    }
  }

  setFill(color) {
    this.style.fill = color;
  }

  add() {
    this.target.style = this.style;
    this.app.stage.addChild(this.target);
  }
}
