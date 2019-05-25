// dependencies 
const express = require("express");

// runs express with port for host or local
const app = express(); 
const PORT = process.env.PORT || 8080; 

// format inbound data
// allows nested objs and arrays
//app.use(express.urlencoded({ extended: true }));

// convesrts data to json
//app.use(express.json());

// read static files
//app.use(express.static("public"));

// handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// route import
const routes = require("./controllers/burgers_controller.js");
//app.use(routes);

//server listener
app.listen(PORT, () => {
    console.log("🌎 ==> App now listening on PORT: " + PORT);
});