import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
    console.log("hello");
})

// app.get("/newItem", (req, res) => {
//     console.log("new tab");
// });

app.post("/newItem", (req, res) => {
    console.log(req.body);
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

