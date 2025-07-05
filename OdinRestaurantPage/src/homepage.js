export default function homepage() {
  const elems = [];
  const contentDiv = document.querySelector("div#content");
  contentDiv.innerHTML = "";
  const heading = document.createElement("h1");
  heading.textContent = "Restaurant";
  elems.push(heading);

  const info = document.createElement("div");
  info.classList.add("info");

  info.appendChild((function() {
    const section = document.createElement("section");
    const h2 = document.createElement("h2");
    h2.textContent = "Welcome to Odin Restaurant";
    const em = document.createElement("em");
    em.textContent = "Delicious moments start here.";
    const p = document.createElement("p");
    p.textContent = `At Odin Restaurant, we believe in the power of good food to bring
            people together. Whether you're joining us for a cozy dinner, a
            family celebration, or a quick bite, our menu is crafted with fresh
            ingredients, bold flavors, and love for what we do.`
    section.appendChild(h2);
    section.appendChild(em);
    section.appendChild(p);
    return section;
  })())

  info.appendChild((function() {
    const section = document.createElement("section");
    const h2 = document.createElement("h2");
    h2.textContent = "Our Story";
    const p = document.createElement("p");
    p.textContent = `Founded in 2025, Odin Restaurant has been serving the heart of this
            webpage with passion and purpose. Our team is dedicated to
            delivering an unforgettable dining experience in a warm and
            welcoming atmosphere.`
    section.appendChild(h2);
    section.appendChild(p);
    return section;
  })())
  elems.push(info)
  for (const el of elems) {
    contentDiv.appendChild(el);
  }
}
