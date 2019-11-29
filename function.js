/*         SET VARIABLES          */
let dateVar = new Date();           //this is a kind of SESSION for set_date

const LANG_LS = "lang";
const KOR_LANG = "kor",
    CNA_LANG = "cna";

const NOTSHOWING_CN = "notShowing";


/* CHECK IF IS's WECHAT BROWSER */
function isweixin () {
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
		return true;
 	} else {
		return false;
	}
}

function getLang () {
    const gotLang = localStorage.getItem(LANG_LS);

    if (gotLang === null) {
        //if localStorage[lang] is empty, set Korean
        localStorage.setItem(LANG_LS, KOR_LANG);
        return KOR_LANG;
    } else {
        return gotLang;
    }
}

function idGetExt (id) {
    return food[id].img_ext;
}

function getFirstDay (date) {
    const gotDate = new Date(date);
    let tmpDate = gotDate; 
    tmpDate.setDate(1);

    return tmpDate.getDay();
}

function getDaysNum (date) {
    const gotDate = new Date(date);
    let tmpDate = gotDate;
    let tmpMonth = tmpDate.getMonth() + 1;
    tmpDate.setMonth(tmpMonth);
    tmpDate.setDate(0);
    return tmpDate.getDate();
}

/*    ,, INTO ,,       */
function dateIntoYMD (date) {
    const Year = date.getFullYear(),
        Month = date.getMonth() + 1,
        Date = date.getDate(),
        YMD = `${Year}-${Month < 10 ? `0${Month}` : Month}-${Date < 10 ? `0${Date}` : Date}`;
    return YMD;
}

function YMDIntoDateVar (YMD) {
    dateVar.setFullYear(YMD.substr(0,4));
    dateVar.setMonth(YMD.substr(5,2) - 1);
    dateVar.setDate(YMD.substr(8,2));
}

function idIntoStr (id, lang) {
    if (lang == KOR_LANG) {
        return food[id].kor_name;
    } else if (lang == CNA_LANG) {
        return food[id].cna_name;
    }
}

function menuIntoBldObj (menuObj, paraBld) {
    let bldObj = menuObj.filter(function(value){  //this bld(breakfast/lunch/dinner)'s object
        return value.bld === paraBld;
    });
    
    let tmpObj = [];
    for (const [key, value] of Object.entries(bldObj[0])) {
        if (key !== "bld" && key !== "date" && key !== "id") {
            if (value !== "0") {
                tmpObj[key] = value;
            }
        }
    }
    
     return tmpObj;
}

/*     EVENT HANDLER      */
//when clicks left side of the navigator
function navLeftHandler () {
    dateVar.setDate(dateVar.getDate() - 1);
    const YMD = dateIntoYMD(dateVar);
    window.location.href = `http://zhenhuatoday.com/index.html?date=${YMD}`;  /* 링크 *///
}
//when clicks center of the navigator
function navCenterHandler () {
    dateVar = new Date();
    const YMD = dateIntoYMD(dateVar);
    window.location.href = `http://zhenhuatoday.com/index.html?date=${YMD}`;  /* 링크 */
}
//when clicks the right side of the navigator
function navRightHandler () {
    dateVar.setDate(dateVar.getDate() + 1);
    const YMD = dateIntoYMD(dateVar);
    window.location.href = `http://zhenhuatoday.com/index.html?date=${YMD}`;  /* 링크 */
}
//when clicks the language-convert button
function langHandler () {
    if (getLang() == KOR_LANG) {
        localStorage.setItem(LANG_LS,CNA_LANG);
        window.location.href = "";
    } else if (getLang() == CNA_LANG) {
        localStorage.setItem(LANG_LS,KOR_LANG);
        window.location.href = "";
    }
}
//when clicks the calender button
function calHandler () {
    nav.classList.toggle(NOTSHOWING_CN);
    cal.classList.toggle(NOTSHOWING_CN);
}
//when clicks today_word
function todayWordHandler () {
    const YMD = dateIntoYMD(dateVar);
    //getting today's word
    for (const [key, value] of Object.entries(todayWords)) {
        if (value.date == YMD) {
            theObj = value;
            //notice : only one word for one day!!
        }
    }

    if (getLang() == KOR_LANG) {
        theWord = theObj.kor_word;
    } else if (getLang() == CNA_LANG) {
        theWord = theObj.cna_word;
    }

    todayWord.classList.toggle("notShowing");
    todayWordReal.classList.toggle("notShowing");
    todayWordReal.innerText = theWord;
}

/*          PAINT       */
function paintWords () {
    const gotLang = localStorage.getItem(LANG_LS);
    
    if (gotLang == KOR_LANG) {
        langBtn.innerText = "中";
        navLeftP.innerText = "어제";
        navCenterP.innerText = "오늘";
        navRightP.innerText = "내일";
        todayWord.innerText = "오늘의 한마디";
    } else if(gotLang == CNA_LANG) {
        langBtn.innerText = "한";
        navLeftP.innerText = "昨天";
        navCenterP.innerText = "今天";
        navRightP.innerText = "后天";
        todayWord.innerText = "今日的一句话";
    }
}

function paintBldBox (bld, lang) {
    if (lang == KOR_LANG) {
        if (bld == 0) {
            bld = "아침";
        } else if (bld == 1) {
            bld = "점심";
        } else if (bld == 2) {
            bld = "저녁";
        }
    } else if (lang == CNA_LANG) {
        if (bld == 0) {
            bld = "早餐";
        } else if (bld == 1) {
            bld = "午餐";
        } else if (bld == 2) {
            bld = "晚餐";
        }
    }

    const articleContainer = document.querySelector("#article_container");

    const span = document.createElement("span");
    span.classList.add("bldBox");
    span.innerHTML = bld;

    articleContainer.appendChild(span);
}

function paintArticles (id, lang) {
    const articleContainer = document.querySelector("#article_container");
    //.articles
    const articles = document.createElement("div");
    articles.classList.add("articles");

    //.articles > .textBox
    const a = document.createElement("a"),
        p = document.createElement("p"),
        textBoxDiv = document.createElement("div");
    a.innerHTML = idIntoStr(id, lang);
    textBoxDiv.classList.add("textBox");
    p.appendChild(a);
    textBoxDiv.appendChild(p);

    
    //.articles > .imgBox
    const imgName = `/food_img/${id}.${idGetExt(id)}`;    /* 경로 */
    const img = document.createElement("img"),
        imgBoxDiv = document.createElement("div");
        img.src = imgName;
        imgBoxDiv.classList.add("imgBox");
        imgBoxDiv.appendChild(img);
        
        articles.appendChild(textBoxDiv);
        articles.appendChild(imgBoxDiv);
        
        articleContainer.appendChild(articles);
}

function paintMeal (menuObj, bld, lang) {         //bld: breakfast=0;lunch=1;dinner=2
    bldObj = menuIntoBldObj(menuObj, bld);

    paintBldBox(bld, lang);

    for (const [key, value] of Object.entries(bldObj)) {
        paintArticles(value, lang);
    }
}

function getMenuByDate (paraDate) {
    const menuObj = foodDate.filter(function(value){
        YMDIntoDateVar(paraDate);
        return value.date === paraDate;
    });
    return menuObj;
}

function paintCalTr (week) {
    const tr = document.createElement("tr");
    tr.id = `week${week}`;
    calTbody.appendChild(tr);
}

function paintCalTd (week, date) {
    const td = document.createElement("td");
    const tr = document.querySelector(`#week${week}`);

    if (date < 10) {
        date = `0${date}`;
    }

    td.id = `date${date}`;
    tr.appendChild(td);
}

function paintCal (date) {
    const firstDay = getFirstDay(date);              //0->Sun; 1->Mon;...;6->Sat
    const daysNum = getDaysNum(date);                //get date numbers of the month

    var dateWriter = 1;
    var weekWriter = 1;
    
    while (weekWriter <= 6) {
        paintCalTr(weekWriter);
        var sevenWriter = 1;
        while (sevenWriter <= 7) {
            paintCalTd(weekWriter, dateWriter);
            sevenWriter++;
            dateWriter++;
        }
        weekWriter++;
    }
}

function painter (date) {
    const menuObj = getMenuByDate(date);

    //paint dateBox
    dateBox.innerHTML = date;

    //paint (Breakfast)/(Lunch)/(Dinner)        works only when !empty
    menuObj.forEach(function(value){
        paintMeal(menuObj, value.bld, getLang());
    })
    
    //paint calendar
    paintCal("2019-11-15");
}
