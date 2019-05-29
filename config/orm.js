// Import MySQL connection.
const connection = require("./connection");


function printQuestionMarks(num) {
    let arr = [];

    for (let i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    let arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (let key in ob) {
        let value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }

    return arr.toString();
}

// Object for all our SQL statement functions.
let orm = {
    selectAll: function(tableInput, cb) {
      //construct the query string that returns all rows from the table
      let queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    insertOne: function(table, cols, vals, cb) {
      let queryString = "INSERT INTO " + table + " (" + cols.toString() + ") VALUES (" + printQuestionMarks(vals.length) +  ");"
      //console.log("QUER",queryString)
      //console.log("VAL", vals)
      connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    
    updateOne: function(table, colValObj, id, cb) {
      let queryString = "UPDATE " + table + " SET " + objToSql(colValObj) + " WHERE " + id
  
      //console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },
    delete: function(table, id, cb) {
      let queryString = "DELETE FROM " + table + " WHERE " + id
  
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    }
};
  
  // Export the orm object for the model buger.js).
  module.exports = orm;
  