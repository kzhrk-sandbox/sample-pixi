export default class Gesture {
  constructor(app, stamps) {
    this.app = app;
    this.stamps = stamps;

    this.prevScale = null;
  }

  init() {

  }

  addEvent() {
    const hammerCanvas = new Hammer(this.app.view);

    hammerCanvas.get('pinch').set({
      enable: true
    });

    hammerCanvas.on('pinch', (e)=>{
      if (this.stamps.current !== null) {
        let scale;


        if (this.stamps.current.scale.x + (e.scale - this.prevScale) <= 0.1) {
          scale = 0.1;
        }
        else if (this.stamps.current.scale.x + (e.scale - this.prevScale) >= 2) {
          scale = 2;
        }
        else {
          scale = this.stamps.current.scale.x + (e.scale - this.prevScale);
        }

        this.stamps.current.scale.set(
          scale,
          scale
        );
      }

      this.prevScale = e.scale;
    });
  }
}