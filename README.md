# Foodie Hub Food Delivery Prototype

Foodie Hub is a static food delivery marketplace prototype that connects customers, restaurants, and delivery drivers.

## Pages

- `index.html` - customer restaurant browsing, cuisine filters, recommendations, and nearby restaurant cards.
- `login.html` / `signup.html` - separate customer login and signup pages.
- `restaurant-login.html` / `restaurant-signup.html` - separate restaurant owner login and onboarding pages.
- `restaurant.html` - restaurant menu page with dish photos, prices, availability, reviews, and cart actions.
- `cart.html` - one shared cart and payment page for the full customer app.
- `orders.html` - customer order history with live status, driver location mock map, and dynamic ETA.
- `restaurant-dashboard.html` - restaurant dashboard for menu management, order acceptance, prep time, driver assignment, and analytics.
- `driver.html` - delivery driver page for pickup and drop-off actions.

## Usage

Open `index.html` in a browser. The app stores demo users, restaurants, cart items, orders, and driver status in `localStorage`, so actions remain connected across pages.

Demo customer login:

- Email: `customer@foodiehub.test`
- Password: `customer123`

Demo restaurant login:

- Email: `owner@foodiehub.test`
- Password: `restaurant123`
