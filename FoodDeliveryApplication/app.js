const STORE_KEY = "foodiehub_state_v1";

const seedData = {
  session: {
    user: { name: "Demo Customer", email: "customer@foodiehub.test", phone: "+91 98765 43210" },
    restaurant: { name: "Spice Junction", email: "owner@foodiehub.test" }
  },
  cart: [],
  orders: [],
  restaurants: [
    {
      id: "spice-junction",
      name: "Spice Junction",
      cuisine: "Indian",
      area: "Hitech City",
      distance: "1.2 km",
      eta: 24,
      rating: 4.8,
      loyalty: "2x points",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80",
      reviews: ["Great packaging and quick delivery.", "The paneer bowl stayed hot and fresh."],
      menu: [
        { id: "paneer-bowl", name: "Paneer Tikka Rice Bowl", price: 249, available: true, photo: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=80", tags: ["Recommended", "High protein"] },
        { id: "dum-biryani", name: "Hyderabadi Dum Biryani", price: 329, available: true, photo: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=900&q=80", tags: ["Best seller"] },
        { id: "mango-lassi", name: "Mango Lassi", price: 119, available: true, photo: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&w=900&q=80", tags: ["Add-on"] }
      ]
    },
    {
      id: "basil-house",
      name: "Basil House",
      cuisine: "Italian",
      area: "Madhapur",
      distance: "2.1 km",
      eta: 31,
      rating: 4.6,
      loyalty: "Free garlic bread",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
      reviews: ["Pasta was creamy and well packed.", "Driver was polite and on time."],
      menu: [
        { id: "alfredo", name: "Mushroom Alfredo Pasta", price: 299, available: true, photo: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80", tags: ["Creamy"] },
        { id: "margherita", name: "Wood-fired Margherita", price: 349, available: true, photo: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80", tags: ["Vegetarian"] }
      ]
    },
    {
      id: "wok-lane",
      name: "Wok Lane",
      cuisine: "Asian",
      area: "Gachibowli",
      distance: "2.8 km",
      eta: 28,
      rating: 4.7,
      loyalty: "Rs 80 off combos",
      image: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=900&q=80",
      reviews: ["Noodles were loaded with vegetables.", "Live ETA was accurate."],
      menu: [
        { id: "ramen", name: "Chilli Garlic Ramen", price: 279, available: true, photo: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80", tags: ["Spicy"] },
        { id: "bao", name: "Crispy Tofu Bao", price: 199, available: true, photo: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=900&q=80", tags: ["Snack"] }
      ]
    },
    {
      id: "green-fork",
      name: "Green Fork",
      cuisine: "Healthy",
      area: "Kondapur",
      distance: "3.4 km",
      eta: 35,
      rating: 4.5,
      loyalty: "Wellness rewards",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80",
      reviews: ["Fresh salads and neat portions.", "Loved the protein recommendations."],
      menu: [
        { id: "quinoa", name: "Quinoa Harvest Bowl", price: 259, available: true, photo: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80", tags: ["Fitment pick"] },
        { id: "smoothie", name: "Berry Protein Smoothie", price: 189, available: true, photo: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=900&q=80", tags: ["Recommended"] }
      ]
    }
  ],
  drivers: [
    { name: "Ravi Kumar", phone: "+91 90000 12345", progress: 28 },
    { name: "Neha Singh", phone: "+91 90000 23456", progress: 42 },
    { name: "Imran Ali", phone: "+91 90000 34567", progress: 18 }
  ]
};

function loadState() {
  const saved = localStorage.getItem(STORE_KEY);
  if (!saved) {
    localStorage.setItem(STORE_KEY, JSON.stringify(seedData));
    return structuredClone(seedData);
  }
  return JSON.parse(saved);
}

function saveState(state) {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
  updateCartCount(state);
}

function getState() {
  return loadState();
}

function currency(value) {
  return `Rs ${value.toLocaleString("en-IN")}`;
}

function updateCartCount(state = getState()) {
  document.querySelectorAll("[data-cart-count]").forEach((node) => {
    node.textContent = state.cart.reduce((sum, item) => sum + item.qty, 0);
  });
}

function findRestaurant(state, id) {
  return state.restaurants.find((restaurant) => restaurant.id === id) || state.restaurants[0];
}

function findDish(restaurant, dishId) {
  return restaurant.menu.find((dish) => dish.id === dishId);
}

function renderRestaurants() {
  const grid = document.querySelector("#restaurantGrid");
  if (!grid) return;

  const state = getState();
  const params = new URLSearchParams(location.search);
  const query = (params.get("q") || "").toLowerCase();
  let filter = "all";

  function paint() {
    const filtered = state.restaurants.filter((restaurant) => {
      const matchesFilter = filter === "all" || restaurant.cuisine === filter;
      const haystack = `${restaurant.name} ${restaurant.cuisine} ${restaurant.area} ${restaurant.menu.map((dish) => dish.name).join(" ")}`.toLowerCase();
      return matchesFilter && (!query || haystack.includes(query));
    });

    grid.innerHTML = filtered.map((restaurant) => `
      <article class="restaurant-card">
        <img src="${restaurant.image}" alt="${restaurant.name} food">
        <div class="card-body">
          <div class="meta-row">
            <span class="pill">${restaurant.cuisine}</span>
            <span>${restaurant.distance}</span>
            <span>${restaurant.eta} min</span>
            <span>${restaurant.rating} rating</span>
          </div>
          <h3>${restaurant.name}</h3>
          <p class="body-copy">${restaurant.area} - ${restaurant.loyalty}</p>
          <a class="primary-button" href="restaurant.html?id=${restaurant.id}">View restaurant</a>
        </div>
      </article>
    `).join("") || `<div class="empty-state">No restaurants matched this search.</div>`;
  }

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      filter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      paint();
    });
  });

  const searchForm = document.querySelector("[data-search-form]");
  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const q = new FormData(searchForm).get("q");
      location.href = `index.html?q=${encodeURIComponent(q)}`;
    });
  }

  paint();
}

function renderRestaurantPage() {
  const hero = document.querySelector("#restaurantHero");
  const menuGrid = document.querySelector("#menuGrid");
  if (!hero || !menuGrid) return;

  const state = getState();
  const restaurantId = new URLSearchParams(location.search).get("id");
  const restaurant = findRestaurant(state, restaurantId);

  hero.style.backgroundImage = `url("${restaurant.image}")`;
  hero.innerHTML = `
    <div>
      <p class="eyebrow">${restaurant.cuisine} - ${restaurant.area}</p>
      <h1>${restaurant.name}</h1>
      <p>${restaurant.rating} rating - ${restaurant.distance} away - ${restaurant.eta} min ETA - ${restaurant.loyalty}</p>
    </div>
  `;

  menuGrid.innerHTML = restaurant.menu.map((dish) => `
    <article class="dish-card">
      <img src="${dish.photo}" alt="${dish.name}">
      <div class="card-body">
        <div class="meta-row">${dish.tags.map((tag) => `<span class="pill">${tag}</span>`).join("")}</div>
        <h3>${dish.name}</h3>
        <p class="body-copy">${dish.available ? "Available now" : "Currently unavailable"}</p>
        <div class="dish-actions">
          <span class="price">${currency(dish.price)}</span>
          <button data-add-cart="${restaurant.id}:${dish.id}" ${dish.available ? "" : "disabled"}>Add</button>
        </div>
      </div>
    </article>
  `).join("");

  document.querySelector("#reviewList").innerHTML = restaurant.reviews.map((review) => `
    <div><strong>${restaurant.rating} rating</strong><p class="body-copy">${review}</p></div>
  `).join("");

  document.querySelectorAll("[data-add-cart]").forEach((button) => {
    button.addEventListener("click", () => {
      const [restId, dishId] = button.dataset.addCart.split(":");
      addToCart(restId, dishId);
      button.textContent = "Added";
      setTimeout(() => { button.textContent = "Add"; }, 900);
    });
  });
}

function addToCart(restaurantId, dishId) {
  const state = getState();
  const restaurant = findRestaurant(state, restaurantId);
  const dish = findDish(restaurant, dishId);
  const existing = state.cart.find((item) => item.restaurantId === restaurantId && item.dishId === dishId);
  if (existing) existing.qty += 1;
  else state.cart.push({ restaurantId, dishId, qty: 1, addedAt: Date.now() });
  saveState(state);
}

function cartDetails(state) {
  return state.cart.map((item) => {
    const restaurant = findRestaurant(state, item.restaurantId);
    const dish = findDish(restaurant, item.dishId);
    return { ...item, restaurant, dish, lineTotal: dish.price * item.qty };
  });
}

function renderCart() {
  const list = document.querySelector("#cartList");
  if (!list) return;

  const state = getState();
  const items = cartDetails(state);
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const delivery = subtotal ? 39 : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + tax;

  list.innerHTML = items.map((item) => `
    <article class="cart-item">
      <img src="${item.dish.photo}" alt="${item.dish.name}">
      <div>
        <h3>${item.dish.name}</h3>
        <p class="body-copy">${item.restaurant.name} - ${currency(item.dish.price)} each</p>
      </div>
      <div class="quantity-controls">
        <button data-cart-dec="${item.restaurantId}:${item.dishId}">-</button>
        <strong>${item.qty}</strong>
        <button data-cart-inc="${item.restaurantId}:${item.dishId}">+</button>
      </div>
    </article>
  `).join("") || `<div class="empty-state">Your cart is empty. Browse restaurants to add food items.</div>`;

  document.querySelector("#cartTotals").innerHTML = `
    <div><span>Subtotal</span><strong>${currency(subtotal)}</strong></div>
    <div><span>Delivery</span><strong>${currency(delivery)}</strong></div>
    <div><span>Taxes</span><strong>${currency(tax)}</strong></div>
    <div><span>Total</span><strong>${currency(total)}</strong></div>
  `;

  document.querySelectorAll("[data-cart-inc], [data-cart-dec]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.cartInc || button.dataset.cartDec;
      const [restaurantId, dishId] = key.split(":");
      const current = getState();
      const line = current.cart.find((item) => item.restaurantId === restaurantId && item.dishId === dishId);
      if (!line) return;
      line.qty += button.dataset.cartInc ? 1 : -1;
      current.cart = current.cart.filter((item) => item.qty > 0);
      saveState(current);
      renderCart();
    });
  });

  document.querySelector("[data-clear-cart]")?.addEventListener("click", () => {
    const current = getState();
    current.cart = [];
    saveState(current);
    renderCart();
  });

  document.querySelector("[data-checkout-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const current = getState();
    const details = cartDetails(current);
    if (!details.length) return;
    const form = new FormData(event.currentTarget);
    const restaurant = details[0].restaurant;
    const order = {
      id: `PW${Date.now().toString().slice(-6)}`,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      items: details.map((item) => ({ name: item.dish.name, qty: item.qty, price: item.dish.price })),
      customer: current.session.user,
      address: form.get("address"),
      phone: form.get("phone"),
      payment: form.get("payment"),
      method: form.get("method"),
      packaging: form.get("packaging"),
      status: "Placed",
      prepTime: restaurant.eta - 10,
      driver: null,
      driverProgress: 12,
      eta: restaurant.eta,
      total,
      createdAt: new Date().toISOString()
    };
    current.orders.unshift(order);
    current.cart = [];
    saveState(current);
    location.href = "orders.html";
  });
}

function statusIndex(status) {
  return ["Placed", "Accepted", "Picked up", "Delivered"].indexOf(status);
}

function orderCard(order, mode = "customer") {
  const steps = ["Placed", "Accepted", "Picked up", "Delivered"];
  const items = order.items.map((item) => `${item.qty} x ${item.name}`).join(", ");
  const driverName = order.driver ? `${order.driver.name} (${order.driver.phone})` : "Waiting for driver assignment";
  const progress = Math.min(order.driverProgress || 12, 86);
  const eta = Math.max(5, order.eta - Math.floor(progress / 12));

  return `
    <article class="order-card">
      <div class="order-header">
        <div>
          <p class="eyebrow">Order ${order.id}</p>
          <h3>${order.restaurantName}</h3>
          <p class="body-copy">${items}</p>
        </div>
        <div><span class="pill">${order.status}</span></div>
      </div>
      <div class="status-steps">
        ${steps.map((step, index) => `<span class="${index <= statusIndex(order.status) ? "done" : ""}">${step}</span>`).join("")}
      </div>
      <p class="body-copy">Customer: ${order.customer.name} - ${order.phone}<br>Address: ${order.address}<br>Payment: ${order.payment} - ${currency(order.total)}<br>Driver: ${driverName}<br>Dynamic ETA: ${eta} min</p>
      <div class="map-panel" style="--driver-left:${progress}%">
        <span class="route-line"></span>
        <span class="driver-dot"></span>
        <span class="map-label restaurant">Restaurant</span>
        <span class="map-label home">Customer</span>
      </div>
      ${orderActions(order, mode)}
    </article>
  `;
}

function orderActions(order, mode) {
  if (mode === "restaurant") {
    return `
      <div class="order-actions">
        <button data-accept-order="${order.id}">Accept and set prep time</button>
        <button class="secondary-button" data-assign-driver="${order.id}">Assign driver</button>
      </div>
    `;
  }
  if (mode === "driver") {
    return `
      <div class="order-actions">
        <button data-pickup-order="${order.id}">Mark picked up</button>
        <button class="secondary-button" data-deliver-order="${order.id}">Mark dropped off</button>
      </div>
    `;
  }
  return `
    <div class="order-actions">
      <button data-rate-order="${order.id}">Rate order</button>
    </div>
  `;
}

function renderOrders() {
  const list = document.querySelector("#ordersList");
  if (!list) return;
  const state = getState();
  state.orders.forEach((order) => {
    if (order.status !== "Delivered") order.driverProgress = Math.min((order.driverProgress || 12) + 2, 86);
  });
  saveState(state);
  list.innerHTML = state.orders.map((order) => orderCard(order, "customer")).join("") || `<div class="empty-state">No orders yet. Place an order to see live status, driver location, and ETA.</div>`;
  bindRatingButtons();
}

function bindRatingButtons() {
  document.querySelectorAll("[data-rate-order]").forEach((button) => {
    button.addEventListener("click", () => {
      button.textContent = "Rated 5 stars";
      button.disabled = true;
    });
  });
}

function renderRestaurantDashboard() {
  const orders = document.querySelector("#restaurantOrders");
  const ownerMenu = document.querySelector("#ownerMenu");
  if (!orders || !ownerMenu) return;

  const state = getState();
  orders.innerHTML = state.orders.map((order) => orderCard(order, "restaurant")).join("") || `<div class="empty-state">No incoming orders yet. Customer orders will appear here with address, phone, payment, and packaging details.</div>`;
  const restaurant = state.restaurants[0];
  ownerMenu.innerHTML = restaurant.menu.map((dish) => `
    <div class="owner-menu-item">
      <div>
        <strong>${dish.name}</strong>
        <p class="small-text">${currency(dish.price)} - ${dish.available ? "Available" : "Unavailable"}</p>
      </div>
      <button class="secondary-button" data-toggle-dish="${dish.id}">${dish.available ? "Pause" : "Resume"}</button>
    </div>
  `).join("");

  document.querySelectorAll("[data-accept-order]").forEach((button) => {
    button.addEventListener("click", () => mutateOrder(button.dataset.acceptOrder, (order) => {
      order.status = "Accepted";
      order.prepTime = 18;
      order.eta = 28;
    }));
  });

  document.querySelectorAll("[data-assign-driver]").forEach((button) => {
    button.addEventListener("click", () => mutateOrder(button.dataset.assignDriver, (order, current) => {
      order.driver = current.drivers[Math.floor(Math.random() * current.drivers.length)];
      order.driverProgress = order.driver.progress;
      order.status = "Accepted";
    }));
  });

  document.querySelectorAll("[data-toggle-dish]").forEach((button) => {
    button.addEventListener("click", () => {
      const current = getState();
      const item = current.restaurants[0].menu.find((dish) => dish.id === button.dataset.toggleDish);
      item.available = !item.available;
      saveState(current);
      renderRestaurantDashboard();
    });
  });

  document.querySelector("[data-add-menu]")?.addEventListener("click", () => {
    const current = getState();
    const id = `chef-special-${Date.now().toString().slice(-4)}`;
    current.restaurants[0].menu.push({
      id,
      name: "Chef Special Meal",
      price: 299,
      available: true,
      photo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
      tags: ["New"]
    });
    saveState(current);
    renderRestaurantDashboard();
  });
}

function renderDriverOrders() {
  const list = document.querySelector("#driverOrders");
  if (!list) return;
  const state = getState();
  const assigned = state.orders.filter((order) => order.driver);
  list.innerHTML = assigned.map((order) => orderCard(order, "driver")).join("") || `<div class="empty-state">No assigned deliveries yet. Restaurant owners can assign a driver from the dashboard.</div>`;

  document.querySelectorAll("[data-pickup-order]").forEach((button) => {
    button.addEventListener("click", () => mutateOrder(button.dataset.pickupOrder, (order) => {
      order.status = "Picked up";
      order.driverProgress = 55;
      order.eta = 16;
    }, renderDriverOrders));
  });

  document.querySelectorAll("[data-deliver-order]").forEach((button) => {
    button.addEventListener("click", () => mutateOrder(button.dataset.deliverOrder, (order) => {
      order.status = "Delivered";
      order.driverProgress = 86;
      order.eta = 0;
    }, renderDriverOrders));
  });
}

function mutateOrder(orderId, updater, after = renderRestaurantDashboard) {
  const current = getState();
  const order = current.orders.find((item) => item.id === orderId);
  if (!order) return;
  updater(order, current);
  saveState(current);
  after();
}

function bindAuthForms() {
  document.querySelectorAll("[data-auth-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const type = form.dataset.authForm;
      const data = Object.fromEntries(new FormData(form));
      const state = getState();
      if (type.startsWith("user")) {
        state.session.user = { name: data.name || "Demo Customer", email: data.email, phone: data.phone || "+91 98765 43210" };
        saveState(state);
        location.href = "index.html";
      } else {
        state.session.restaurant = { name: data.name || "Spice Junction", email: data.email };
        if (type === "restaurant-signup") {
          state.restaurants.unshift({
            id: data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
            name: data.name,
            cuisine: data.cuisine,
            area: data.area,
            distance: "New",
            eta: 30,
            rating: 4.4,
            loyalty: "Opening week offers",
            image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
            reviews: ["Newly listed restaurant."],
            menu: [{ id: "starter-item", name: data.menu.split("-")[0].trim() || "Starter item", price: 249, available: true, photo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80", tags: ["New"] }]
          });
        }
        saveState(state);
        location.href = "restaurant-dashboard.html";
      }
    });
  });
}

updateCartCount();
renderRestaurants();
renderRestaurantPage();
renderCart();
renderOrders();
renderRestaurantDashboard();
renderDriverOrders();
bindAuthForms();
