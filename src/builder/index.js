// builder is something that helps you construct a partucular object

class Tag {
  static get indentSize() {
    return 2;
  }

  constructor(name = "", content = "") {
    this.name = name;
    this.content = content;
    this.children = [];
  }

  toStringImpl(indent) {
    let html = [];
    let identSize = " ".repeat(indent * Tag.indentSize);

    html.push(`${identSize}<${this.name}>\n`);

    if (this.content.length > 0) {
      html.push(" ".repeat(Tag.indentSize * (indent + 1)));
      html.push(this.content);
      html.push("\n");
    }

    for (const child of this.children) {
      html.push(child.toStringImpl(indent + 1));
    }

    html.push(`${identSize}</${this.name}>\n`);
    return html.join("");
  }

  toString() {
    return this.toStringImpl(0);
  }

  static create(name) {
    return new HtmlBuilder(name);
  }
}

class HtmlBuilder {
  constructor(rootName) {
    this.root = new Tag(rootName);
    this.rootName = rootName;
  }

  addChild(childName, childContent) {
    let child = new Tag(childName, childContent);
    this.root.children.push(child);
  }

  addChildFluent(childName, childContent) {
    let child = new Tag(childName, childContent);
    this.root.children.push(child);
    return this;
  }

  toString() {
    return this.root.toString();
  }

  clear() {
    this.root = new Tag(this.rootName);
  }

  build() {
    return this.root;
  }
}

const words = ["someword", "anotherword"];
let builder = new HtmlBuilder("ul");

for (let word of words) {
  builder.addChild("li", word);
}

console.log(builder.build().toString());

builder.clear();

builder
  .addChildFluent('li', 'foo')
  .addChildFluent('li', 'bar')
  .addChildFluent('li', 'baz')

console.log(builder.root.toString() )
