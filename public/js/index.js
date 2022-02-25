// +2
// contact-feedback form
// sabka half-page content.
// c/f hover-on every outside click effect

const location_var = document.getElementById('location');
const searchButton = document.getElementById('searchButton');
const tempc = document.getElementById('temp-c');
const tempf = document.getElementById('temp-f');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const API_KEY = 'ebfc2ba0b586169cf4f1b6142aaffeb8';
let unit = 'metric';
let searchedCity;
let wunit = 'm/s';
let op = 'WND';
// let x = 10;
// let y = 10;
// let z = 10;

// Main Menu->Click Event
let menu = document.getElementsByClassName('nav-link');
menu = Array.from(menu);
menu.forEach((item) => {
    item.addEventListener("click", () => {
        menu.forEach((item) => {
            item.classList.remove('active');
        });
        item.classList.add("active");
    })
})

// <!-- days-container->clicked; 
// all-remove large-width, add vis-hide;
// clicked-add larger-width, remove vis-hide.
// -->
// Days Container->Click Event
let dayscontainer = document.getElementsByClassName('days-container ');
let daypartly;

dayscontainer = Array.from(dayscontainer);
dayscontainer.forEach((item) => {
    item.addEventListener("click", () => {

        dayscontainer.forEach((item) => {

            if (item.classList.contains('large-width')) {
                item.classList.remove('large-width');
                item.classList.add('days-small-container');

                daypartly = item.querySelector('.day-partly');
                daypartly.classList.add('vis-hide');

            }
        });
        item.classList.add("large-width");
        daypartly = item.querySelector('.day-partly');
        daypartly.classList.remove('vis-hide');
    })
})

// F Button->Click Event
tempf.addEventListener('click', () => {
    tempc.classList.remove('highlight');
    tempf.classList.add('highlight');
    unit = 'imperial';
    wunit = 'miles/hr'
    searchButton.click();
})

// C Button->Click Event
tempc.addEventListener('click', () => {
    tempf.classList.remove('highlight');
    tempc.classList.add('highlight');
    unit = 'metric';
    wunit = 'm/s'
    searchButton.click();
})

// Input Box->Enter Event
location_var.addEventListener('keyup', () => {
    event.preventDefault();
    if (event.keyCode == 13) {
        searchButton.click();
    }
})

// Search Button->Click Event
searchButton.addEventListener('click', () => {
    searchedCity = (document.getElementById('location')).value;
    weatherData(searchedCity, API_KEY, unit, wunit);
})

// Calling Fetch Weather API 
function weatherData(searchedCity, API_KEY, unit, wunit) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${API_KEY}&units=${unit}`)
        .then(response => response.json())
        .then(data => {
            getWeatherData(data, wunit);
            //     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${API_KEY}&units=${unit}`)
            // .then(response => response.json())
            // .then(data => {
            //     console.log(data);
        })
        .catch(() => {
            alert('No results found.\nTry searching for location.');
            document.getElementById('location').value = '';
            location.focus();
        });
}
// https://tile.openweathermap.org/map/wind/5/30/30.png?appid=ebfc2ba0b586169cf4f1b6142aaffeb8
// Display Weather Data
function getWeatherData(data, wunit) {
    document.getElementById('place').innerHTML = `<strong> ${data.name}, ${data.sys.country} </strong>`;

    document.getElementById('main-icon').innerHTML = `<img src="/images/icons/${data.weather[0].icon}.svg" class='icon-size' alt="">`;

    document.getElementById('temp').innerHTML = `<h1> ${Math.round(data.main.temp)}&deg; </h1>`;

    document.getElementById('description').innerHTML = `<strong> ${data.weather[0].main} </strong>`;

    document.getElementById('feel-like').innerHTML = `FEELS LIKE ${Math.round(data.main.feels_like)}&deg;</h1>`;

    document.getElementsByClassName('max/min')[0].innerHTML = `The maximum will be ${Math.round(data.main.temp_max)}&deg;. The minimum will be ${Math.round(data.main.temp_min)}&deg;`;

    let wind = Math.round((data.wind.speed) * (18 / 5));
    document.getElementById('wind').innerText = `${wind} ${wunit}`;

    document.getElementById('humidity').innerText = `${data.main.humidity}%`;

    let vis = (data.visibility) / 1000;
    document.getElementById('visibility').innerText = `${vis} km`;

    document.getElementById('pressure').innerText = `${data.main.pressure} mb`;

    const time = new Date();
    const localTime = time.getTime();
    const localOffset = time.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const timeZone = utc + (1000 * +(data.timezone))
    const newdate = new Date(timeZone)

    const day = newdate.getDay();
    const date = newdate.getDate();
    const month = newdate.getMonth();
    const hour = newdate.getHours();
    let minutes = newdate.getMinutes();

    let hours = hour >= 13 ? hour % 12 : hour;
    hours = hours <= 9 ? '0' + hours : hours;

    minutes = minutes <= 9 ? '0' + minutes : minutes;
    const ampm = hour >= 12 ? 'PM' : 'AM';

    document.getElementById('timeW').innerHTML = hours + ':' + minutes + ' ' + ampm;

    document.getElementById('dateW').innerHTML = days[day] + ', ' + date + ' ' + months[month];
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,minutely&appid=${API_KEY}&units=${unit}`)
        .then(response => response.json())
        .then(result => {
            document.getElementById('dew-point').innerHTML = `${Math.round(result.current.dew_point)}&deg;`;
            getDailyWeatherData(result, day);

            fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API_KEY}&units=${unit}`)
                .then(response => response.json())
                .then(response => {
                    getAirqulty(response);
                })

        })
}

// Display Daily Weather Data
function getDailyWeatherData(data, day) {
    let dayscontainer = document.getElementsByClassName('days-container ');

    dayscontainer = Array.from(dayscontainer);
    dayscontainer.forEach((item, index) => {

        item.querySelector('.today-day').innerHTML = `<strong> ${days[day]}</strong>`;
        item.querySelector('.today-icon').innerHTML = `</strong> <img src="/images/icons/${data.daily[index].weather[0].icon}.svg" alt=""> </strong>`;
        item.querySelector('.today-temp-max').innerHTML = `<strong> ${Math.round(data.daily[index].temp.max)}&deg; </strong>`;
        item.querySelector('.today-temp-min').innerHTML = `<br><strong> ${Math.round(data.daily[index].temp.min)}&deg; </strong>`;
        item.querySelector('.des').innerText = `${data.daily[index].weather[0].description}`;
        item.querySelector('.daily-pressure').innerText = `${data.daily[index].pressure} mb`;
        ++day;
        if (day == 7)
            day = 0;
    })

    let todayDate = new Date();
    todayDate = todayDate.toISOString();
    var url = 'https://newsapi.org/v2/everything?' +
        'q=weather AND India&' +
        'from=todayDate&' +
        'sortBy=relevancy&' +
        'apiKey=5ffb1c9fa153496795d36fc58a64d7ba';
    
    var req = new Request(url);
    // fetch(req).then(response => response.json())
    //     .then(data => {
    //         displayNews(data);})





}

// Display Air Quality
function getAirqulty(data) {
    let index = data.list[0].main.aqi;
    switch (index) {
        case 1:
            document.getElementById('airq').innerHTML = `${index} Good`;
            break;
        case 2:
            document.getElementById('airq').innerHTML = `${index} Fair`;
            break;
        case 3:
            document.getElementById('airq').innerHTML = `${index} Moderate`;
            break;
        case 4:
            document.getElementById('airq').innerHTML = `${index} Poor`;
            break;
        default:
            document.getElementById('airq').innerHTML = `${index} Very Poor`;
    }
}




window.onload = () => {
    let todayDate = new Date();
    todayDate = todayDate.toISOString();
    var url = 'https://newsapi.org/v2/everything?' +
        'q=weather AND India&' +
        'from=todayDate&' +
        'sortBy=relevancy&' +
        'apiKey=5ffb1c9fa153496795d36fc58a64d7ba';
    
        // fetch(https://cors-anywhere.herokuapp.com//https://newsapi.org/v2/everything?q=weather%20AND%20India&from=todayDate&sortBy=relevancy&apiKey=5ffb1c9fa153496795d36fc58a64d7ba',{headers:new Headers({"X-Requested-With":"abcdef"})})

//     var req = new Request(url);
//     fetch(req).then(response => response.json())
//         .then(data => {
//             // displayNews(data);
//             console.log(data);
//             let news=data;
//             let newscol = document.getElementsByClassName('news-col');
//     newscol = Array.from(newscol);
//     let i = 0, newscolimage;
//     newscol.forEach((item) => {

//         newscolimage = item.getElementsByClassName('news-container');
//         newscolimage = Array.from(newscolimage);
//         newscolimage[0].innerHTML = `<img src="${news.articles[i].urlToImage}" class='card-img news-image' alt="">`;

//         newslink = item.getElementsByClassName('news-link');
//         newslink = Array.from(newslink);
//         newslink[0].innerHTML = `<a href="${news.articles[i].url}" target="_blank"> Read more</a>`;

//         console.log(news.articles[i].title + ' Before');
//         cardText = item.getElementsByClassName('card-text');
//         cardText = Array.from(cardText);
//         cardText[0].innerHTML = `<h4>${news.articles[i].title}</h4>`;
//         i++;
//     })
//         }).catch((err) => {
//             console.log(err);
//         })
// }

// function displayNews(news) {

//     let newscol = document.getElementsByClassName('news-col');
//     newscol = Array.from(newscol);
//     let i = 0, newscolimage;
//     newscol.forEach((item) => {

//         newscolimage = item.getElementsByClassName('news-container');
//         newscolimage = Array.from(newscolimage);
//         newscolimage[0].innerHTML = `<img src="${news.articles[i].urlToImage}" class='card-img news-image' alt="">`;

//         newslink = item.getElementsByClassName('news-link');
//         newslink = Array.from(newslink);
//         newslink[0].innerHTML = `<a href="${news.articles[i].url}" target="_blank"> Read more</a>`;

//         console.log(news.articles[i].title + ' Before');
//         cardText = item.getElementsByClassName('card-text');
//         cardText = Array.from(cardText);
//         cardText[0].innerHTML = `<h4>${news.articles[i].title}</h4>`;
//     })
}