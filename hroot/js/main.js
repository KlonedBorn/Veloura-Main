/* ============================================================================
   VELOURA COLLECTION — APP BOOTSTRAP
   Registers routes, wires the global chrome (nav, cart badge, announcement
   bar), and starts the router.
   ============================================================================ */

/* ---- Global helpers used by views ---- */

function updateCartBadge() {
    const badge = document.getElementById("cartBadgeTop");
    if (!badge) return;
    const total = Store.getCartCount();
    badge.textContent = total;
    badge.style.display = total > 0 ? "flex" : "none";
}

function applySiteSettings() {
    const s = Store.getSettings();
    const announcement = document.getElementById("announcementText");
    if (announcement) announcement.textContent = `📍 Visit us at ${s.address} | Open ${s.storeHours}`;
    const footerAddress = document.getElementById("footerAddress");
    if (footerAddress) footerAddress.textContent = s.address;
    const footerPhone = document.getElementById("footerPhone");
    if (footerPhone) footerPhone.textContent = s.phone;
}

/* ---- Routes ---- */

// Public showroom
Router.register("/", () => Views.welcome());
Router.register("/index.html", () => Views.welcome());
Router.register("/browse", (params, query) => Views.browse(params, query));
Router.register("/product/:id", (params) => Views.product(params));
Router.register("/cart", () => Views.cart());
Router.register("/checkout", () => Views.checkout());
Router.register("/thank-you", () => Views.thankYou());
Router.register("/exclusives", () => Views.exclusives());
Router.register("/contact", () => Views.contact());

// Mock admin dashboard (demo only)
Router.register("/admin", () => Admin.dashboard());
Router.register("/admin/login", () => Admin.login());
Router.register("/admin/products", () => Admin.products());
Router.register("/admin/products/new", () => Admin.productForm());
Router.register("/admin/products/:id/edit", (params) => Admin.productForm(params));
Router.register("/admin/orders", () => Admin.orders());
Router.register("/admin/orders/:id", (params) => Admin.orderDetail(params));
Router.register("/admin/appointments", () => Admin.appointments());
Router.register("/admin/settings", () => Admin.settings());

/* ---- Boot ---- */

document.addEventListener("DOMContentLoaded", async () => {
    updateCartBadge();
    applySiteSettings();

    // Views re-render fragments with data-route links; fix their hrefs
    document.addEventListener("veloura:links", () => Router.fixLinks(document.getElementById("app")));

    // Mobile menu toggle
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    menuToggle.addEventListener("click", () => {
        const open = mobileMenu.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(open));
    });

    // Load the client-maintained catalog before routing (URL is relative,
    // resolved against the <base> tag, so it works under any deploy path).
    try {
        const res = await fetch(CATALOG_URL);
        if (!res.ok) throw new Error("HTTP " + res.status);
        Store.seedCatalog(transformCatalog(await res.json()));
    } catch (err) {
        console.error("Could not load catalog (" + CATALOG_URL + "):", err);
    }

    updateCartBadge();
    Router.init();
});
