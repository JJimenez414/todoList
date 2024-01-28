import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import pg from "pg";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

//body parser is a middleware which is used to communicate between two applications. 
app.use(bodyParser.urlencoded({extended:true}));
//telling express where to get static files
app.use(express.static(__dirname + "/public"));
//connecting to db in from pgadmin
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "kakis",
    password: "id130414",
    port: 5432
});

db.connect();

//get the list that you want and save it in result
//SELECT <column> FROM <table>
async function listOfItems() {
    const result = await db.query("SELECT item FROM list");
    //a list that we will store on the items that the user enters   
    let arrItems = [];
    //filter the items from the list and save it int the arrItems
    result.rows.forEach((items) => {
        arrItems.push(items.item);
    })

    return arrItems;
}

app.get("/", async (req, res) => {
    //call the function
    const Items = await listOfItems();
    
    res.render("index.ejs", {items: Items});
});



app.post("/newItem", (req, res) => {
   /*
   we are rendering index.ejs and we are passing the variable TITLE to it with the information
   gathered by the reques made by item in 
  */  
    const newItem = req.body["item"];
    /*
        INSERT INTO <table> (column1, column2)
        VALUES (value1, value 2)
    */
    db.query("INSERT INTO list (item) VALUES ($1)", [newItem]);
    res.redirect("/");
});

app.post("/deleteItem", (req, res) => {
    const dItem = req.body.delete;
    db.query("DELETE FROM list WHERE item=($1)", [dItem]);
    db.query("INSERT INTO deletedItems (item) VALUES ($1)", [dItem]);
    res.redirect("/");
});



app.listen(3000, () => {
    console.log("Server running...");
});