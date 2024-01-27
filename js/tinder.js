
// Tinder

let imgCount = 0
const appLink = 'pablorotten.github.io/fake-tinder/'
const profiles = [
  {img: `images/profiles/calamardo.jpeg`, name: 'Squid', age: '45', distance: '6'},
  {img: `images/profiles/amongus-border1.gif`, name: 'Suspisus', age: '19', distance: '12'},
  {img: `images/profiles/gigachad.jpeg`, name: 'Chad', age: '30', distance: '13'},
  {img: `images/profiles/alo.jpeg`, name: 'Fernanlove', age: '40', distance: '11'},
  {img: `images/profiles/m&m.png`, name: 'Miss M&M', age: '23', distance: '5'},
  {img: `images/profiles/broly.png`, name: 'Broly', age: '31', distance: '13'},
  {img: `images/profiles/piggy.png`, name: 'Piggy', age: '39', distance: '51'},
  {img: `images/profiles/vegeta.png`, name: 'Vegeta', age: '44', distance: '21'},
  {img: `images/profiles/werewolf.png`, name: 'Lobo', age: '18', distance: '1'},
  {img: `images/profiles/qr.png`, name: 'link'},

]
const frame = document.body.querySelector('.frame')
profiles.forEach(profile => appendCard(profile))

let current = frame.querySelector('.card:last-child')
let likeText = current.children[0]
let startX = 0, startY = 0, moveX = 0, moveY = 0
initCard(current)

document.querySelector('#like').onclick = () => {
  moveX = 1
  moveY = 0
  console.log("like!!!!")
  complete()
}
document.querySelector('#hate').onclick = () => {
  moveX = -1
  moveY = 0
  complete()
}
document.querySelector('#link').onclick = () => {
  console.log("Link!!!!")
  window.open(`https://${appLink}`, "_blank");
}

function appendCard(profile) {
  const firstCard = frame.children[0]
  const newCard = document.createElement('div')
  newCard.className = 'card'
  newCard.style.backgroundImage = `url(${profile.img})`
  newCard.innerHTML = `
          <div class="is-like">LIKE</div>
          <div class="bottom">
            <div class="title">
              ${profile.name === 'link' ? `<span><a href="" id="link">${appLink}<span></a>` : `<span>${profile.name}</span><span>${profile.age}</span>`}
            </div>
            <div class="info">
              ${profile.name !== 'link' ? `${profile.distance} miles away` : ``}
            </div>
          </div>
        `
  if (firstCard) frame.insertBefore(newCard, firstCard)
  else frame.appendChild(newCard)
  imgCount++
}

function initCard(card) {
  card.addEventListener('pointerdown', onPointerDown)
}

function setTransform(x, y, deg, duration) {
  current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${deg}deg)`
  likeText.style.opacity = Math.abs((x / innerWidth * 2.1))
  likeText.className = `is-like ${x > 0 ? 'like' : 'nope'}`
  if (duration) current.style.transition = `transform ${duration}ms`
}

function onPointerDown({clientX, clientY}) {
  startX = clientX
  startY = clientY
  current.addEventListener('pointermove', onPointerMove)
  current.addEventListener('pointerup', onPointerUp)
  current.addEventListener('pointerleave', onPointerUp)
}

function onPointerMove({clientX, clientY}) {
  moveX = clientX - startX
  moveY = clientY - startY
  setTransform(moveX, moveY, moveX / innerWidth * 50)
}

function onPointerUp() {
  current.removeEventListener('pointermove', onPointerMove)
  current.removeEventListener('pointerup', onPointerUp)
  current.removeEventListener('pointerleave', onPointerUp)
  if (Math.abs(moveX) > frame.clientWidth / 2) {
    current.removeEventListener('pointerdown', onPointerDown)
    complete()
  } else cancel()
}

function complete() {
  const flyX = (Math.abs(moveX) / moveX) * innerWidth * 1.3
  const flyY = (moveY / moveX) * flyX
  setTransform(flyX, flyY, flyX / innerWidth * 50, innerWidth)

  const prev = current
  const next = current.previousElementSibling
  if (next) initCard(next)
  current = next
  likeText = current.children[0]
  appendCard(profiles[imgCount % profiles.length])
  setTimeout(() => frame.removeChild(prev), innerWidth)
}

function cancel() {
  setTransform(0, 0, 0, 100)
  setTimeout(() => current.style.transition = '', 100)
}
