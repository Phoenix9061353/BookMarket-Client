//For NavBar active link and setPreLink
export function linkSet(id, setPreLink, preLink = '') {
  if (preLink !== '') {
    preLink.classList.remove('active');
  }
  document.querySelector(id).classList.add('active');
  setPreLink(document.querySelector(id));
}
