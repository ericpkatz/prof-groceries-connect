const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/my_db');

const Item = conn.define('item', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  bought: {
    type: Sequelize.BOOLEAN,
    defaultValue: false 
  }
});

const syncAndSeed = async ()=> {
  await conn.sync({ force: true });
  await Promise.all(['olives', 'vodka', 'shaker'].map( name => Item.create({ name })));
};

module.exports = {
  syncAndSeed,
  models: {
    Item
  }
};
