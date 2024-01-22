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

app.listen(3000, () => {
    console.log("Server running...");
});

// //add item to the list
// $("#btnEnter").click(function() {
//     const newItem = $("#newItem").val();

//     if(newItem != "") {
//         $("ul").append($("<li></li>").append(newItem).addClass("listItem hoverClass"));

//         $("#newItem").val("");
//     } else {
//         alert("Invalid Input");
//     }
// });

// //if item is clicked we apply the checked class
// $(document).on("click", ".listItem", function() {
//     if($(this).hasClass("checked")) {
//         $(this).removeClass("checked");
//     } else {
//         $(this).addClass("checked");
//     }
// });

// //label section - make it for it to appear when label clicked.
// $(".alertLabel").click(function() {

//     //reference: https://stackoverflow.com/questions/27143063/jquery-how-to-add-class-to-the-child-element
//     //closest: findes the closest parent div to the element.
//     //find: finds the elements that have the class .alertTodo.
//     //addClass: adds the clas hide Items to the element. 

//     if($(this).closest("div").find(".alertTodo").hasClass("hideItems"))
//      {
//         $(this).closest("div").find(".alertTodo").removeClass("hideItems");
//      } else {
//         $(this).closest("div").find(".alertTodo").addClass("hideItems");
//      }

// });


//NOTES: 
// - node.js and express are used to create a server
// - EJS is to create templates
// - EJS we need a folder called public for all static files such as img and styling (CSS)
