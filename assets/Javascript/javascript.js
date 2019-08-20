// create an empty array to contain button options
var buttonOptionsArr = ["toys", "music"];


// on click of search button, take text and create a button within arrary for it 
function renderButtons() {

    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttonOptions").empty();

    // Looping through the array of movies
    for (var i = 0; i < buttonOptionsArr.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("ButtonSection");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-name", buttonOptionsArr[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(buttonOptionsArr[i]);
        // Adding the button to the HTML
        $("#buttonOptions").append(a);

        
    }
}


// SW - Take the value from the search box and place it into the button array and display
$("#searchButton").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var selection = $("#gifInput").val().trim();
    // The movie from the textbox is then added to our array
    buttonOptionsArr.push(selection);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();

    console.log(selection)

    console.log(buttonOptionsArr)
});


// Calling the renderButtons function at least once to display the initial list of movies
renderButtons();

//   Render GIF images based on button click

$(".buttonSection").on("click", function () {
    var x = $(this).data("name")
    console.log(x);
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=CDx5tDHI18D6iz6dXOX3u0uKX00EsaSc&limit=10"
    $.ajax({ url: queryURL, method: "GET" })
        .done(function (response) {
            console.log(response)
            for (i = 0; i < response.data.length; i++) {
                var imagesDiv = $("<div>");
                var p = $("<p>").text("Rating:"+response.data[i].rating);
                var GIFimg = $("<img>");
                GIFimg.attr("src",response.data[i].images.fixed_height.url);
                imagesDiv.append(p);
                imagesDiv.append(GIFimg);
                $("#imagesSection").append(imagesDiv)
        }
        })
})
