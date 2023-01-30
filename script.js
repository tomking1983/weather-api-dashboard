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