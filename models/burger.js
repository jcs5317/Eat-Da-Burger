// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm");

let burger = {
  all: function(cb) {
    orm.selectAll("burgers", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  insert: function(cols, vals, cb) {
    orm.insertOne("burgers", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(colValObj, id, cb) {
    orm.updateOne("burgers", colValObj, id, function(res) {
      cb(res);
    });
  },
  delete: function(id, cb) {
    orm.delete("burgers", id, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = burger;