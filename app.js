
const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
}

// Hozircha sinov mahsulotlari.
// Keyingi bosqichda SQLite bazaga ulaymiz.
const productsData = [
    { id: 1, name: "Non", price: 5000, category: "Oziq-ovqat", emoji: "🍞" },
    { id: 2, name: "Sut", price: 12000, category: "Oziq-ovqat", emoji: "🥛" },
    { id: 3, name: "Shakar", price: 15000, category: "Oziq-ovqat", emoji: "🍚" },
    { id: 4, name: "Olma", price: 10000, category: "Meva va sabzavot", emoji: "🍎" },
    { id: 5, name: "Banan", price: 18000, category: "Meva va sabzavot", emoji: "🍌" },
    { id: 6, name: "Shampun", price: 25000, category: "Uy-ro‘zg‘or", emoji: "🧴" }
];

let selectedCategory = "Barchasi";
let cart = [];

const categoriesElement = document.getElementById("categories");
const productsElement = document.getElementById("products");
const searchElement = document.getElementById("search");
const productCountElement = document.getElementById("product-count");
const cartCountElement = document.getElementById("cart-count");
const cartTotalElement = document.getElementById("cart-total");
const cartModal = document.getElementById("cart-modal");
const cartItemsElement = document.getElementById("cart-items");
const modalTotalElement = document.getElementById("modal-total");

function formatPrice(price) {
    return price.toLocaleString("uz-UZ") + " so‘m";
}

// Kategoriyalarni chiqarish
function renderCategories() {
    const categories = [
        "Barchasi",
        ...new Set(productsData.map(product => product.category))
    ];

    categoriesElement.innerHTML = "";

    categories.forEach(category => {
        const button = document.createElement("button");
        button.className = "category";
        button.textContent = category;

        if (category === selectedCategory) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {
            selectedCategory = category;
            renderCategories();
            renderProducts();
        });

        categoriesElement.appendChild(button);
    });
}

// Mahsulotlarni chiqarish
function renderProducts() {
    const searchText = searchElement.value.trim().toLowerCase();

    const filteredProducts = productsData.filter(product => {
        const matchesCategory =
            selectedCategory === "Barchasi" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;
    });

    productCountElement.textContent =
        filteredProducts.length + " ta mahsulot";

    productsElement.innerHTML = "";

    if (filteredProducts.length === 0) {
        productsElement.innerHTML =
            '<p class="message">Mahsulot topilmadi.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const card = document.createElement("article");
        card.className = "product-card";

        const emoji = document.createElement("div");
        emoji.className = "product-image";
        emoji.textContent = product.emoji;

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.className = "product-price";
        price.textContent = formatPrice(product.price);

        const button = document.createElement("button");
        button.className = "add-button";
        button.textContent = "＋ Savatchaga";

        button.addEventListener("click", () => {
            addToCart(product.id);
        });

        card.append(emoji, name, price, button);
        productsElement.appendChild(card);
    });
}

// Savatchaga mahsulot qo‘shish
function addToCart(productId) {
    const product = productsData.find(item => item.id === productId);
    if (!product) return;

    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    renderCart();

    if (tg) {
        tg.HapticFeedback?.impactOccurred("light");
    }
}

// Savatchani hisoblash va ko‘rsatish
function renderCart() {
    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    cartCountElement.textContent = totalQuantity;
    cartTotalElement.textContent = formatPrice(totalPrice);
    modalTotalElement.textContent = formatPrice(totalPrice);

    cartItemsElement.innerHTML = "";

    if (cart.length === 0) {
        cartItemsElement.textContent = "Savatchangiz hozircha bo‘sh.";
        return;
    }

    cart.forEach(item => {
        const row = document.createElement("div");
        row.className = "cart-item";

        const info = document.createElement("span");
        info.textContent =
            `${item.emoji} ${item.name} × ${item.quantity} — ` +
            formatPrice(item.price * item.quantity);

        const removeButton = document.createElement("button");
        removeButton.textContent = "−";
        removeButton.setAttribute(
            "aria-label", item.name + " miqdorini kamaytirish"
        );

        removeButton.addEventListener("click", () => {
            item.quantity -= 1;

            if (item.quantity <= 0) {
                cart = cart.filter(product => product.id !== item.id);
            }

            renderCart();
        });

        row.append(info, removeButton);
        cartItemsElement.appendChild(row);
    });
}

// Qidiruv
searchElement.addEventListener("input", renderProducts);

// Savatchani ochish va yopish
document.getElementById("open-cart").addEventListener("click", () => {
    cartModal.classList.remove("hidden");
});

document.getElementById("close-cart").addEventListener("click", () => {
    cartModal.classList.add("hidden");
});

// Hozircha buyurtma serverga yuborilmaydi
document.getElementById("checkout").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Avval savatchaga mahsulot qo‘shing.");
        return;
    }

    const message =
        "Savatcha tayyor, lekin buyurtma berish uchun bot bilan ulash kerak.";

    if (tg) {
        tg.showAlert(message);
    } else {
        alert(message);
    }
});

// Do‘konni ishga tushirish
renderCategories();
renderProducts();
renderCart();
