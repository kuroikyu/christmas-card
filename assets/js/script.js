(() => {
  const card = document.getElementsByClassName('flip-container')[0]
  card.addEventListener('click', event => {
    let cName = 'flip-it';
    let toggled = card.classList.contains(cName)
    card.classList[toggled ? 'remove' : 'add'](cName)
  })
})()

function getQueryVariable(variable) {
  let query = location.search.substring(1)
  let vars = query.split('&')
  for (let i=0; i<vars.length; i++) {
    let pair = vars[i].split('=')
    if (pair[0] == variable) {return pair[1]}
  }
    return false;
}

function getQueryValues() {
  let query = location.search.substring(1)
  let vars = query.split('&')
  let values = []
  for (let i=0; i<vars.length; i++) {
    let out = vars[i].split('=')[1]
    out = out.replace('%20', ' ')
    values.push(out)
  }
    return values
}


(() => {
  const targety = document.getElementsByClassName('names-target')[0]
  targety.innerHTML = getQueryValues().join(', ')
})()
