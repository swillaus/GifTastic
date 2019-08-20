// create an empty array to contain button options
var buttonOptionsArr = ["toys", "music", "cars","news","beach", "animals"];
var apiKey = "CDx5tDHI18D6iz6dXOX3u0uKX00EsaSc"

// function to display buttons on initial load
function renderButtons() {

    // Ensure there are no repeats
    $("#buttonOptions").empty();

    // Looping through the array of movies
    for (var i = 0; i < buttonOptionsArr.length; i++) {

        // Dynamicaly generating buttons for each GIF in the array.
        var a = $("<button>");
        // Adding a class
        a.addClass("ButtonSection btn btn-info");
        // Adding a data-attribute with a value of the GIF at index i
        a.attr("data-name", buttonOptionsArr[i]);
        // Providing the button's text with a value of the GIF at index i
        a.text(buttonOptionsArr[i]);
        // Adding the button to the HTML
        $("#buttonOptions").append(a);
    }

    // implement AJAX function to render GIFs to div section
    $(".ButtonSection").on("click", function () {
        var x = $(this).data("name")
        console.log(x);
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + x + "&api_key="+apiKey+"&limit=10"
        $.ajax({ url: queryURL, method: "GET" })
            .done(function (response) {
                console.log(response)
                for (i = 0; i < response.data.length; i++) {
                    var imagesDiv = $("<div>");
                    var p = $("<p>").text("Rating:" + response.data[i].rating);
                    var GIFimg = $("<img>");
                    GIFimg.attr("src", response.data[i].images.fixed_height.url);
                    imagesDiv.append(GIFimg);
                    imagesDiv.append(p);
                    $("#imagesSection").append(imagesDiv)
                }
            })
    })
}


// SW - Take the value from the search box and place it into the button array and display
$("#searchButton").on("click", function (event) {

    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var selection = $("#gifInput").val().trim();
    // The movie from the textbox is then added to our array
    buttonOptionsArr.push(selection);

    // calling renderButtons which handles the processing of our GIF array
    renderButtons();

    console.log(selection)

    console.log(buttonOptionsArr)

    
});


// Calling the renderButtons function at least once to display the initial list of GIFs
renderButtons();

//   Render GIF images based on button click


