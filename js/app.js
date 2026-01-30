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

  if (category === "ALL") {
    const grouped = menuData.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});

    Object.keys(grouped).forEach((cat, index) => {
      // Category header
      const header = document.createElement("div");
      header.className = "category-section-header";
      header.textContent = cat;
      header.style.background = index % 2 === 0 ? "#ff7a18" : "#ffffff";
      header.style.color = index % 2 === 0 ? "#ffffff" : "#ff7a18";
      menuContainer.appendChild(header);

      // Items
      grouped[cat].forEach(item => {
        const div = document.createElement("div");
        div.className = "menu-item";
        div.innerHTML = `
          <h4>${item.name}</h4>
          <div class="price">₹${item.price}</div>
        `;
        menuContainer.appendChild(div);
      });
    });
  } else {
    const filtered = menuData.filter(item => item.category === category);
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
}

// Initial render
renderCategories();
renderMenu("ALL");
