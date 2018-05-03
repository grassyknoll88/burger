$(function() {
  $(".devburger").on("click", function(event) {
    var id = $(this).data("burgerid");
    var newDevour = $(this).data("newDevour");
    newDevourState = {
      devoured: newDevour
    };
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevourState
    }).then(function() {
      location.reload();
    });
  });

  $("#addburger").on("submit", function(event) {
    event.preventDefault();

    var newBurger = {
      burger: $("#burgerInput")
        .val()
        .trim()
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(function() {
      console.log("added new burger");

      location.reload();
    });
  });
});
