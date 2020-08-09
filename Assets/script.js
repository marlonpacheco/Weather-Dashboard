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
      a.addClass("city btn btn-outline-secondary");
      // Adding a data-attribute with a value of the movie at index i
      a.attr("data-name", cityList[i]);
      // Providing the button's text with a value of the movie at index i
      a.text(cityList[i]);
      // Adding the button to the HTML
      $("#cities").append(a);
    }
  }

  addCities()