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
