const lightButton = document.getElementById("light")
const darkButton = document.getElementById("dark")
const solarButton = document.getElementById("solar")
const body = document.body

const theme = localStorage.getItem("theme")
const isSolar = localStorage.getItem("isSolar")

if (theme) {
  body.classList.add(theme)
  isSolar && body.classList.add("solar")
}
lightButton.onclick = () => {
  body.classList.replace("dark", "light")
  localStorage.setItem("theme", "light")
}
darkButton.onclick = () => {
  body.classList.replace("light", "dark")
  localStorage.setItem("theme", "dark")
}
solarButton.onclick = () => {
  if (body.classList.contains("solar")) {
    body.classList.remove("solar")
    solarButton.style.cssText = "--bg-solar: var(--yellow);"
    solarButton.innerText = "solarize"
    localStorage.removeItem("isSolar")
    return
  }

  solarButton.style.cssText = "--bg-solar: white;"
  body.classList.add("solar")
  localStorage.setItem("isSolar", true)
}

const mainCard = document.getElementById("main-card")
const animatedCards = document.querySelectorAll(".animated-card")
const staggerDelay = 100 // ms

// Start

animatedCards.forEach((e, i) => {
  e.style.gridArea = String.fromCharCode(97 + i)
  const lastCard = animatedCards[animatedCards.length - 1]
  lastCard.style.gridArea = "⭐️"

  cardEntranceAnimation(e, i)
})

// Function to handle card entrance animation
function cardEntranceAnimation(e, i) {
  e.style.animation = `cardEntrance 700ms ease-out ${i * staggerDelay}ms`
  e.style.animationFillMode = "backwards"
}

// Function to handle card departure animation
function cardDepartureAnimation(e, i, delay) {
  e.style.animation = "none"
  void e.offsetWidth
  e.style.animation = `cardDeparture 700ms ease ${
    (i - (i - delay)) * staggerDelay
  }ms`
  e.style.animationFillMode = "forwards"
}

// Add click event listener to mainCard
mainCard.addEventListener("click", () => {
  let delay = 13
  animatedCards.forEach((e, i) => {
    cardDepartureAnimation(e, i, delay)
    delay--
  })
})

// When first card's departure animation ends,
// Give each animated card entrance animation.
const firstCard = document.querySelector(".first-card")

firstCard.addEventListener("animationend", (e) => {
  if (e.animationName === "cardDeparture") {
    animatedCards.forEach((e, i) => {
      cardEntranceAnimation(e, i)
    })
  }
})

function copyFunction() {
  const copyText = document.getElementById("copy-text")
  const coppyButton = document.getElementById("copy-button")

  copyText.select()
  copyText.setSelectionRange(0, 99999) // For mobile devices

  navigator.clipboard.writeText(copyText.value)

  coppyButton.setAttribute("value", "Copied the text!")
  setTimeout(() => {
    coppyButton.setAttribute("value", "Copy")
  }, 2500)
}
