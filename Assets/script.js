// var key = "e88f3ebac0aabaa0bea9e67e3203ea958"

// var queryURL = "http://api.openweathermap.org/data/2.5/forecast?&appid=88f3ebac0aabaa0bea9e67e3203ea958&q=

//Initial Cities
var cityList = ["Dallas", "New York", "California"]

//Adding Cities on the side
function addCities() {

    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#cities").empty();

    // Looping through the array of movies
    for (var i = 0; i < cityList.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<row>");
        // Adding a class
        a.addClass("city-btn btn btn-outline-secondary");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-name", cityList[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(cityList[i]);
        // Adding the button to the HTML
        $("#cities").append(a);
    }
}

addCities()

$("#search-button").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var city = $("input").val().trim();
    // The movie from the textbox is then added to our array
    cityList.push(city);

    // calling renderButtons which handles the processing of our movie array
    addCities();
});

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayCity() {

    var city = $(this).attr("data-name");
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?&appid=88f3ebac0aabaa0bea9e67e3203ea958&q=" + city;

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response)

        // // Creating a div to hold the movie
        // var movieDiv = $("<div class='movie'>");

        // // Storing the rating data
        // var rating = response.Rated;

        // // Creating an element to have the rating displayed
        // var pOne = $("<p>").text("Rating: " + rating);

        // // Displaying the rating
        // movieDiv.append(pOne);

        // // Storing the release year
        // var released = response.Released;

        // // Creating an element to hold the release year
        // var pTwo = $("<p>").text("Released: " + released);

        // // Displaying the release year
        // movieDiv.append(pTwo);

        // // Storing the plot
        // var plot = response.Plot;

        // // Creating an element to hold the plot
        // var pThree = $("<p>").text("Plot: " + plot);

        // // Appending the plot
        // movieDiv.append(pThree);

        // // Retrieving the URL for the image
        // var imgURL = response.Poster;

        // // Creating an element to hold the image
        // var image = $("<img>").attr("src", imgURL);

        // // Appending the image
        // movieDiv.append(image);
    });

}

$(document).on("click", ".city-btn", displayCity);
// $(document).on("click", ".movie-btn", displayMovieInfo);