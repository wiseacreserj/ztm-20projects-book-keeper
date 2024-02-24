//Elements
const modal = document.querySelector("#modal");
const modalShow = document.querySelector("#show-modal");
const modalClose = document.querySelector("#close-modal");
const bookmarkForm = document.querySelector("#bookmark-form");
const websiteNameEl = document.querySelector("#website-name");
const websiteUrlEl = document.querySelector("#website-url");
const bookmarksContainer = document.querySelector("#bookmarks-container");

/* Show Modal, Focus on input */

const showModal = () => {
    modal.classList.add("show-modal");
    websiteNameEl.focus();
};

//Modal event listener
modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", () => {
    modal.classList.remove("show-modal");
});
window.addEventListener("click", (event) => {
    event.target === modal ? modal.classList.remove("show-modal") : false;
});

const validate = (nameValue, urlValue) => {
    const expression =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    const regex = new RegExp(expression);
    if (!nameValue || !urlValue) {
        alert("Please submit values for both fields");
        return false;
    }
    if (urlValue.match(regex)) {
        alert("match");
        return true;
    }

    if (!urlValue.match(regex)) {
        alert("Please provide a valud web address");
        return false;
    }
};

// Handle data from form

const storeBookmark = (event) => {
    event.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if (!urlValue.includes("http://", "https://")) {
        urlValue = `https://${urlValue}`;
    }
    console.log(nameValue, urlValue);
    if (!validate(nameValue, urlValue)) {
        return false;
    }
};

//Event listeners
bookmarkForm.addEventListener("submit", storeBookmark);
