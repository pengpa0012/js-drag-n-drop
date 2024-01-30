const form = document.querySelector("#form")
const sections = document.querySelectorAll(".section")
const overlay = document.querySelector(".overlay")
const addTask = document.querySelector(".add-task")

const allItems = [
  {
    title: "Item 1",
    description: "This is a description",
    column: 1
  },
  {
    title: "Item 2",
    description: "This is a description",
    column: 1
  },
  {
    title: "Item 3",
    description: "This is a description",
    column: 3
  }
]

sections.forEach(el => {
  // Add initial items
  allItems.forEach(item => {
    const newItem = document.createElement("div")
    newItem.className = "item border p-2 rounded-md bg-[#e4e4e4] w-full cursor-grab" 
    newItem.setAttribute("draggable", true)
    newItem.textContent = item.title
    console.log(el.attributes["data-column"].value)
    if(el.attributes["data-column"].value == item.column) {
      el.appendChild(newItem)
    }
  })

  el.addEventListener('dragover', e => {
    const draggable = document.querySelector('.dragging')
    el.appendChild(draggable)    
  })  
})

document.addEventListener('click', e => {
  if (!form.contains(e.target) && !addTask.contains(e.target)) {
    overlay.classList.add("hide")
    overlay.classList.remove("show")
  }
})

form.addEventListener("submit", e => {
  e.preventDefault()
  const newItem = document.createElement("div")
  newItem.className = "item border p-2 rounded-md bg-[#e4e4e4] w-full cursor-grab" 
  newItem.setAttribute("draggable", true)
  newItem.textContent = "121111"

  allItems.push({
    title: "test 111",
    description: "432432423",
    column: 1
  })

  sections[0].appendChild(newItem)
  itemsEvent()

  overlay.classList.add("hide")
  overlay.classList.remove("show")
})

addTask.addEventListener("click", () => {
  overlay.classList.add("show")
  overlay.classList.remove("hide")
})

function itemsEvent() {
  const items = document.querySelectorAll(".item")

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
}

itemsEvent()

