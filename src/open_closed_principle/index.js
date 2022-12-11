const COLORS = Object.freeze({
  red: "red",
  green: "green",
  blue: "blue",
});

const SIZES = Object.freeze({
  small: "small",
  medium: "medium",
  large: "large",
});

class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

const car = new Product("car", "green", "large");
const book = new Product("book", "red", "small");
const phone = new Product("phone", "red", "medium");
const products = [car, book, phone];

class ProductFilter {
  filterByColor(products, color) {
    return products.filter((product) => product.color === color);
  }

  filterBySize(products, size) {
    return products.filter((product) => product.size === size);
  }
}

const badFilter = new ProductFilter();
const filtereByColor = badFilter.filterByColor(products, "red");
console.log({ badFilter: filtereByColor });

class colorSpecification {
  constructor(color) {
    this.color = color;
  }

  isSatisfied(product) {
    return product.color === this.color;
  }
}

class sizeSpecification {
  constructor(size) {
    this.size = size;
  }

  isSatisfied(product) {
    return product.size === this.size;
  }
}

class andSpecification {
  constructor(...specifications) {
    this.specifications = specifications;
  }

  isSatisfied(product) {
    return this.specifications.every((specification) =>
      specification.isSatisfied(product)
    );
  }
}

class OPPFilter {
  filter(products, specification) {
    return products.filter((product) => specification.isSatisfied(product));
  }
}

// filter by color
const goodFilter = new OPPFilter();
const goodFiltereByColor = goodFilter.filter(
  products,
  new colorSpecification("red")
);
console.log({ goodFilter: goodFiltereByColor });

// filter by color and size
const redSmallSpecifications = new andSpecification(
  new colorSpecification("red"),
  new sizeSpecification("medium")
);
const redSmallProducts = goodFilter.filter(products, redSmallSpecifications);
console.log({ redSmallProducts });
