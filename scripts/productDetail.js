"use strict";

const backBtn = document.getElementById("backBtn");



window.onload = () => {
    let urlParams = new URLSearchParams(location.search);
    let id = -1;
    if(urlParams.has("productId") == true) {
        id = urlParams.get("productId")
        
            fetch("http://localhost:8081/api/products/" + id)
                .then(response => response)
                .then(product => {
                    console.log(product)
                })
    }
    backBtn.onclick = onBackBtnClicked;
}

function onBackBtnClicked(){
    backBtn.onclick = window.location.href='productsSearch.html';
}