const categoryBar = document.getElementById("categoryBar");
const menuContainer = document.getElementById("menuContainer");

// Get unique categories
const categories = ["ALL", ...new Set(menuData.map(item => item.category))];

// Render categories
function renderCategories() {
  categoryBar.innerHTML = "";
  categories.forEach((cat, index) => {
    const btn = document.createElement("button");
    btn.className = "category-btn" + (index === 0 ? " active" : "");
    btn.textContent = cat;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderMenu(cat);
    });
    categoryBar.appendChild(btn);
  });
}

// Render menu items
function renderMenu(category) {
  menuContainer.innerHTML = "";
  const filtered = category === "ALL" ? menuData : menuData.filter(item => item.category === category);

  filtered.forEach(item => {
    const div = document.createElement("div");
    div.className = "menu-item";
    div.innerHTML = `
      <h4>${item.name}</h4>
      <div class="price">₹${item.price}</div>
    `;
    menuContainer.appendChild(div);
  });
}

// Initial render
renderCategories();
renderMenu("ALL");
