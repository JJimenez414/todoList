//if item is clicked we apply the checked class
$(document).on("click", ".listItem", function() {
    if($(this).hasClass("checked")) {
        $(this).removeClass("checked");
    } else {
        $(this).addClass("checked");
    }
});

//label section - make it for it to appear when label clicked.
$(".alertLabel").click(function() {

    //reference: https://stackove rflow.com/questions/27143063/jquery-how-to-add-class-to-the-child-element
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

//reference
//https://www.youtube.com/watch?v=Z-PmnpCTZ64
$(".checkbox").change(function() {
    let delItem = $(this).val();

    $.ajax({
        type: "POST",
        url: "/deleteItem",
        contentType: "application/json",
        data: JSON.stringify({items: delItem}),
        success: function(res) {
            $("#itemsContainer").html(res);
            console.log("hi.");
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


// NOTES: 
// - node.js and express are used to create a server
// - EJS is to create templates
// - EJS we need a folder called public for all static files such as img and styling (CSS)

