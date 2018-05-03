$(function() {
  $(".devburger").on("click", function(event) {
    var id = $(this).data("burgersid");

    // Send the DELETE request.
    $.ajax("/burgers/" + id, {
      type: "DELETE"
    }).then(function() {
      console.log("deleted id ", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $("#addburger").on("submit", function(event) {
    event.preventDefault();

    var newBurger = {
      burger: $("#addburger [name=burger]")
        .val()
        .trim()
    };

    // Send the POST request.
    $.ajax("/burgers", {
      type: "POST",
      data: newBurger
    }).then(function() {
      console.log("added new burger");
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
