const API_KEY = "fb507496f5a8406b96c353f595cb7fb9";

//latitude & longtitude of Cangzhou city
const coords = {
    lat : "38.3043",
    lon : "116.8512"
} 

function getWeather (lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        console.log(json);
    })
}

function weatherInit () {
    getWeather(coords.lat, coords.lon);
}

weatherInit();