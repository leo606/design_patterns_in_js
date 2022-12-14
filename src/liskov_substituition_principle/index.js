class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get area() {
    return this._width * this._height;
  }

  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }

  set width(value) {
    this._width = value;
  }
  set height(value) {
    this._height = value;
  }

  toString() {
    return `${this._width} x ${this._height}`;
  }
}

class Square extends Rectangle {
  constructor(size) {
    super(size, size);
  }

  set width(value) {
    this._width = this._height = value;
  }

  set height(value) {
    this._width = this._height = value;
  }
}

function useIt(rectangle) {
  let width = rectangle._width;
  rectangle.height = 10;
  console.log(`expected area ${10 * width}`);
  console.log(`received area ${rectangle.area}`);
}

useIt(new Rectangle(2, 3));
useIt(new Square(5));
