const gridContainer = document.querySelector("main.container");
gridContainer.addEventListener("mouseover", (ev) => {
  if (!ev.target.classList.contains("cell")) return;
  if (ev.target.style.backgroundColor) {
    const opacity = Number(ev.target.style.opacity);
    if (opacity < 1) {
      ev.target.style.opacity = opacity + 0.1;
    }
    return;
  }
  ev.target.style.backgroundColor = randomColor();
  ev.target.style.opacity = 0.1;
});
initGrid(16);

function initGrid(gridSize) {
  gridContainer.replaceChildren();
  const root = document.querySelector(":root");
  root.style.setProperty("--grid-size", gridSize);
  for (let i = 0; i < gridSize ** 2; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    gridContainer.appendChild(cell);
  }
}

function random(n) {
  return Math.floor(Math.random() * n) + 1;
}
function randomColor() {
  return `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
}
document.getElementById("create-grid").addEventListener("click", () => {
  const size = Number(prompt("Enter grid size: (between 16 and 100)"));
  if (isNaN(size) || size > 100 || size < 16) {
    alert(`Grid size value ${size} is invalid`);
    return;
  }
  initGrid(size);
});
