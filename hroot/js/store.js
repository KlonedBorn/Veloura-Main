/* ============================================================================
   VELOURA COLLECTION — CLIENT-SIDE STORE (localStorage)
   Demo persistence layer. The site is a static GitHub Pages deployment, so
   the catalog, cart, orders, appointments, and settings all live in the
   visitor's browser. Nothing is sent to a server.
   ============================================================================ */

const Store = (() => {
    const KEYS = {
        products:     "veloura_products",
        catalogVer:   "veloura_catalog_version",
        cart:         "veloura_cart",
        orders:       "veloura_orders",
        appointments: "veloura_appointments",
        settings:     "veloura_settings",
        session:      "veloura_admin_session",
        subscribers:  "veloura_subscribers",
        lastOrder:    "veloura_last_order" // sessionStorage
    };

    // Demo admin credentials — this is a mock login for showcase purposes only.
    const ADMIN_USER = "demo";
    const ADMIN_PASS = "veloura2026";

    function read(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw === null ? fallback : JSON.parse(raw);
        } catch (e) {
            return fallback;
        }
    }

    function write(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    /* ---- Products (seeded from data/products.json, editable via admin) ---- */

    // Called at boot with the transformed catalog. Re-seeds whenever the
    // catalog version (JSON "generated" stamp) changes, so client updates to
    // data/products.json reach returning visitors. Demo admin edits are
    // discarded on re-seed — acceptable for a showcase.
    let catalogSeed = { version: null, products: [] };

    function seedCatalog(catalog) {
        catalogSeed = catalog;
        if (read(KEYS.catalogVer, null) !== catalog.version || read(KEYS.products, null) === null) {
            write(KEYS.products, catalog.products);
            write(KEYS.catalogVer, catalog.version);
        }
    }

    function getProducts() {
        // Backfill `group` for catalogs seeded before main-category grouping
        // existed (same catalog version, so no automatic re-seed).
        return read(KEYS.products, []).map(p =>
            p.group ? p : { ...p, group: mainGroupFor(p.category) }
        );
    }

    function getProduct(id) {
        return getProducts().find(p => String(p.id) === String(id)) || null;
    }

    function getCategories() {
        const seen = [];
        getProducts().forEach(p => {
            if (p.category && !seen.includes(p.category)) seen.push(p.category);
        });
        return seen;
    }

    function saveProduct(product) {
        const products = getProducts();
        if (product.id) {
            const i = products.findIndex(p => String(p.id) === String(product.id));
            if (i !== -1) products[i] = { ...products[i], ...product };
            else products.push(product);
        } else {
            product.id = "custom-" + Date.now().toString(36);
            products.push(product);
        }
        write(KEYS.products, products);
        return product;
    }

    function deleteProduct(id) {
        write(KEYS.products, getProducts().filter(p => String(p.id) !== String(id)));
    }

    function resetProducts() {
        write(KEYS.products, catalogSeed.products);
        write(KEYS.catalogVer, catalogSeed.version);
    }

    /* ---- Cart ---- */

    function getCart() {
        return read(KEYS.cart, []);
    }

    function saveCart(cart) {
        write(KEYS.cart, cart);
    }

    function addToCart(productId, size, qty = 1) {
        const cart = getCart();
        const existing = cart.find(item => item.id === productId && item.size === size);
        if (existing) {
            existing.qty += qty;
        } else {
            cart.push({ id: productId, size, qty });
        }
        saveCart(cart);
    }

    function removeFromCart(productId, size) {
        saveCart(getCart().filter(item => !(item.id === productId && item.size === size)));
    }

    function updateCartQty(productId, size, qty) {
        if (qty <= 0) {
            removeFromCart(productId, size);
            return;
        }
        const cart = getCart();
        const item = cart.find(i => i.id === productId && i.size === size);
        if (item) item.qty = qty;
        saveCart(cart);
    }

    // Sums priced items only; items with price === null are "on request"
    function getCartSubtotal() {
        return getCart().reduce((sum, item) => {
            const product = getProduct(item.id);
            return sum + (product && product.price ? product.price * item.qty : 0);
        }, 0);
    }

    function getCartUnpricedCount() {
        return getCart().reduce((count, item) => {
            const product = getProduct(item.id);
            return count + (product && product.price == null ? item.qty : 0);
        }, 0);
    }

    function getCartCount() {
        return getCart().reduce((sum, item) => sum + item.qty, 0);
    }

    function clearCart() {
        localStorage.removeItem(KEYS.cart);
    }

    /* ---- Orders (created at checkout, managed in admin) ---- */

    function getOrders() {
        return read(KEYS.orders, []);
    }

    function getOrder(id) {
        return getOrders().find(o => o.id === id) || null;
    }

    function addOrder(order) {
        const orders = getOrders();
        order.id = "ORD-" + Date.now().toString(36).toUpperCase();
        order.createdAt = new Date().toISOString();
        order.status = "Pending Payment";
        orders.unshift(order);
        write(KEYS.orders, orders);
        // Remember the confirmation for the /thank-you page (per-tab, survives the redirect)
        sessionStorage.setItem(KEYS.lastOrder, JSON.stringify(order));
        return order;
    }

    function updateOrderStatus(id, status) {
        const orders = getOrders();
        const order = orders.find(o => o.id === id);
        if (order) {
            order.status = status;
            write(KEYS.orders, orders);
        }
    }

    function getLastOrder() {
        try {
            return JSON.parse(sessionStorage.getItem(KEYS.lastOrder));
        } catch (e) {
            return null;
        }
    }

    /* ---- Appointments (personal shopping requests) ---- */

    function getAppointments() {
        return read(KEYS.appointments, []);
    }

    function addAppointment(appt) {
        const appts = getAppointments();
        appt.id = "APT-" + Date.now().toString(36).toUpperCase();
        appt.createdAt = new Date().toISOString();
        appt.status = "Pending";
        appts.unshift(appt);
        write(KEYS.appointments, appts);
        return appt;
    }

    function updateAppointmentStatus(id, status) {
        const appts = getAppointments();
        const appt = appts.find(a => a.id === id);
        if (appt) {
            appt.status = status;
            write(KEYS.appointments, appts);
        }
    }

    /* ---- Settings ---- */

    function getSettings() {
        return { ...DEFAULT_SETTINGS, ...read(KEYS.settings, {}) };
    }

    function saveSettings(patch) {
        write(KEYS.settings, { ...read(KEYS.settings, {}), ...patch });
    }

    /* ---- VIP subscribers ---- */

    function addSubscriber(email) {
        const subs = read(KEYS.subscribers, []);
        if (!subs.includes(email)) subs.push(email);
        write(KEYS.subscribers, subs);
    }

    /* ---- Admin session (mock authentication, demo only) ---- */

    function isAdmin() {
        return read(KEYS.session, false) === true;
    }

    function login(user, pass) {
        if (user === ADMIN_USER && pass === ADMIN_PASS) {
            write(KEYS.session, true);
            return true;
        }
        return false;
    }

    function logout() {
        localStorage.removeItem(KEYS.session);
    }

    return {
        seedCatalog, getProducts, getProduct, getCategories,
        saveProduct, deleteProduct, resetProducts,
        getCart, addToCart, removeFromCart, updateCartQty,
        getCartSubtotal, getCartUnpricedCount, getCartCount, clearCart,
        getOrders, getOrder, addOrder, updateOrderStatus, getLastOrder,
        getAppointments, addAppointment, updateAppointmentStatus,
        getSettings, saveSettings,
        addSubscriber,
        isAdmin, login, logout,
        ADMIN_USER, ADMIN_PASS
    };
})();
