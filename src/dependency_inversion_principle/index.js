let Relationship = Object.freeze({
  parent: 0,
  child: 1,
  sibling: 2,
});

class Person {
  constructor(name) {
    this.name = name;
  }
}

// LOW-LEVEL MODULE (STORAGE) module that is concerned to low level things

// abstract class:
class RelationshipBrowser {
  constructor() {
    if (this.constructor.name === "RelationshipBrowser") {
      throw new Error("RelationshipBrowser is abstract!");
    }
  }

  findAllChildrenOf(name) {}
}

class Relationships extends RelationshipBrowser {
  constructor() {
    super();
    this.data = [];
  }

  addParentAndChild(parent, child) {
    this.data.push({
      from: parent,
      type: Relationship.parent,
      to: child,
    });
  }

  findAllChildrenOf(name) {
    return this.data
      .filter(
        (relation) =>
          relation.from.name === name && relation.type === Relationship.parent
      )
      .map((relation) => relation.to);
  }
}

// HIGH-LEVEL MODULE (STORAGE) is concerned with high level stuff like getting the data out

// dependency inversion principle: high-level modules should not directly depend on low-lwvel modules like relationships
// they should instead depend on abstractions - abstract classes/interfaces
class Research {
  // constructor(relationships) {
  //   // find all children of john
  //   let relations = relationships.data;
  //   for (const relation of relations.filter(
  //     (relation) =>
  //       relation.from.name === "john" && relation.type === Relationship.parent
  //   )) {
  //     console.log(`john has a child named ${relation.to.name}`);
  //   }
  // }

  constructor(browser) {
    for (const person of browser.findAllChildrenOf("john")) {
      console.log(`john has a child named ${person.name}`);
    }
  }
}

let parent = new Person("john");
let child1 = new Person("david");
let child2 = new Person("mary");

let relationships = new Relationships();
relationships.addParentAndChild(parent, child1);
relationships.addParentAndChild(parent, child2);

new Research(relationships);
