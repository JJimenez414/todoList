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
//json parser
var jsonParser = bodyParser.json();
//connecting to db in from pgadmin
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "###",
    password: "###",
    port: 5432
});

db.connect();

let id = 0;

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

async function listOfdItems() {
    const result = await db.query("SELECT item FROM deleteditems ORDER BY id DESC LIMIT 1");
    let arrItems = [];
    result.rows.forEach((items) => {
        arrItems.push(items.item);
    })

    return arrItems;
}

let itemId = 0;
async function getId(item) {
    let thisItem = item;
    const result = await db.query("SELECT id FROM list WHERE item = ($1)", [thisItem]);
    itemId = result.rows[0].id;
}

app.get("/", async (req, res) => {
    //call the function
    const Items = await listOfItems();
    res.render("index.ejs", {items: Items});
});



app.post("/newItem", jsonParser, async(req, res) => {
   /*
   we are rendering index.ejs and we are passing the variable TITLE to it with the information
   gathered by the reques made by item in 
  */  
    const newItem = req.body.newItem;
    /*
        INSERT INTO <table> (column1, column2)
        VALUES (value1, value 2)
    */
    db.query("INSERT INTO list (item) VALUES ($1)", [newItem]);
    await getId(newItem);
    // get id
    console.log("NEW ITEM ID: " + itemId);
    res.redirect("/");
});

app.post("/deleteItem", jsonParser, async (req, res) => {
    let dItem = req.body.items;
    await getId(dItem);
    console.log("Item Id: " + itemId);
    db.query("DELETE FROM notes WHERE id=($1)", [itemId]);
    db.query("DELETE FROM list WHERE item=($1)", [dItem]);
    db.query("INSERT INTO deletedItems (item) VALUES ($1)", [dItem]);
    res.redirect("/");
});

app.get("/deleteInformation", async(req,res) => {
    const list = await listOfItems();
    res.json(list);
})


app.post("/returnItem", async (req,res) => {
    
    let dItem = await listOfdItems();
    db.query("INSERT INTO list (item) VALUES ($1)", [dItem[0]]);
    db.query("DELETE FROM deleteditems WHERE item=($1)", [dItem[0]]);
    ///check this part too
    res.redirect('/');
}); 

app.post("/note", jsonParser, async (req, res) => {
    let note = req.body.note;
    console.log(note);

    const entryExists = await db.query("SELECT note FROM notes WHERE EXISTS (SELECT note FROM notes WHERE id = ($1))", [itemId]);
    //console.log("ENTRY: " + JSON.stringify(entryExists, null, '\t'));

    if (entryExists.rowCount == 0) {
        await db.query("INSERT INTO notes (id, note) VALUES ($1, $2)", [itemId, note]);
    } else {
        await db.query("UPDATE notes SET note = ($1) WHERE id = ($2)", [note, itemId]);
    }
    res.redirect("/");
});

app.post("/selectNote", jsonParser,  async (req,res) => {
    let item = req.body.item;
    await getId(item);

    try {
        const information = await db.query("SELECT note FROM notes WHERE id = ($1)", [itemId])
        console.log("INFO: " + information.rows[0].note);
        console.log("ITEM ID: " + itemId)
        res.send({response : information.rows[0].note});
    } catch (e) {
        console.log("ITEM ID: " + itemId)
        res.send({response: ""})
    }
});



app.listen(3000, () => {
    console.log("Server running...");
});
