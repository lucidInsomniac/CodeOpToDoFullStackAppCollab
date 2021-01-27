/************************************************************************
 *                                                                      *
 *   You will need to add your password to the DB_PASS = YOUR PW.       *
 *   Once you add your PW there,  go to the ".gitignore"file and        *
 *   add the ".env.example" in there if it isn't already there.         *
 *   Otherwise your password for MYSQL will be exposed in your project  *
 *                                                                      *
 ************************************************************************/

/*************Boiler plate************ */

//importing necessary components and depenedencies
var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");

/*****************Middleware*************** */

//This lets the server read JSON from the client
//request and convers them to JS
router.use(bodyParser.json());

/*******************Routes**************** */

//Get hompage
//client request for homepage, Browser will prompt you to got to "/api"
router.get("/", (req, res) => {
  //Once connected, expects a response with a message
  res.send("Welcome to the API");
});

//GET all data from DB
//!!!!!!Make sure url matches this!!!!!!!!!!
router.get("/todos/items", async (req, res) => {
  try {
    //db data must be known, we select from the table called "items", NOT the DB "todos"
    let results = await db("SELECT * FROM items ORDER BY id ASC;");
    //check
    console.log("RESULTS", results);
    //you should send back the full list of items with status
    res.status(200).send(results.data);
    //Catch any errors
  } catch (err) {
    //Response to error, 404 status with message
  }
  res.status(404).send({ error: "List not found." });
});

//      ORIGINAL
// router.get("/todos", (req, res) => {
//   // Send back the full list of items
//   db("SELECT * FROM items ORDER BY id ASC;")
//     .then(results => {
//       res.send(results.data);
//     })
//     .catch(err => res.status(500).send(err));
// });

//POST new data, MAKE SURE SOURCE LINK IS SET TO : http://localhost:5000/api/todos/items2
//!!NEED TO MAKE SURE MYSQL HAS COLUMN "TASK" BEFORE TESTING
//Make sure http matches mysql table features, In MYSQL check table name: "items"(or whatever), and column called : "id" & "task"
//!!!!!!Make sure url matches this!!!!!!!!!!
router.post("/todos/items", async (req, res) => {
  // The request's body is available in req.body

  let { task } = req.body;
  let sql = `
    INSERT INTO items (task)
    VALUES ('${task}')
  `;

  //try
  try {
    //inserts the data
    let results = await db(sql);

    //Select all data, // If the query is successful
    results = await db("SELECT * FROM items");

    //you should send back the full list of items
    //console.log(results.data);
    res.status(201).send(results.data);
  } catch (err) {
    //Catch errors if any encountered
    //Response to error, 500 status with message
    res.status(404).send({ error: err.message });
  }
});

/***************We will Go over on Thurs************** */

//PUT data Update/Replace by ID
// router.put("/todos/:todo_id", old route

router.put("/todos/items/:id", (req, res) => {
  // The request's body is available in req.body
  // URL params are available in req.params
  // If the query is successfull you should send back the full list of items
  // task not found; return 404 status code
  // Create new obj from request body
  // Make sure modified task doesn't try to change ID
  // Replace old task with modified one
  // Return modified task as confirmation
  //
});

//DELETE data by ID
router.delete("/todos/items/:id", (req, res) => {
  // URL params are available in req.params
  // Add your code here
  //
});

module.exports = router;
