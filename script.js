const form = document.querySelector("#form")
const sections = document.querySelectorAll(".section")
const overlay = document.querySelector(".overlay")
const addTask = document.querySelector(".add-task")

const allItems = [
  {
    id: 1,
    title: "Item 1",
    description: "This is a description",
    column: 1
  },
  {
    id: 2,
    title: "Item 2",
    description: "This is a description",
    column: 1
  },
  {
    id: 3,
    title: "Item 3",
    description: "This is a description",
    column: 3
  }
]

let currentDrag = null

sections.forEach(el => {
  // Add initial items
  allItems.forEach(item => {
    const newItem = document.createElement("div")
    newItem.className = "item border p-2 rounded-md bg-[#e4e4e4] w-full cursor-grab" 
    newItem.setAttribute("draggable", true)
    newItem.setAttribute("data-column", item.column)
    newItem.setAttribute("data-id", item.id)
    newItem.innerHTML = `<p>${item.title}</p><p>${item.description}</p>`
    if(el.attributes["data-column"].value == item.column) {
      el.appendChild(newItem)
    }
  })

  el.addEventListener('dragover', e => {
    // prevent default to allow drop
    e.preventDefault()
    const draggable = document.querySelector('.dragging')

    // FOR SORTING
    const targetItem = e.target;
    if (targetItem !== currentDrag && targetItem.classList.contains('item')) {
      console.log("test")
      const boundingRect = targetItem.getBoundingClientRect();
      const offset = boundingRect.top + (targetItem.offsetHeight / 2)
      console.log(e.clientY, offset)
      if (e.clientY > offset) {
        console.log("AFTER")
        targetItem.parentNode.insertBefore(currentDrag, targetItem.nextSibling);
      } else {
        console.log("BEFORE")
        targetItem.parentNode.insertBefore(currentDrag, targetItem,);
      }
    }

    // DRAG TO OTHER COLUMN
    if(el.attributes["data-column"].value !== draggable.attributes["data-column"]?.value) {
      el.appendChild(draggable)    
    }
  })  

  
  el.addEventListener("drop", e => {
    e.preventDefault()
    // update task object
    const draggable = document.querySelector('.dragging')
    const findItem = allItems.findIndex(el => el.id == draggable.attributes["data-id"].value)
    allItems[findItem].column = parseInt(el.attributes["data-column"].value)
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
  const title = e.target[0].value
  const description = e.target[1].value
  const id = Math.floor(Math.random() * 10000)

  const newItem = document.createElement("div")
  newItem.className = "item border p-2 rounded-md bg-[#e4e4e4] w-full cursor-grab" 
  newItem.setAttribute("draggable", true)
  newItem.setAttribute("data-column", 1)
  newItem.setAttribute("data-id", id)
  newItem.innerHTML = `<p>${title}</p><p>${description}</p>`

  allItems.push({
    id,
    title,
    description,
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
      currentDrag = e.target
      e.target.classList.add('dragging')
      e.target.classList.add("opacity-50")
    })

    el.addEventListener("dragend", e => {
      e.target.classList.remove('dragging')
      e.target.classList.remove("opacity-50")
    })
  })
}

itemsEvent()
