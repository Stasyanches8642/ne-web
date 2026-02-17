function loadReviews() {
    const saved = localStorage.getItem("reviews");
    return saved ? JSON.parse(saved) : [];
}

function saveReviews(reviews) {
    localStorage.setItem("reviews", JSON.stringify(reviews));
}

function createReviewCard(review, index) {
    const template = document.getElementById("reviewTemplate");
    const card = template.cloneNode(true);
    card.style.display = "block";
    card.dataset.index = index;


    const nameEl = card.querySelector(".review-name");
    const ratingEl = card.querySelector(".review-rating");
    const commentEl = card.querySelector(".review-comment");
    const visitEl = card.querySelector(".review-visit");
    const editBtn = card.querySelector(".edit-btn");

    if (nameEl) nameEl.textContent = review.name;
    if (ratingEl) ratingEl.textContent = `Оценка: ${review.rating}`;
    if (commentEl) commentEl.textContent = review.comment;
    if (visitEl) visitEl.textContent = `Дата визита: ${review.visitDate}`;

    if (editBtn) {
        editBtn.addEventListener("click", () => editReview(index));
    }


    return card;
}

function renderReviews() {
    const reviews = loadReviews();
    const container = document.getElementById("reviewsContainer");
    container.innerHTML = "";


    reviews.forEach((rev, i) => {
        container.appendChild(createReviewCard(rev, i));
    });
}


function editReview(index) {
    const reviews = loadReviews();
    const review = reviews[index];


    const name = prompt("Имя:", review.name);
    const rating = prompt("Оценка (1–5):", review.rating);
    const visitDate = prompt("Дата визита (ГГГГ-ММ-ДД):", review.visitDate);
    const comment = prompt("Комментарий:", review.comment);


    if (!name || !comment || !rating || !visitDate) return;


    const ratingNum = Number(rating);
    if (ratingNum < 1 || ratingNum > 5) {
        alert("Оценка должна быть от 1 до 5!");
        return;
    }


    reviews[index] = {
        name,
        rating: ratingNum,
        visitDate,
        comment
    };


    saveReviews(reviews);
    renderReviews();
}


window.addEventListener("DOMContentLoaded", () => {
    const today = new Date().toISOString().split("T")[0];
    document.querySelector("input[name='visitDate']").setAttribute("max", today);
    const form = document.getElementById("reviewForm");

    const ratingInput = document.querySelector("input[name='rating']");

    ratingInput.addEventListener("input", () => {
        let value = Number(ratingInput.value);

        if (value < 1) ratingInput.value = 1;
        if (value > 5) ratingInput.value = 5;
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();


        const name = form.name.value.trim();
        const rating = Number(form.rating.value);
        const visitDate = form.visitDate.value;
        const comment = form.comment.value.trim();


        if (rating < 1 || rating > 5) {
            alert("Оценка должна быть от 1 до 5!");
            return;
        }


        const reviews = loadReviews();
        reviews.push({ name, rating, visitDate, comment });
        saveReviews(reviews);


        form.reset();
        renderReviews();
    });


    renderReviews();
});
