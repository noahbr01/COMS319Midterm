document.addEventListener("DOMContentLoaded", function(event){
    event.preventDefault();
    if (document.getElementById("header").textContent === "Breakfast"){
        fetchData(1);
    } else if (document.getElementById("header").textContent === "Lunch"){
        fetchData(2);
    } else if (document.getElementById("header").textContent === "Dinner"){
        fetchData(3);
    } else {
        fetchData(0);
    }
});

function fetchData(x){
    let meal;
    let getSug = false;
    if (x === 1){
        meal = "breakfast";
    }
    if (x === 2){
        meal = "lunch";
    }
    if (x === 3){
        meal = "dinner";
    }
    if (x === 0){
        getSug = true;
    }
    fetch("./data.json").then(function(response){
        return response.json();
    }).then(function(data){
        let recipes = data.recipes;
        let row = document.getElementById("row");
        row.innerHTML = "";
        for (let i = 0; i < recipes.length; i++){
            let obj = recipes[i];
            if ((meal === obj.meal) || (getSug)){
                let title = obj.title;
                let ingredients = obj.ingredients;
                let inst = obj.instructions;
                let pic = obj.picture;
                let rating = obj.rating;

                let ratingStr = "<div class=\"d-flex justify-content-center small text-warning mb-2\">\n";
                for (let j = 0; j < rating; j++){
                    ratingStr += "\t<div class=\"bi-star-fill\"></div>\n";
                }
                ratingStr += "</div>\n"

                let addCard = document.createElement("div");
                addCard.classList.add("col mb-5");
                addCard.innerHTML = `
                    <div class="card h-100">
                        <img class="card-img-top" src= ${pic} />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">${title}</h5>
                                ${ratingStr}
                                Ingredients: ${ingredients}
                                Instructions: ${inst}
                            </div>
                        </div>
                    </div>
                `;
                row.appendChild(addCard);
            }
        }
    });
}