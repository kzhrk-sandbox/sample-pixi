import shortid from 'shortid';

export default class Stamps {
  constructor(app) {
    this.app = app;
    this.targets = {};
    this.current = null;
  }

  init() {
  }

  add(imgPath) {
    const _this = this;
    const id = shortid.generate();

    PIXI.loader.add(id, imgPath).load((loader, resources) => {
      // This creates a texture from the image of imgPath
      const stamp = new PIXI.Sprite(resources[id].texture);

      // Setup the position of the stamp
      stamp.x = this.app.renderer.width / 2;
      stamp.y = this.app.renderer.height / 2;

      // Rotate around the center
      stamp.anchor.x = 0.5;
      stamp.anchor.y = 0.5;

      // event
      stamp.interactive = true;

      stamp
        .on('pointerdown', function (e) {
          _this.current = stamp;
          this.data = e.data;
          this.alpha = 0.5;
          this.dragging = true;
        })
        .on('pointerup', this.onDragEnd)
        .on('pointerupoutside', this.onDragEnd)
        .on('pointermove', this.onDragMove);

      // Add the bunny to the scene we are building
      this.app.stage.addChild(stamp);
    });
  }

  onDragStart(e) {
    this.data = e.data;
    this.alpha = 0.5;
    this.dragging = true;
  }

  onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
  }

  onDragMove(e) {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent);
      this.x = newPosition.x;
      this.y = newPosition.y;
    }
  }
}
