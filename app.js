const productsData = [
  {
    id: 1,
    name: "Non",
    price: 5000,
    category: "Oziq-ovqat",
    image: "https://www.google.com/imgres?q=lepyoshka%20non&imgurl=https%3A%2F%2Fdostavo4ka.uz%2Fupload-file%2F2021%2F07%2F05%2F6239%2F750x750-9b2d792c-266d-41c6-af4c-e50ddcd703ed.jpg&imgrefurl=https%3A%2F%2Fdostavo4ka.uz%2Fru%2Fproduct%2F6387%2Fsamarkandskiye-lepeshki-osiye.html&docid=SAxapRYApB2htM&tbnid=rzEBGYPiJPQIPM&vet=12ahUKEwiopbLU_LGXAxXxSPEDHVtSGg4QnPAOegUI_wQQAA..i&w=750&h=750&hcb=2&ved=2ahUKEwiopbLU_LGXAxXxSPEDHVtSGg4QnPAOegUI_wQQAA"
  },
  {
    id: 2,
    name: "Lactel sut",
    price: 12000,
    category: "Oziq-ovqat",
    image: "https://www.google.com/imgres?q=laktel%20sut&imgurl=https%3A%2F%2Folcha.uz%2Fimage%2F675x900%2Fproducts%2Fcdn_1%2Fsupplier%2Fstores%2F1%2F2024-04-18%2FEYeJ3VmDvdihuSUP71500BmQzkwrSK23vAwKS6dpF8E5BW2qMZPNJomAkJOj.jpg&imgrefurl=https%3A%2F%2Folcha.uz%2Foz%2Fproduct%2Fview%2Fmoloko-lactel-sutim-legkoe-2-1l%3Fsrsltid%3DAU7gw4VPwbGKG8Stcf3jttiZDWVH4u1GEcHG8NmAAx-HrU-ZpssXdmEv&docid=b72Y0jn4aT-mqM&tbnid=EWhn_qcqVnCGzM&vet=12ahUKEwjzxPn6_LGXAxVJKvsDHXOWO4EQnPAOegQIJRAA..i&w=625&h=625&hcb=2&ved=2ahUKEwjzxPn6_LGXAxVJKvsDHXOWO4EQnPAOegQIJRAA"
  },
  {
    id: 3,
    name: "Shakar",
    price: 15000,
    category: "Oziq-ovqat",
    image: "https://www.google.com/imgres?q=shakar&imgurl=https%3A%2F%2Fcdn.bigmart.uz%2Ffile%2Fhub%2Ffile%2F2025%2F12%2F19%2F373pYH2dMc8Fuk4cftEXBWrVEj8.jpg&imgrefurl=https%3A%2F%2Fbigmart.uz%2Fuz%2Fproducts%2Fshakar-365-kun-900-gr-pg-1064459&docid=XZWYPrm7otDfwM&tbnid=jP6JhDFzxY_whM&vet=12ahUKEwjIr9ST_bGXAxViVfEDHfN3JLQQnPAOegQIaBAA..i&w=1000&h=1333&hcb=2&ved=2ahUKEwjIr9ST_bGXAxViVfEDHfN3JLQQnPAOegQIaBAA"
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
    image: "https://www.google.com/imgres?q=shampun&imgurl=https%3A%2F%2Fpharmaclick.uz%2Fupload%2FSh%2FimageCache%2F263%2F966%2F9665753763287993.webp&imgrefurl=https%3A%2F%2Fpharmaclick.uz%2Fuz%2Fcatalog%2Fshampun_dlya_volos%2Fshampun_dlya_povrezhdennykh_volos_l_or_al_elseve_polnoe_vosstanovlenie_5_400ml%2F%3Fsrsltid%3DAU7gw4VJYt0hYix-c_3QnVD5TsEBQUA76DZ-BNAR-zB3_85eYvPOvnzF&docid=QeYv8j874F2wcM&tbnid=-ay2RB2I_ciuqM&vet=12ahUKEwiUvJ-z_bGXAxVJVfEDHQoCLN4QnPAOegQIOxAA..i&w=1000&h=1000&hcb=2&ved=2ahUKEwiUvJ-z_bGXAxVJVfEDHQoCLN4QnPAOegQIOxAA"
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
