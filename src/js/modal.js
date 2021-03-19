import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function onClickImage(e) {
  e.preventDefault();

  //   if (e.target.nodeName !== 'img') {
  //     return;
  //   }

  const imageModal = `<img src="${e.target.dataset.sourse} alt="image"/>"`;
  const instance = basicLightbox.create(imageModal);

  instance.show();

  console.log(e.target);
}
export { onClickImage };
