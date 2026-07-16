/* ============================================================================
   VELOURA COLLECTION — CLIENT-SIDE ROUTER (History API)
   Clean URLs on GitHub Pages via the 404.html redirect trick. All internal
   links carry a `data-route` attribute and an app-absolute href ("/browse");
   the router rewrites them against the deploy base path and intercepts
   clicks so navigation never reloads the page.
   ============================================================================ */

const Router = (() => {
    // Set by the inline script in index.html before the URL is rewritten.
    // "/" locally, "/<repo-name>/" on GitHub Pages project sites.
    const BASE = (window.__APP_BASE__ || "/").replace(/\/?$/, "/");

    const routes = [];

    function register(pattern, handler) {
        // pattern like "/product/:id" -> regex with named params
        const names = [];
        const regex = new RegExp("^" + pattern.replace(/:[^/]+/g, (m) => {
            names.push(m.slice(1));
            return "([^/]+)";
        }) + "/?$");
        routes.push({ regex, names, handler });
    }

    // App path ("/browse") -> real URL path ("/repo/browse")
    function href(path) {
        return BASE.slice(0, -1) + path;
    }

    function currentPath() {
        let path = location.pathname;
        if (path.startsWith(BASE)) path = path.slice(BASE.length - 1);
        if (path === "" || path === "/index.html") path = "/";
        return path;
    }

    function currentQuery() {
        return new URLSearchParams(location.search);
    }

    function navigate(path, { replace = false } = {}) {
        const url = href(path);
        if (replace) {
            history.replaceState(null, "", url);
        } else {
            history.pushState(null, "", url);
        }
        render();
    }

    function render() {
        const path = currentPath().split("?")[0];
        const query = currentQuery();
        for (const route of routes) {
            const match = path.match(route.regex);
            if (match) {
                const params = {};
                route.names.forEach((name, i) => { params[name] = decodeURIComponent(match[i + 1]); });
                window.scrollTo(0, 0);
                route.handler(params, query);
                afterRender(path);
                return;
            }
        }
        if (typeof Views !== "undefined" && Views.notFound) {
            Views.notFound(path);
            afterRender(path);
        }
    }

    function afterRender(path) {
        // Highlight the active nav link
        const pageMap = { "/": "welcome", "/browse": "browse", "/exclusives": "exclusives", "/contact": "contact" };
        const active = pageMap[path];
        document.querySelectorAll(".nav-link").forEach(link => {
            link.classList.toggle("active", link.dataset.page === active);
        });
        // Close the mobile menu after navigating
        const mobileMenu = document.getElementById("mobileMenu");
        if (mobileMenu) mobileMenu.classList.remove("open");
        // Rewrite any data-route hrefs rendered into the page against the base path
        fixLinks(document.getElementById("app"));
    }

    // Rewrite href="/x" to href="<base>/x" so middle-click / open-in-new-tab works
    function fixLinks(root) {
        (root || document).querySelectorAll("a[data-route]").forEach(a => {
            const raw = a.getAttribute("href");
            if (raw && raw.startsWith("/") && !raw.startsWith(BASE.slice(0, -1) + "/")) {
                // Store the app path once, keep rewrites idempotent
                a.dataset.path = a.dataset.path || raw;
                a.setAttribute("href", href(a.dataset.path));
            } else if (raw && !a.dataset.path) {
                a.dataset.path = raw.startsWith(BASE.slice(0, -1)) ? raw.slice(BASE.length - 1) : raw;
            }
        });
    }

    function init() {
        fixLinks(document);

        document.addEventListener("click", (e) => {
            const a = e.target.closest("a[data-route]");
            if (!a) return;
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            navigate(a.dataset.path || "/");
        });

        window.addEventListener("popstate", render);
        render();
    }

    return { register, navigate, render, href, currentPath, currentQuery, init, fixLinks, BASE };
})();
