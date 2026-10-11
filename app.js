
const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
}

// ================================
// MAHSULOTLAR
// ================================

const productsData = [
    {
        id: 1,
        name: "Non",
        price: 5000,
        category: "Oziq-ovqat",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Sut",
        price: 12000,
        category: "Oziq-ovqat",
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Shakar",
        price: 15000,
        category: "Oziq-ovqat",
        image: "https://images.unsplash.com/photo-1581268497617-1f7f2a2f6b6d?auto=format&fit=crop&w=600&q=80"
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
        name: "Shampun",
        price: 25000,
        category: "Uy-ro‘zg‘or",
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80"
    }
];

// ================================
// O'ZGARUVCHILAR
// ================================

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

// ================================
// YORDAMCHI FUNKSIYALAR
// ================================

function formatPrice(price) {
    return price.toLocaleString("uz-UZ") + " so‘m";
}

// HTML element mavjudligini tekshirish
function elementExists(element, name) {
    if (!element) {
        console.error(name + " elementi HTML ichida topilmadi.");
        return false;
    }

    return true;
}

// ================================
// KATEGORIYALAR
// ================================

function renderCategories() {
    if (!elementExists(categoriesElement, "categories")) return;

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

// ================================
// MAHSULOTLARNI CHIQARISH
// ================================

function renderProducts() {
    if (!elementExists(productsElement, "products")) return;

    const searchText = searchElement
        ? searchElement.value.trim().toLowerCase()
        : "";

    const filteredProducts = productsData.filter(product => {
        const matchesCategory =
            selectedCategory === "Barchasi" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;
    });

    if (productCountElement) {
        productCountElement.textContent =
            filteredProducts.length + " ta mahsulot";
    }

    productsElement.innerHTML = "";

    if (filteredProducts.length === 0) {
        productsElement.innerHTML =
            '<p class="message">Mahsulot topilmadi.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const card = document.createElement("article");
        card.className = "product-card";

        // Mahsulot rasmi
        const imageBox = document.createElement("div");
        imageBox.className = "product-image";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";

        image.onerror = function () {
            imageBox.innerHTML = "";
            imageBox.classList.add("image-error");
            imageBox.textContent = "Rasm yuklanmadi";
        };

        imageBox.appendChild(image);

        // Mahsulot nomi
        const name = document.createElement("h3");
        name.textContent = product.name;

        // Mahsulot narxi
        const price = document.createElement("p");
        price.className = "product-price";
        price.textContent = formatPrice(product.price);

        // Savatchaga qo'shish tugmasi
        const button = document.createElement("button");
        button.className = "add-button";
        button.textContent = "＋ Savatchaga";

        button.addEventListener("click", () => {
            addToCart(product.id);
        });

        card.append(imageBox, name, price, button);
        productsElement.appendChild(card);
    });
}

// ================================
// SAVATCHAGA QO'SHISH
// ================================

function addToCart(productId) {
    const product = productsData.find(
        item => item.id === productId
    );

    if (!product) return;

    const cartItem = cart.find(
        item => item.id === productId
    );

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    renderCart();

    if (tg) {
        tg.HapticFeedback?.impactOccurred("light");
    }
}

// ================================
// SAVATCHANI KO'RSATISH
// ================================

function renderCart() {
    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (cartCountElement) {
        cartCountElement.textContent = totalQuantity;
    }

    if (cartTotalElement) {
        cartTotalElement.textContent = formatPrice(totalPrice);
    }

    if (modalTotalElement) {
        modalTotalElement.textContent = formatPrice(totalPrice);
    }

    if (!cartItemsElement) return;

    cartItemsElement.innerHTML = "";

    if (cart.length === 0) {
        cartItemsElement.textContent =
            "Savatchangiz hozircha bo‘sh.";
        return;
    }

    cart.forEach(item => {
        const row = document.createElement("div");
        row.className = "cart-item";

        const info = document.createElement("span");

        info.textContent =
            `${item.name} × ${item.quantity} — ` +
            formatPrice(item.price * item.quantity);

        const removeButton = document.createElement("button");
        removeButton.textContent = "−";
        removeButton.setAttribute(
            "aria-label",
            item.name + " miqdorini kamaytirish"
        );

        removeButton.addEventListener("click", () => {
            item.quantity -= 1;

            if (item.quantity <= 0) {
                cart = cart.filter(
                    product => product.id !== item.id
                );
            }

            renderCart();
        });

        row.append(info, removeButton);
        cartItemsElement.appendChild(row);
    });
}

// ================================
// QIDIRUV
// ================================

if (searchElement) {
    searchElement.addEventListener("input", renderProducts);
}

// ================================
// SAVATCHANI OCHISH
// ================================

const openCartButton = document.getElementById("open-cart");

if (openCartButton && cartModal) {
    openCartButton.addEventListener("click", () => {
        cartModal.classList.remove("hidden");
    });
}

// ================================
// SAVATCHANI YOPISH
// ================================

const closeCartButton = document.getElementById("close-cart");

if (closeCartButton && cartModal) {
    closeCartButton.addEventListener("click", () => {
        cartModal.classList.add("hidden");
    });
}

// ================================
// BUYURTMA BERISH
// ================================

// Hozircha bu sinov rejimi.
// Buyurtma hali botga yoki serverga yuborilmaydi.

const checkoutButton = document.getElementById("checkout");

if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
        if (cart.length === 0) {
            const message =
                "Avval savatchaga mahsulot qo‘shing.";

            if (tg) {
                tg.showAlert(message);
            } else {
                alert(message);
            }

            return;
        }

        const message =
            "Savatchangiz tayyor! " +
            "Buyurtmani botga yuborish funksiyasi " +
            "keyingi bosqichda ulanadi.";

        if (tg) {
            tg.showAlert(message);
        } else {
            alert(message);
        }
    });
}

// ================================
// DO'KONNI ISHGA TUSHIRISH
// ================================

renderCategories();
renderProducts();
renderCart();
