function onClickImage(e) {
  e.preventDefault();

  if (e.target.odeName !== 'img') {
    return;
  }
}
export { onClickImage };