(() => {
  const card = document.getElementsByClassName('image')[0];

  card.addEventListener('click', event => {
    let cName = 'flipped';
    let toggled = card.classList.contains(cName);
    card.classList[toggled ? 'remove' : 'add'](cName);
  })
})()
