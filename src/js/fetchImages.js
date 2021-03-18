function fetchImages(queryImage, page) {
  const key = '20731826-485a6ef4f9f6fa0c1feddacae';
  const parPage = 12;

  const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${queryImage}
    &page=${page}
    &per_page=${parPage}
    &key=${key}`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
}
export default fetchImages;
