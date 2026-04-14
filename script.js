// массив корзины
let cart = [];

// элементы
const buttons = document.querySelectorAll(".add-btn");
const cartList = document.querySelector("#cart-list");
const totalElement = document.querySelector("#total");
const clearBtn = document.querySelector("#clear-cart");
const payBtn = document.querySelector("#pay");
const filter = document.querySelector("#filter");
const products = document.querySelectorAll(".product");

// добавление товара
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const product = button.parentElement;

        const item = {
            name: product.dataset.name,
            price: Number(product.dataset.price)
        };

        cart.push(item);
        renderCart();
    });
});

// отрисовка корзины
const renderCart = () => {
    cartList.innerHTML = "";

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item.name + " - " + item.price;

        // кнопка удаления
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Удалить";

        removeBtn.addEventListener("click", () => {
            cart.splice(index, 1);
            renderCart();
        });

        li.appendChild(removeBtn);
        cartList.appendChild(li);
    });

    updateTotal();
};

// подсчет суммы
const updateTotal = () => {
    let total = 0;

    cart.forEach(item => total += item.price);

    totalElement.textContent = "Итого: " + total;
};

// очистка корзины
clearBtn.addEventListener("click", () => {
    cart = [];
    renderCart();
});

// оплата
payBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Корзина пуста");
    } else {
        alert("Покупка прошла успешно!");
        cart = [];
        renderCart();
    }
});

// фильтр
filter.addEventListener("change", () => {
    const category = filter.value;

    products.forEach(product => {
        if (category === "all" || product.dataset.category === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
});