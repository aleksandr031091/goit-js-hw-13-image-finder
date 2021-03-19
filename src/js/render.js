import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error, message } from '@pnotify/core/dist/PNotify.js';
import fetchImages from '../js/fetchImages';
import cardMarkupTpl from '../templates/cardMarkup.hbs';
import { onClickImage } from '../js/modal';

const refs = {
  galery: document.querySelector('#galery'),
  searchForm: document.querySelector('#search-form'),
  leadMore: document.querySelector('#leadMore'),
};

refs.galery.addEventListener('click', onClickImage);
refs.searchForm.addEventListener('submit', onSubmit);
refs.leadMore.addEventListener('click', onLeadMore);

let page = 1;
let queryImage = '';

function setMarkupInGalery(page) {
  refs.galery.insertAdjacentHTML('beforeend', cardMarkupTpl(page));
}

function onSubmit(e) {
  e.preventDefault();
  queryImage = e.currentTarget.elements.query.value;
  page = 1;

  refs.galery.innerHTML = '';

  if (queryImage === '') {
    return submitEmptyInput();
  }
  setImageInMarkup(message);
}

function onLeadMore() {
  page += 1;
  setImageInMarkup(true);
}

function setImageInMarkup(shouldScroll = false) {
  refs.leadMore.classList.remove('hiden');
  refs.leadMore.disabled = true;
  refs.leadMore.textContent = 'Loading...';
  fetchImages(queryImage, page).then(data => {
    setMarkupInGalery(data.hits);

    if (shouldScroll) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }

    if (data.hits.length < 12) {
      refs.leadMore.classList.add('hiden');
      if (data.hits.length < 1) {
        sabmitInvalitDataInInput();
      }
      return;
    }

    refs.leadMore.disabled = false;
    refs.leadMore.textContent = 'Load more...';
  });
}
function submitEmptyInput() {
  error({
    text: 'Please enter something!',
    delay: 2000,
  });
}
function sabmitInvalitDataInInput() {
  error({
    text: 'Nothing found,please try another query',
    delay: 2000,
  });
}
