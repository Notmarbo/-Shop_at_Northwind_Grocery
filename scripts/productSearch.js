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
    searchBySelect.addEventListener("change", onSearchBySelectChange)
    categorySelect.addEventListener("change", onCategorySelectChange)
}
function populateSearchBy() {
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
                option.value = category.id;

                categorySelect.appendChild(option);
            }
        });
    let initalOption = new Option("Please Select A Category", "");
    categorySelect.appendChild(initalOption);
}
function onSearchBySelectChange() {
    hideListOfItems();
    let searchBySelected = searchBySelect.value;

    if(searchBySelected == 1){
        showCatSelectRow();
    }else if(searchBySelected == 2){
        showListOfItems();
        hideCatSelectRow();
        fetch("http://localhost:8081/api/products")
            .then(response => response.json())
            .then(products =>{
                for(let product of products){
                    console.log(product)
                }
            })
    }
}
function onCategorySelectChange() {

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