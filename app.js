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
    image: "
image: "https://pharmaclick.uz/upload/Sh/imageCache/263/966/9665753763287993.webp"
"
  }
];

let cart = [];

function renderProducts() {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";

  productsData.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    const imageBox = document.createElement("div");
    imageBox.className = "product-image";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.onerror = () => {
      imageBox.textContent = "Rasm yuklanmadi";
    };

    imageBox.appendChild(img);

    const name = document.createElement("h3");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = product.price.toLocaleString("uz-UZ") + " so‘m";

    const button = document.createElement("button");
    button.textContent = "Savatchaga qo‘shish";
    button.onclick = () => addToCart(product.id);

    card.append(imageBox, name, price, button);
    container.appendChild(card);
  });
}

function addToCart(productId) {
  const product = productsData.find(item => item.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function renderCart() {
  const container = document.getElementById("cart");
  const totalElement = document.getElementById("total");

  if (container) {
    container.innerHTML = "";

    cart.forEach(item => {
      const row = document.createElement("p");
      row.textContent =
        `${item.name} × ${item.quantity} — ${(item.price * item.quantity).toLocaleString("uz-UZ")} so‘m`;
      container.appendChild(row);
    });
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (totalElement) {
    totalElement.textContent = total.toLocaleString("uz-UZ") + " so‘m";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
});
