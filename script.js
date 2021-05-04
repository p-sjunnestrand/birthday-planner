let mainWrp = document.getElementById("mainWrp");

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

    //populates wishList area with empty lists
    wishListLoad();
    
    
}
function wishListLoad(){
    fetch('http://localhost:3000/users/')
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
document.getElementById('addListBtn').addEventListener('click', () => {
    console.log('load form');
    loadListForm();

})
document.getElementById('wishList').addEventListener('click', e => {
    const personList = e.target.parentNode.id;
    console.log(personList);
    showFullList(personList);

})
//Loads a form for adding items and lists to wish list
function loadListForm () {
    //adds faded backdrop to shift focus to form
    
    document.body.insertAdjacentElement("afterbegin", fadedBackdrop);

    //adds div in which form is placed
    const addListFormWrp = document.createElement('article');
    addListFormWrp.id = 'addListFormWrp'
    fadedBackdrop.appendChild(addListFormWrp);

    //adds btn for closing form window
    const closeFormWindow = document.createElement('button');
    closeFormWindow.id = 'closeFormWindow';
    closeFormWindow.innerText = 'X';
    addListFormWrp.appendChild(closeFormWindow);

    closeFormWindow.addEventListener('click', () =>{
        fadedBackdrop.innerHTML = '';
        fadedBackdrop.remove();
    })

    const addListForm = document.createElement('form');
    addListFormWrp.appendChild(addListForm);
    addListForm.insertAdjacentHTML('beforeend', `<label for = "selectPerson">Person:</label>`);

    const selectPerson = document.createElement('select');
    selectPerson.id = 'selectPerson';

    selectPerson.insertAdjacentHTML("beforeend", `<option value="">--Välj person--</option>`);

    // const choosePersonPrompt = document.createElement('option');
    // choosePersonPrompt.textContent = "--Välj person--";
    // selectPerson.appendChild(choosePersonPrompt);
    const persons = ['Petter', 'Norah', 'David', 'Ronja', 'My', 'Martin', 'Alvin', 'Meja', 'Tove', 'Tomas', 'Stella', 'Margareta', 'Håkan', 'Lars-Erik'];
    persons.forEach(person => {
        selectPerson.insertAdjacentHTML('beforeend', `<option value = "${person.person}">${person.person}</option>`);
    });
    addListForm.appendChild(selectPerson);

    addListForm.insertAdjacentHTML('beforeend', `<br><label for = "presentInput">ösnkar sig:</label><br>`);
    const presentInput = document.createElement('input');
    presentInput.id = "presentInput";
    // presentInput.attributes.required = "required";
    addListForm.appendChild(presentInput);

    addListForm.insertAdjacentHTML('beforeend', `<br><label for = "presentDesc">Ev. beskrivning av önskemålet</label><br>`);
    const presentDesc = document.createElement('textarea');
    presentDesc.id = "presentDesc";
    addListForm.appendChild(presentDesc);

    addListForm.insertAdjacentHTML('beforeend', `<br><label for = "presentURL">Länk till ev. webbshop/hemsida för produkten:</label><br>`);
    const presentURL = document.createElement('input');
    presentURL.id = "presentURL";
    addListForm.appendChild(presentURL);

    addListForm.insertAdjacentHTML('beforeend', `<br><label for = "presentShop">Ev. butik där det önskade kan köpas</label><br>`);
    const presentShop = document.createElement('input');
    presentShop.id = "presentShop";
    addListForm.appendChild(presentShop);

    const submitBtn = document.createElement("button");
    submitBtn.id = "submitBtn";
    submitBtn.textContent = "Lägg till";
    addListForm.appendChild(submitBtn);

    document.getElementById('submitBtn').addEventListener('click', evt =>{
        evt.preventDefault();
        console.log('click');
        if (selectPerson.value === ''){
            console.log('Välj person och önskemål!');
            addListFormWrp.insertAdjacentHTML('beforeend', `<div class = "warning">Välj en person och skriv något hen önskar sig!</div>`);
            selectPerson.style.border = '3px solid red';
            presentInput.style.border = '3px solid red';
        } else {
            const postedItem = {
                "person": selectPerson.value,
                "item": {
                    "item_name": presentInput.value,
                    "item_desc": presentDesc.value,
                    "item_url": presentURL.value,
                    "item_shop": presentShop.value
                }
            }
            console.log(postedItem);
            fetch('http://localhost:3000/users/', {
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
    document.getElementById('addListFormWrp').insertAdjacentHTML('beforeend', `<div class = "warning">Något gick fel. Prova att lägga till önskemålet igen. Om det inte fungerar, prova att ladda om sidan.</div>`);
}
function itemPosted(present, person) {
    document.getElementById('addListFormWrp').insertAdjacentHTML('beforeend', `<div>${present} tillagd ${person}s önskelista!</div>`);
    presentInput.value = '';
    presentDesc.value = '';
    presentURL.value = '';
    presentShop.value = '';
}
function showFullList(list){
    document.body.insertAdjacentElement("afterbegin", fadedBackdrop);
    let listWrp = document.createElement('div');
    listWrp.classList.add('listWrp');
    fadedBackdrop.appendChild(listWrp);
    fetch('http://localhost:3000/users/')
    .then(result => result.json())
    .then(data => {
        console.log(data);
        data.forEach(obj => {
            if(obj.person === list){
                fetchedInventory = obj.inventory;
                console.log(fetchedInventory);
                const fullListNameHeader = document.createElement('div');
                fullListNameHeader.insertAdjacentHTML('beforeend', `<h2 class ="fullListPerson">${obj.person}</h2>`);
                fullListNameHeader.id = 'fullListNameHeader';

                const fullListExitBtn = document.createElement('button');
                fullListExitBtn.innerText = 'x';
                fullListExitBtn.id = 'fullListExitBtn';
                fullListNameHeader.appendChild(fullListExitBtn);
                listWrp.appendChild(fullListNameHeader);
                
                fetchedInventory.forEach(item => {
                    const fullListDiv = document.createElement('div');
                    fullListDiv.classList.add('fullListDiv');
                    listWrp.appendChild(fullListDiv);
                    const listUl = document.createElement('ul');
                    listUl.classList.add('listUl');
                    fullListDiv.appendChild(listUl);
                    console.log(item);
                    for(subitem in item){
                        // console.log(item[subitem]);
                        if (item[subitem] !== ''){
                            switch (subitem){
                                case 'item_name':
                                    printFullListContent(listUl, 'fullListItemName', 'Önskemål', item, subitem)
                                    // listUl.insertAdjacentHTML('beforeend', `<li class = "fullListHeading"><h4>Önskemål<h4></li><li class = "subItem">${item[subitem]}</li>`); 
                                    break;  
                                case 'item_desc':
                                    printFullListContent(listUl, 'fullListHeading', 'Beskrivning', item, subitem)
                                    // listUl.insertAdjacentHTML('beforeend', `<li class = "fullListHeading">Beskrivning</li><li class = "subItem">${item[subitem]}</li>`);
                                    break;
                                case 'item_shop':
                                    printFullListContent(listUl, 'fullListHeading', 'Finns att köpa i', item, subitem)
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
        listWrp.appendChild(closeFullListBtn);
    })
}
function printFullListContent(list, headerClass, header, item, subitem){
    list.insertAdjacentHTML('beforeend', `<li class = ${headerClass}><h4>${header}</h4></li><li class = "subItem">${item[subitem]}</li>`);
}