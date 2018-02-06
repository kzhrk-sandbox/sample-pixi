import shortid from 'shortid';
import BoundingBox from './BoundingBox';

export default class Stamps {
  constructor(app) {
    this.app = app;
    this.targets = {};
    this.current = null;
    this.container = new PIXI.Container();

    this.boundingBox = new PIXI.Graphics();
    this.boundingBox.lineStyle(2, '0xcccccc', 1);
  }

  init() {
  }

  add(imgPath) {
    const _this = this;
    const id = shortid.generate();

    PIXI.loader.add(id, imgPath).load((loader, resources) => {
      // This creates a texture from the image of imgPath
      const tmpStamp = new PIXI.Sprite(resources[id].texture);

      const boundingBox = new BoundingBox(tmpStamp);

      boundingBox.init();

      const stamp = boundingBox.target;

      // Setup the position of the stamp
      stamp.x = this.app.renderer.width / 2;
      stamp.y = this.app.renderer.height / 2;

      // Rotate around the center
      // stamp.anchor.x = 0.5;
      // stamp.anchor.y = 0.5;

      stamp.originalWidth = stamp.width;
      stamp.originalHeight = stamp.height;

      // event
      stamp.interactive = true;

      // stamp
      //   .on('pointerdown', function (e) {
      //     _this.current = stamp;
      //
      //     const location = e.data.getLocalPosition(this);
      //
      //     if (Math.abs(location.x) > stamp.originalWidth / 2 - 10 &&
      //         Math.abs(location.y) > stamp.originalHeight / 2 - 10) {
      //       this.isResize = true;
      //     }
      //     else {
      //       this.data = e.data;
      //       this.alpha = 0.5;
      //       this.dragging = true;
      //     }
      //   })
      //   .on('pointerup', this.onDragEnd)
      //   .on('pointerupoutside', this.onDragEnd)
      //   .on('pointermove', this.onDragMove);

      // this.container
      //   .on('pointerdown', this.onDragStart)
      //   .on('pointerup', this.onDragEnd)
      //   .on('pointerupoutside', this.onDragEnd)
      //   .on('pointermove', this.onDragMove);

      // Add the bunny to the scene we are building
      // this.boundingBox.drawRect(0, 0, stamp.width - 4, stamp.height - 4);

      this.container.interactive = true;
      this.container.addChild(stamp);
      // this.container.addChild(stamp, this.boundingBox);
      this.app.stage.addChild(this.container);
    });
  }

  onDragStart(e) {
    console.log('dragstart')
    this.data = e.data;
    this.alpha = 0.5;
    this.dragging = true;
  }

  onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    this.isResize = false;
    // set the interaction data to null
    this.data = null;
  }

  onDragMove(e) {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent);
      this.x = newPosition.x;
      this.y = newPosition.y;
    }
    else if (this.isResize) {
      this.width += 1;
      this.height += 1;
    }
  }

  onDragStartWithShift(e) {
    console.log(this, arguments)
  }
}
