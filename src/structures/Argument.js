class Argument {
  constructor(client, name) {
    this.client = client;
    this.name = name;
  }

  validate() {
    throw new Error(`${this.constructor.name} doesn't have a validate method.`);
  }
}

module.exports = Argument;
