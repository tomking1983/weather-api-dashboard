
$(document).ready(function () {

    // add date and time using moment.js
    let now = moment();
    let date = now.format('dddd, MMMM Do YYYY');
    let time = now.format('h:mm:ss a');
    $('#date').text(date);
    $('#time').text(time);

    // update time every second
    setInterval(function () {
        let now = moment();
        let time = now.format('h:mm:ss a');
        $('#time').text(time);
    }, 1000);


  let city = 'London';
  let country = 'GB';

  // Get the weather data from the API
  $.ajax({
    url: 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=9f052728837492dee784a6ea4d36509f'
  }).done(function (response) {
    let lat = response[0].lat;
    let lon = response[0].lon;
    console.log(lat);
    console.log(lon);

    $.ajax({
      url: 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=metric&appid=9f052728837492dee784a6ea4d36509f'
    }).then(function (response) {
      console.log(response.list[0].main.temp);
      console.log(response.list[0].main.feels_like);
      console.log(response.list[0].main.humidity);
      console.log(response.list[0].wind.speed);
      console.log(response.list[0].weather[0].description);
      console.log(response.list[0].weather[0].icon);

      let temp = response.list[0].main.temp;
      let feelsLike = response.list[0].main.feels_like;
      let humidity = response.list[0].main.humidity;
      let windSpeed = response.list[0].wind.speed;
      let description = response.list[0].weather[0].description;
      let icon = response.  list[0].weather[0].icon;

      // let temp = response.current.temp;
      // let feelsLike = response.current.feels_like;
      // let humidity = response.current.humidity;
      // let windSpeed = response.current.wind_speed;
      // let description = response.current.weather[0].description;
      // let icon = response.current.weather[0].icon;

      // put the data in the html
      $('#temp').text("Temperature: " + temp);
      $('#temp').append('&#8451;');
      $('#feels-like').text(feelsLike);
      $('#humidity').text("Humidity: " + humidity + " RH");
      $('#wind-speed').text("Wind Speed: " + windSpeed + " mph");
      $('#city-cond').text("Current Conditions: " + description);

    //   add icon to icon div
        $('#icon').html('<img src="http://openweathermap.org/img/w/' + icon + '.png" alt="weather icon">');
    // degrees celcius
    

        // city name
        $('#city-name').text(city + ', ' + country);

      
    }
    );
   

  });



});


