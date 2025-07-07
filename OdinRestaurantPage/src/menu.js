const menuDataTemplate = [
  {
    category: "Burgers",
    link: "https://free-food-menus-api-two.vercel.app/burgers",
    count: 3,
  },
  {
    category: "Pizza",
    link: "https://free-food-menus-api-two.vercel.app/pizzas",
    count: 4,
  },
  {
    category: "Desserts",
    link: "https://free-food-menus-api-two.vercel.app/desserts",
    count: 3,
  },
  {
    category: "Drinks",
    link: "https://free-food-menus-api-two.vercel.app/drinks",
    count: 5,
  },
]
const data = await (async () => {
  const data = [...menuDataTemplate];
  for (let i = 0; i < data.length; i++) {
    data[i].items = await fetchData(data[i].link, data[i].count);
  }
  return data
})()
function createCategory(category) {
  const categorySection = document.createElement("section");
  categorySection.classList.add("category");
  categorySection.innerHTML = `<h2>${category.category}</h2>`
  const itemsDiv = document.createElement("div");
  itemsDiv.classList.add("items");
  for (const item of category.items) {
    itemsDiv.appendChild(createItem(item));
  }
  categorySection.appendChild(itemsDiv);
  return categorySection
}
function createItem(item) {
  const itemDiv = document.createElement("div");
  itemDiv.innerHTML = `<h3>${item.name}</h3><p>${item.dsc}</p><p><strong>$${item.price}</strong></p>`
  itemDiv.classList.add("item");
  itemDiv.onclick = () => openModal(item);
  return itemDiv;
}
export default function menu() {
  const contentDiv = document.querySelector("div#content");
  contentDiv.innerHTML = "";
  const heading = document.createElement("h1");
  heading.innerText = "Our menu";
  const div = document.createElement("div");
  div.classList.add("menu");
  contentDiv.appendChild(heading);

  for (const category of data) {
    div.appendChild(createCategory(category));
  }
  const modalDiv = document.createElement("div");
  modalDiv.classList.add("modal");
  modalDiv.id = "dishModal";
  modalDiv.innerHTML = `<div class="modal-content">
        <div class="modal-header">
          <span class="close">&times;</span>
          <h2 class="name"></h2>
        </div>
        <div class="modal-body"></div>
        <div class="modal-footer"><p class="description"></p></div>
      </div>`

  const span = modalDiv.querySelector(".close");

  span.onclick = function() {
    modalDiv.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modalDiv) {
      modalDiv.style.display = "none";
    }
  }

  window.onkeydown = function(event) {
    if (event.key === "Escape") {
      modalDiv.style.display = "none";
    }
  }
  contentDiv.appendChild(div);
  contentDiv.appendChild(modalDiv);
}

function openModal(item) {
  const modal = document.querySelector("#dishModal");
  modal.querySelector(".modal-header > .name").textContent = item.name;
  modal.querySelector(".modal-footer> .description").textContent = item.dsc;
  modal.querySelector(".modal-body").innerHTML = `<img src=${item.img} alt="${item.name}"/>`;
  modal.style.display = "flex";
}

async function fetchData(url, count = 1) {
  const data = await fetch(url).then((res) => res.json());
  return data.slice(0, count);

}

