//reference
//https://www.youtube.com/watch?v=Z-PmnpCTZ64
$("body").on("change", "#checkbox", function() {

    let delItem = $(this).val();

    $.ajax({
        type: "POST",
        url: "/deleteItem",
        contentType: "application/json",
        data: JSON.stringify({items: delItem}),
        success: function(res) {
            $("#checkboxesContainer").html($(res).find("#checkboxesContainer").html());
        }
    })
        .done((data) => {
            console.log("Data: " + delItem);
        })
        .fail((err) => {
            console.error(err);
        })
        .always(() => {
            console.log("always returned");
        });

});

$("body").on("click", "#btnEnter", function(event){
    event.preventDefault()
    let newItem = $("#newItem").val();
    console.log("getting called twice");
    $("#newItem").val("");
    
    $.ajax({
        type: "POST",
        url: "/newItem",
        async: true,
        contentType: "application/json",
        data: JSON.stringify({newItem: newItem}),
        success: function(res){
            console.log("Response");
            $("#checkboxesContainer").html($(res).find("#checkboxesContainer").html());
        }
    })
        .done((data) => {
            console.log("Data: " + newItem);
        })
        .fail((err) => {
            console.error(err);
        })
        .always(() => {
            console.log("always returned");
        });
});

$("body").on("click", "#btnNotes", function(){
    let value = $("#notes").val();

    $.ajax({
        type:"POST",
        url: "/note",
        contentType: "application/json",
        data: JSON.stringify({note: value}),
        success: function(res) {
            console.log("Response");
        }
    })
        .done((data) => {
            console.log("Done");
        })
        .fail((err) => {
            console.log(err);
        })
        .always(() => {
            console.log("always return")
        });
});

$("body").on("click", ".label", function() {
    let value = $(this).text().trim();
    console.log(value);

    $.ajax({
        type: "POST",
        url: "/selectNote",
        contentType: "application/json",
        data: JSON.stringify({item: value}),
        success: function(res) {
            console.log("RESPONSE NOTE: " + res.response);
            $("#notes").html(res.response);
        }
    })
        .done((data) => {
            console.log("Done");
        })
        .fail((err) => {
            console.log(err);
        })
        .always(() => {
            console.log("always return")
        });

});


//if item is clicked we apply the checked class
$(".listItem").click( function() {
    if($(this).hasClass("checked")) {
        $(this).removeClass("checked");
    } else {
        $(this).addClass("checked");
    }
});

//label section - make it for it to appear when label clicked.
$(".alertLabel").click(function() {

    //reference: https://stackoverflow.com/questions/27143063/jquery-how-to-add-class-to-the-child-element
    //closest: findes the closest parent div to the element.
    //find: finds the elements that have the class .alertTodo.
    //addClass: adds the clas hide Items to the element.

    if($(this).closest("div").find(".alertTodo").hasClass("hideItems"))
     {
        $(this).closest("div").find(".alertTodo").removeClass("hideItems");
     } else {
        $(this).closest("div").find(".alertTodo").addClass("hideItems");
     }

});

// NOTES: 
// - node.js and express are used to create a server
// - EJS is to create templates
// - EJS we need a folder called public for all static files such as img and styling (CSS)

