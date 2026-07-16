/* ============================================================================
   VELOURA COLLECTION — PUBLIC SHOWROOM VIEWS
   Each view renders into #app and wires up its own event handlers.
   ============================================================================ */

const Views = (() => {
    const app = () => document.getElementById("app");

    function esc(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }

    function money(n) {
        return `$${n} USD`;
    }

    // Catalog items without a set price are curated "price on request" pieces
    function priceLabel(product) {
        return product.price == null ? "Price on request" : money(product.price);
    }

    function whatsappLink(message) {
        return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
    }

    /* ------------------------------------------------------------------ */
    /* WELCOME / HOME                                                      */
    /* ------------------------------------------------------------------ */

    function welcome() {
        app().innerHTML = `
        <section class="page-section active">
            <section class="hero" aria-label="Hero section">
                <div class="container">
                    <div class="hero-content">
                        <p class="hero-subtitle">HERITAGE QUAY • ST. JOHN'S • ANTIGUA</p>
                        <h1 class="hero-title">Soft Luxury, Curated for You</h1>
                        <p class="hero-desc">Discover our curated collection of Coach and Michael Kors handbags, fine leather wallets, sandals, and Stanley cups — each piece chosen for quality and lasting value.</p>
                        <div class="btn-group">
                            <a href="/browse" data-route class="btn btn-primary">Browse Collection <i class="bi bi-arrow-right"></i></a>
                            <a href="/contact" data-route class="btn btn-secondary">Find Our Boutique</a>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-padding container" aria-label="Why Shop In-Store">
                <div class="section-title-wrap">
                    <span class="section-subtitle">THE VELOURA WAY</span>
                    <h2 class="section-title">Curated Quality, Every Piece</h2>
                </div>
                <div class="feature-card-grid">
                    <div class="feature-card">
                        <div class="feature-card-body">
                            <span class="feature-card-tag">Authentic & Curated</span>
                            <h3 class="feature-card-title">Genuine Coach & Michael Kors, No Guesswork</h3>
                            <p class="feature-card-desc">Every handbag, wallet, and accessory in our collection is chosen for its quality, craftsmanship, and lasting value — verified in-store before it ever reaches you.</p>
                        </div>
                    </div>
                    <div class="feature-card">
                        <div class="feature-card-body">
                            <span class="feature-card-tag">Your Choice</span>
                            <h3 class="feature-card-title">Order Online, Pick Up or Have It Delivered</h3>
                            <p class="feature-card-desc">Add items to your cart and choose free pickup at our Heritage Quay boutique, or delivery to your door for a flat fee. Payment is confirmed by bank transfer.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-padding local-highlight" aria-label="Local Boutique Details">
                <div class="container">
                    <div class="local-grid">
                        <div class="local-image-wrap">
                            <img class="local-image local-image-logo" src="hroot/assets/images/veloura-logo-full.png" alt="Veloura Collection logo" loading="lazy">
                        </div>
                        <div class="local-content">
                            <span class="local-tag">📍 Visit Our Physical Store</span>
                            <h3>Find Us at Heritage Quay, St. John's</h3>
                            <p>Located in Antigua's vibrant, tax-free historic Heritage Quay district, Veloura Collection is easily accessible for both local residents and travelers docked in St. John's. Order online and pick up in-store, or arrange delivery.</p>
                            <ul class="store-meta-list">
                                <li><i class="bi bi-clock"></i> <strong>Open:</strong> ${esc(Store.getSettings().storeHours)}</li>
                                <li><i class="bi bi-geo-alt"></i> <strong>Address:</strong> ${esc(Store.getSettings().address)}</li>
                                <li><i class="bi bi-phone"></i> <strong>Call/WhatsApp:</strong> ${esc(Store.getSettings().phone)}</li>
                            </ul>
                            <div class="btn-group" style="justify-content: flex-start;">
                                <a href="/contact" data-route class="btn btn-dark">Get Directions</a>
                                <a href="${whatsappLink("Hi Veloura Collection! I'd like to inquire about a product in your store.")}" target="_blank" rel="noopener" class="btn btn-whatsapp"><i class="bi bi-whatsapp"></i> Chat on WhatsApp</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-padding container" aria-label="Client Testimonials">
                <div class="section-title-wrap">
                    <span class="section-subtitle">LOCAL VOICES</span>
                    <h2 class="section-title">Loved by Locals and Visitors</h2>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                    <div style="background-color: var(--bg-white); padding: 32px; border-radius: var(--border-radius-lg); border: 1px solid var(--border-color);">
                        <div style="color: var(--accent); margin-bottom: 16px;"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div>
                        <p style="font-style: italic; color: var(--text-dark); font-size: 15px; margin-bottom: 20px;">"I ordered a Coach tote online and picked it up at the Heritage Quay store the next day. Easy process, and the bag was exactly as pictured."</p>
                        <strong style="font-size: 14px; display: block;">— Arthur M., St. John's Local</strong>
                    </div>
                    <div style="background-color: var(--bg-white); padding: 32px; border-radius: var(--border-radius-lg); border: 1px solid var(--border-color);">
                        <div style="color: var(--accent); margin-bottom: 16px;"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></div>
                        <p style="font-style: italic; color: var(--text-dark); font-size: 15px; margin-bottom: 20px;">"While docked in St. John's, I stopped by Veloura and picked up a Michael Kors bag as a gift. Genuine product, fair price, friendly service."</p>
                        <strong style="font-size: 14px; display: block;">— Sarah L., Cruise Passenger</strong>
                    </div>
                </div>
            </section>
        </section>`;
    }

    /* ------------------------------------------------------------------ */
    /* BROWSE                                                              */
    /* ------------------------------------------------------------------ */

    function browse(params, query) {
        // Sidebar = main store categories; chip row above the gallery =
        // subcategory types derived from the live catalog for that group.
        let currentGroup = query.get("category") || "all";
        let currentType = query.get("type") || "all";
        let searchTerm = query.get("search") || "";
        if (!MAIN_CATEGORIES.some(c => c.id === currentGroup)) currentGroup = "all";

        app().innerHTML = `
        <section class="page-section active">
            <div class="container" style="padding-top: 48px; padding-bottom: 12px;">
                <h1 style="font-size: 36px; margin-bottom: 8px;">The Collection</h1>
                <p style="color: var(--text-muted); font-size: 15px;">Add your favorites to cart, then choose pickup at our St. John's boutique at Heritage Quay or delivery to your door.</p>
            </div>

            <main class="container section-padding" style="padding-top: 32px;">
                <div class="catalog-layout">
                    <aside class="filters-sidebar" aria-label="Product Filters">
                        <div class="search-box">
                            <i class="bi bi-search"></i>
                            <input type="text" id="searchInput" class="search-input" placeholder="Search products..." aria-label="Search products" value="${esc(searchTerm)}">
                        </div>
                        <div class="filter-group">
                            <h4>Categories</h4>
                            <nav class="filter-options" aria-label="Category filters">
                                ${MAIN_CATEGORIES.map(c => `<button class="filter-btn${c.id === currentGroup ? " active" : ""}" data-group="${esc(c.id)}">${esc(c.label)}</button>`).join("")}
                            </nav>
                        </div>
                        <div style="background-color: #FFFDF9; border: 1px dashed rgba(197, 160, 89, 0.4); padding: 18px; border-radius: var(--border-radius-sm); margin-top: 24px; font-size: 13px;">
                            <strong style="color: var(--accent); display: block; margin-bottom: 6px;"><i class="bi bi-bag-check"></i> How Ordering Works</strong>
                            <p style="color: var(--text-muted); line-height: 1.4;">Add items to your cart, then choose in-store pickup at Heritage Quay or delivery for a flat fee. Payment is confirmed via bank transfer (EFT) — no card is charged online.</p>
                        </div>
                    </aside>

                    <div class="catalog-main">
                        <nav id="subfilterRow" class="subfilter-row" aria-label="Subcategory filters"></nav>
                        <section class="products-grid" id="productsGrid" aria-label="Product listings"></section>
                    </div>
                </div>
            </main>
        </section>`;

        const grid = document.getElementById("productsGrid");
        const subfilterRow = document.getElementById("subfilterRow");

        function groupProducts() {
            return Store.getProducts().filter(p => currentGroup === "all" || p.group === currentGroup);
        }

        function syncUrl() {
            const qs = new URLSearchParams();
            if (currentGroup !== "all") qs.set("category", currentGroup);
            if (currentType !== "all") qs.set("type", currentType);
            if (searchTerm) qs.set("search", searchTerm);
            const suffix = qs.toString() ? "?" + qs.toString() : "";
            history.replaceState(null, "", Router.href("/browse") + suffix);
        }

        function renderSubfilters() {
            const types = [];
            groupProducts().forEach(p => {
                if (p.category && !types.includes(p.category)) types.push(p.category);
            });
            if (currentType !== "all" && !types.includes(currentType)) currentType = "all";

            if (types.length < 2) {
                subfilterRow.innerHTML = "";
                subfilterRow.style.display = "none";
                return;
            }
            subfilterRow.style.display = "";

            const group = MAIN_CATEGORIES.find(c => c.id === currentGroup);
            const allLabel = group && group.id !== "all" ? `All ${group.label}` : "All Types";
            subfilterRow.innerHTML =
                `<button class="chip-btn${currentType === "all" ? " active" : ""}" data-type="all">${esc(allLabel)}</button>` +
                types.map(t => `<button class="chip-btn${t === currentType ? " active" : ""}" data-type="${esc(t)}">${esc(prettyCategory(t))}s</button>`).join("");

            subfilterRow.querySelectorAll(".chip-btn").forEach(chip => {
                chip.addEventListener("click", () => {
                    currentType = chip.dataset.type;
                    syncUrl();
                    renderSubfilters();
                    renderProducts();
                });
            });
        }

        function renderProducts() {
            const term = searchTerm.toLowerCase();
            const products = groupProducts().filter(p =>
                (currentType === "all" || p.category === currentType) &&
                (p.title.toLowerCase().includes(term) || (p.color || "").toLowerCase().includes(term))
            );
            if (products.length === 0) {
                grid.innerHTML = `<p style="color: var(--text-muted); font-size: 14px;">${searchTerm ? "No products match your search." : "No pieces in this collection yet — new arrivals land regularly, check back soon."}</p>`;
                return;
            }
            grid.innerHTML = products.map(product => `
                <a class="product-card" href="/product/${encodeURIComponent(product.id)}" data-route>
                    <div class="product-img-wrap">
                        <img class="product-img" src="${esc(product.image)}" alt="${esc(product.title)}${product.color ? " — " + esc(product.color) : ""}" loading="lazy">
                        ${product.badge ? `<span class="product-badge">${esc(product.badge)}</span>` : ""}
                        ${product.inStock === false ? `<span class="product-badge product-badge-oos">Out of Stock</span>` : ""}
                    </div>
                    <div class="product-info">
                        <span class="product-cat">${esc(product.categoryLabel)}</span>
                        <h3 class="product-title">${esc(product.title)}</h3>
                        ${product.color ? `<span class="product-color">${esc(product.color)}</span>` : ""}
                        <span class="product-price">${priceLabel(product)}</span>
                    </div>
                </a>`).join("");
            // New links need base-path fixing
            document.dispatchEvent(new CustomEvent("veloura:links"));
        }

        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                currentGroup = btn.dataset.group;
                currentType = "all";
                syncUrl();
                renderSubfilters();
                renderProducts();
            });
        });

        document.getElementById("searchInput").addEventListener("input", (e) => {
            searchTerm = e.target.value;
            syncUrl();
            renderProducts();
        });

        renderSubfilters();
        renderProducts();
    }

    /* ------------------------------------------------------------------ */
    /* PRODUCT DETAILS                                                     */
    /* ------------------------------------------------------------------ */

    function product(params) {
        const product = Store.getProduct(params.id);
        if (!product) {
            notFound(`/product/${params.id}`);
            return;
        }

        const inStock = product.inStock !== false;

        app().innerHTML = `
        <section class="page-section active">
            <main class="container section-padding" style="padding-top: 40px;">
                <a href="/browse" data-route style="display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 500; margin-bottom: 32px; color: var(--text-muted);">
                    <i class="bi bi-arrow-left"></i> Back to Catalog
                </a>

                <div class="details-grid">
                    <section class="details-gallery" aria-label="Product Image">
                        <div class="main-image-wrap">
                            <img src="${esc(product.image)}" alt="${esc(product.title)}">
                        </div>
                    </section>

                    <section class="details-info" aria-label="Product Purchase Details">
                        ${product.badge ? `<div style="background: var(--accent); color: var(--primary); padding: 4px 12px; border-radius: 50px; font-size: 10px; font-weight: 600; text-transform: uppercase; display: inline-block; margin-bottom: 12px;">${esc(product.badge)}</div>` : ""}
                        <span class="details-cat">${esc(product.categoryLabel)}</span>
                        <h1 class="details-title">${esc(product.title)}</h1>

                        <div class="details-price-row">
                            <span class="details-price">${priceLabel(product)}</span>
                            <span class="availability-tag${inStock ? "" : " availability-tag-oos"}">
                                <i class="bi bi-circle-fill"></i> ${inStock ? "In-Store Availability Verified" : "Currently Out of Stock"}
                            </span>
                        </div>

                        <p class="details-desc">${esc(product.description)}</p>
                        ${product.price == null ? `<p style="font-size: 13px; color: var(--text-muted); margin-bottom: 20px;"><i class="bi bi-tag" style="color: var(--accent);"></i> This curated piece is priced on request — add it to your cart and our boutique will confirm pricing with your order, or ask us directly on WhatsApp.</p>` : ""}

                        ${product.sizes.length === 1 && product.sizes[0] === "One Size" ? "" : `
                        <div class="details-options">
                            <span class="option-title">Select Size</span>
                            <div id="sizeSelector" class="size-selector">
                                ${product.sizes.map((size, i) => `<button class="size-btn${i === 0 ? " active" : ""}" type="button">${esc(size)}</button>`).join("")}
                            </div>
                        </div>`}

                        <div class="add-to-cart-row">
                            <div class="qty-selector">
                                <button type="button" id="qtyMinus" class="qty-btn" aria-label="Decrease quantity">-</button>
                                <span id="qtyValue" class="qty-value">1</span>
                                <button type="button" id="qtyPlus" class="qty-btn" aria-label="Increase quantity">+</button>
                            </div>
                            <button id="addToCartBtn" class="btn btn-primary" style="flex:1; min-width:180px;" ${inStock ? "" : "disabled"}>
                                <i class="bi bi-bag-plus"></i> ${inStock ? "Add to Cart" : "Out of Stock"}
                            </button>
                        </div>
                        <div id="cartConfirmMsg" class="cart-confirm-msg">
                            <i class="bi bi-check-circle-fill"></i> Added to cart. <a href="/cart" data-route style="text-decoration:underline; margin-left:4px;">View cart</a>
                        </div>

                        <div class="cta-box">
                            <h4><i class="bi bi-shop"></i> Prefer to See It In Person?</h4>
                            <p>Add it to your cart and choose in-store pickup at checkout, or send us a quick question on WhatsApp before you order.</p>

                            <div class="cta-actions">
                                <a target="_blank" rel="noopener" href="${whatsappLink(`Hi Veloura Collection! I'm interested in the ${product.title}. Can you tell me more?`)}" class="btn btn-whatsapp">
                                    <i class="bi bi-whatsapp"></i> Ask a Question
                                </a>
                                <a href="/contact" data-route class="btn btn-dark">
                                    <i class="bi bi-geo-alt"></i> Store Location
                                </a>
                            </div>

                            <div class="store-info-bar">
                                <span><i class="bi bi-clock"></i> ${esc(Store.getSettings().storeHours)}</span>
                                <span><i class="bi bi-patch-check"></i> Heritage Quay</span>
                            </div>
                        </div>

                        <div style="border-top: 1px solid var(--border-color); padding-top: 24px;">
                            <h3 style="font-size: 15px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px;">Product Specifications</h3>
                            <ul style="padding-left: 20px; font-size: 14px; color: var(--text-muted); display:flex; flex-direction:column; gap:8px;">
                                ${product.specs.map(spec => `<li>${esc(spec)}</li>`).join("")}
                            </ul>
                        </div>
                    </section>
                </div>
            </main>
        </section>`;

        document.querySelectorAll(".size-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
            });
        });

        let qty = 1;
        const qtyValue = document.getElementById("qtyValue");
        document.getElementById("qtyMinus").addEventListener("click", () => {
            if (qty > 1) qty--;
            qtyValue.textContent = qty;
        });
        document.getElementById("qtyPlus").addEventListener("click", () => {
            qty++;
            qtyValue.textContent = qty;
        });

        document.getElementById("addToCartBtn").addEventListener("click", () => {
            if (!inStock) return;
            const activeBtn = document.querySelector(".size-btn.active");
            const selectedSize = activeBtn ? activeBtn.textContent : product.sizes[0];
            Store.addToCart(product.id, selectedSize, qty);
            updateCartBadge();
            const msg = document.getElementById("cartConfirmMsg");
            msg.style.display = "flex";
            setTimeout(() => { msg.style.display = "none"; }, 3000);
        });
    }

    /* ------------------------------------------------------------------ */
    /* CART                                                                */
    /* ------------------------------------------------------------------ */

    function cart() {
        app().innerHTML = `
        <section class="page-section active">
            <div class="container" style="padding-top: 48px; padding-bottom: 12px;">
                <h1 style="font-size: 36px; margin-bottom: 8px;">Your Cart</h1>
                <p style="color: var(--text-muted); font-size: 15px;">Review your items, then continue to checkout to choose pickup or delivery.</p>
            </div>

            <main class="container section-padding" style="padding-top: 24px;">
                <div id="cartEmpty" class="cart-empty-state" style="display:none;">
                    <i class="bi bi-bag-x"></i>
                    <p style="margin-bottom: 20px;">Your cart is empty.</p>
                    <a href="/browse" data-route class="btn btn-primary">Browse the Collection</a>
                </div>

                <div class="cart-page-grid">
                    <div class="cart-items-col">
                        <div id="cartItems" style="display:flex; flex-direction:column;"></div>
                    </div>

                    <div class="cart-summary-col">
                        <div id="cartSummary" class="cart-summary-box">
                            <h3 style="font-size: 16px; margin-bottom: 18px;">Order Summary</h3>
                            <div class="cart-summary-row">
                                <span>Subtotal</span>
                                <span id="cartSubtotal">$0 USD</span>
                            </div>
                            <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 16px;">Delivery fee (if applicable) is calculated at checkout.</p>
                            <a href="/checkout" data-route class="btn btn-primary" style="width:100%; text-align:center; display:block;">Proceed to Checkout</a>
                            <a href="/browse" data-route style="display:block; text-align:center; font-size: 13px; margin-top: 14px; color: var(--text-muted);">Continue Browsing</a>
                        </div>
                    </div>
                </div>
            </main>
        </section>`;

        const cartItemsEl = document.getElementById("cartItems");
        const cartEmptyEl = document.getElementById("cartEmpty");
        const cartSummaryEl = document.getElementById("cartSummary");
        const subtotalEl = document.getElementById("cartSubtotal");

        function render() {
            const items = Store.getCart();

            if (items.length === 0) {
                cartEmptyEl.style.display = "block";
                cartItemsEl.parentElement.parentElement.style.display = "none";
                return;
            }

            cartEmptyEl.style.display = "none";
            cartItemsEl.innerHTML = "";

            items.forEach(item => {
                const product = Store.getProduct(item.id);
                if (!product) return;
                const row = document.createElement("div");
                row.className = "cart-row";
                row.innerHTML = `
                    <img class="cart-row-img" src="${esc(product.image)}" alt="${esc(product.title)}">
                    <div class="cart-row-info">
                        <h4>${esc(product.title)}</h4>
                        <span class="cart-row-meta">${product.color ? esc(product.color) : `Size: ${esc(item.size)}`}</span>
                        <div class="cart-qty-control">
                            <button class="qty-btn cart-qty-minus" aria-label="Decrease quantity">-</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn cart-qty-plus" aria-label="Increase quantity">+</button>
                        </div>
                    </div>
                    <div class="cart-row-price">${product.price == null ? "On request" : money(product.price * item.qty)}</div>
                    <button class="cart-row-remove" aria-label="Remove item"><i class="bi bi-trash"></i></button>`;
                row.querySelector(".cart-qty-minus").addEventListener("click", () => {
                    Store.updateCartQty(item.id, item.size, item.qty - 1);
                    updateCartBadge();
                    cart(); // re-render full view (handles empty state)
                });
                row.querySelector(".cart-qty-plus").addEventListener("click", () => {
                    Store.updateCartQty(item.id, item.size, item.qty + 1);
                    updateCartBadge();
                    cart();
                });
                row.querySelector(".cart-row-remove").addEventListener("click", () => {
                    Store.removeFromCart(item.id, item.size);
                    updateCartBadge();
                    cart();
                });
                cartItemsEl.appendChild(row);
            });

            const unpriced = Store.getCartUnpricedCount();
            subtotalEl.textContent = money(Store.getCartSubtotal()) + (unpriced > 0 ? ` + ${unpriced} on request` : "");
        }

        render();
        document.dispatchEvent(new CustomEvent("veloura:links"));
    }

    /* ------------------------------------------------------------------ */
    /* CHECKOUT                                                            */
    /* ------------------------------------------------------------------ */

    function checkout() {
        const settings = Store.getSettings();
        const deliveryFee = Number(settings.deliveryFee) || 0;

        app().innerHTML = `
        <section class="page-section active">
            <div class="container" style="padding-top: 48px; padding-bottom: 12px;">
                <h1 style="font-size: 36px; margin-bottom: 8px;">Checkout</h1>
                <p style="color: var(--text-muted); font-size: 15px;">Choose pickup or delivery, then confirm your order. Payment is completed via bank transfer (EFT) — no card is charged online.</p>
            </div>

            <main class="container section-padding" style="padding-top: 24px;">
                <div class="checkout-grid">
                    <div class="checkout-form-col">
                        <div id="checkoutFormWrap">
                            <h3 style="font-size: 16px; margin-bottom: 16px;">Fulfillment Method</h3>
                            <div class="fulfillment-options">
                                <label class="fulfillment-option">
                                    <input type="radio" name="fulfillment" value="pickup" checked style="margin-top: 3px;">
                                    <div>
                                        <strong>In-Store Pickup</strong>
                                        <span class="opt-desc">Free — collect at our Heritage Quay boutique. We'll text/WhatsApp you when it's ready.</span>
                                    </div>
                                </label>
                                <label class="fulfillment-option">
                                    <input type="radio" name="fulfillment" value="delivery" style="margin-top: 3px;">
                                    <div>
                                        <strong>Delivery</strong>
                                        <span class="opt-desc">Flat $${deliveryFee} delivery fee. Distance/parish-based pricing is under review with the client.</span>
                                    </div>
                                </label>
                            </div>

                            <form id="checkoutForm">
                                <div class="form-group">
                                    <label for="custName">Full Name</label>
                                    <input type="text" id="custName" class="form-control" placeholder="e.g. Marie-Louise Browne" required>
                                </div>
                                <div class="form-group">
                                    <label for="custEmail">Email Address</label>
                                    <input type="email" id="custEmail" class="form-control" placeholder="e.g. marie@gmail.com" required>
                                </div>
                                <div class="form-group">
                                    <label for="custPhone">WhatsApp / Mobile Number</label>
                                    <input type="tel" id="custPhone" class="form-control" placeholder="e.g. +1 (268) 777-1234" required>
                                </div>

                                <div id="deliveryFields" style="display:none;">
                                    <div class="form-group">
                                        <label for="deliveryAddress">Delivery Address</label>
                                        <textarea id="deliveryAddress" class="form-control" placeholder="Street address, parish, and any landmark notes"></textarea>
                                    </div>
                                </div>

                                <div class="eft-instructions">
                                    <strong style="color: var(--accent); display:block; margin-bottom: 6px;"><i class="bi bi-bank"></i> Payment by Bank Transfer (EFT)</strong>
                                    Once you submit this order, we'll send bank transfer details by email/WhatsApp. Your order is confirmed after we receive and verify your transfer confirmation and matching bank reference — our team reviews every payment manually before an order ships or is held for pickup.
                                </div>

                                <button type="submit" class="btn btn-primary" style="width:100%; margin-top: 20px;">
                                    Submit Order <i class="bi bi-arrow-right" style="margin-left:6px;"></i>
                                </button>
                            </form>
                        </div>
                    </div>

                    <div class="checkout-summary-col">
                        <div class="cart-summary-box">
                            <h3 style="font-size: 16px; margin-bottom: 18px;">Order Summary</h3>
                            <div id="orderItems" style="margin-bottom: 14px;"></div>
                            <div class="cart-summary-row">
                                <span>Subtotal</span>
                                <span id="checkoutSubtotal">$0 USD</span>
                            </div>
                            <div class="cart-summary-row" id="deliveryFeeRow" style="display:none;">
                                <span>Delivery Fee</span>
                                <span id="deliveryFeeAmount">$${deliveryFee} USD</span>
                            </div>
                            <div class="cart-summary-total">
                                <span>Total</span>
                                <span id="checkoutTotal">$0 USD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </section>`;

        const items = Store.getCart();
        const orderItemsEl = document.getElementById("orderItems");
        const subtotalEl = document.getElementById("checkoutSubtotal");
        const feeRow = document.getElementById("deliveryFeeRow");
        const feeAmountEl = document.getElementById("deliveryFeeAmount");
        const totalEl = document.getElementById("checkoutTotal");
        const deliveryFields = document.getElementById("deliveryFields");
        const deliveryAddress = document.getElementById("deliveryAddress");

        if (items.length === 0) {
            orderItemsEl.innerHTML = `<p style="color:var(--text-muted); font-size:14px;">Your cart is empty. <a href="/browse" data-route style="text-decoration:underline;">Browse the collection</a> to add items.</p>`;
            document.dispatchEvent(new CustomEvent("veloura:links"));
        }

        function selectedFulfillment() {
            return document.querySelector('input[name="fulfillment"]:checked')?.value || "pickup";
        }

        function renderTotals() {
            const subtotal = Store.getCartSubtotal();
            const fee = selectedFulfillment() === "delivery" ? deliveryFee : 0;

            if (items.length > 0) {
                orderItemsEl.innerHTML = items.map(item => {
                    const product = Store.getProduct(item.id);
                    if (!product) return "";
                    return `<div style="display: flex; justify-content: space-between; font-size: 13px; color: var(--text-muted); margin-bottom: 10px;"><span>${esc(product.title)} x${item.qty}</span><span>${product.price == null ? "On request" : "$" + product.price * item.qty}</span></div>`;
                }).join("");
            }

            const unpriced = Store.getCartUnpricedCount();
            subtotalEl.textContent = money(subtotal);
            feeRow.style.display = fee > 0 ? "flex" : "none";
            feeAmountEl.textContent = money(fee);
            totalEl.textContent = money(subtotal + fee) + (unpriced > 0 ? " + items on request" : "");
            deliveryFields.style.display = selectedFulfillment() === "delivery" ? "block" : "none";
            deliveryAddress.required = selectedFulfillment() === "delivery";
        }

        document.querySelectorAll('input[name="fulfillment"]').forEach(r => r.addEventListener("change", renderTotals));
        renderTotals();

        document.getElementById("checkoutForm").addEventListener("submit", (e) => {
            e.preventDefault();
            if (items.length === 0) {
                Router.navigate("/browse");
                return;
            }

            const fulfillment = selectedFulfillment();
            const subtotal = Store.getCartSubtotal();
            const fee = fulfillment === "delivery" ? deliveryFee : 0;

            Store.addOrder({
                customer: {
                    name: document.getElementById("custName").value.trim(),
                    email: document.getElementById("custEmail").value.trim(),
                    phone: document.getElementById("custPhone").value.trim(),
                    address: fulfillment === "delivery" ? deliveryAddress.value.trim() : ""
                },
                fulfillment,
                items: items.map(item => {
                    const product = Store.getProduct(item.id);
                    return {
                        id: item.id,
                        title: product ? product.title : `Product #${item.id}`,
                        size: item.size,
                        qty: item.qty,
                        price: product ? product.price : 0
                    };
                }),
                subtotal,
                deliveryFee: fee,
                total: subtotal + fee,
                unpricedCount: Store.getCartUnpricedCount()
            });

            Store.clearCart();
            updateCartBadge();
            Router.navigate("/thank-you");
        });
    }

    /* ------------------------------------------------------------------ */
    /* THANK YOU / ORDER CONFIRMATION                                      */
    /* ------------------------------------------------------------------ */

    function thankYou() {
        const order = Store.getLastOrder();

        if (!order) {
            app().innerHTML = `
            <section class="page-section active">
                <main class="container section-padding" style="text-align:center; padding-top: 80px;">
                    <p style="color: var(--text-muted); margin-bottom: 24px;">No recent order found.</p>
                    <a href="/browse" data-route class="btn btn-primary">Browse the Collection</a>
                </main>
            </section>`;
            document.dispatchEvent(new CustomEvent("veloura:links"));
            return;
        }

        const fulfillmentText = order.fulfillment === "delivery"
            ? `delivered to the address you provided (a flat $${order.deliveryFee} delivery fee applies)`
            : "held for pickup at our Heritage Quay boutique";

        app().innerHTML = `
        <section class="page-section active">
            <main class="container section-padding" style="padding-top: 64px;">
                <div class="checkout-confirm" style="display:block;">
                    <i class="bi bi-check-circle-fill"></i>
                    <h3 style="font-size: 22px; margin-bottom: 12px;">Thank you, ${esc(order.customer.name)}!</h3>
                    <p style="color: var(--text-muted); max-width: 460px; margin: 0 auto 8px;">Your order <strong>${esc(order.id)}</strong> will be ${fulfillmentText}.</p>
                    <p style="color: var(--text-muted); max-width: 460px; margin: 0 auto;">We've sent bank transfer instructions to complete payment — your order is finalized once we verify the transfer.</p>
                    <div class="cart-summary-box" style="max-width: 420px; margin: 32px auto 0; text-align: left;">
                        <h3 style="font-size: 15px; margin-bottom: 14px;">Order Summary</h3>
                        ${order.items.map(item => `<div style="display:flex; justify-content:space-between; font-size:13px; color:var(--text-muted); margin-bottom:8px;"><span>${esc(item.title)} x${item.qty}</span><span>${item.price == null ? "On request" : "$" + item.price * item.qty}</span></div>`).join("")}
                        ${order.deliveryFee > 0 ? `<div style="display:flex; justify-content:space-between; font-size:13px; color:var(--text-muted); margin-bottom:8px;"><span>Delivery Fee</span><span>$${order.deliveryFee}</span></div>` : ""}
                        <div class="cart-summary-total"><span>Total</span><span>${money(order.total)}${order.unpricedCount > 0 ? " + items on request" : ""}</span></div>
                        ${order.unpricedCount > 0 ? `<p style="font-size:12px; color:var(--text-muted); margin-top:10px;">Some pieces in your order are priced on request — we'll confirm their prices along with the bank transfer details.</p>` : ""}
                    </div>
                    <a href="/" data-route class="btn btn-dark" style="margin-top: 32px; display:inline-block;">Back to Home</a>
                </div>
            </main>
        </section>`;
        document.dispatchEvent(new CustomEvent("veloura:links"));
    }

    /* ------------------------------------------------------------------ */
    /* EXCLUSIVES                                                          */
    /* ------------------------------------------------------------------ */

    function exclusives() {
        app().innerHTML = `
        <section class="page-section active">
            <div class="container" style="padding-top: 48px; padding-bottom: 12px; text-align: center;">
                <span class="section-subtitle">BOUTIQUE EXPERIENCES</span>
                <h1 style="font-size: clamp(32px, 5vw, 44px); margin-bottom: 12px; font-family: var(--font-serif);">Exclusives & In-Store Events</h1>
                <p style="color: var(--text-muted); font-size: 16px; max-width: 650px; margin: 0 auto;">We believe shopping for a great bag is more than a purchase — it's an experience. Join us for new-arrival previews hosted inside our St. John's boutique.</p>
            </div>

            <main class="container section-padding" style="padding-top: 48px;">
                <div class="feature-card-grid" style="margin-bottom: 64px;">
                    <article class="feature-card">
                        <div class="feature-card-body">
                            <span class="feature-card-tag">Upcoming Event • July 25</span>
                            <h2 class="feature-card-title">New Arrivals Preview Evening</h2>
                            <p class="feature-card-desc">Be the first to see and purchase our newest Coach and Michael Kors arrivals before they go online. Enjoy live local steelpan music and complimentary island cocktails while you browse.</p>
                            <a href="/contact" data-route class="btn btn-dark" style="margin-top: auto; align-self: flex-start; padding: 10px 20px; font-size: 11px;">Rsvp In-Store Spot</a>
                        </div>
                    </article>

                    <article class="feature-card">
                        <div class="feature-card-body">
                            <span class="feature-card-tag">Complimentary Service • Weekly</span>
                            <h2 class="feature-card-title">Leather Care Saturdays</h2>
                            <p class="feature-card-desc">Bring any bag purchased from us to our Heritage Quay store on Saturdays for a complimentary leather conditioning and inspection, so it stays in great shape for years to come.</p>
                            <a href="/contact" data-route class="btn btn-dark" style="margin-top: auto; align-self: flex-start; padding: 10px 20px; font-size: 11px;">Book a Slot</a>
                        </div>
                    </article>
                </div>

                <section class="vip-banner" aria-label="Velvet Club Loyalty Signup">
                    <div class="vip-content">
                        <span class="section-subtitle" style="color: var(--accent); margin-bottom: 12px; display: block;">THE VELVET CLUB</span>
                        <h2 class="vip-title">Join Antigua's Elite Style Circle</h2>
                        <p class="vip-desc">Gain pre-release access to new handbag arrivals, invitation-only boutique previews, and special local discounts available exclusively to our St. John's boutique community.</p>

                        <form class="vip-form" id="vipForm">
                            <input type="email" id="vipEmail" class="form-control" placeholder="Enter your email address" aria-label="Email address" required>
                            <button type="submit" class="btn btn-primary">Subscribe</button>
                        </form>
                        <p id="vipConfirm" style="display:none; margin-top: 16px; color: var(--accent); font-size: 14px;"><i class="bi bi-check-circle-fill"></i> Thank you for joining The Velvet Club! Exclusive Antigua event invites will arrive in your inbox soon.</p>
                    </div>
                </section>
            </main>
        </section>`;

        document.getElementById("vipForm").addEventListener("submit", (e) => {
            e.preventDefault();
            Store.addSubscriber(document.getElementById("vipEmail").value.trim());
            document.getElementById("vipForm").style.display = "none";
            document.getElementById("vipConfirm").style.display = "block";
        });
    }

    /* ------------------------------------------------------------------ */
    /* CONTACT & PERSONAL SHOPPING                                         */
    /* ------------------------------------------------------------------ */

    function contact() {
        const settings = Store.getSettings();
        const hoursHtml = esc(settings.storeHoursLong).replace(/\n/g, "<br>");

        app().innerHTML = `
        <section class="page-section active">
            <main class="container section-padding" style="padding-top: 56px;">
                <div class="contact-grid">
                    <section class="contact-details" aria-label="Boutique Address & Directions">
                        <h1 class="contact-title">Visit Our Antigua Boutique</h1>
                        <p class="contact-lead">We are nestled in the beautiful historic harbor-side district of St. John's. Walk in or book an exclusive session below.</p>

                        <div class="contact-info-blocks">
                            <div class="info-block">
                                <div class="info-block-icon"><i class="bi bi-geo-alt"></i></div>
                                <div>
                                    <h4 class="info-block-title">Physical Address</h4>
                                    <p class="info-block-text">${esc(settings.address)}<br><span style="font-size:12px; color:var(--text-muted);">(exact unit number to be confirmed)</span></p>
                                </div>
                            </div>

                            <div class="info-block">
                                <div class="info-block-icon"><i class="bi bi-clock"></i></div>
                                <div>
                                    <h4 class="info-block-title">Store Hours</h4>
                                    <p class="info-block-text">${hoursHtml}</p>
                                </div>
                            </div>

                            <div class="info-block">
                                <div class="info-block-icon"><i class="bi bi-telephone"></i></div>
                                <div>
                                    <h4 class="info-block-title">Direct Contacts</h4>
                                    <p class="info-block-text">
                                        Phone: <a href="tel:${esc(settings.phone.replace(/[^+\d]/g, ""))}">${esc(settings.phone)}</a><br>
                                        WhatsApp: <a href="https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}" target="_blank" rel="noopener">${esc(settings.phone)}</a><br>
                                        Email: <a href="mailto:${esc(settings.email)}">${esc(settings.email)}</a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="map-container">
                            <div class="simulated-map" aria-label="Map showing Heritage Quay, St. John's, Antigua">
                                <div class="map-pin"><i class="bi bi-shop"></i></div>
                                <div class="map-card">
                                    <h5>Veloura Collection</h5>
                                    <p>${esc(settings.address)}</p>
                                    <span style="font-size: 10px; color: var(--accent); font-weight: 600; display: block; margin-top: 6px;">
                                        <i class="bi bi-star-fill"></i> tax-free district hub
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="contact-form-box" aria-label="Book personal shopping appointment">
                        <h2 class="form-title">Complimentary Personal Shopping</h2>
                        <p class="form-desc">Request a one-on-one session with our boutique team. We'll set aside a curated selection of bags, wallets, or accessories in your preferred style for you to view in person.</p>

                        <div id="formSuccessMessage" style="display: none;"></div>

                        <form id="contactForm">
                            <div class="form-group">
                                <label for="clientName">Full Name</label>
                                <input type="text" id="clientName" class="form-control" placeholder="e.g. Marie-Louise Browne" required>
                            </div>

                            <div class="form-group">
                                <label for="clientEmail">Email Address</label>
                                <input type="email" id="clientEmail" class="form-control" placeholder="e.g. marie@gmail.com" required>
                            </div>

                            <div class="form-group">
                                <label for="clientPhone">WhatsApp / Mobile Number (Optional)</label>
                                <input type="tel" id="clientPhone" class="form-control" placeholder="e.g. +1 (268) 777-1234">
                            </div>

                            <div class="form-group">
                                <label for="appointmentDate">Preferred Date</label>
                                <input type="date" id="appointmentDate" class="form-control" required>
                            </div>

                            <div class="form-group">
                                <label for="stylingService">Select Session Type</label>
                                <select id="stylingService" class="form-control">
                                    <option value="Handbag Consultation">Handbag Consultation (30 Mins)</option>
                                    <option value="Gift Curation">Gift Curation Session (30 Mins)</option>
                                    <option value="Order Pickup Assistance">Order Pickup Assistance</option>
                                    <option value="General In-Store Visit">General In-Store Visit</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="clientMessage">Product Interests (Optional)</label>
                                <textarea id="clientMessage" class="form-control" placeholder="Let us know which bags, wallets, or accessories you'd like set aside for your visit..."></textarea>
                            </div>

                            <button type="submit" class="btn btn-dark" style="width: 100%;">
                                Request Session <i class="bi bi-calendar3" style="margin-left: 8px;"></i>
                            </button>
                        </form>
                    </section>
                </div>
            </main>
        </section>`;

        const appointmentDate = document.getElementById("appointmentDate");
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        appointmentDate.valueAsDate = tomorrow;

        document.getElementById("contactForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("clientName").value.trim();
            const email = document.getElementById("clientEmail").value.trim();
            const date = appointmentDate.value;
            const service = document.getElementById("stylingService").value;

            if (!name || !email) return;

            Store.addAppointment({
                name,
                email,
                phone: document.getElementById("clientPhone").value.trim(),
                date,
                service,
                interests: document.getElementById("clientMessage").value.trim()
            });

            const contactForm = document.getElementById("contactForm");
            const formSuccessMessage = document.getElementById("formSuccessMessage");
            contactForm.style.display = "none";
            formSuccessMessage.innerHTML = `
                <div style="text-align: center; padding: 24px;">
                    <i class="bi bi-calendar-check-fill" style="font-size: 48px; color: var(--accent); display: block; margin-bottom: 16px;"></i>
                    <h4 style="font-size: 20px; font-family: var(--font-serif); margin-bottom: 12px; color: var(--primary);">Thank You, ${esc(name)}!</h4>
                    <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px;">
                        We have received your request for a <strong>${esc(service)}</strong> on <strong>${esc(date)}</strong>.
                    </p>
                    <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 24px;">
                        A member of our Heritage Quay boutique team will reach out via email (${esc(email)}) or WhatsApp to confirm.
                    </p>
                    <button id="bookAnotherBtn" class="btn btn-dark" style="padding: 10px 20px; font-size: 11px;">Book Another Slot</button>
                </div>`;
            formSuccessMessage.style.display = "block";
            document.getElementById("bookAnotherBtn").addEventListener("click", () => contact());
        });
    }

    /* ------------------------------------------------------------------ */
    /* NOT FOUND                                                           */
    /* ------------------------------------------------------------------ */

    function notFound(path) {
        app().innerHTML = `
        <section class="page-section active">
            <main class="container section-padding" style="text-align:center; padding-top: 80px; padding-bottom: 80px;">
                <h1 style="font-size: 48px; margin-bottom: 12px;">404</h1>
                <p style="color: var(--text-muted); margin-bottom: 24px;">We couldn't find <code>${esc(path || "")}</code>.</p>
                <a href="/" data-route class="btn btn-primary">Back to Home</a>
            </main>
        </section>`;
        document.dispatchEvent(new CustomEvent("veloura:links"));
    }

    return { welcome, browse, product, cart, checkout, thankYou, exclusives, contact, notFound };
})();
