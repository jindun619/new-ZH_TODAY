const clock = document.querySelector(".js-clock");

function getTime () {
    const currentTime = new Date();
    const hours = currentTime.getHours(),
        minutes = currentTime.getMinutes(),
        seconds = currentTime.getSeconds();
        
    clock.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function clockInit () {
    getTime();
    setInterval(getTime, 1000);
}

clockInit();