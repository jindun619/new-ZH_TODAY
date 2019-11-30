const API_KEY = "fb507496f5a8406b96c353f595cb7fb9";

//latitude & longtitude of Cangzhou city
const coords = {
    lat : "38.3043",
    lon : "116.8512"
} 

function paintWeather(obj) {


    const weatherBox = document.querySelector(".js-weatherBox"),
        weather = weatherBox.querySelector(".js-weather"),
        temp = weatherBox.querySelector(".js-temp"),
        sun = weatherBox.querySelector(".js-sun");
    const gotWeather = obj.weather[0].main,
        gotTemp = obj.main.temp,
        gotSunRise = new Date(obj.sys.sunrise*1000),
        gotSunSet = new Date(obj.sys.sunset*1000);

    const sunRiseTime = `${gotSunRise.getHours() < 10 ? `0${gotSunRise.getHours()}` : `${gotSunRise.getHours()}`}:${gotSunRise.getMinutes() < 10 ? `0${gotSunRise.getMinutes()}` : `${gotSunRise.getMinutes()}`}`;
    const sunSetTime = `${gotSunSet.getHours() < 10 ? `0${gotSunSet.getHours()}` : `${gotSunSet.getHours()}`}:${gotSunSet.getMinutes() < 10 ? `0${gotSunSet.getMinutes()}` : `${gotSunSet.getMinutes()}`}`;

    weather.innerHTML = gotWeather;
    temp.innerHTML = `${gotTemp}℃`;
    sun.innerHTML = `${sunRiseTime}~${sunSetTime}`;
}

function getWeather (lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    })
    .then(function(json){
        paintWeather(json);
    })
}

function weatherInit () {
    getWeather(coords.lat, coords.lon);
}

weatherInit();

/////////////////////////////////////////////////////
//                  it's not working on mobile browser ㅜㅜㅜ 