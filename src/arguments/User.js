const Argument = require('../structures/Argument');

class User extends Argument {
  // eslint-disable-next-line no-useless-constructor
  constructor(...args) {
    super(...args);
  }

  async validate(key) {
    const { client } = this;
    let user;

    if (key.match(/^<@!?\d+>( |)$/gm)) {
      const [mention] = key.match(/^<@!?\d+>( |)$/gm);
      const id = mention.substring(3, mention.length - 1);

      if (this.constructor.isID(id)) {
        user = await client.users.fetch(id);
      }
    }

    const users = client.users.cache.filter(({ username }) => username === key);
    if (users.size >= 1) {
      user = await client.users.fetch(users.first().id);
    }

    if (key.includes('#')) {
      const tag = key.substring(key.length - 4);
      const name = key.substring(0, key.length - 5);
      const members = client.users.cache.filter(({ discriminator }) => discriminator === tag);

      if (members.size === 1) {
        user = await client.users.fetch(members.first().id);
      }

      if (members.size > 1) {
        user = client.users.fetch(members.filter(({ username }) => username === name).first());
      }
    }

    if (this.constructor.isID(key)) {
      user = await client.users.fetch(key);
    }

    return user;
  }

  static isID(key) {
    return parseInt(key, 10) && key.length === 18;
  }
}

module.exports = User;
