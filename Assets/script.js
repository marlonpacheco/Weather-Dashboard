var todayEl = moment().format('MM/DD/YYYY')

//Initial Cities
var cityList = ["Dallas", "New York", "California"]

//Adding Cities on the side
function addCities() {

    // empties previously added cities
    $("#cities").empty();

    // Looping through the array of cities
    for (var i = 0; i < cityList.length; i++) {

        // Then dynamicaly generating buttons for each city in the array.
        var a = $("<row>");
        // Adding a class
        a.addClass("city-btn btn btn-outline-secondary");
        // Adding a data-attribute with a value of the city at index i
        a.attr("data-name", cityList[i]);
        // Providing the button's text with a value of the city at index i
        a.text(cityList[i]);
        // Adding the button to the HTML
        $("#cities").append(a);
    }
}

addCities()

$("#search-button").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    event.preventDefault();
    // This line will grab the text from the input box
    var city = $("input").val().trim();
    // The City from the textbox is then added to our array
    cityList.push(city);
    // calling renderButtons which handles the processing of our Cities array
    addCities();
});

//function to get weather data from openweather and then display
var getCity = function () {
    var city = $(this).attr("data-name");
    var coordURL = "http://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=88f3ebac0aabaa0bea9e67e3203ea958&q=" + city;
    $("#currentCity").empty();
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: coordURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var showCity = $("<div class='row col-12' id='City'>");
        var getCity = response.name;
        console.log("City: " + response.name);
        console.log("icon: " + response.weather[0].icon)
        // var displayCity = $("<p>").text(getCity);
        showCity.text($(getCity));
        currentCity.append(showCity);


        var lonlat = "&lat=" + response.coord.lat + "&lon=" + response.coord.lon
        console.log(lonlat)
        var queryURL = "http://api.openweathermap.org/data/2.5/onecall?&units=imperial&appid=88f3ebac0aabaa0bea9e67e3203ea958&q=" + lonlat;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response.current);

        })

    });
};

$(document).on("click", ".city-btn", getCity);