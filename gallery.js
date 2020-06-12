import gallery from "./gallery-items.js";
const refs = {
	ul: document.querySelector(".js-gallery"),
	button: document.querySelector(".lightbox__button"),
	modal: document.querySelector(".js-lightbox"),
	originImg: document.querySelector(".lightbox__image"),
};
refs.ul.addEventListener("click", getOriginalImg);

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
			refs.originImg.alt = tagImg.alt;
			refs.originImg.id = img.id;
		}
	});

	onOpenModal();
}

function onOpenModal() {
	refs.modal.classList.add("is-open");
	refs.modal.addEventListener("click", onCloseModal);
	window.addEventListener("keydown", scrollingImages);
	window.addEventListener("keydown", onCloseModal);
}

function onCloseModal(e) {
	e.preventDefault();
	if (
		e.target.nodeName === "BUTTON" ||
		e.target.nodeName === "DIV" ||
		e.key === "Escape"
	) {
		refs.originImg.src = "";
		refs.modal.removeEventListener("click", onCloseModal);
		window.removeEventListener("keydown", onCloseModal);
		window.removeEventListener("keydown", scrollingImages);
		refs.modal.classList.remove("is-open");
	} else if (e.key !== "Escape") {
		return;
	}
}

function scrollingImages(e) {
	let idVar = Number(refs.originImg.id);

	if (e.key === "ArrowLeft") {
		prevImg();
	} else if (e.key === "ArrowRight") {
		nextImg();
	}

	function nextImg() {
		idVar += 1;
		if (idVar > gallery.length) {
			idVar = 1;
		}

		gallery.forEach((img) => {
			if (img.id == idVar) {
				refs.originImg.src = img.original;
				refs.originImg.alt = img.description;
				refs.originImg.id = img.id;
				idVar = refs.originImg.id;
			}
		});
	}
	function prevImg() {
		idVar -= 1;
		if (idVar === 0) {
			idVar = gallery.length;
		}
		gallery.forEach((img) => {
			if (img.id == idVar) {
				refs.originImg.src = img.original;
				refs.originImg.alt = img.description;
				refs.originImg.id = img.id;
				idVar = refs.originImg.id;
			}
		});
	}
}
