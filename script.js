$(document).ready(function () {
  //Pulls the current date
  let dateTime = moment().format("DD/MM/YYYY, h:mm:ss a");
  // update time every second
  setInterval(function () {
    dateTime = moment().format("DD/MM/YYYY, h:mm:ss a");
    $("#date-time").text(dateTime);
  }, 1000);

  //adds days to moment for 5 day forecast
  let day1 = moment().add(1, "days").format("DD/MM/YYYY");
  let day2 = moment().add(2, "days").format("DD/MM/YYYY");
  let day3 = moment().add(3, "days").format("DD/MM/YYYY");
  let day4 = moment().add(4, "days").format("DD/MM/YYYY");
  let day5 = moment().add(5, "days").format("DD/MM/YYYY");

  //global variables
  let city;
  let cities;

  //function to load most recently searched city from local storage if nothing in local storage then default to Oswestry
  function loadMostRecent() {
    let recentCity = localStorage.getItem("mostRecent");
    if (recentCity) {
      city = recentCity;
      search();
    } else {
      city = "Oswestry";
      search();
    }
  }

  loadMostRecent();

  //function to load recently searched cities from local storage
  function loadRecentCities() {
    let recentCities = JSON.parse(localStorage.getItem("cities"));

    if (recentCities) {
      cities = recentCities;
    } else {
      cities = [];
    }
  }

  loadRecentCities();

  //event handler for search city button
  $("#submit").on("click", (e) => {
    e.preventDefault();
    getCity();
    search();
    $("#city-input").val("");
    listCities();
  });

  //function to save searched cities to local storage
  function saveToLocalStorage() {
    localStorage.setItem("mostRecent", city);
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));
  }

  //function to retrieve user inputted city name
  function getCity() {
    city = $("#city-input").val();
    if (city && cities.includes(city) === false) {
      saveToLocalStorage();
      return city;
    } else if (!city) {
      alert("Please enter a valid city/town");
    }
  }

  // searches the API for the chosen city
  function search() {
    let queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=9f052728837492dee784a6ea4d36509f";
    let coords = [];

    $.ajax({
      url: queryURL,
      method: "GET",
    })
      .then(function (response) {
        coords.push(response.coord.lat);
        coords.push(response.coord.lon);
        let cityName = response.name;
        let cityCond = response.weather[0].description.toUpperCase();
        let cityTemp = response.main.temp;
        let cityHum = response.main.humidity;
        let cityWind = response.wind.speed;
        let icon = response.weather[0].icon;
        $("#icon").html(
          `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`
        );
        $("#city-name").html(cityName);
        $("#city-cond").text("Current Conditions: " + cityCond);
        $("#temp").text("Current Temp : " + cityTemp.toFixed(0));
        $("#temp").append("°C");
        $("#humidity").text("Humidity: " + cityHum + "%");
        $("#wind-speed").text("Wind Speed: " + cityWind + "mph");
        $("#date1").text(day1);
        $("#date2").text(day2);
        $("#date3").text(day3);
        $("#date4").text(day4);
        $("#date5").text(day5);

        get5DayWeather(response.coord.lat, response.coord.lon);
      })
      .fail(function () {
        alert("Please enter a valid city/town");
      });

    //Function to get 5-day forecast
    function get5DayWeather(lat, lon) {
      $.ajax({
        url:
          "https://api.openweathermap.org/data/3.0/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&units=metric&appid=9f052728837492dee784a6ea4d36509f",
        method: "GET",
      }).then(function (response) {
        //5 day temp variables
        let day1temp = response.daily[1].temp.max;
        let day2temp = response.daily[2].temp.max;
        let day3temp = response.daily[3].temp.max;
        let day4temp = response.daily[4].temp.max;
        let day5temp = response.daily[5].temp.max;

        $("#temp1").text("Temp:" + " " + day1temp.toFixed(0));
        $("#temp1").append("°C");
        $("#temp2").text("Temp:" + " " + day2temp.toFixed(0));
        $("#temp2").append("°C");
        $("#temp3").text("Temp:" + " " + day3temp.toFixed(0));
        $("#temp3").append("°C");
        $("#temp4").text("Temp:" + " " + day4temp.toFixed(0));
        $("#temp4").append("°C");
        $("#temp5").text("Temp:" + " " + day5temp.toFixed(0));
        $("#temp5").append("°C");

        //5 day humidity variables
        let day1hum = response.daily[1].humidity;
        let day2hum = response.daily[2].humidity;
        let day3hum = response.daily[3].humidity;
        let day4hum = response.daily[4].humidity;
        let day5hum = response.daily[5].humidity;

        $("#hum1").text("Hum:" + " " + day1hum + "%");
        $("#hum2").text("Hum:" + " " + day2hum + "%");
        $("#hum3").text("Hum:" + " " + day3hum + "%");
        $("#hum4").text("Hum:" + " " + day4hum + "%");
        $("#hum5").text("Hum:" + " " + day5hum + "%");

        //5 day icons variables
        let icon1 = response.daily[1].weather[0].icon;
        let icon2 = response.daily[2].weather[0].icon;
        let icon3 = response.daily[3].weather[0].icon;
        let icon4 = response.daily[4].weather[0].icon;
        let icon5 = response.daily[5].weather[0].icon;

        $("#icon1").html(
          `<img src="http://openweathermap.org/img/wn/${icon1}@2x.png">`
        );
        $("#icon2").html(
          `<img src="http://openweathermap.org/img/wn/${icon2}@2x.png">`
        );
        $("#icon3").html(
          `<img src="http://openweathermap.org/img/wn/${icon3}@2x.png">`
        );
        $("#icon4").html(
          `<img src="http://openweathermap.org/img/wn/${icon4}@2x.png">`
        );
        $("#icon5").html(
          `<img src="http://openweathermap.org/img/wn/${icon5}@2x.png">`
        );
      });
    }
  }

  //function to add recently searched cities to page
  function listCities() {
    $("#cityList").text("");
    cities.forEach((city) => {
      $("#cityList").prepend("<tr><td>" + city + "</td></tr>");
    });
  }

  listCities();
  //event handler for recently searched cities in table
  $(document).on("click", "td", (e) => {
    e.preventDefault();
    let listedCity = $(e.target).text();
    city = listedCity;
    search();
  });
  //event handler for clear button
  $("#clr-btn").click(() => {
    localStorage.removeItem("cities");
    loadRecentCities();
    listCities();
    location.reload();
  });

  // When clear button has been clicked load weather data for oswestry
  if (cities.length === 0) {
    city = "Oswestry";
    search();
  }

  // change the background image of #weather based on the current time
  let time = new Date().getHours();
  if (time >= 6 && time < 18) {
    $("#weather").css("background-image", "url(assets/img/day.jpg)");
    $("body").css("background-image", "url(assets/img/bg-day.jpg)");

  }
  if (time >= 18 || time < 6) {
    $("#weather").css("background-image", "url(assets/images/night.jpg)");
    $("body").css("background-image", "url(assets/img/bg-night.jpg)");

  }
  // if daytime change color of #date-time, #city-name, #city-cond, #temp, #humidity, #wind-speed to white
  if (time >= 18 || time < 6) {
    $("#date-time").css("color", "white");
    $("#city-name").css("color", "white");
    $("#city-cond").css("color", "white");
    $("#temp").css("color", "white");
    $("#humidity").css("color", "white");
    $("#wind-speed").css("color", "white");
    $('#body').css('background-image', 'url(assets/images/bg-night.jpg)');
  }

  // change text in td to uppercase
  $("td").css("text-transform", "uppercase");

});
