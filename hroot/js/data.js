/* ============================================================================
   VELOURA COLLECTION — CATALOG LOADER & DEFAULTS
   The product catalog lives in data/products.json (maintained by the client).
   main.js fetches it at boot, transformCatalog() maps it to the shape the
   views use, and Store seeds it into localStorage (re-seeded whenever the
   JSON "generated" stamp changes, so catalog updates reach returning
   visitors). The mock admin dashboard edits the localStorage copy.
   ============================================================================ */

const WHATSAPP_PHONE = "12687739972";

// Site entry (index.html/404.html) lives at the repo root; all other site
// files (css/js/data/assets) stay under hroot/. URLs are relative to the
// <base> tag, i.e. the deploy root.
const ASSET_ROOT = "hroot/";
const CATALOG_URL = ASSET_ROOT + "data/products.json";

const DEFAULT_SETTINGS = {
    deliveryFee: 20,
    storeHours: "Mon - Sat, 9 AM - 6 PM",
    storeHoursLong: "Monday – Saturday: 9:00 AM – 6:00 PM\nSunday: Closed (Except during major cruise ship portings)",
    address: "Heritage Quay, St. John's, Antigua",
    phone: "+1 (268) 773-9972",
    email: "boutique@velouracollection.com"
};

// "shoulder-bag" -> "Shoulder Bag"
function prettyCategory(slug) {
    return String(slug || "")
        .split("-")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}

// Main store categories (left sidebar on Browse) — per the original site
// structure in context/ui-frontend/NAVIGATION.md. Product `category` slugs
// from data/products.json are subcategories grouped under these.
const MAIN_CATEGORIES = [
    { id: "all",         label: "All Collections" },
    { id: "bags",        label: "Bags" },
    { id: "wallets",     label: "Wallets & Purses" },
    { id: "accessories", label: "Bag Accessories" },
    { id: "sandals",     label: "Sandals" },
    { id: "stanley",     label: "Stanley Cups" }
];

// Maps a subcategory slug to its main category. Keyword-based so new slugs
// added to data/products.json land in a sensible group without code changes.
function mainGroupFor(slug) {
    const s = String(slug || "").toLowerCase();
    if (/wallet|purse|card|wristlet|envelope/.test(s)) return "wallets";
    if (/sandal|slide|shoe/.test(s)) return "sandals";
    if (/stanley|tumbler|cup|drink|quencher/.test(s)) return "stanley";
    if (/charm|strap|accessor|keychain|scarf|care/.test(s)) return "accessories";
    return "bags";
}

// Maps data/products.json entries to the internal product shape.
// The JSON is a curation catalog: prices/sizes are optional — items without
// a price render as "Price on request" until the boutique sets one (admin).
function transformCatalog(json) {
    return {
        version: json.generated || "1",
        products: (json.products || []).map(p => ({
            id: p.id,
            title: p.name,
            category: p.category,
            group: mainGroupFor(p.category),
            categoryLabel: [p.brand, prettyCategory(p.category)].filter(Boolean).join(" "),
            price: typeof p.price === "number" ? p.price : null,
            image: ASSET_ROOT + p.path,
            description: p.description || "",
            color: p.color || "",
            sizes: Array.isArray(p.sizes) && p.sizes.length ? p.sizes : ["One Size"],
            specs: [
                p.brand ? "Brand: " + p.brand : "",
                p.material ? "Material: " + p.material : "",
                p.color ? "Color: " + p.color : ""
            ].filter(Boolean),
            badge: (p.tags || []).includes("bestseller") ? "Best Seller" : "",
            inStock: p.inStock !== false
        }))
    };
}
