const pointName = {
  tr: 'tr',
  br: 'br',
  bl: 'bl',
  tl: 'tl'
};

export default class BoundingBox {
  constructor(content) {
    this.content = content;

    // bounding box
    this.target = new PIXI.Sprite();

    this.target.addChild(this.content);

    // border
    this.border = new PIXI.Graphics();

    // boundingboxのミニマム
    this.minSize = 50;

    // boundingboxのコーナーポイント
    this.pointSize = 10;
    const point = new PIXI.Graphics();

    point.lineStyle(2, '0xff0000', 1);
    point.beginFill('0xff0000');
    point.drawRect(0, 0, this.pointSize, this.pointSize);

    const pointTR = point.clone();
    const pointBR = point.clone();
    const pointBL = point.clone();
    const pointTL = point.clone();

    pointTR.name = pointName.tr;
    pointBR.name = pointName.br;
    pointBL.name = pointName.bl;
    pointTL.name = pointName.tl;

    this.points = {
      [pointName.tr]: pointTR,
      [pointName.br]: pointBR,
      [pointName.bl]: pointBL,
      [pointName.tl]: pointTL
    };
  }

  init() {
    const adjustPosition = -1 * this.pointSize / 2;

    // set position
    this.points[pointName.tr].x = this.content.width + adjustPosition;
    this.points[pointName.tr].y = adjustPosition;

    this.points[pointName.br].x = this.content.width + adjustPosition;
    this.points[pointName.br].y = this.content.height + adjustPosition;

    this.points[pointName.bl].x = adjustPosition;
    this.points[pointName.bl].y = this.content.height + adjustPosition;

    this.points[pointName.tl].x = adjustPosition;
    this.points[pointName.tl].y = adjustPosition;

    // addEvent
    Object.keys(this.points).forEach((point)=> {
      this.points[point]
        .on('pointerdown', this.onDragStartPoint.bind(this))
        .on('pointermove', this.onDragMovePoint.bind(this))
        .on('pointerup', this.onDragEndPoint.bind(this))
        .on('pointerupoutside', this.onDragEndPoint.bind(this));

      this.points[point].interactive = true;
      this.points[point].interactiveChildren = true;

      this.target.addChild(this.points[point]);
    });
  }

  onDragStartPoint(e) {
    const point = e.currentTarget;

    point.data = e.data;
    point.alpha = 0.5;
    point.dragging = true;
    point.prevPosition = null;

    switch (point.name) {
      case pointName.tr:
        this.content.anchor.x = 0;
        this.content.anchor.y = 1;
        this.content.y += this.content.height;
        break;
      case pointName.br:
        this.content.anchor.x = 0;
        this.content.anchor.y = 0;
        break;
      case pointName.bl:
        this.content.anchor.x = 1;
        this.content.anchor.y = 0;
        this.content.x += this.content.width;
        break;
      case pointName.tl:
        this.content.anchor.x = 1;
        this.content.anchor.y = 1;
        this.content.x += this.content.width;
        this.content.y += this.content.height;
        break;
    }
  }

  onDragMovePoint(e) {
    const point = e.currentTarget;

    if (point.dragging) {

      // resize content & move points
      const prevPosition = (point.prevPosition === null) ?
        point.data.getLocalPosition(point.parent) :
        point.prevPosition;
      const position = point.data.getLocalPosition(point.parent);
      const originalWidth = this.content.getLocalBounds().width;
      const originalHeight = this.content.getLocalBounds().height;
      const rate = originalWidth / originalHeight;
      const diffX = position.x - prevPosition.x;
      const diffY = position.y - prevPosition.y;

      let newWidth;
      let newHeight;

      switch (point.name) {
        case pointName.tr:
          newWidth = this.content.width + diffX;
          newHeight = this.content.height + diffY;
          break;
        case pointName.br:
          newWidth = this.content.width + diffX;
          newHeight = this.content.height + diffY;
          break;
        case pointName.bl:
          newWidth = this.content.width - diffX;
          newHeight = this.content.height - diffY;
          break;
        case pointName.tl:
          newWidth = this.content.width - diffX;
          newHeight = this.content.height - diffY;
          break;
      }

      if (newHeight * rate <= newHeight) {
        newHeight = newWidth / rate;
      }
      else {
        newWidth = newHeight * rate;
      }

      this.content.width = newWidth;
      this.content.height = newHeight;

      // move points
      const adjustPosition = -1 * this.pointSize / 2;

      console.log(this.content)

      switch (point.name) {
        case pointName.tr:
          this.points[pointName.tr].x = this.content.width + adjustPosition + this.content.x;
          this.points[pointName.tr].y = adjustPosition + this.content.y - this.content.height;

          this.points[pointName.br].x = this.content.width + adjustPosition + this.content.x;
          this.points[pointName.br].y = adjustPosition + this.content.y;

          this.points[pointName.bl].x = adjustPosition + this.content.x;
          this.points[pointName.bl].y = adjustPosition + this.content.y;

          this.points[pointName.tl].x = adjustPosition + this.content.x;
          this.points[pointName.tl].y = adjustPosition + this.content.y - this.content.height;
          break;
        case pointName.br:
          this.points[pointName.tr].x = this.content.width + adjustPosition + this.content.x;
          this.points[pointName.tr].y = adjustPosition + this.content.y;

          this.points[pointName.br].x = this.content.width + adjustPosition + this.content.x;
          this.points[pointName.br].y = this.content.height + adjustPosition + this.content.y;

          this.points[pointName.bl].x = adjustPosition + this.content.x;
          this.points[pointName.bl].y = this.content.height + adjustPosition + this.content.y;

          this.points[pointName.tl].x = adjustPosition + this.content.x;
          this.points[pointName.tl].y = adjustPosition + this.content.y;
          break;
        case pointName.bl:
          this.points[pointName.tr].x = adjustPosition + this.content.x;
          this.points[pointName.tr].y = adjustPosition + this.content.y;

          this.points[pointName.br].x = adjustPosition + this.content.x;
          this.points[pointName.br].y = adjustPosition + this.content.y + this.content.height;

          this.points[pointName.bl].x = adjustPosition + this.content.x - this.content.width;
          this.points[pointName.bl].y = adjustPosition + this.content.y + this.content.height;;

          this.points[pointName.tl].x = adjustPosition + this.content.x - this.content.width;
          this.points[pointName.tl].y = adjustPosition + this.content.y;
          break;
        case pointName.tl:
          this.points[pointName.tr].x = adjustPosition + this.content.x;
          this.points[pointName.tr].y = adjustPosition + this.content.y - this.content.height;

          this.points[pointName.br].x = adjustPosition + this.content.x;
          this.points[pointName.br].y = adjustPosition + this.content.y;

          this.points[pointName.bl].x = adjustPosition + this.content.x - this.content.width;
          this.points[pointName.bl].y = adjustPosition + this.content.y;

          this.points[pointName.tl].x = adjustPosition + this.content.x - this.content.width;
          this.points[pointName.tl].y = adjustPosition + this.content.y - this.content.height;
          break;
      }

      // console.log(this.target.getBounds())

      point.prevPosition = position;
    }
  }

  onDragEndPoint(e) {
    // point初期化
    const point = e.currentTarget;
    point.alpha = 1;
    point.dragging = false;
    point.data = null;

    this.content.anchor.x = 0;
    this.content.anchor.y = 0;

    switch (point.name) {
      case pointName.tr:
        this.content.y -= this.content.height;
        break;
      case pointName.br:
        break;
      case pointName.bl:
        this.content.x -= this.content.width;
        break;
      case pointName.tl:
        this.content.x -= this.content.width;
        this.content.y -= this.content.height;
        break;
    }
  }

  remove() {
    Object.keys(this.points).forEach((point)=> {
      this.points[point].destroy();
    });
  }
}
