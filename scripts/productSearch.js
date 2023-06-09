"use strict";


const searchBySelect = document.getElementById("searchBySelect");
const categorySelect = document.getElementById("categorySelect");




const catSelectRow = document.getElementById("catSelectRow");
const listOfItems = document.getElementById("listOfItems");



window.onload = () => {
    populateSearchBy();
    populateCategorySelect();
    hideCatSelectRow();
    hideListOfItems();
    searchBySelect.onchange = onSearchBySelectChange;
    categorySelect.onchange = onCategorySelectChange;
}
function populateSearchBy() {
    //NEXT TIME PUT THIS IN HTML
    let initalOption = new Option("Please Select A Search Option", "0");
    searchBySelect.appendChild(initalOption);
    let secondOption = new Option("Search By Category", "1");
    searchBySelect.appendChild(secondOption);
    let thirdOption = new Option("View All", "2");
    searchBySelect.appendChild(thirdOption);
}

function populateCategorySelect() {
    fetch("http://localhost:8081/api/categories")
        .then(response => response.json())
        .then(categories => {
            for (let category of categories) {

                let option = document.createElement("option");
                option.text = category.name;
                option.value = category.categoryId;

                categorySelect.appendChild(option);
            }
        });
    let initalOption = new Option("Please Select A Category", "");
    categorySelect.appendChild(initalOption);
}
function onSearchBySelectChange() {

    hideListOfItems();
    let searchBySelected = searchBySelect.value;

    if (searchBySelected == 1) {
        showCatSelectRow();
    } else if (searchBySelected == 2) {
        showListOfItems();
        hideCatSelectRow();
        fetch("http://localhost:8081/api/products")
            .then(response => response.json())
            .then(products => {
                for (let product of products) {
                    makeProductTable(product)
                }
            })
    }
}
function onCategorySelectChange() {

    let categorySelected = categorySelect.value;
    console.log(categorySelected)

    fetch("http://localhost:8081/api/products")
        .then(response => response.json())
        .then(products => {
            for (let product of products) {
                if (categorySelected == product.categoryId) {

                    //Make Table Content
                    showListOfItems();
                    makeProductTable(product);
                }
                else {
                    console.log("We didnt Find a match ;(")
                }

            }
        })
}

function makeProductTable(product) {

    let cardDiv = document.createElement("div");
    cardDiv.className = "card container";
    cardDiv.style.width = "18rem";


    let cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";


    let cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = product.productName;

    let paragraph = document.createElement("p");
    paragraph.className = "card-text";
    paragraph.textContent = `Price: ${product.unitPrice}`;

    let paragraph2 = document.createElement("p");
    paragraph2.className = "card-text";
    paragraph2.textContent = `Supplier: ${product.supplier}`;


    let link = document.createElement("a");
    link.href = "#";
    link.className = "btn btn-primary";
    link.textContent = "Add to cart";

    let link2 = document.createElement("a");
    link2.href = "#";
    link2.className = "btn btn-dark";
    link2.textContent = "View Product";


    cardBodyDiv.appendChild(cardTitle);
    cardBodyDiv.appendChild(paragraph);
    cardBodyDiv.appendChild(paragraph2);
    cardBodyDiv.appendChild(link);
    cardBodyDiv.appendChild(link2);


    cardDiv.appendChild(cardBodyDiv);


    let listOfItemsDiv = document.getElementById("listOfItems");

    listOfItemsDiv.appendChild(cardDiv);


}



function hideCatSelectRow() {
    catSelectRow.style.display = "none";
}
function showCatSelectRow() {
    catSelectRow.style.display = "block";
}

function hideListOfItems() {
    listOfItems.style.display = "none";

}
function showListOfItems() {
    listOfItems.style.display = "block";

}

//example    {
//         "categoryId": 6,
//         "description": "Prepared meats",
//         "name": "Meat/Poultry"
//     },
// {
//     "productId": "1",
//     "productName": "Chai",
//     "unitPrice": "18.0000",
//     "unitsInStock": "39",
//     "categoryId": 1,
//     "supplier": "Exotic Liquids",
//     "discontinued": "false"
// },