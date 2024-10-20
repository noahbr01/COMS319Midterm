document.addEventListener("DOMContentLoaded", function(event) {
    event.preventDefault();
    
    const headerText = document.getElementById("header").textContent.toLowerCase(); 
    if (headerText === "breakfast") {
        fetchData("breakfast");
    } else if (headerText === "lunch") {
        fetchData("lunch");
    } else if (headerText === "dinner") {
        fetchData("dinner");
    } else {
        fetchData(null);
    }
});

function fetchData(mealType) {
    let getSug = mealType === null;

    fetch("./data.json")
        .then(response => response.json())
        .then(function(data) {
            let recipes = data.recipes;
            let row = document.getElementById("row");
            row.innerHTML = "";

            recipes.forEach(recipe => {
                if (getSug && recipe.suggested || recipe.meal === mealType) {
                    let { title, ingredients, instructions, picture, rating, CookTime } = recipe;

                    let ratingStr = `<div class="d-flex justify-content-center small text-warning mb-2">\n`;
                    for (let j = 0; j < rating; j++) {
                        ratingStr += `<div class="bi-star-fill"></div>\n`;
                    }
                    ratingStr += `</div>\n`;
                    
                    const carouselId = title.replace(/\s+/g, '-').toLowerCase();
                    let addCard = document.createElement("div");
                    addCard.classList.add("col", "mb-5");
                    addCard.innerHTML = `
                        <div class="card h-100">
                           <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
                                <div class="carousel-inner">
                                    ${picture.map((img, index) => `
                                        <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                            <img src="${img}" class="d-block w-100" alt="${title}">
                                        </div>
                                    `).join('')}
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                            <!-- Recipe details-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- Recipe title-->
                                    <h5 class="fw-bolder">${title}</h5>
                                    <!-- Recipe rating-->
                                    ${ratingStr}
                                    <!-- Recipe ingredients and instructions-->
                                    <p>Ingredients: ${ingredients}</p>
                                    <p>Instructions: ${instructions}</p>
                                    <p>Cook time: ${CookTime}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    row.appendChild(addCard);
                }
            });
        })
        .catch(function(error) {
            console.error("Error fetching data:", error);
        });
}
