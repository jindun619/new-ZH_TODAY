const   nav = document.querySelector(".js-nav"),
    navCon = document.querySelector(".js-navCon"),
    navLeft = nav.querySelector(".js-navLeft"),
    navLeftP = navLeft.querySelector("p"),
    navCenter = nav.querySelector(".js-navCenter"),
    navCenterP = navCenter.querySelector("p"),
    navRight = nav.querySelector(".js-navRight"),
    navRightP = navRight.querySelector("p");
const dateBox = document.querySelector(".js-dateBox");
const langBtn = document.querySelector(".js-langBtn");
const calBtn = document.querySelector(".js-calBtn");
const cal = document.querySelector(".js-cal"),
    calTable = cal.querySelector("table"),
    calTbody = cal.querySelector("tbody");

function init () {
    paintWords();

    navLeft.addEventListener("click", navLeftHandler);
    navCenter.addEventListener("click", navCenterHandler);
    navRight.addEventListener("click", navRightHandler);

    langBtn.addEventListener("click", langHandler);
    // calBtn.addEventListener("click", calHandler);
}

init();