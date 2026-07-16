/* ============================================================================
   VELOURA COLLECTION — MOCK ADMIN DASHBOARD (demo only)
   A localStorage-backed preview of the store-owner dashboard described in
   context/ui-frontend/NAVIGATION.md. There is no real authentication or
   backend on GitHub Pages: the login is a demo gate, and all data lives in
   the current browser only. The production dashboard is planned for the
   Laravel application.
   ============================================================================ */

const Admin = (() => {
    const app = () => document.getElementById("app");

    const ORDER_STATUSES = ["Pending Payment", "Confirmed", "Ready for Pickup", "Shipped", "Delivered", "Cancelled"];
    const APPT_STATUSES = ["Pending", "Confirmed", "Cancelled", "Completed"];

    function esc(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }

    function fmtDate(iso) {
        return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    }

    function statusClass(status) {
        return "status-pill status-" + status.toLowerCase().replace(/\s+/g, "-");
    }

    function guard(renderFn) {
        return (...args) => {
            if (!Store.isAdmin()) {
                login();
                return;
            }
            renderFn(...args);
        };
    }

    /* ------------------------------------------------------------------ */
    /* LOGIN                                                               */
    /* ------------------------------------------------------------------ */

    function login() {
        app().innerHTML = `
        <section class="page-section active">
            <main class="container section-padding" style="max-width: 440px; padding-top: 64px;">
                <div class="contact-form-box">
                    <h1 class="form-title" style="font-size: 24px;">Boutique Dashboard</h1>
                    <p class="form-desc">Store owner sign-in. This is a <strong>demo</strong> dashboard — data is stored in your browser only.</p>
                    <div class="admin-demo-hint">
                        Demo credentials — username: <code>${Store.ADMIN_USER}</code> &nbsp;password: <code>${Store.ADMIN_PASS}</code>
                    </div>
                    <p id="loginError" style="display:none; color: #B3261E; font-size: 13px; margin-bottom: 12px;">Invalid username or password.</p>
                    <form id="loginForm">
                        <div class="form-group">
                            <label for="adminUser">Username</label>
                            <input type="text" id="adminUser" class="form-control" autocomplete="username" required>
                        </div>
                        <div class="form-group">
                            <label for="adminPass">Password</label>
                            <input type="password" id="adminPass" class="form-control" autocomplete="current-password" required>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width:100%;">Sign In</button>
                    </form>
                    <a href="/" data-route style="display:block; text-align:center; font-size:13px; margin-top:16px; color:var(--text-muted);">← Back to storefront</a>
                </div>
            </main>
        </section>`;

        document.getElementById("loginForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const ok = Store.login(
                document.getElementById("adminUser").value.trim(),
                document.getElementById("adminPass").value
            );
            if (ok) {
                Router.navigate("/admin", { replace: true });
            } else {
                document.getElementById("loginError").style.display = "block";
            }
        });
        document.dispatchEvent(new CustomEvent("veloura:links"));
    }

    /* ------------------------------------------------------------------ */
    /* SHELL (sidebar + content)                                           */
    /* ------------------------------------------------------------------ */

    function shell(active, title, contentHtml) {
        const nav = [
            { path: "/admin",              id: "dashboard",    icon: "bi-speedometer2",  label: "Dashboard" },
            { path: "/admin/products",     id: "products",     icon: "bi-bag",           label: "Products" },
            { path: "/admin/orders",       id: "orders",       icon: "bi-receipt",       label: "Orders" },
            { path: "/admin/appointments", id: "appointments", icon: "bi-calendar3",     label: "Appointments" },
            { path: "/admin/settings",     id: "settings",     icon: "bi-gear",          label: "Settings" }
        ];

        app().innerHTML = `
        <section class="page-section active">
            <div class="admin-demo-banner">
                <i class="bi bi-info-circle"></i> Demo mode — changes are saved to this browser only. No real customer data is collected.
            </div>
            <div class="container admin-layout">
                <aside class="admin-sidebar">
                    <nav>
                        ${nav.map(item => `<a href="${item.path}" data-route class="admin-nav-link${item.id === active ? " active" : ""}"><i class="bi ${item.icon}"></i> ${item.label}</a>`).join("")}
                        <button id="adminLogout" class="admin-nav-link admin-logout"><i class="bi bi-box-arrow-right"></i> Logout</button>
                    </nav>
                </aside>
                <div class="admin-content">
                    <h1 class="admin-page-title">${esc(title)}</h1>
                    ${contentHtml}
                </div>
            </div>
        </section>`;

        document.getElementById("adminLogout").addEventListener("click", () => {
            Store.logout();
            Router.navigate("/admin");
        });
        document.dispatchEvent(new CustomEvent("veloura:links"));
    }

    /* ------------------------------------------------------------------ */
    /* DASHBOARD                                                           */
    /* ------------------------------------------------------------------ */

    const dashboard = guard(() => {
        const products = Store.getProducts();
        const orders = Store.getOrders();
        const appts = Store.getAppointments();
        const pendingOrders = orders.filter(o => o.status === "Pending Payment").length;
        const newAppts = appts.filter(a => a.status === "Pending").length;
        const revenue = orders.filter(o => !["Cancelled", "Pending Payment"].includes(o.status))
                              .reduce((sum, o) => sum + o.total, 0);

        shell("dashboard", "Dashboard", `
            <div class="admin-stat-grid">
                <div class="admin-stat-card"><span class="stat-value">${products.length}</span><span class="stat-label">Products</span></div>
                <div class="admin-stat-card"><span class="stat-value">${pendingOrders}</span><span class="stat-label">Pending Orders</span></div>
                <div class="admin-stat-card"><span class="stat-value">${newAppts}</span><span class="stat-label">New Appointments</span></div>
                <div class="admin-stat-card"><span class="stat-value">$${revenue}</span><span class="stat-label">Confirmed Revenue</span></div>
            </div>

            <h2 class="admin-section-title">Recent Orders</h2>
            ${orders.length === 0
                ? `<p class="admin-empty">No orders yet. Orders placed through the storefront checkout appear here.</p>`
                : `<div class="admin-table-wrap"><table class="admin-table">
                    <thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th></tr></thead>
                    <tbody>${orders.slice(0, 5).map(o => `
                        <tr>
                            <td><a href="/admin/orders/${o.id}" data-route class="admin-link">${esc(o.id)}</a></td>
                            <td>${esc(o.customer.name)}</td>
                            <td>${fmtDate(o.createdAt)}</td>
                            <td>$${o.total}</td>
                            <td><span class="${statusClass(o.status)}">${esc(o.status)}</span></td>
                        </tr>`).join("")}
                    </tbody></table></div>`}

            <h2 class="admin-section-title">Pending Appointments</h2>
            ${newAppts === 0
                ? `<p class="admin-empty">No pending appointment requests.</p>`
                : `<div class="admin-table-wrap"><table class="admin-table">
                    <thead><tr><th>Client</th><th>Date</th><th>Session</th><th></th></tr></thead>
                    <tbody>${appts.filter(a => a.status === "Pending").slice(0, 5).map(a => `
                        <tr>
                            <td>${esc(a.name)}</td>
                            <td>${esc(a.date)}</td>
                            <td>${esc(a.service)}</td>
                            <td><a href="/admin/appointments" data-route class="admin-link">Review</a></td>
                        </tr>`).join("")}
                    </tbody></table></div>`}
        `);
    });

    /* ------------------------------------------------------------------ */
    /* PRODUCTS                                                            */
    /* ------------------------------------------------------------------ */

    const products = guard(() => {
        const items = Store.getProducts();
        shell("products", "Product Management", `
            <div style="display:flex; justify-content:space-between; align-items:center; gap: 12px; flex-wrap: wrap; margin-bottom: 20px;">
                <a href="/admin/products/new" data-route class="btn btn-primary" style="padding: 10px 20px; font-size: 11px;"><i class="bi bi-plus-lg"></i> Add New Product</a>
                <button id="resetCatalog" class="btn btn-secondary" style="padding: 10px 20px; font-size: 11px;">Reset to Default Catalog</button>
            </div>
            <div class="admin-table-wrap"><table class="admin-table">
                <thead><tr><th>ID</th><th>Title</th><th>Category</th><th>Price</th><th>In Stock</th><th>Badge</th><th>Actions</th></tr></thead>
                <tbody>${items.map(p => `
                    <tr>
                        <td style="max-width:140px; overflow:hidden; text-overflow:ellipsis;">${esc(p.id)}</td>
                        <td>${esc(p.title)}${p.color ? `<br><span style="color:var(--text-muted); font-size:12px;">${esc(p.color)}</span>` : ""}</td>
                        <td>${esc(p.categoryLabel)}</td>
                        <td>${p.price == null ? "On request" : "$" + p.price}</td>
                        <td>${p.inStock === false ? "No" : "Yes"}</td>
                        <td>${esc(p.badge || "—")}</td>
                        <td class="admin-actions">
                            <a href="/admin/products/${encodeURIComponent(p.id)}/edit" data-route class="admin-link">Edit</a>
                            <button class="admin-link admin-link-danger" data-delete="${esc(p.id)}">Delete</button>
                        </td>
                    </tr>`).join("")}
                </tbody></table></div>
        `);

        document.querySelectorAll("[data-delete]").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.dataset.delete;
                const product = Store.getProduct(id);
                if (product && confirm(`Delete "${product.title}"? This only affects this browser's demo catalog.`)) {
                    Store.deleteProduct(id);
                    products();
                }
            });
        });

        document.getElementById("resetCatalog").addEventListener("click", () => {
            if (confirm("Restore the catalog from data/products.json? Demo edits will be lost.")) {
                Store.resetProducts();
                products();
            }
        });
    });

    const productForm = guard((params = {}) => {
        const editing = params.id ? Store.getProduct(params.id) : null;
        if (params.id && !editing) {
            Views.notFound(`/admin/products/${params.id}/edit`);
            return;
        }
        const p = editing || { title: "", category: "", color: "", price: null, image: "", description: "", sizes: ["One Size"], specs: [], badge: "", inStock: true };

        shell("products", editing ? "Edit Product" : "Add New Product", `
            <form id="productForm" class="admin-form">
                <div class="form-group">
                    <label for="pTitle">Title</label>
                    <input type="text" id="pTitle" class="form-control" value="${esc(p.title)}" required>
                </div>
                <div class="admin-form-row">
                    <div class="form-group">
                        <label for="pCategory">Category</label>
                        <input type="text" id="pCategory" class="form-control" list="categoryList" value="${esc(p.category)}" placeholder="e.g. shoulder-bag" required>
                        <datalist id="categoryList">
                            ${Store.getCategories().map(c => `<option value="${esc(c)}">${esc(prettyCategory(c))}</option>`).join("")}
                        </datalist>
                    </div>
                    <div class="form-group">
                        <label for="pPrice">Price (USD) — leave empty for "price on request"</label>
                        <input type="number" id="pPrice" class="form-control" min="0" step="1" value="${p.price == null ? "" : esc(p.price)}">
                    </div>
                </div>
                <div class="form-group">
                    <label for="pColor">Color (optional)</label>
                    <input type="text" id="pColor" class="form-control" value="${esc(p.color || "")}" placeholder="e.g. Black / Brass">
                </div>
                <div class="form-group">
                    <label for="pImage">Image URL</label>
                    <input type="url" id="pImage" class="form-control" value="${esc(p.image)}" placeholder="https://..." required>
                </div>
                <div class="form-group">
                    <label for="pDesc">Description</label>
                    <textarea id="pDesc" class="form-control" required>${esc(p.description)}</textarea>
                </div>
                <div class="admin-form-row">
                    <div class="form-group">
                        <label for="pBadge">Badge (optional)</label>
                        <input type="text" id="pBadge" class="form-control" value="${esc(p.badge)}" placeholder="e.g. Best Seller">
                    </div>
                    <div class="form-group">
                        <label for="pSizes">Sizes (comma-separated)</label>
                        <input type="text" id="pSizes" class="form-control" value="${esc(p.sizes.join(", "))}" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="pSpecs">Specifications (one per line)</label>
                    <textarea id="pSpecs" class="form-control">${esc(p.specs.join("\n"))}</textarea>
                </div>
                <div class="form-group">
                    <label style="display:flex; align-items:center; gap: 8px; font-weight: 600; font-size: 13px;">
                        <input type="checkbox" id="pInStock" ${p.inStock !== false ? "checked" : ""}> In Stock
                    </label>
                </div>
                <div style="display:flex; gap: 12px;">
                    <button type="submit" class="btn btn-primary" style="padding: 10px 24px; font-size: 11px;">Save Product</button>
                    <a href="/admin/products" data-route class="btn btn-secondary" style="padding: 10px 24px; font-size: 11px;">Cancel</a>
                </div>
            </form>
        `);

        document.getElementById("productForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const category = document.getElementById("pCategory").value.trim().toLowerCase().replace(/\s+/g, "-");
            const priceRaw = document.getElementById("pPrice").value;
            Store.saveProduct({
                id: editing ? editing.id : undefined,
                title: document.getElementById("pTitle").value.trim(),
                category,
                group: mainGroupFor(category),
                categoryLabel: (editing && category === editing.category) ? editing.categoryLabel : prettyCategory(category),
                color: document.getElementById("pColor").value.trim(),
                price: priceRaw === "" ? null : Number(priceRaw),
                image: document.getElementById("pImage").value.trim(),
                description: document.getElementById("pDesc").value.trim(),
                badge: document.getElementById("pBadge").value.trim(),
                sizes: document.getElementById("pSizes").value.split(",").map(s => s.trim()).filter(Boolean),
                specs: document.getElementById("pSpecs").value.split("\n").map(s => s.trim()).filter(Boolean),
                inStock: document.getElementById("pInStock").checked
            });
            Router.navigate("/admin/products");
        });
    });

    /* ------------------------------------------------------------------ */
    /* ORDERS                                                              */
    /* ------------------------------------------------------------------ */

    const orders = guard(() => {
        const items = Store.getOrders();
        shell("orders", "Order Management", items.length === 0
            ? `<p class="admin-empty">No orders yet. Orders placed through the storefront checkout appear here.</p>`
            : `<div class="admin-table-wrap"><table class="admin-table">
                <thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Fulfillment</th><th>Total</th><th>Status</th><th></th></tr></thead>
                <tbody>${items.map(o => `
                    <tr>
                        <td>${esc(o.id)}</td>
                        <td>${esc(o.customer.name)}</td>
                        <td>${fmtDate(o.createdAt)}</td>
                        <td>${o.fulfillment === "delivery" ? "Delivery" : "Pickup"}</td>
                        <td>$${o.total}</td>
                        <td><span class="${statusClass(o.status)}">${esc(o.status)}</span></td>
                        <td><a href="/admin/orders/${o.id}" data-route class="admin-link">View</a></td>
                    </tr>`).join("")}
                </tbody></table></div>`);
    });

    const orderDetail = guard((params) => {
        const order = Store.getOrder(params.id);
        if (!order) {
            Views.notFound(`/admin/orders/${params.id}`);
            return;
        }

        shell("orders", `Order ${order.id}`, `
            <a href="/admin/orders" data-route class="admin-link" style="display:inline-block; margin-bottom: 20px;"><i class="bi bi-arrow-left"></i> Back to Orders</a>

            <div class="admin-detail-grid">
                <div class="admin-card">
                    <h3>Customer</h3>
                    <p><strong>${esc(order.customer.name)}</strong></p>
                    <p>${esc(order.customer.email)}</p>
                    <p>${esc(order.customer.phone)}</p>
                    ${order.customer.address ? `<p style="margin-top:8px;"><strong>Delivery address:</strong><br>${esc(order.customer.address)}</p>` : `<p style="margin-top:8px;">In-store pickup at Heritage Quay.</p>`}
                </div>

                <div class="admin-card">
                    <h3>Status</h3>
                    <p style="margin-bottom: 12px;"><span class="${statusClass(order.status)}">${esc(order.status)}</span> · placed ${fmtDate(order.createdAt)}</p>
                    <div class="form-group">
                        <label for="orderStatus">Update status</label>
                        <select id="orderStatus" class="form-control">
                            ${ORDER_STATUSES.map(s => `<option${s === order.status ? " selected" : ""}>${s}</option>`).join("")}
                        </select>
                    </div>
                    <button id="saveStatus" class="btn btn-primary" style="padding: 10px 20px; font-size: 11px;">Save Status</button>
                    <span id="statusSaved" style="display:none; margin-left: 10px; color: var(--accent); font-size: 13px;"><i class="bi bi-check-circle-fill"></i> Saved</span>
                </div>
            </div>

            <h2 class="admin-section-title">Items</h2>
            <div class="admin-table-wrap"><table class="admin-table">
                <thead><tr><th>Product</th><th>Size</th><th>Qty</th><th>Unit</th><th>Subtotal</th></tr></thead>
                <tbody>${order.items.map(item => `
                    <tr>
                        <td>${esc(item.title)}</td>
                        <td>${esc(item.size)}</td>
                        <td>${item.qty}</td>
                        <td>${item.price == null ? "On request" : "$" + item.price}</td>
                        <td>${item.price == null ? "On request" : "$" + item.price * item.qty}</td>
                    </tr>`).join("")}
                </tbody>
                <tfoot>
                    <tr><td colspan="4">Subtotal (priced items)</td><td>$${order.subtotal}</td></tr>
                    ${order.deliveryFee > 0 ? `<tr><td colspan="4">Delivery Fee</td><td>$${order.deliveryFee}</td></tr>` : ""}
                    <tr class="admin-table-total"><td colspan="4">Total</td><td>$${order.total}${order.unpricedCount > 0 ? ` + ${order.unpricedCount} on request` : ""}</td></tr>
                </tfoot>
            </table></div>
        `);

        document.getElementById("saveStatus").addEventListener("click", () => {
            Store.updateOrderStatus(order.id, document.getElementById("orderStatus").value);
            document.getElementById("statusSaved").style.display = "inline";
            setTimeout(() => orderDetail({ id: order.id }), 700);
        });
    });

    /* ------------------------------------------------------------------ */
    /* APPOINTMENTS                                                        */
    /* ------------------------------------------------------------------ */

    const appointments = guard(() => {
        const items = Store.getAppointments();
        shell("appointments", "Personal Shopping Requests", items.length === 0
            ? `<p class="admin-empty">No appointment requests yet. Requests from the contact page appear here.</p>`
            : `<div class="admin-table-wrap"><table class="admin-table">
                <thead><tr><th>Client</th><th>Contact</th><th>Date</th><th>Session</th><th>Interests</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>${items.map(a => `
                    <tr>
                        <td>${esc(a.name)}</td>
                        <td>${esc(a.email)}${a.phone ? `<br><span style="color:var(--text-muted); font-size:12px;">${esc(a.phone)}</span>` : ""}</td>
                        <td>${esc(a.date)}</td>
                        <td>${esc(a.service)}</td>
                        <td style="max-width: 220px;">${esc(a.interests || "—")}</td>
                        <td><span class="${statusClass(a.status)}">${esc(a.status)}</span></td>
                        <td class="admin-actions">
                            ${a.status === "Pending" ? `<button class="admin-link" data-confirm="${a.id}">Confirm</button>` : ""}
                            ${["Pending", "Confirmed"].includes(a.status) ? `<button class="admin-link admin-link-danger" data-cancel="${a.id}">Cancel</button>` : ""}
                            ${a.status === "Confirmed" ? `<button class="admin-link" data-complete="${a.id}">Complete</button>` : ""}
                        </td>
                    </tr>`).join("")}
                </tbody></table></div>`);

        const rerender = () => appointments();
        document.querySelectorAll("[data-confirm]").forEach(b => b.addEventListener("click", () => { Store.updateAppointmentStatus(b.dataset.confirm, "Confirmed"); rerender(); }));
        document.querySelectorAll("[data-cancel]").forEach(b => b.addEventListener("click", () => { Store.updateAppointmentStatus(b.dataset.cancel, "Cancelled"); rerender(); }));
        document.querySelectorAll("[data-complete]").forEach(b => b.addEventListener("click", () => { Store.updateAppointmentStatus(b.dataset.complete, "Completed"); rerender(); }));
    });

    /* ------------------------------------------------------------------ */
    /* SETTINGS                                                            */
    /* ------------------------------------------------------------------ */

    const settings = guard(() => {
        const s = Store.getSettings();
        shell("settings", "Store Settings", `
            <form id="settingsForm" class="admin-form">
                <h2 class="admin-section-title" style="margin-top:0;">Delivery</h2>
                <div class="form-group" style="max-width: 220px;">
                    <label for="sFee">Flat delivery fee (USD)</label>
                    <input type="number" id="sFee" class="form-control" min="0" step="1" value="${esc(s.deliveryFee)}">
                </div>

                <h2 class="admin-section-title">Store Hours</h2>
                <div class="form-group">
                    <label for="sHoursShort">Short hours line (announcement bar, footer)</label>
                    <input type="text" id="sHoursShort" class="form-control" value="${esc(s.storeHours)}">
                </div>
                <div class="form-group">
                    <label for="sHoursLong">Full hours (contact page, one line per row)</label>
                    <textarea id="sHoursLong" class="form-control">${esc(s.storeHoursLong)}</textarea>
                </div>

                <h2 class="admin-section-title">Contact Information</h2>
                <div class="form-group">
                    <label for="sAddress">Address</label>
                    <input type="text" id="sAddress" class="form-control" value="${esc(s.address)}">
                </div>
                <div class="admin-form-row">
                    <div class="form-group">
                        <label for="sPhone">Phone / WhatsApp</label>
                        <input type="text" id="sPhone" class="form-control" value="${esc(s.phone)}">
                    </div>
                    <div class="form-group">
                        <label for="sEmail">Email</label>
                        <input type="email" id="sEmail" class="form-control" value="${esc(s.email)}">
                    </div>
                </div>

                <button type="submit" class="btn btn-primary" style="padding: 10px 24px; font-size: 11px;">Save Settings</button>
                <span id="settingsSaved" style="display:none; margin-left: 10px; color: var(--accent); font-size: 13px;"><i class="bi bi-check-circle-fill"></i> Saved</span>
            </form>
        `);

        document.getElementById("settingsForm").addEventListener("submit", (e) => {
            e.preventDefault();
            Store.saveSettings({
                deliveryFee: Number(document.getElementById("sFee").value) || 0,
                storeHours: document.getElementById("sHoursShort").value.trim(),
                storeHoursLong: document.getElementById("sHoursLong").value.trim(),
                address: document.getElementById("sAddress").value.trim(),
                phone: document.getElementById("sPhone").value.trim(),
                email: document.getElementById("sEmail").value.trim()
            });
            applySiteSettings();
            document.getElementById("settingsSaved").style.display = "inline";
            setTimeout(() => { document.getElementById("settingsSaved").style.display = "none"; }, 2000);
        });
    });

    return { login, dashboard, products, productForm, orders, orderDetail, appointments, settings };
})();
