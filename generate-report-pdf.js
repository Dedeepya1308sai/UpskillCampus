const fs = require("fs");

const outputFile = "FoodieHub_Project_Report.pdf";

const report = [
  { type: "title", text: "Foodie Hub Project Report" },
  { type: "meta", text: "Overall work analysis and process functions used" },
  { type: "heading", text: "1. Project Overview" },
  { type: "para", text: "Foodie Hub is a static food delivery web application prototype built with HTML, CSS, and JavaScript. The application forms a bridge between restaurant owners, customers, and delivery drivers. It demonstrates a realistic food delivery workflow where customers browse nearby restaurants, add food items to a shared cart, place orders, and track delivery status. Restaurant owners can manage menus, accept orders, assign drivers, and view analytics. Delivery drivers can update pickup and drop-off status." },
  { type: "para", text: "The project does not use a backend server or database. Instead, it stores application state in browser localStorage. This makes the application easy to run directly from index.html while still allowing page-to-page continuity for cart, orders, restaurants, drivers, and sessions." },

  { type: "heading", text: "2. Technology Stack" },
  { type: "bullet", text: "HTML: Defines separate pages for customer, restaurant, cart, orders, and driver workflows." },
  { type: "bullet", text: "CSS: Provides responsive layout, cards, forms, dashboards, order status UI, and mock map styling." },
  { type: "bullet", text: "JavaScript: Handles state management, rendering, cart behavior, checkout, order lifecycle, restaurant dashboard actions, driver actions, and simulated login/signup." },
  { type: "bullet", text: "localStorage: Stores demo data and user interactions across pages." },

  { type: "heading", text: "3. Main Files and Responsibilities" },
  { type: "bullet", text: "index.html: Customer home page with nearby restaurant browsing, cuisine filters, search, recommendations, and restaurant cards." },
  { type: "bullet", text: "login.html and signup.html: Separate customer login and signup pages." },
  { type: "bullet", text: "restaurant-login.html and restaurant-signup.html: Separate restaurant owner login and onboarding pages." },
  { type: "bullet", text: "restaurant.html: Restaurant menu page with dish photos, prices, availability, reviews, and add-to-cart actions." },
  { type: "bullet", text: "cart.html: One unique shared cart and payment page for the full customer application." },
  { type: "bullet", text: "orders.html: Customer order tracking page with status steps, driver information, mock location, and dynamic ETA." },
  { type: "bullet", text: "restaurant-dashboard.html: Owner dashboard for incoming orders, menu management, order acceptance, driver assignment, and analytics." },
  { type: "bullet", text: "driver.html: Delivery driver page for pickup and drop-off status updates." },
  { type: "bullet", text: "styles.css: Complete styling for the application UI." },
  { type: "bullet", text: "app.js: Core application logic and process functions." },
  { type: "bullet", text: "README.md: Usage notes and demo account details." },

  { type: "heading", text: "4. Application Workflow" },
  { type: "bullet", text: "Customer signs up or logs in through the customer authentication pages." },
  { type: "bullet", text: "Customer browses nearby restaurants on the home page and filters by cuisine." },
  { type: "bullet", text: "Customer opens a restaurant page and adds food items to the cart." },
  { type: "bullet", text: "Customer completes checkout from the shared cart and payment page." },
  { type: "bullet", text: "An order is created with status Placed and saved in localStorage." },
  { type: "bullet", text: "Restaurant owner views the order in the dashboard, accepts it, sets prep time, and assigns a driver." },
  { type: "bullet", text: "Driver views assigned orders and marks them picked up or delivered." },
  { type: "bullet", text: "Customer can track order status, driver location progress, and dynamic ETA on the orders page." },

  { type: "heading", text: "5. Data Model" },
  { type: "para", text: "The seedData object in app.js initializes the project with demo sessions, restaurants, menus, drivers, an empty cart, and an empty orders array. Restaurants include cuisine, area, distance, ETA, rating, loyalty offer, image, reviews, and menu items. Menu items include id, name, price, availability, photo, and tags. Orders include customer details, address, payment type, packaging preference, status, prep time, assigned driver, ETA, total price, and timestamps." },

  { type: "heading", text: "6. Process Functions Used in app.js" },
  { type: "bullet", text: "loadState(): Loads saved data from localStorage. If no saved data exists, it initializes the application with seedData." },
  { type: "bullet", text: "saveState(state): Saves the current application state to localStorage and updates the cart count." },
  { type: "bullet", text: "getState(): Returns the latest application state." },
  { type: "bullet", text: "currency(value): Formats numeric prices as Indian rupee text." },
  { type: "bullet", text: "updateCartCount(state): Updates the cart item count shown in navigation." },
  { type: "bullet", text: "findRestaurant(state, id): Finds a restaurant by id, with a fallback to the first restaurant." },
  { type: "bullet", text: "findDish(restaurant, dishId): Finds a dish inside a restaurant menu." },
  { type: "bullet", text: "renderRestaurants(): Renders the home page restaurant cards and handles cuisine filters and search." },
  { type: "bullet", text: "renderRestaurantPage(): Renders selected restaurant details, menu items, reviews, and add-to-cart buttons." },
  { type: "bullet", text: "addToCart(restaurantId, dishId): Adds a dish to the cart or increases quantity if already present." },
  { type: "bullet", text: "cartDetails(state): Converts cart IDs into full dish and restaurant details for display and checkout." },
  { type: "bullet", text: "renderCart(): Renders cart items, quantity controls, totals, delivery details, payment options, packaging preference, and checkout order creation." },
  { type: "bullet", text: "statusIndex(status): Converts order status into a progress step index." },
  { type: "bullet", text: "orderCard(order, mode): Builds reusable order cards for customer, restaurant, and driver pages." },
  { type: "bullet", text: "orderActions(order, mode): Displays actions based on page mode, such as accepting orders, assigning drivers, rating, pickup, and delivery." },
  { type: "bullet", text: "renderOrders(): Renders customer orders and simulates driver progress for live tracking." },
  { type: "bullet", text: "bindRatingButtons(): Handles customer rating button interaction." },
  { type: "bullet", text: "renderRestaurantDashboard(): Renders incoming orders, owner menu controls, order acceptance, driver assignment, and analytics." },
  { type: "bullet", text: "renderDriverOrders(): Renders assigned driver orders and handles pickup/drop-off updates." },
  { type: "bullet", text: "mutateOrder(orderId, updater, after): Generic helper for updating an order and refreshing the current page view." },
  { type: "bullet", text: "bindAuthForms(): Simulates customer and restaurant login/signup and redirects users to the correct page." },

  { type: "heading", text: "7. Implemented Features" },
  { type: "bullet", text: "Separate customer login and signup pages." },
  { type: "bullet", text: "Separate restaurant login and signup pages." },
  { type: "bullet", text: "Nearby restaurant browsing with cuisine filters." },
  { type: "bullet", text: "Restaurant menu listing with prices, dish photos, availability, ratings, and reviews." },
  { type: "bullet", text: "One shared cart and payment page." },
  { type: "bullet", text: "Online payment and cash-on-delivery options." },
  { type: "bullet", text: "Custom packaging preference." },
  { type: "bullet", text: "Order creation with customer details." },
  { type: "bullet", text: "Restaurant order acceptance and driver assignment." },
  { type: "bullet", text: "Driver pickup and drop-off workflow." },
  { type: "bullet", text: "Customer live order tracking with mock driver location and dynamic ETA." },
  { type: "bullet", text: "Basic analytics for restaurant owners." },
  { type: "bullet", text: "Loyalty and personalized recommendation-style labels." },

  { type: "heading", text: "8. Limitations" },
  { type: "bullet", text: "Authentication is simulated and does not validate passwords against a backend." },
  { type: "bullet", text: "Data is stored only in browser localStorage, so it is not shared across devices." },
  { type: "bullet", text: "Mapping and driver tracking are simulated with CSS, not a real mapping API." },
  { type: "bullet", text: "Payment processing is simulated and not connected to a payment gateway." },
  { type: "bullet", text: "Push notifications are represented through UI status updates, not real notification services." },
  { type: "bullet", text: "The prompt includes automotive parts features, but the implemented application focuses on food delivery. Similar concepts such as recommendations, packaging, loyalty, and repeat ordering are represented in food-delivery form." },

  { type: "heading", text: "9. Future Enhancements" },
  { type: "bullet", text: "Add backend APIs using Node.js, Express, Django, or another server framework." },
  { type: "bullet", text: "Use a database such as MongoDB, PostgreSQL, or MySQL for persistent multi-user data." },
  { type: "bullet", text: "Add real authentication and role-based authorization for customers, restaurants, and drivers." },
  { type: "bullet", text: "Integrate Google Maps or Mapbox for live driver tracking and route optimization." },
  { type: "bullet", text: "Integrate Razorpay, Stripe, or another payment gateway." },
  { type: "bullet", text: "Add real push notifications through Firebase Cloud Messaging or Web Push." },
  { type: "bullet", text: "Add restaurant image upload, menu editing forms, coupons, refunds, and admin moderation." },

  { type: "heading", text: "10. Conclusion" },
  { type: "para", text: "Foodie Hub successfully demonstrates the core workflow of a food delivery platform. It contains separate interfaces for customers, restaurant owners, and delivery drivers, while connecting them through shared localStorage state. The app includes restaurant discovery, menu browsing, cart and payment, order management, delivery assignment, driver status updates, and customer tracking. It is suitable as a frontend prototype and can be extended into a full-stack production system." }
];

const pageWidth = 595.28;
const pageHeight = 841.89;
const margin = 54;
const contentWidth = pageWidth - margin * 2;
const lineHeight = 15;
const fonts = {
  regular: "F1",
  bold: "F2"
};

function escapePdf(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function wrapText(text, fontSize, maxWidth) {
  const avgWidth = fontSize * 0.52;
  const maxChars = Math.max(24, Math.floor(maxWidth / avgWidth));
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function addLine(page, text, x, y, size = 10.5, font = fonts.regular) {
  page.commands.push(`BT /${font} ${size} Tf ${x.toFixed(2)} ${y.toFixed(2)} Td (${escapePdf(text)}) Tj ET`);
}

function newPage(pages) {
  const page = { commands: [], y: pageHeight - margin };
  pages.push(page);
  return page;
}

function ensureSpace(pages, page, needed) {
  if (page.y - needed < margin) return newPage(pages);
  return page;
}

function buildPages() {
  const pages = [];
  let page = newPage(pages);

  for (const block of report) {
    if (block.type === "title") {
      page = ensureSpace(pages, page, 56);
      addLine(page, block.text, margin, page.y, 24, fonts.bold);
      page.y -= 34;
      continue;
    }

    if (block.type === "meta") {
      page = ensureSpace(pages, page, 28);
      addLine(page, block.text, margin, page.y, 11, fonts.regular);
      page.y -= 28;
      continue;
    }

    if (block.type === "heading") {
      page = ensureSpace(pages, page, 34);
      page.y -= 8;
      addLine(page, block.text, margin, page.y, 14, fonts.bold);
      page.y -= 22;
      continue;
    }

    const fontSize = block.type === "bullet" ? 10.2 : 10.5;
    const left = block.type === "bullet" ? margin + 14 : margin;
    const width = block.type === "bullet" ? contentWidth - 14 : contentWidth;
    const lines = wrapText(block.text, fontSize, width);
    const needed = lines.length * lineHeight + 8;
    page = ensureSpace(pages, page, needed);

    if (block.type === "bullet") {
      addLine(page, "-", margin, page.y, fontSize, fonts.bold);
    }

    lines.forEach((line, index) => {
      addLine(page, line, left, page.y - index * lineHeight, fontSize, fonts.regular);
    });
    page.y -= needed;
  }

  pages.forEach((p, index) => {
    addLine(p, `Page ${index + 1}`, pageWidth - margin - 42, 28, 8.5, fonts.regular);
  });

  return pages;
}

function createPdf(pages) {
  const objects = [];
  const addObject = (body) => {
    objects.push(body);
    return objects.length;
  };

  const catalogId = addObject("<< /Type /Catalog /Pages 2 0 R >>");
  const pagesId = addObject("");
  const fontRegularId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const fontBoldId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

  const pageIds = [];
  for (const page of pages) {
    const stream = page.commands.join("\n");
    const contentId = addObject(`<< /Length ${Buffer.byteLength(stream, "utf8")} >>\nstream\n${stream}\nendstream`);
    const pageId = addObject(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentId} 0 R >>`);
    pageIds.push(pageId);
  }

  objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((body, index) => {
    offsets.push(Buffer.byteLength(pdf, "utf8"));
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf, "utf8");
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i < offsets.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  return pdf;
}

const pages = buildPages();
fs.writeFileSync(outputFile, createPdf(pages), "binary");
console.log(`Created ${outputFile} with ${pages.length} pages.`);
