let mainWrp = document.getElementById("mainWrp");
//temporary person list
const persons = [
    {
        person: "Petter",
        items: 4
    },
    {
        person: "Norah",
        items: 0
    },
    {
        person: "David",
        items: 3
    },
    {
        person: "Ronja",
        items: 3
    },
    {
        person: "My",
        items: 0
    },
    {
        person: "Martin",
        items: 0
    },
    {
        person: "Alvin",
        items: 0
    },
    {
        person: "Meja",
        items: 0
    },
    {
        person: "Tove",
        items: 0
    },
    {
        person: "Tomas",
        items: 0
    },
    {
        person: "Stella",
        items: 0
    },
    {
        person: "Margareta",
        items: 0
    },
    {
        person: "Håkan",
        items: 0
    },
    {
        person: "Lars-Erik",
        items: 0
    }
];

//Temporary item list
let wishListItems = [
    {
        person: "Petter",
        item: "Rasberry Pi"
    },
    {
        person: "Petter",
        item: "Strumpor"
    },
    {
        person: "Petter",
        item: "Skjortor"
    },
    {
        person: "Petter",
        item: "Rakkniv"
    },
    {
        person: "Ronja",
        item: "Enhörningsklänning"
    },
    {
        person: "Ronja",
        item: "Böcker"
    },
    {
        person: "Ronja",
        item: "Ryggsäck med Frost-tema"
    },
    {
        person: "David",
        item: "Leksaksdumper"
    },
    {
        person: "David",
        item: "Alla sorts kläder"
    },
    {
        person: "David",
        item: "Leksakståg"
    }
]
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
    persons.forEach(person => {
        if(person.items > 0){
            // console.log(person);
            let wishListItem = document.createElement('article');
            wishListItem.classList.add('wishListItem');
            
            wishList.appendChild(wishListItem);
            const listItemHeader = document.createElement('h3');
            listItemHeader.classList.add('listItemHeader');
            listItemHeader.innerHTML = person.person;
            wishListItem.appendChild(listItemHeader);
            let wishListItemUl = document.createElement('ul');
            wishListItemUl.id = person.person;
            wishListItemUl.classList.add('wishListItemUl');
            wishListItem.appendChild(wishListItemUl); 
        }
    });
    addLists();
}
//Adds dynamic wish list items to wishList
function addLists(){
    wishListItems.forEach(item => {
        // console.log(item);
        let listItemAdd = document.getElementById(item.person);
        // console.log(listItemAdd);
        listItemAdd.insertAdjacentHTML('beforeend', `<li>${item.item}</li>`);
    })
}
document.getElementById('addListBtn').addEventListener('click', () => {
    console.log('hej');
    loadListForm();

})
//Loads a form for adding items and lists to wish list
function loadListForm () {
    //adds faded backdrop to shift focus to form
    const fadedBackdrop = document.createElement('div');
    fadedBackdrop.id = 'fadedBackdrop';
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