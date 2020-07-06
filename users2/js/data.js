let pack = new Object;
let along = 1;

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
    //betölti az adatokat az első három cellába
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
            loadSetDelButton(index = i); console.log("ALONG: ", along);
        }
    }
};

function mainButtonClick() {
    //betölti vagy eltávolítja az adatmódosító gombokat onclick-re

    let allowRun = Boolean(true);

    if (document.querySelector("#t-users tr").childElementCount == 3) {

        for (let i = 0; i < pack.length; i++) {
            allowRun = false;
            loadButtonGroup(index = i);
            loadSetDelButton(index = i);
        };
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

function loadButtonGroup() {
    //betölti az 'action' fejlécet
    if (index == 0) {
        let placeForNewHead = document.querySelector("thead tr");
        newHead = createNewElement("th");
        newHead.innerHTML = "Actions";
        placeForNewHead.appendChild(newHead);
    };

    //betölti a gombcsoportokat
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
    console.log("el= ", el);
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
        .then(data => { loadData(along = 0); loadButtonGroup; loadSetDelButton; })
        .catch(data => console.log(er))

};
function changeUserData(event, btn) {
    //btn = 'this' in onclick
    btnValue = btn["value"];
    btnValue = parseInt(btnValue);
    console.log(btnValue);
    row = btn.parentElement.parentElement.parentElement;
    console.log(row);
    for (let i = 0; i < 3; i++) { row.removeChild(row.children[3 - i]) };

    let mainbutton = document.querySelector("#mainButton");
    mainbutton.setAttribute("disabled", "")

    btnGroupList = document.querySelectorAll(".btn-group");
    console.log(btnGroupList);
    for (let k = 0; k < btnGroupList.length; k++) {
        btnGroupList[k].children[0].setAttribute("disabled", "");
        btnGroupList[k].children[1].setAttribute("disabled", "")
    };

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
    })
    col.appendChild(emailInput);
    console.log(btnValue);

    col = createNewElement("td");
    row.appendChild(col);
    btnGroup=createNewElement("div",{'class':'btn-group btn-group-sm','role':'group','aria-label':'Basic example'});
    col.appendChild(btnGroup);
    sendButton=createNewElement('button',{'type':'button','class':'btn btn-primary'});
    btnGroup.appendChild(sendButton);
    sendButton.innerHTML='<i class="fa fa-wrench" aria-hidden="true"></i>';
    cancelButton=createNewElement('button',{'type':'button','class':'btn btn-secondary'});
    btnGroup.appendChild(cancelButton);
    cancelButton.innerHTML='<i class="fa fa-ban" aria-hidden="true"></i>';

/*<div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-secondary">Left</button>
  <button type="button" class="btn btn-secondary">Middle</button>
  <button type="button" class="btn btn-secondary">Right</button>
</div>*/

    /*
    form = createNewElement("form");
    row.appendChild(form)
    div = createNewElement("div", { 'class': 'input-group' })
    form.appendChild(div);
    nameInput = createNewElement("input", { 'type': 'text', 'class': 'form-control' })
    div.appendChild(nameInput);
    emailInput = createNewElement("input", { 'type': 'email', 'class': 'form-control' })
    div.appendChild(emailInput);
*/







};

let mainButton = document.querySelector("#mainButton");
mainButton.addEventListener("click", mainButtonClick);



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
