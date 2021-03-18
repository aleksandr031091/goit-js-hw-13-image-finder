import fetchImages from '../js/fetchImages';
import cardMarkupTpl from '../templates/cardMarkup.hbs';
// import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/core/dist/BrightTheme.css';
// import { error } from '@pnotify/core/dist/PNotify.js';

const refs = {
  galery: document.querySelector('#galery'),
  searchForm: document.querySelector('#search-form'),
  leadMore: document.querySelector('#leadMore'),
};

// refs.galery.addEventListener('click', onClickImage);
refs.searchForm.addEventListener('submit', onSubmit);
refs.leadMore.addEventListener('click', onLeadMore);

let page = 1;
let queryImage = '';
refs.leadMore.textContent = 'Loading...';

function setMarkupInGalery(page) {
  refs.galery.insertAdjacentHTML('beforeend', cardMarkupTpl(page));
}

function onSubmit(e) {
  e.preventDefault();
  queryImage = e.currentTarget.elements.query.value;
  page = 1;

  refs.galery.innerHTML = '';

  setImageInMarkup();
}

function onLeadMore() {
  page += 1;
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }, 300);
  setImageInMarkup();
}

function setImageInMarkup() {
  refs.leadMore.disabled = true;
  fetchImages(queryImage, page).then(data => {
    setMarkupInGalery(data.hits);
    refs.leadMore.disabled = false;
    refs.leadMore.textContent = 'Load more';
  });
}
