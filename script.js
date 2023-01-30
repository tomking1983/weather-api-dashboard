$(document).ready(function () {

    // use moment to show current date and time
    let currentDayTime = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');

    // add days to the current day
    let day1 = moment().add(1, 'days').format('dddd');
    let day2 = moment().add(2, 'days').format('dddd');
    let day3 = moment().add(3, 'days').format('dddd');
    let day4 = moment().add(4, 'days').format('dddd');
    let day5 = moment().add(5, 'days').format('dddd');

    // set global variables
    let city;
    let cityList;

    // function that loads most recent city from local storage
    function loadRecentCity() {
        let lastSearch = localStorage.getItem('mostRecent');
        if (lastSearch) {
            city = lastSearch;
            search();
        } else {
            city = 'London';
            search();
        }
    }

    loadRecentCity();

    // function that loads recently searched cities from local storage
    function loadRecentCityList() {
        let recentCityList = JSON.parse(localStorage.getitem('cityList'));
        if (recentCityList) {
            cityList = recentCityList;
        } else {
            cityList = [];
        }
    }

    loadRecentCityList();

    // event handler for search button
    $('#submit').on('click', function (event) => {
        event.preventDefault();
        getCity();
        search();
        $('#city-input').val('');
        listCityList();
    });

    // function save searched cityList to local storage
    function saveToLocalStorage() {
        localStorage.setItem('mostRecent', city);
        cityList.push(city);
        localStorage.setItem('cityList', JSON.stringify(cityList));
    }

    // function that gets city from input field
    function getCity() {
        city = $('#city-input').val();
        if (city && cityList.includes(city) === false) {
            saveToLocalStorage();
            return city;
        } else if (!city) {
            alert('Please enter a city');
        }
    }

    // search API for city
    function search() {
        let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=7fb4c3a331d8f5c01c349dc0e1c06add';
        let coords = [];

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            coords.push(response.coord.lat);
            coords.push(response.coord.lon);
            let cityName = response.name;
            let cityCond = response.weather[0].description;
            let cityTemp = response.main.temp;
            let cityHum = response.main.humidity;
            let cityWind = response.wind.speed;
            let icon = response.weather[0].icon;
            $('#icon').html('<img src='http://openweathermap.org/img/wn/${icon}.png'>');
            $(#city-name).html(cityName + " " + "(" + currentDayTime + ")");
            $("#city-cond").text("Current Conditions: " + cityCond);
      $("#temp").text("Current Temp (F): " + cityTemp.toFixed(1));
      $("#humidity").text("Humidity: " + cityHum + "%");
      $("#wind-speed").text("Wind Speed: " + cityWind + "mph");
      $("#date1").text(day1);
      $("#date2").text(day2);
      $("#date3").text(day3);
      $("#date4").text(day4);
      $("#date5").text(day5);

      getUV(response.coord.lat, response.coord.lon);
    }).fail(function (){
      alert("Data not available")
    });
    }

    