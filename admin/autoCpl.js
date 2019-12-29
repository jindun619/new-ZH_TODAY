/*
    THIS FILE IS A A JS FUNCTION FOR AUTOCOMPLETE IN input_food.html
*/

// /* TEMPORARY FORMAT OF FOOD VARIABLE */
// var food = {
//     1: {id: "1", img_ext: "jpg", kor_name: "주먹밥", cna_name: "饭团", soup: "0"},
//     2: {id: "2", img_ext: "jpg", kor_name: "계란조림", cna_name: "鸡蛋酱牛肉", soup: "0"},
//     3: {id: "3", img_ext: "jpg", kor_name: "토마토", cna_name: "西红柿", soup: "0"},
//     4: {id: "4", img_ext: "jpg", kor_name: "야채샐러드", cna_name: "鲜蔬沙拉", soup: "0"},
//     5: {id: "5", img_ext: "jpg", kor_name: "계란후라이", cna_name: "哈哈", soup: "0"}
// }


const inputBoxs = document.querySelectorAll(".js-inputBox");


function paintId (gotId, gotName) {
    for (const [key1, value1] of Object.entries(inputBoxs)) {
        name = value1.getAttribute("name");
        if (name == gotName) {
            value1.value = gotId;
            rmSgt();
        }
    }    
}

//finds id value -> paint inde the input box
function sgtClickHandler (event) {
    const eventTarget = event.target, 
        targetValue = event.target.innerText,
        targetId = targetValue.match(/\d+/)[0];     //get numeric values from a string

    for (const [key, value] of Object.entries(eventTarget.classList)) {
        if (value.substr(0, 8) == "js-name-") {
            gotName = value.slice(8);
        }
    }
    
    paintId(targetId, gotName);
}

function paintSgt (target, obj, length) {
    const div = document.createElement("div");
    const targetName = target.getAttribute("name");

    div.addEventListener("click", sgtClickHandler);

    div.classList.add("suggestions");
    div.classList.add("js-suggestions");
    div.classList.add(`js-sgt-${length}`);
    div.classList.add(`js-name-${targetName}`);

    div.innerText = `${obj.id} | ${obj.kor_name}`;
    target.after(div);
}

function rmLeftSgt (length) {
    const sgt = document.querySelectorAll(".js-suggestions");

    for (const [key1, value1] of Object.entries(sgt)) {
        for (const [key2, value2] of Object.entries(value1.classList)) {
            if (value2.substr(0,7) == "js-sgt-" && value2 !== `js-sgt-${length}`) {
                value1.remove();
            }
        }
    }
}

function searchFood (target, targetValue, targetLength) {
    for (const [key, value] of Object.entries(food)) {
        if (value.kor_name.substr(0, targetLength) == targetValue.substr(0, targetLength)) {
            paintSgt(target, value, targetLength);
        }
    }
}

function keydownHandler (event) {
    const target = event.target, 
        targetValue = event.target.value,
        targetLength = event.target.value.length;
        
        searchFood(target, targetValue, targetLength);
        rmLeftSgt(targetLength);
}

function rmSgt () {
    const sgt = document.querySelectorAll(".js-suggestions");

    for (const [key, value] of Object.entries(sgt)) {
        value.remove();
    }
}

function init () {
    for (const [key, value] of Object.entries(inputBoxs)) {
        value.addEventListener("keyup", keydownHandler);    //executes immediately after pressing a key
    }
}

init();