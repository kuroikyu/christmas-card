(() => {
  const card = document.getElementsByClassName('flip-container')[0]
  let firstTimeClick = false
  card.addEventListener('click', event => {
    if (!firstTimeClick) {
      card.classList.remove('hover')
      firstTimeClick = true
    }
    let cName = 'flip-it';
    let toggled = card.classList.contains(cName)
    card.classList[toggled ? 'remove' : 'add'](cName)
  })
})()

// function getQueryVariable(variable) {
//   let query = location.search.substring(1)
//   let vars = query.split('&')
//   for (let i=0; i<vars.length; i++) {
//     let pair = vars[i].split('=')
//     if (pair[0] == variable) {return pair[1]}
//   }
//     return false;
// }

function getQueryValues() {
  let query = location.search.substring(1)
  let vars = query.split('&')
  let values = []

  // loop through all URL values
  for (let i=0; i<vars.length; i++) {
    let out = vars[i].split('=')[1]
    // check if there are no parameters in the URL
    if (typeof out === 'undefined') {
      out = 'You'
      return out
    }
    out = out.replace(/%20/g, ' ')
    values.push(out)
  }
  if (values.length > 1) {
    return values.join(', ')
  } else {
    return values
  }
};

(() => {
  let targety
  let addressedTo

  // Cache target DOM element
  targety = document.getElementsByClassName('names-target')[0]
  // Get names from url
  addressedTo = getQueryValues()
  // Fill target element with the names
  targety.innerHTML = addressedTo
})()
