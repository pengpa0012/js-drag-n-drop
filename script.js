const items = document.querySelectorAll(".item")
const sections = document.querySelectorAll(".section")

items.forEach(el => {
  el.addEventListener("dragstart", (e) => {
    e.target.classList.add("opacity-50")
    console.log(e)
  })


  // append child on container
  el.addEventListener("dragend", (e) => {
    const containerItem = e.target.closest(".section")
    el.classList.add("hidden")
    const newEl = document.createElement("div")
    newEl.className = "item border p-2 rounded-md bg-[#e4e4e4] w-full cursor-grab"
    newEl.textContent = "ITEM"
    containerItem.appendChild(newEl)
  })
})

