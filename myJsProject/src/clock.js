const clockContainer = document.querySelector(".clockContainer");
const timeNow = clockContainer.querySelector(".timeNow");
const dateNow = clockContainer.querySelector(".dateNow");

function getTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    timeNow.innerText = `${
        hours < 10 ? `0${hours}` : hours
    }:${
        minutes < 10 ? `0${minutes}` : minutes
    }`;
}

function getDate() {
    const now = new Date();
    const week = new Array('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const days = week[now.getDay()];

    dateNow.innerText = `${
        month < 10 ? `0${month}` : month
    }/${
        day < 10 ? `0${day}` : day
    } ${
        days
    }`;

}


function init() {
    getTime();
    getDate();
    setInterval(getTime, 1);
}
init();