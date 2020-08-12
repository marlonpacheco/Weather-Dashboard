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
    var coordURL = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=88f3ebac0aabaa0bea9e67e3203ea958&q=" + city;
    $("#forecast").empty()
    // $("#currentCity").empty();
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: coordURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        // var showCity = $("<div class='row col-12' id='City'>");
        var showCity = response.name;
        var icon = "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png";
        var showIcon = $("<img>").attr("src", icon);
        console.log("City: " + response.name);
        console.log("icon: " + response.weather[0].icon)
        $("#city").text(showCity +" " + todayEl);
        $("#city").append(showIcon)


        var lonlat = "&lat=" + response.coord.lat + "&lon=" + response.coord.lon
        console.log(lonlat)
        var queryURL = "http://api.openweathermap.org/data/2.5/onecall?&units=imperial&appid=88f3ebac0aabaa0bea9e67e3203ea958&q=" + lonlat;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        $("#temp").text("Temperature: " + response.current.feels_like) + "F";
        $("#humid").text("Humidity: " + response.current.humidity + "%");
        $("#wind").text("Wind Speed: " + response.current.wind_speed + " mph");
        $("#uvIndex").text("UV Index: " + response.current.uvi);


        function addForecast() {

            var days = response.daily
            // Looping through the array of cities
            for (var i = 1; i < 6; i++) {
                console.log(response.daily.length)
                var a = $("<div>");
                // Adding a data-attribute with a value of the city at index i
                var unix = response.daily[i].dt
                var dates = moment.unix(unix).format('MM/DD/YYYY')
                var icon = "https://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + ".png";
                var showIcon = $("<img>").attr("src", icon);
                var temp = response.daily[i].feels_like.day
                var fTemp = "Temp: " + temp + " F"
                var humid = response.daily[i].humidity
                var fHumid = "Humidity: " + humid +"%" 
                console.log(dates)
                a.addClass("col-2");
                // Providing the button's text with a value of the city at index i
                a.text(dates);
                a.append(showIcon);
                a.append(fTemp);
                a.append(" " +fHumid);
                // Adding the button to the HTML
                $("#forecast").append(a);
            }
        }
        addForecast()
        })

    });
};

$(document).on("click", ".city-btn", getCity);