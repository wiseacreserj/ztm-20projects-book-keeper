//Elements
const modal = document.querySelector("#modal");
const modalShow = document.querySelector("#show-modal");
const modalClose = document.querySelector("#close-modal");
const bookmarkForm = document.querySelector("#bookmark-form");
const websiteNameEl = document.querySelector("#website-name");
const websiteUrlEl = document.querySelector("#website-url");
const bookmarksContainer = document.querySelector("#bookmarks-container");

let bookmarks = [];

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
        return true;
    }

    if (!urlValue.match(regex)) {
        alert("Please provide a valud web address");
        return false;
    }
};

//Build bookmarks DOM

const buildBookmarks = () => {
    //Remove all bookmark elements
    bookmarksContainer.textContent = "";
    //Buid Items
    bookmarks.forEach((bookmark) => {
        const { name, url } = bookmark;
        //Item
        const item = document.createElement("div");
        item.classList.add("item");
        const closeIcon = document.createElement("i");
        closeIcon.classList.add("fas", "fa-times");
        closeIcon.setAttribute("title", "Delete Bookmark");
        closeIcon.setAttribute("onclick", `deleteBookmark('${url}')`);
        //Favicon / link container
        const linkInfo = document.createElement("div");
        linkInfo.classList.add("name");
        const favicon = document.createElement("img");
        favicon.setAttribute(
            "src",
            `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
        );
        favicon.setAttribute("alt", "Favicon");
        const link = document.createElement("a");
        link.setAttribute("href", `${url}`);
        link.setAttribute("target", "_blank");
        link.textContent = name;
        //Appent to bookmarks container
        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarksContainer.appendChild(item);
    });
};

//Fetch bookmarks

const fetchBookmarks = () => {
    if (localStorage.getItem("bookmarks")) {
        bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    } else {
        bookmarks = [];
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
    buildBookmarks();
};

//Delete Bookmark
const deleteBookmark = (url) => {
    bookmarks = bookmarks.filter((bookmark) => bookmark.url !== url);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarks();
};

// Handle data from form

const storeBookmark = (event) => {
    event.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if (!urlValue.includes("http://", "https://")) {
        urlValue = `https://${urlValue}`;
    }

    if (!validate(nameValue, urlValue)) {
        return false;
    }

    const bookmark = {
        name: nameValue,
        url: urlValue,
    };

    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarks();

    bookmarkForm.reset();
    websiteNameEl.focus();
};

//Event listeners
bookmarkForm.addEventListener("submit", storeBookmark);

//inial load
fetchBookmarks();
