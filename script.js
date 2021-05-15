//LOCAL
let userRoute = 'http://localhost:3000/users/';
let deleteRoute = 'http://localhost:3000/users/delete';
//CLOUD
// let userRoute = 'https://sjunnestrand-birthday.herokuapp.com/users'
// let deleteRoute = 'https://sjunnestrand-birthday.herokuapp.com/delete'

let mainWrp = document.getElementById("mainWrp");
let totalWrp = document.getElementById("totalWrp");
const fadedBackdrop = document.createElement('div');
fadedBackdrop.id = 'fadedBackdrop';

const listColors = ['listGreen', 'listBlue', 'listPurple', 'listPink', 'listOrange', 'listRed'];
const listHeaderColors = ['listHeaderGreen', 'listHeaderBlue', 'listHeaderPurple', 'listHeaderPink', 'listHeaderOrange', 'listHeaderRed']

mainPage();
//Loads static assets on main page
function mainPage (){
    const wishListWrp = document.createElement('section');
    wishListWrp.id = "wishListWrp";
    wishListWrp.classList.add('sectionWrp');
    mainWrp.appendChild(wishListWrp);

    const wishListHeader = document.createElement('h2');
    wishListHeader.innerHTML = 'Önskelistor';
    wishListWrp.appendChild(wishListHeader);

    const wishList = document.createElement('div');
    wishListWrp.appendChild(wishList);
    wishList.id = "wishList";

    const addListBtn = document.createElement('button');
    addListBtn.id ='addListBtn';
    addListBtn.innerText = "Lägg till nya önskemål";
    wishListWrp.appendChild(addListBtn);

    document.getElementById('addListBtn').addEventListener('click', () => {
        console.log('load form');
        loadListForm();
    
    })
    //populates wishList area with empty lists
    wishListLoad();
    
    
}
function wishListLoad(){
    fetch(userRoute)
    .then(result => result.json())
    .then(data => {
        console.log(data);
        data.forEach((obj, index) => {
            if(obj.items > 0){
                // console.log(person);
                let wishListItem = document.createElement('article');
                wishListItem.classList.add('wishListItem');
                wishListItem.classList.add(listColors[index %listColors.length]);
                wishListItem.id = obj.person;
                
                wishList.appendChild(wishListItem);

                // const wishListItemClickerDiv = document.createElement('div');
                // wishListItemClickerDiv.classList.add('clickerDiv');
                // wishListItem.appendChild(wishListItemClickerDiv);

                const listItemHeader = document.createElement('h3');
                listItemHeader.classList.add('listItemHeader');
                listItemHeader.classList.add(listHeaderColors[index %listHeaderColors.length]);
                listItemHeader.innerHTML = obj.person;
                wishListItem.appendChild(listItemHeader);
                // let wishListItemUl = document.createElement('ul');
                // wishListItemUl.id = obj.person;
                // wishListItemUl.classList.add('wishListItemUl');
                // wishListItem.appendChild(wishListItemUl); 
                
                addLists(obj.inventory, obj);
            }
        });
    })
    document.getElementById('wishList').addEventListener('click', e => {
        const personList = e.target.parentNode.id;
        console.log(personList);
        if(personList !== 'wishListWrp'){
            showFullList(personList);
            mainWrp.classList.add('noScroll');
        }
    })
}
//Adds dynamic wish list items to wishList
function addLists(inventory, person){
    inventory.forEach(item => {
        console.log(item);
        let listItemAdd = document.getElementById(person.person);
        console.log(listItemAdd);
        listItemAdd.insertAdjacentHTML('beforeend', `<li>${item.item_name}</li>`);
    })
}

//Loads a form for adding items and lists to wish list
function loadListForm () {
    //adds faded backdrop to shift focus to form
    document.getElementById('addListBtn').disabled = true;
    totalWrp.insertAdjacentElement("afterbegin", fadedBackdrop);

    //adds div in which form is placed
    const addListFormWrp = document.createElement('article');
    addListFormWrp.id = 'addListFormWrp'
    fadedBackdrop.appendChild(addListFormWrp);

    //adds btn for closing form window
    const closeFormWindow = document.createElement('button');
    closeFormWindow.id = 'closeFormWindow';
    closeFormWindow.innerText = 'X';

    const formHeaderDiv = document.createElement('div');
    formHeaderDiv.id = 'formHeaderDiv';
    formHeaderDiv.insertAdjacentHTML('beforeend', `<h3>Skapa ett nytt önskemål</h3>`);
    formHeaderDiv.appendChild(closeFormWindow);
    addListFormWrp.appendChild(formHeaderDiv);

    closeFormWindow.addEventListener('click', () =>{
        fadedBackdrop.innerHTML = '';
        fadedBackdrop.remove();
        document.getElementById('addListBtn').disabled = false;
        mainWrp.innerHTML = '';
        mainPage();
    })

    const addListForm = document.createElement('form');
    addListFormWrp.appendChild(addListForm);
    addListForm.insertAdjacentHTML('beforeend', `<div id="selectDiv"><label for = "selectPerson">Person:</label></div>`);

    const selectPerson = document.createElement('select');
    selectPerson.id = 'selectPerson';

    selectPerson.insertAdjacentHTML("beforeend", `<option value="">--Välj person--</option>`);

    // const choosePersonPrompt = document.createElement('option');
    // choosePersonPrompt.textContent = "--Välj person--";
    // selectPerson.appendChild(choosePersonPrompt);
    const persons = ['Petter', 'Norah', 'David', 'Ronja', 'My', 'Martin', 'Alvin', 'Meja', 'Tove', 'Tomas', 'Stella', 'Margareta', 'Håkan', 'Lars-Erik'];
    persons.forEach(person => {
        selectPerson.insertAdjacentHTML('beforeend', `<option value = "${person}">${person}</option>`);
    });
    document.getElementById('selectDiv').appendChild(selectPerson);

    addListForm.insertAdjacentHTML('beforeend', `<div id="presentDiv"><label for = "presentInput">ösnkar sig:</label></div>`);
    const presentInput = document.createElement('input');
    presentInput.id = "presentInput";
    // presentInput.attributes.required = "required";
    document.getElementById('presentDiv').appendChild(presentInput);

    addListForm.insertAdjacentHTML('beforeend', `<div id="presentDescDiv"<label for = "presentDesc">Ev. beskrivning av önskemålet</label>`);
    const presentDesc = document.createElement('textarea');
    presentDesc.id = "presentDesc";
    document.getElementById('presentDescDiv').appendChild(presentDesc);

    addListForm.insertAdjacentHTML('beforeend', `<div id="presentURLdiv"><label for = "presentURL">Länk till ev. webbshop/hemsida för produkten:</label>`);
    const presentURL = document.createElement('input');
    presentURL.id = "presentURL";
    document.getElementById('presentURLdiv').appendChild(presentURL);

    addListForm.insertAdjacentHTML('beforeend', `<div id="presentShopDiv"><label for = "presentShop">Ev. butik där det önskade kan köpas</label>`);
    const presentShop = document.createElement('input');
    presentShop.id = "presentShop";
    document.getElementById('presentShopDiv').appendChild(presentShop);

    const submitBtn = document.createElement("button");
    submitBtn.id = "submitBtn";
    submitBtn.textContent = "Lägg till";
    addListForm.appendChild(submitBtn);

    const submitWarning = document.createElement('div');
    submitWarning.id = 'submitWarning';
    submitWarning.classList.add('warning');
    addListFormWrp.appendChild(submitWarning);

    const submitMsg = document.createElement('div');
    submitMsg.id = 'submitMsg';
    // submitMsg.classList.add('submitWarning');
    addListFormWrp.appendChild(submitMsg);

    document.getElementById('submitBtn').addEventListener('click', evt =>{
        evt.preventDefault();
        console.log('click');
        if (selectPerson.value === '' || presentInput.value === ''){
            console.log('Välj person och önskemål!');
            submitWarning.innerHTML = 'Välj en person och skriv något hen önskar sig!';
            // selectPerson.style.border = '3px solid red';
            // presentInput.style.border = '3px solid red';
            selectPerson.classList.add('redBorder');
            presentInput.classList.add('redBorder');
        } else {
            selectPerson.classList.remove('redBorder');
            presentInput.classList.remove('redBorder');
            const postedItem = {
                "person": selectPerson.value,
                "item": {
                    "item_name": presentInput.value,
                    "item_desc": presentDesc.value,
                    "item_url": presentURL.value,
                    "item_shop": presentShop.value,
                    "item_id": ""
                }
            }
            console.log(postedItem);
            fetch(userRoute, {
                method: 'post',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(postedItem)
            })
            .then(result => result.json())
            .then(data => {
                console.log(data);
                if(data.status !== "added"){
                    itemNotPosted();
                } else {
                    itemPosted(presentInput.value, selectPerson.value);
                }
            })
        }
    });
}

function itemNotPosted(){
    submitWarning.innerHTML = 'Något gick fel. Prova att lägga till önskemålet igen. Om det inte fungerar, prova att ladda om sidan.';
}
function itemPosted(present, person) {
    submitWarning.innerHTML = '';
    submitMsg.insertAdjacentHTML('beforeend', `<div>${present} tillagd ${person}s önskelista!</div>`);
    presentInput.value = '';
    presentDesc.value = '';
    presentURL.value = '';
    presentShop.value = '';
}
function showFullList(list){
    console.log(list);
    totalWrp.insertAdjacentElement("afterbegin", fadedBackdrop);
    let listWrp = document.createElement('div');
    listWrp.classList.add('listWrp');
    fadedBackdrop.appendChild(listWrp);
    fetch(userRoute)
    .then(result => result.json())
    .then(data => {
        console.log(data);
        data.forEach((obj, index) => {
            if(obj.person === list){
                console.log(obj);
                fetchedInventory = obj.inventory;
                console.log(fetchedInventory);
                const fullListNameHeader = document.createElement('div');
                fullListNameHeader.insertAdjacentHTML('beforeend', `<h2 class ="fullListPerson">${obj.person}s önskelista</h2>`);
                fullListNameHeader.id = 'fullListNameHeader';

                const fullListExitBtn = document.createElement('button');
                fullListExitBtn.innerText = 'x';
                fullListExitBtn.id = 'fullListExitCornerBtn';
                fullListNameHeader.appendChild(fullListExitBtn);
                listWrp.appendChild(fullListNameHeader);
                
                fullListExitBtn.addEventListener('click', ()=>{
                    console.log('click on corner');
                    fadedBackdrop.innerHTML = '';
                    fadedBackdrop.remove();
                    mainWrp.innerHTML = '';
                    mainPage();
                    mainWrp.classList.remove('noScroll');
                })

                let incr = 0;
                fetchedInventory.forEach(item => {
                    incr++;
                    const fullListDiv = document.createElement('div');
                    fullListDiv.classList.add('fullListDiv');
        
                    fullListDiv.classList.add(listColors[index %listColors.length]);
                    listWrp.appendChild(fullListDiv);
                    const listUl = document.createElement('ul');
                    listUl.classList.add('listUl');
                    fullListDiv.appendChild(listUl);

                    listUl.addEventListener('click', (e)=>{
                        if(e.target.nodeName === 'BUTTON'){
                            console.log('click on button!');
                            deleteItem(e, list);
                        }
                    })
                    console.log(item);
                    for(subitem in item){
                        console.log(item.item_id);
                        console.log(item[subitem]);
                        let subItemConts = item[subitem];
                        if (item[subitem] !== ''){
                            switch (subitem){
                                case 'item_name':
                                    subItemConts = `<strong>${item[subitem]}</strong>`
                                    // printFullListContent(listUl, listHeaderColors[index %listColors.length], wishTitle, subItemConts);
                                    // let closeBtnId = item[subitem].replace(/ /g,'')
                                    // console.log(closeBtnId);
                                    listUl.insertAdjacentHTML('beforeend', `<li class = "${listHeaderColors[index %listColors.length]} listHeaderItemName"><div class="listHeaderItemNameDiv">${item[subitem]}</div><button class="listHeaderItemNameCloseBtn" id="${item.item_id}">X</button></li>`);
                                    // listUl.insertAdjacentHTML('beforeend', `<li class = "fullListHeading"><h4>Önskemål<h4></li><li class = "subItem">${item[subitem]}</li>`); 
                                    break;  
                                case 'item_desc':
                                    printFullListContent(listUl, 'fullListHeading', 'Beskrivning', subItemConts)
                                    // listUl.insertAdjacentHTML('beforeend', `<li class = "fullListHeading">Beskrivning</li><li class = "subItem">${item[subitem]}</li>`);
                                    break;
                                case 'item_shop':
                                    printFullListContent(listUl, 'fullListHeading', 'Finns att köpa', subItemConts)
                                    // listUl.insertAdjacentHTML('beforeend', `<li class = "fullListHeading">Finns att köpa i</li><li class = "subItem">${item[subitem]}</li>`);
                                    break;
                                case 'item_url':
                                    listUl.insertAdjacentHTML('beforeend', `<li class = "subItem"><a href ="${item[subitem]}">Hemsida</a></li>`);
                                    break;
                            }

                            // // console.log('empty!');
                            // console.log(subitem);
                            // if (subitem === 'item_url')
                            // {
                            //     console.log('URL');
                            //     listUl.insertAdjacentHTML('beforeend', `<li class = "subItem"><a href="${item[subitem]}">Hemsida</a></li>`);
                            // } else {
                            //     //adds all item fields to list. Gives item_name one class and the others a different class
                            // listUl.insertAdjacentHTML('beforeend', `<li class = ${subitem == "item_name" ? "itemName" : "subItem"}>${item[subitem]}</li>`);
                            // }
                            
                        }
                        
                    }
                })
            }
        });
        const closeFullListBtn = document.createElement('button');
        closeFullListBtn.innerText = 'Stäng';
        closeFullListBtn.id = 'closeListBtn';
        listWrp.appendChild(closeFullListBtn);

        closeFullListBtn.addEventListener('click', ()=>{
            console.log('click');
            fadedBackdrop.innerHTML = '';
            fadedBackdrop.remove();
            mainWrp.innerHTML = '';
            mainPage();
            mainWrp.classList.remove('noScroll');
        })
    })
    
}
function printFullListContent(list, headerClass, header, subitem){
    list.insertAdjacentHTML('beforeend', `<li class = ${headerClass}>${header}</li><li class = "subItem">${subitem}</li>`);
}
function deleteItem(e, list){
    fetch(deleteRoute, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({item_id: e.target.id, person: list})
    })
    .then(result => result.json())
    .then(data => {
        console.log(data.status);
        fadedBackdrop.innerHTML = '';
        showFullList(list);
    })
}

function login(){
    if (!localStorage){
        const loginWrp = document.createElement('section');
        loginWrp.id = 'loginWrp';
        mainWrp.appendChild(loginWrp);

        const loginFormDiv = document.createElement('div');
        loginFormDiv.id = 'loginFormDiv';
        loginWrp.appendChild(loginFormDiv);

        const loginForm = document.createElement('div');
        loginForm.id = 'loginForm';
        loginFormDiv.appendChild(loginForm);

        let userNameInput = document.createElement('input');
        userNameInput.id = 'userNameInput';
        let userPswInput = document.createElement('input');
        userPswInput.id = 'userPswInput';

        loginForm.append(userPswInput, userPswInput);
    }
}
// document.getElementById('fullListExitCornerBtn').addEventListener('click', ()=>{
//     console.log('click on corner');
// })