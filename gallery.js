import gallery from "./gallery-items.js";
const refs = {
	ul: document.querySelector(".js-gallery"),
	button: document.querySelector(".lightbox__button"),
	modal: document.querySelector(".js-lightbox"),
	originImg: document.querySelector(".lightbox__image"),
};
refs.ul.addEventListener("click", getOriginalImg);
refs.modal.addEventListener("click", onCloseModal);

renderGallery();

function generationId() {
	gallery.reduce((acc, el) => {
		el.id = acc;
		return acc + 1;
	}, 1);
}

function renderGallery() {
	generationId();
	const galleryTeg = gallery.map((el) => {
		return `<li class='gallery__item'>
		<a class="gallery__link">
		<img class="gallery__image" src=${el.preview} alt="${el.description}" data-id="${el.id}">
		</a>
		</li>`;
	});
	refs.ul.insertAdjacentHTML("afterbegin", galleryTeg.join(""));
}

function getOriginalImg(e) {
	e.preventDefault();
	const tagImg = e.target;
	if (tagImg.nodeName !== "IMG") {
		return;
	}
	gallery.forEach((img) => {
		if (tagImg.src === img.preview) {
			refs.originImg.src = img.original;
			return console.log(tagImg);
		}
	});
	onOpenModal();
}

function onOpenModal() {
	refs.modal.classList.add("is-open");
	window.addEventListener("keydown", (e) => {
		console.dir(e);
		if (e.key === "Escape") {
			onCloseModal();
		}
	});
}

function onCloseModal(e) {
	if (e.target.nodeName === "BUTTON" || e.target.nodeName === "DIV") {
		window.removeEventListener("keydown", onCloseModal);
		return refs.modal.classList.remove("is-open");
	}
}
