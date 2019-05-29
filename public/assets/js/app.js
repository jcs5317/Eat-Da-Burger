$(document).ready(function(){
    $("#burger-form").on("submit", function(event){
        event.preventDefault();
        var newBurger = {
            burger_name: $("#burger-input").val().trim()
        };
        $.post("/burgers", newBurger, function(data){
            console.log("New burger added");
            location.reload();
        });
    });

    $(".devour-button").on("click", function(){
        var id = $(this).data("id");
        var devour = $(this).data("devour");
        if(devour === false || devour === "0" || devour === 0){
            var newState = {
                devoured: true
            };
            $.ajax("/burgers/" + id,{
                type: "PUT",
                data: newState
            }).then(function(){
                console.log("Changed devoured to " + devour);
                location.reload();
            });
        }
        else{
            $.ajax("/burgers/" + id, {
                type: "DELETE"
            }).then(function(){
                console.log("Burger Devoured!");
                location.reload();
            });
        }
    });
});