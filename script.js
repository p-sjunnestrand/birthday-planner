let mainWrp = document.getElementById("mainWrp");

const persons = ["Petter", "Norah", "Ronja", "David", "My", "Martin", "Alvin", "Meja", "Tove", "Tomas", "Stella", "Margareta", "Håkan", "Lars-Erik"]
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
    addListBtn.classList.add('addListBtn');
    addListBtn.innerText = "Lägg till nya önskemål";
    wishListWrp.appendChild(addListBtn);

    //populates wishList area with empty lists
    persons.forEach(person => {
        // console.log(person);
        let wishListItem = document.createElement('article');
        wishListItem.classList.add('wishListItem');
        
        wishList.appendChild(wishListItem);
        const listItemHeader = document.createElement('h3');
        listItemHeader.classList.add('listItemHeader');
        listItemHeader.innerHTML = person;
        wishListItem.appendChild(listItemHeader);
        let wishListItemUl = document.createElement('ul');
        wishListItemUl.id = person;
        wishListItemUl.classList.add('wishListItemUl');
        wishListItem.appendChild(wishListItemUl); 
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