//add item to the list
$("#btnEnter").click(function() {
    const newItem = $("#newItem").val();

    if(newItem != "") {
        $("ul").append($("<li></li>").append(newItem).addClass("listItem"));

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
    console.log("hello world");
});

// $(".listItem").click(function() {
//     if($(this).hasClass("checked")) {
//         $(this).removeClass("checked");
//     } else {
//         $(this).addClass("checked");
//     }
//     console.log("hello world");
// })