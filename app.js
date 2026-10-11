
const productsData = [
  {
    id: 1,
    name: "Non",
    price: 5000,
    category: "Oziq-ovqat",
    image: "https://dostavo4ka.uz/upload-file/2021/07/05/6239/750x750-9b2d792c-266d-41c6-af4c-e50ddcd703ed.jpg"
  },
  {
    id: 2,
    name: "Lactel sut",
    price: 12000,
    category: "Oziq-ovqat",
    image: "https://olcha.uz/image/675x900/products/cdn_1/supplier/stores/1/2024-04-18/EYeJ3VmDvdihuSUP71500BmQzkwrSK23vAwKS6dpF8E5BW2qMZPNJomAkJOj.jpg"
  },
  {
    id: 3,
    name: "Shakar",
    price: 15000,
    category: "Oziq-ovqat",
    image: "https://cdn.bigmart.uz/file/hub/file/2025/12/19/373pYH2dMc8Fuk4cftEXBWrVEj8.jpg"
  },
  {
    id: 4,
    name: "Olma",
    price: 10000,
    category: "Meva va sabzavot",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Banan",
    price: 18000,
    category: "Meva va sabzavot",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Elseve shampun",
    price: 25000,
    category: "Uy-ro‘zg‘or",
    image: "https://pharmaclick.uz/upload/Sh/imageCache/263/966/9665753763287993.webp"
  }
];

let cart = [];
let selectedCategory = "all";
let searchText = "";

const money = amount =>
  amount.toLocaleString("uz-UZ") + " so‘m";

function renderCategories() {
  const container = document.getElementById("categories");
  if (!container) return;

  container.innerHTML = "";

  const categories = [
    { name: "Barchasi", value: "all" },
    ...[...new Set(productsData.map(p => p.category))]
      .map(name => ({ name, value: name }))
  ];

  categories.forEach(category => {
    const button = document.createElement("button");
    button.className =
      "category" +
      (selectedCategory === category.value ? " active" : "");
    button.textContent = category.name;

    button.onclick = () => {
      selectedCategory = category.value;
      renderCategories();
      renderProducts();
    };

    container.appendChild(button);
  });
}

function renderProducts() {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";

  const filtered = productsData.filter(product => {
    const categoryMatch =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    const searchMatch =
      product.name.toLowerCase().includes(searchText.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const count = document.getElementById("product-count");
  if (count) {
    count.textContent = `${filtered.length} ta mahsulot`;
  }

  if (filtered.length === 0) {
    container.innerHTML =
      '<p class="message">Mahsulot topilmadi.</p>';
    return;
  }

  filtered.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    const imageBox = document.createElement("div");
    imageBox.className = "product-image";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.onerror = () => {
      img.style.display = "none";
      imageBox.textContent = "Rasm yuklanmadi";
    };

    imageBox.appendChild(img);

    const name = document.createElement("h3");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = money(product.price);

    const button = document.createElement("button");
    button.textContent = "Savatchaga qo‘shish";
    button.onclick = () => addToCart(product.id);

    card.append(imageBox, name, price, button);
    container.appendChild(card);
  });
}

function addToCart(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function renderCart() {
  const itemsContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");
  const modalTotal = document.getElementById("modal-total");
  const countElement = document.getElementById("cart-count");

  let total = 0;
  let quantityTotal = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    quantityTotal += item.quantity;
  });

  if (totalElement) totalElement.textContent = money(total);
  if (modalTotal) modalTotal.textContent = money(total);
  if (countElement) countElement.textContent = quantityTotal;

  if (itemsContainer) {
    itemsContainer.innerHTML = "";

    cart.forEach(item => {
      const row = document.createElement("div");
      row.className = "cart-item";

      const label = document.createElement("span");
      label.textContent =
        `${item.name} × ${item.quantity} — ${money(item.price * item.quantity)}`;

      const decrease = document.createElement("button");
      decrease.textContent = "−";
      decrease.onclick = () => {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          cart = cart.filter(p => p.id !== item.id);
        }
        renderCart();
      };

      const increase = document.createElement("button");
      increase.textContent = "+";
      increase.onclick = () => {
        item.quantity += 1;
        renderCart();
      };

      row.append(label, decrease, increase);
      itemsContainer.appendChild(row);
    });

    if (cart.length === 0) {
      itemsContainer.textContent = "Savatcha hozircha bo‘sh.";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderProducts();
  renderCart();

  const search = document.getElementById("search");
  if (search) {
    search.addEventListener("input", event => {
      searchText = event.target.value.trim();
      renderProducts();
    });
  }

  const openCart = document.getElementById("open-cart");
  const closeCart = document.getElementById("close-cart");
  const modal = document.getElementById("cart-modal");

  if (openCart && modal) {
    openCart.onclick = () => modal.classList.remove("hidden");
  }

  if (closeCart && modal) {
    closeCart.onclick = () => modal.classList.add("hidden");
  }

  const checkout = document.getElementById("checkout");
  if (checkout) {
    checkout.onclick = () => {
      if (cart.length === 0) {
        alert("Avval savatchaga mahsulot qo‘shing.");
        return;
      }

      alert("Savatcha tayyor. Buyurtmani Telegram botga yuborish funksiyasini keyingi bosqichda ulaymiz.");
    };
  }
});
