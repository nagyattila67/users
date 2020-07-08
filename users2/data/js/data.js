let pack = new Object;
let along = 1;
// along = 1 : ne töltse be a felhasználókhoz a set/del gombokat
// along = 0 : töltse be
let button = String();

getData = function (url) {
    //szervertől lekéri az adatokat
    fetchInit = {
        method: "GET",
        headers: new Headers(),
        mode: "cors",
        cache: "no-cache"
    }

    return fetch(url, fetchInit).then(data => data.json());

    //pack = pack.then(data => data = data.json());
    //pack.then(data =>{pack = data;loadData();});
    //pack.catch(err => {
    // console.log("Nincs kapcsolat a szerverrel.");    
    //});
}

getData("http://localhost:3000/users").then(data => { pack = data; loadData() })
    .catch(err => { console.log("Nincs kapcsolat a szerverrel."); });

function createNewElement(name, attribute, value) {
    let element = document.createElement(name);
    for (k in attribute) { element.setAttribute(k, attribute[k]) };
    return element;
}

let loadData = function (along) {
    //felhasználónként készít egy új sort és betölti az adatokat az első három cellájába
    for (let i = 0; i < pack.length; i++) {
        let row = createNewElement("tr");
        let area = document.querySelector("#t-users");
        area.appendChild(row);
        for (let k in pack[i]) {
            let col = document.createElement("td");
            col.style["text-align"] = "center";
            let area = document.querySelectorAll("#t-users tr")[i]
            area.appendChild(col);
            col.innerHTML = pack[i][k];
        };
        if (along == 0) {
            loadButtonGroup(index = i);
            loadSetDelButton(index = i);
        }
    }
};

let mainButton = document.querySelector("#mainButton");
mainButton.addEventListener("click", mainButtonClick);


function mainButtonClick() {
    button = "main";
    //betölti vagy eltávolítja az adatmódosító gombokat onclick-re
    let allowRun = Boolean(true);

    //gombok betöltése után az allowRun = false lesz,
    //ha true marad, akkor a gombok eltávolítását várjuk

    if (document.querySelector("#t-users tr").childElementCount == 3) {
        //csak három cella van az első felhasználónál, ezért mindegyik felhasználónál
        //betölti a mellékgombokat
        allowRun = false;
        for (let i = 0; i < pack.length; i++) {

            loadButtonGroup(index = i);
            loadSetDelButton(index = i);
        };

        //láthatóvá teszi az új felhasználó fejlécét
        mainButton.innerHTML = "Beállítások (vissza)"
        let newUser = document.querySelector("#new-user");
        newUser.style.display = "";

        //létrehozza és betölti az új felhasználó input mezőit
        let row = document.querySelector("#new-user-input");
        setUser(row, btnValue = pack.length + 1);
    };

    if (allowRun == true) {
        mainButton.innerHTML = "Beállítások";
        let newUser = document.querySelector("#new-user");
        newUser.style.display = "none";

        //eltávolítja az új felhasználó input mezőit
        let row = document.querySelector("#new-user-input");
        itemCount=row.childElementCount;
        for (let i=0; i<itemCount; i++){
            row.removeChild(row.lastChild)
        }


        for (let i = 0; i < pack.length; i++) {
            let area = document.querySelectorAll("#t-users tr")[i];
            area.removeChild(area.lastChild);
            let mainButton = document.querySelector("#mainButton")
            mainButton.innerHTML = "Beállítások";
            actions = document.querySelector("#actions");
            actions.style.display = "none";
        }
        //takeBackNewUserRow();
    }

}

/*function displayNewUserRow() {
    place = document.querySelector("#new-user-text");
    place.innerHTML = "Új felhasználó";
};

function takeBackNewUserRow() {
    place = document.querySelector("#new-user-text");
    place.innerHTML = "";
}
*/


function loadButtonGroup() {

    //betölti a gombcsoportokat a láthatóvá váló actions fejléc alá
    actions = document.querySelector("#actions");
    actions.style.display = "";
    let col = createNewElement("td");
    let area = document.querySelectorAll("#t-users tr")[index];
    area.appendChild(col);
    let btnGroup = createNewElement("div", { 'class': 'btn-group', 'role': 'group', 'aria-label': 'Basic example' });
    sector = document.querySelectorAll("#t-users tr")[index]["children"][3];
    sector.appendChild(btnGroup);
};

function loadSetDelButton(index) {
    //betölti a set/del gombokat
    let place = document.querySelectorAll("#t-users tr")[index]["children"][3]["children"][0];

    let buttonSet = createNewElement("button", { value: `${pack[index].id}`, onclick: "changeUserData(event,this)", class: "btn btn-success btn-sm", type: "button" });
    place.appendChild(buttonSet);

    image = createNewElement("img");
    buttonSet.appendChild(image);
    buttonSet.innerHTML = '<i class="fa fa-refresh" aria-hidden="true"></i>';

    let buttonDel = createNewElement("button", { value: `${pack[index].id}`, onclick: "delUser(event,this)", class: "btn btn-danger btn-sm", type: "button" });
    place.appendChild(buttonDel);
    image = createNewElement("img");
    buttonDel.appendChild(image);
    buttonDel.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';

};

function delUser(event, el) {
    //event.preventDefault();
    //eltávolít egy felhasználót
    el = el.value;
    el = parseInt(el);
    delUserInit = {
        method: "DELETE",
        mode: "cors",
        header: "header()",
        credential: "same-origin",
        catche: "no-catche"
    };
    if (confirm("Ön egy felhasználót fog törölni.")) fetch("http://localhost:3000/users/" + el, delUserInit)
        .then(data => data = data.json())
        .catch(err => console.log(er))
        .then(data => { console.log("Felhasználó törlése megtörtént az adatbázisban. Kérem, frissítsen!"); clearTable(); })
        .catch(er => console.log(er))
};

function clearRow(elem) {
    // törli a #t-users táblázat inputokkal ellátott sorát
    /*let elemValue = elem.value;
    elemValue = parseInt(elemValue);
    let row = elem.parentElement.parentElement.parentElement;
    let table = document.querySelector("#t-users");
    table.removeChild(row);
    console.log(elemValue);
    let w=document.querySelector("#t-users").children(elemValue);*/

    // törli az összes sor 
    let table = document.querySelector("#t-users");
    rowItems = table.childElementCount;
    rowItems = parseInt(rowItems);
    for (let i = 0; i < rowItems; i++) {
        table.removeChild(table.lastElementChild);
    };
    let mainButton = document.querySelector("#mainButton");
    mainButton.removeAttribute("disabled");

}

function changeUserData(event, btn) {
    button = "minor";
    //btn = 'this' in onclick; btnValue a gomb value-ja ami a felhasználó id-je
    let btnValue = btn["value"];
    btnValue = parseInt(btnValue);
    let row = btn.parentElement.parentElement.parentElement;
    //a teljes sort kiürítjük, maga az üres sor megmarad
    //row.removeChild(row.lastElementChild);
    for (let i = 0; i < 4; i++) { row.removeChild(row.lastElementChild) };
    //for (let i = 0; i < 5; i++) { row.removeChild(row.children[3 - i]) };

    let mainbutton = document.querySelector("#mainButton");
    mainbutton.setAttribute("disabled", "");

    btnGroupList = document.querySelectorAll(".btn-group");
    for (let k = 0; k < btnGroupList.length; k++) {
        btnGroupList[k].children[0].setAttribute("disabled", "");
        btnGroupList[k].children[1].setAttribute("disabled", "")
    };

    setUser(row, btnValue);
};

function setUser(row, btnValue) {

    for (k in { 'id': {}, 'name': {}, 'email': {}, 'btnGroup': {} }) {
        col = createNewElement("td");
        row.appendChild(col);
        if (k == 'id') {
            col.setAttribute('class', 'pt-3'); col.setAttribute('name', k);
            col.innerHTML = btnValue;
        };
        if (k == 'name' && button == 'minor') {
            nameInput = createNewElement("input", {
                'name': k,
                'type': 'text', 'class': 'form-control',
                'placeholder': `${pack[btnValue - 1]["name"]}`
            });
            col.appendChild(nameInput);
        }
        if ((k == 'name') && (button == 'main')) {
            nameInput = createNewElement("input", {
                'name': k,
                'type': 'text', 'class': 'form-control',
                'placeholder': 'név'
            });
            col.appendChild(nameInput);
        }
        if (k == 'email' && button == 'minor') {
            emailInput = createNewElement("input", {
                'name': k,
                'type': 'text', 'class': 'form-control',
                'placeholder': `${pack[btnValue - 1]["email"]}`
            });
            col.appendChild(emailInput);
        }
        if (k == 'email' && button == 'main') {
            emailInput = createNewElement("input", {
                'name': k,
                'type': 'text', 'class': 'form-control',
                'placeholder': 'email'
            });
            col.appendChild(emailInput);
        }
        if (k == 'btnGroup') {
            btnGroup = createNewElement("div", {
                'name': k, 'class': 'btn-group btn-group-sm pt-1',
                'role': 'group', 'aria-label': 'Basic example'
            });
            col.appendChild(btnGroup);

            sendButton = createNewElement('button', { 'type': 'button', 'class': 'btn btn-primary' });
            btnGroup.appendChild(sendButton);
            sendButton.innerHTML = '<i class="fa fa-wrench" aria-hidden="true"></i>';

            cancelButton = createNewElement('button', {
                'type': 'button', 'class': 'btn btn-secondary', 'value': `${btnValue}`,
                'onclick': 'clearRow(this),loadData(along=0)'
            });
            btnGroup.appendChild(cancelButton);
            cancelButton.innerHTML = '<i class="fa fa-ban" aria-hidden="true"></i>';
        }
    }
};

/*function createSendCancelButton(btnGroup) {

}

function createNewUser() {
    for (k in { 'id': {}, 'name': {}, 'email': {}, }){

    }
}
*/

/*  A KORÁBBI, REFAKTORÁLÁS NÉLKÜL
function createSetDelButtons(btnValue) {
col = createNewElement("td", { 'style': 'text-align: center', 'class': 'pt-3' });
row.appendChild(col);
col.innerHTML = btnValue;

col = createNewElement("td");
row.appendChild(col);
nameInput = createNewElement("input", {
    'type': 'text', 'class': 'form-control',
    'placeholder': `${pack[btnValue - 1]["name"]}`
});
col.appendChild(nameInput);

col = createNewElement("td");
row.appendChild(col);
emailInput = createNewElement("input", {
    'type': 'email', 'class': 'form-control',
    'placeholder': `${pack[btnValue - 1]["email"]}`
});
col.appendChild(emailInput);

col = createNewElement("td");
row.appendChild(col);
btnGroup = createNewElement("div", { 'class': 'btn-group btn-group-sm', 'role': 'group', 'aria-label': 'Basic example' });
col.appendChild(btnGroup);

sendButton = createNewElement('button', { 'type': 'button', 'class': 'btn btn-primary' });
btnGroup.appendChild(sendButton);
sendButton.innerHTML = '<i class="fa fa-wrench" aria-hidden="true"></i>';

cancelButton = createNewElement('button', { 'type': 'button', 'class': 'btn btn-secondary', 'onclick': 'clearTable(),loadData(along=0)' });
btnGroup.appendChild(cancelButton);
cancelButton.innerHTML = '<i class="fa fa-ban" aria-hidden="true"></i>';
};
*/






/*

ONKLICK!!!!!!!!!!!!!
//pack= new Object;

//getData = function (url) {
    //szervertől lekéri az adatokat
    fetchInit = {
        method: "GET",
        headers: new Headers(),
        mode: "cors",
        cache: "no-cache"
    }

    pack = fetch("http://localhost:3000/users", fetchInit);
    pack = pack.then(data => data = data.json());
    pack.then(data =>{pack = data;loadData();});
    pack.catch(err => {console.log("Nincs kapcsolat a szerverrel.")});
//}

//getData("http://localhost:3000/users");

let loadData = function(){

    //betölti a táblázatba az adatokat
    for (let i = 0; i < pack.length; i++) {
        row = document.createElement("tr");
        area = document.querySelector("#t-users");
        area.appendChild(row);
        for (let k in pack[i]) {
            col = document.createElement("td");
            col.style["text-align"] = "center";
            area = document.querySelectorAll("#t-users tr")[i]
            area.appendChild(col);
            col.innerHTML = pack[i][k];
        };
    };
};

function mainButtonClick() {
    //betölti vagy eltávolítja az adatmódosító gombokat onclick-re

    let allowRun = Boolean(true);

    if (document.querySelector("#t-users tr").childElementCount == 3) {


        for (let i = 0; i < pack.length; i++) {
            allowRun = false;

            if (i == 0) {
                let placeForNewHead = document.querySelector("thead tr");
                newHead = document.createElement("th");
                newHead.innerHTML = "Actions";
                placeForNewHead.appendChild(newHead);
            };

            let col = document.createElement("td");
            col.style["text-align"] = "center";
            col.style["className"] = "align-middle";
            let area = document.querySelectorAll("#t-users tr")[i];
            area.appendChild(col);
            let btnGroup = document.createElement("div");
            let sector = document.querySelectorAll("#t-users tr")[i]["children"][3];
            sector.appendChild(btnGroup);
            btnGroup["className"] = "btn-group";
            btnGroup.setAttribute("role", "group");
            btnGroup.setAttribute("aria-label", "Basic example")
            for (let j = 0; j < 2; j++) {
                let button = document.createElement("button");
                button["className"] = "btn btn-success btn-sm";
                button.setAttribute("type", "button");
                btnGroup.appendChild(button);

                image = document.createElement("img");
                button.appendChild(image);
                if (j == 0) {
                    button.innerHTML = "set";
                    image.setAttribute("src", "http://img.icons8.com/ios-filled/50/000000/settings.png");
                    image.setAttribute("alt", "set");
                }
                else {
                    button.innerHTML = "del";
                    image.setAttribute("src", "http://img.icons8.com/material/24/000000/delete-forever--v2.png");
                    image.setAttribute("alt", "del");
                }

            };

        };
        let mainButton = document.querySelector("#mainButton")
        mainButton.innerHTML = "Beállítások (vissza)"
    };


    if (allowRun === true) {
        for (let i = 0; i < pack.length; i++) {
            if (i == 0) {
                let placeForNewHead = document.querySelector("thead tr");
                placeForNewHead.removeChild(placeForNewHead.lastChild);
            };
            let area = document.querySelectorAll("#t-users tr")[i];
            area.removeChild(area.lastChild);
            let mainButton = document.querySelector("#mainButton")
            mainButton.innerHTML = "Beállítások"
        }
    }
}

*/





/*
askData = function(){let myRequest = new Request("http://api.openweathermap.org/data/2.5/weather?q=Budapest&APPID=664b47be53a8259005e05686937f61d4")

fetch(myRequest)};
*/


a = 10;
console.log("első");
myPromise = new Promise((resolve, reject) => {
    if ((a > 0)) { resolve(a); console.log("rendben") }
    if ((a < 0)) { reject(a); console.log("hiba") }

})
//myPromise.then(data=>console.log("resolve:",data)).catch(err=>console.log("reject:",err));
//myPromise.then((data)=>{pack=data;console.log("resolve:",data)}).catch((err)=>{packk=err;console.log("reject:",err)});for(let i=0;i<10;i++){console.log(i)}
