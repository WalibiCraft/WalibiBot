class Event {
  constructor(client, name) {
    this.client = client;
    this.name = name;
  }

  execute() {
    throw new Error(`${this.constructor.name} doesn't have an execute method.`);
  }
}

module.exports = Event;
