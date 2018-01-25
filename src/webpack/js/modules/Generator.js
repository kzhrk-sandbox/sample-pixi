export default class Generator {
  constructor() {
    this.isPinch = false;

    this.app = new PIXI.Application();

    this.buttonBlur = document.getElementById('js-filter-blur');
    this.buttonAlpha = document.getElementById('js-filter-alpha');
    this.buttonAdd = document.getElementById('js-add-image');
  }

  init() {
    document.body.appendChild(this.app.view);

    PIXI.loader.add('bunny', '/images/sample.jpeg').load((loader, resources) => {
      // This creates a texture from a 'bunny.png' image
      const bunny = new PIXI.Sprite(resources.bunny.texture);

      // Setup the position of the bunny
      bunny.x = this.app.renderer.width / 2;
      bunny.y = this.app.renderer.height / 2;

      bunny.interactive = true;

      // Rotate around the center
      bunny.anchor.x = 0.5;
      bunny.anchor.y = 0.5;

      bunny
        .on('pointerdown', this.onDragStart)
        .on('pointerup', this.onDragEnd)
        .on('pointerupoutside', this.onDragEnd)
        .on('pointermove', this.onDragMove);

      // Add the bunny to the scene we are building
      this.app.stage.addChild(bunny);


      let mc = new Hammer.Manager(this.app.view);
      let pinch = new Hammer.Pinch();

      mc.add([pinch]);

      mc.on('pinch', (e)=>{
        console.log(e)
      });
    });
  }

  onDragStart(e) {
    this.data = e.data;
    this.alpha = 0.5;
    this.dragging = true;
    this.isPinch = false;

    if (e.data.originalEvent.touches && e.data.originalEvent.touches.length === 2) {
      this.isPinch = true;
    }
  }

  onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
  }

  onDragMove(e) {
    if (this.dragging && !this.isPinch) {
      const newPosition = this.data.getLocalPosition(this.parent);
      this.x = newPosition.x;
      this.y = newPosition.y;
    }
    else if (this.isPinch) {
      // console.log(`rotation: ${e.data.originalEvent.rotation}`)
      // console.log(`scale: ${e.data.originalEvent.scale}`)

      // this.rotation += 0.01 * e.data.originalEvent.rotation;
    }
  }

  addEvent() {
    this.buttonAlpha.addEventListener('click', this.filterAlpha.bind(this), false);
    this.buttonBlur.addEventListener('click', this.filterBlur.bind(this), false);
    this.buttonAdd.addEventListener('click', this.addImage.bind(this), false);
  }

  filterAlpha() {
    const filter = new PIXI.filters.AlphaFilter(0.5);
    this.app.stage.filters = [filter];
  }

  filterBlur() {
    const filter = new PIXI.filters.BlurFilter(0.75, 0, 0, 5);
    this.app.stage.filters = [filter];
  }

  addImage() {
    PIXI.loader.add('bunny2', '/images/sample.jpeg').load((loader, resources) => {
      // This creates a texture from a 'bunny.png' image
      const bunny = new PIXI.Sprite(resources.bunny.texture);

      // Setup the position of the bunny
      bunny.x = this.app.renderer.width / 2;
      bunny.y = this.app.renderer.height / 2;

      // Rotate around the center
      bunny.anchor.x = 0.75;
      bunny.anchor.y = 0.75;

      // Add the bunny to the scene we are building
      this.app.stage.addChild(bunny);
    });
  }
}
