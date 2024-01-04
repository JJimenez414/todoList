//add item to the list
$("#btnEnter").click(function() {
    const newItem = $("#newItem").val();

    if(newItem != "") {
        $("ul").append($("<li></li>").append(newItem).addClass("listItem hoverClass"));

        $("#newItem").val("");
    } else {
        alert("Invalid Input");
    }
});

//if item is clicked we apply the checked class
$(document).on("click", ".listItem", function() {
    if($(this).hasClass("checked")) {
        $(this).removeClass("checked");
    } else {
        $(this).addClass("checked");
    }
});

//label section - make it for it to appear when label clicked.
$(".alertSection").click(function() {
    if(!$(this).hasClass(".showItems")) {
        $(this).addClass(".showItems");
        console.log("hello world");
    }
});

