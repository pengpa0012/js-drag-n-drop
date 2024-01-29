const items = document.querySelectorAll(".item")
const form = document.querySelector("#form")
const sections = document.querySelectorAll(".section")
const overlay = document.querySelector(".overlay")
const addTask = document.querySelector(".add-task")

document.addEventListener('click', e => {
  if (!form.contains(e.target) && !addTask.contains(e.target)) {
    overlay.classList.add("hide")
    overlay.classList.remove("show")
  }
})

form.addEventListener("submit", e => {
  e.preventDefault()

  console.log(e)

  overlay.classList.add("hide")
  overlay.classList.remove("show")
})

addTask.addEventListener("click", () => {
  overlay.classList.add("show")
  overlay.classList.remove("hide")
})

items.forEach(el => {
  el.addEventListener("dragstart", e => {
    e.target.classList.add('dragging')
    e.target.classList.add("opacity-50")
    console.log(e)
  })

  el.addEventListener("dragend", e => {
    e.target.classList.remove('dragging')
    e.target.classList.remove("opacity-50")
  })
})

sections.forEach(el => {
  el.addEventListener('dragover', e => {
    const draggable = document.querySelector('.dragging')
    el.appendChild(draggable)    
  })  
})