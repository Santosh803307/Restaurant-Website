let cart = [];
let total = 0;


function updateCartCount() {
    const count = document.getElementById("cart-count");
    if (count) count.innerText = cart.length;
}


function addToCart(item, price) {
    cart.push({ item, price });
    total += price;
    updateCart();
    updateCartCount();
}


function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}


function updateCart() {
    const cartList = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("total");

    if (!cartList || !totalDisplay) return;

    cartList.innerHTML = "";

    cart.forEach((product, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${product.item} - ₹${product.price}
            <button onclick="removeItem(${index})">❌</button>
        `;

        cartList.appendChild(li);
    });

    totalDisplay.innerText = total;
}


function removeItem(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
    updateCartCount(); 
}


function payWithRazorpay() {
    if (total === 0) {
        alert("Cart is empty!");
        return;
    }

    const options = {
        key: "rzp_test_SWd1JxnZHWuED2", 
        amount: total * 100,
        currency: "INR",
        name: "Maa Bhawani Restaurant",
        description: "Food Order Payment",

        handler: function (response) {
            alert("Payment Successful ✅");
            saveOrder();
        },

        prefill: {
            name: "Customer",
            contact: "8235915762"
        },

        theme: {
            color: "#ff6600"
        }
    };

    const rzp = new Razorpay(options);
    rzp.open();
}


function saveOrder() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    const orderData = {
        items: cart,
        total: total,
        date: new Date().toLocaleString()
    };

    orders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(orders));

    cart = [];
    total = 0;

    updateCart();
    updateCartCount();

    alert("Order Saved Successfully 📦");
}


function showOrders() {
    const history = document.getElementById("order-history");
    if (!history) return;

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    history.innerHTML = "";

    if (orders.length === 0) {
        history.innerHTML = "<li>No orders yet</li>";
        return;
    }

    orders.forEach(order => {
        const li = document.createElement("li");
        li.innerText = `₹${order.total} - ${order.date}`;
        history.appendChild(li);
    });
}


function orderItem(item) {
    alert(item + " ordered successfully!");
}


function placeOrder() {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    let message = "Order Details:%0A";

    cart.forEach((product) => {
        message += `${product.item} - ₹${product.price}%0A`;
    });

    message += `Total: ₹${total}`;

    const phone = "918235915762";
    const url = `https://wa.me/${phone}?text=${message}`;

    window.open(url, "_blank");
}


function toggleMenu() {
    const nav = document.querySelector(".nav-links");
    if (nav) nav.classList.toggle("show");
}