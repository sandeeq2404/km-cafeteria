const categoryBar = document.getElementById("categoryBar");
const menuContainer = document.getElementById("menuContainer");
const loader = document.getElementById("loader");
const loaderText = document.getElementById("loaderText");

const quotes = [
  "Brewing happiness, one cup at a time ☕",
  "Fresh flavors, fast service.",
  "Good food is good mood 😋",
  "Your daily dose of deliciousness.",
  "Sip. Snack. Smile.",
  "Where every bite matters.",
  "Serving warmth and taste.",
  "Happiness starts with food.",
  "Freshly made, just for you.",
  "Taste that makes you return."
];

// Pick ONE random quote
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
loaderText.textContent = randomQuote;

// Hide loader after 3 seconds
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.style.display = "none";
  }, 3000);
});



// Map category → image
const categoryImages = {
  "Hot Beverages": "assets/images/hot.webp",
  "Fresh Juice": "assets/images/freshjuice.webp",
  "Falooda Special": "assets/images/falooda.webp",
  "Ice Cream & Desserts": "assets/images/icecream.webp",
  "Chat": "assets/images/chat.webp",
  "Snacks": "assets/images/Snacks.webp",
  "Fries": "assets/images/fries.webp",
  "Momos": "assets/images/momos.webp",
  "Mojito": "assets/images/mojito.webp",
  "Avil Milk": "assets/images/avil.webp",
  "Milkshake Special": "assets/images/milkshake.webp",
  "Toast":"assets/images/toast.webp",
  "Sandwiches": "assets/images/sandwich.webp",
  "Burger": "assets/images/burger.webp",
  "Icecream Shake": "assets/images/icecream.webp",
  "Monster Shake's": "assets/images/monster.webp",
  "Cold Coffee": "assets/images/coldcoffee.webp",
  "Parcel": "assets/images/hot.webp",
  
};

// Get unique categories
const categories = ["ALL", ...new Set(menuData.map(item => item.category))];

// Render categories bar
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

    Object.keys(grouped).forEach(cat => {
      const section = document.createElement("div");
      section.className = "category-section";

      const header = document.createElement("div");
      header.className = "category-banner";
      const img = categoryImages[cat] || "assets/images/default.webp";
      header.style.backgroundImage = `url(${img})`;
      header.innerHTML = `<span>${cat}</span>`;
      section.appendChild(header);

      grouped[cat].forEach(item => {
        const div = document.createElement("div");
        div.className = "menu-item";
        div.innerHTML = `
          <h4>${item.name}</h4>
          <div class="price">₹${item.price}</div>
        `;
        section.appendChild(div);
      });

      menuContainer.appendChild(section);
    });
  } else {
    const banner = document.createElement("div");
    banner.className = "category-banner single-view";
    const img = categoryImages[category] || "assets/images/default.webp";
    banner.style.backgroundImage = `url(${img})`;
    banner.innerHTML = `<span>${category}</span>`;
    menuContainer.appendChild(banner);

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
