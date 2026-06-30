/* ==========================================
           1. DATA (MOCK JSON)
           ========================================== */
        

/* ==========================================
    2. APP STATE & LOCAL STORAGE
    ========================================== */
let cart = JSON.parse(localStorage.getItem('columbina_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('columbina_wishlist')) || [];
let currentTheme = localStorage.getItem('columbina_theme') || 'light';
let currentLanguage = localStorage.getItem('columbina_language') || 'en';

let defaultTesti = [
    { nama: "Ahmad", rating: 5, pesan: "Kuenya enak banget! Cocok buat nemenin santai sore." },
    { nama: "Budi", rating: 4, pesan: "Manisnya pas, teksturnya juga lembut." }
];
let testimonials = JSON.parse(localStorage.getItem('columbina_testi')) || defaultTesti;

// --- HARGA RUPIAH CUSTOM (Genap, tanpa exchange rate) ---
const priceIDRMap = {
    1: 150000, 2: 135000, 3: 175000, 4: 195000, 5: 160000, 6: 145000,
    7: 60000,  8: 70000,  9: 75000,  10: 75000, 11: 330000, 12: 360000,
    13: 345000, 14: 115000, 15: 50000, 16: 135000, 17: 90000, 18: 100000,
    19: 85000, 20: 285000
};

const salePriceIDRMap = {
    1: 135000,
    5: 145000,
    7: 50000,
    13: 315000,
    20: 255000
};

const i18n = {
    en: {
        navHome: 'Home', navAbout: 'About', navShop: 'Shop', navGallery: 'Gallery', navJournal: 'Journal', navTestimonial: 'Testimonials', navContact: 'Contact',
        heroTitle: 'The Pinnacle of Handcrafted Pastry',
        heroText: "Experience the luxury of Columbina's signature Moon Cakes and modern desserts. Crafted with tradition, designed for elegance.",
        orderNow: 'Order Now', ourStory: 'Our Story', signatureCollection: 'Signature Collection',
        finestSelection: 'Our finest selection of handcrafted Moon Cakes', exploreAll: 'Explore All Products',
        artTitle: 'The Art of Baking',
        artText: 'At Columbina, we believe that baking is an art form. Every pastry is meticulously crafted using only the finest ingredients sourced globally. Our signature Moon Cakes blend century-old traditional recipes with contemporary flavor profiles.',
        artPoint1: 'Premium French Butter & Flour',
        artPoint2: 'No Artificial Preservatives',
        artPoint3: 'Masterfully Handcrafted Daily',
        aboutTitle: 'Our Story',
        aboutSubtitle: 'Heritage meets modernity',
        aboutHeading: 'Crafting Memories Since 2010',
        aboutCopy1: 'Columbina started as a humble family kitchen with a singular vision: to create the perfect Moon Cake. Over decades, our dedication to exceptional quality and artistic presentation transformed us into a premier destination for luxury desserts.',
        aboutCopy2: 'Today, under the guidance of our Master Bakers, we continue to innovate while honoring our roots, ensuring every bite is a celebration of taste and elegance.',
        discoverMore: 'Discover More', artisanMenu: 'Our Artisan Menu', menuSubtitle: 'Delight in every bite',
        searchPlaceholder: 'Search for delicacies...', all: 'All', backMenu: 'Back to Menu',
        reviews: 'Reviews', quantity: 'Quantity:', available: 'available', addToCart: 'Add to Cart',
        addToCartUpper: 'ADD TO CART', orderWa: 'ORDER VIA WHATSAPP', ingredients: 'Ingredients',
        nutrition: 'Nutrition Facts', shipping: 'Shipping',
        allergy: '*Allergy info: Processed in a facility handling nuts and dairy.',
        shippingCopy: 'Nationwide shipping available for Cookies. Delicate pastries and cakes are strictly for local delivery via same-day courier to preserve freshness.',
        visualFeast: 'Visual Feast', visualSubtitle: 'A glimpse into our aesthetic',
        journal: 'The Journal', journalSubtitle: 'Stories, guides, and baking secrets', readArticle: 'Read Article', backJournal: 'Back to Journal',
        testimonialTitle: 'What They Say', testimonialSubtitle: 'Sweet stories from our customers',
        sendTesti: 'Send Your Testimonial!', yourName: 'Your Name', testiPlaceholder: 'Write your sweet experience here...', submitTesti: 'Submit Testimonial',
        contactTitle: 'Get in Touch', contactSubtitle: "We'd love to hear from you", visitBoutique: 'Visit Our Boutique',
        address: 'Address', phone: 'Phone / WhatsApp', hours: 'Business Hours', sendMessage: 'Send a Message',
        namePlaceholder: 'Your Name', emailPlaceholder: 'Your Email', subjectPlaceholder: 'Subject', messagePlaceholder: 'Your Message',
        sendButton: 'Send Message', faqTitle: 'Frequently Asked Questions', faqSubtitle: 'Everything you need to know about ordering, delivery, and ingredients',
        termsTitle: 'Terms & Conditions', privacyTitle: 'Privacy Policy', notFound: 'Page Not Found', returnHome: 'Return Home',
        yourCart: 'Your Cart', yourWishlist: 'Your Wishlist', subtotal: 'Subtotal:', checkoutWa: 'Checkout via WhatsApp',
        emptyCart: 'Your cart is empty.', emptyWishlist: 'Your wishlist is empty.', remove: 'Remove',
        quickLinks: 'Quick Links', customerCare: 'Customer Care', newsletter: 'Newsletter',
        newsletterCopy: 'Subscribe to get special offers and updates.', emailAddress: 'Email Address',
        rights: '© 2026 Columbina Bakery. All rights reserved. Crafted for Spring.',
        saved: 'You save', noProducts: 'No products found for', cartEmptyAlert: 'Your cart is empty!',
        testiThanks: 'Thank you for your testimonial! It has been added.',
        contactThanks: 'Thank you! Your message has been received.', newsletterThanks: 'Thank you for subscribing!',
        waGreeting: 'Hello Columbina', waOrder: 'I would like to order', waCustomer: 'Customer Name', waPhone: 'Phone Number', waAddress: 'Address', waConfirm: 'Please confirm my order.',
        productNames: {
            1: 'Signature Lotus Moon Cake', 2: 'Red Bean Matcha Moon Cake', 3: 'Truffle Chocolate Moon Cake', 4: 'Snow Skin Durian Moon Cake', 5: 'Custard Lava Moon Cake', 6: 'Classic Mixed Nuts Moon Cake',
            7: 'Classic French Croissant', 8: 'Pain au Chocolat', 9: 'Kouign-Amann', 10: 'Mixed Berry Danish', 11: 'Strawberry Shortcake', 12: 'Dark Woods Black Forest', 13: 'Classic Tiramisu',
            14: 'Artisan Sourdough Loaf', 15: 'French Baguette', 16: 'Buttery Brioche Loaf', 17: 'Sea Salt Chocolate Chip', 18: 'Matcha Macadamia', 19: 'Red Velvet Crinkle', 20: 'Assorted Cookie Box'
        }
    },
    id: {
        navHome: 'Beranda', navAbout: 'Tentang', navShop: 'Belanja', navGallery: 'Galeri', navJournal: 'Jurnal', navTestimonial: 'Testimoni', navContact: 'Kontak',
        heroTitle: 'Puncak Kelezatan Pastry Buatan Tangan',
        heroText: 'Nikmati kemewahan Moon Cake khas Columbina dan dessert modern. Dibuat dengan tradisi, dirancang dengan elegan.',
        orderNow: 'Pesan Sekarang', ourStory: 'Cerita Kami', signatureCollection: 'Koleksi Andalan',
        finestSelection: 'Pilihan terbaik Moon Cake buatan tangan kami', exploreAll: 'Lihat Semua Produk',
        artTitle: 'Seni Memanggang',
        artText: 'Di Columbina, kami percaya bahwa memanggang adalah seni. Setiap pastry dibuat dengan teliti memakai bahan terbaik. Moon Cake khas kami memadukan resep tradisional dengan rasa modern.',
        artPoint1: 'Mentega dan tepung Prancis premium',
        artPoint2: 'Tanpa pengawet buatan',
        artPoint3: 'Dibuat tangan setiap hari oleh baker ahli',
        aboutTitle: 'Cerita Kami',
        aboutSubtitle: 'Warisan bertemu sentuhan modern',
        aboutHeading: 'Merangkai Kenangan Sejak 2010',
        aboutCopy1: 'Columbina bermula dari dapur keluarga sederhana dengan satu visi: membuat Moon Cake yang sempurna. Selama bertahun-tahun, dedikasi kami pada kualitas dan presentasi artistik membawa Columbina menjadi destinasi dessert premium.',
        aboutCopy2: 'Hari ini, bersama para Master Baker kami, Columbina terus berinovasi sambil menjaga akar tradisi, agar setiap gigitan menjadi perayaan rasa dan elegansi.',
        discoverMore: 'Selengkapnya', artisanMenu: 'Menu Artisan Kami', menuSubtitle: 'Nikmati setiap gigitan',
        searchPlaceholder: 'Cari hidangan favorit...', all: 'Semua', backMenu: 'Kembali ke Menu',
        reviews: 'Ulasan', quantity: 'Jumlah:', available: 'tersedia', addToCart: 'Tambah ke Keranjang',
        addToCartUpper: 'TAMBAH KE KERANJANG', orderWa: 'PESAN VIA WHATSAPP', ingredients: 'Bahan',
        nutrition: 'Informasi Gizi', shipping: 'Pengiriman',
        allergy: '*Info alergi: Diproses di fasilitas yang menangani kacang dan produk susu.',
        shippingCopy: 'Pengiriman nasional tersedia untuk Cookies. Pastry dan cake yang lembut hanya tersedia untuk pengiriman lokal di hari yang sama agar tetap segar.',
        visualFeast: 'Galeri Visual', visualSubtitle: 'Sekilas estetika kami',
        journal: 'Jurnal', journalSubtitle: 'Cerita, panduan, dan rahasia baking', readArticle: 'Baca Artikel', backJournal: 'Kembali ke Jurnal',
        testimonialTitle: 'Kata Mereka', testimonialSubtitle: 'Cerita manis dari pelanggan kami',
        sendTesti: 'Kirim Testimoni Kamu!', yourName: 'Nama Kamu', testiPlaceholder: 'Tulis pengalaman manismu di sini...', submitTesti: 'Kirim Testimoni',
        contactTitle: 'Hubungi Kami', contactSubtitle: 'Kami senang mendengar kabar darimu', visitBoutique: 'Kunjungi Butik Kami',
        address: 'Alamat', phone: 'Telepon / WhatsApp', hours: 'Jam Operasional', sendMessage: 'Kirim Pesan',
        namePlaceholder: 'Nama Kamu', emailPlaceholder: 'Email Kamu', subjectPlaceholder: 'Subjek', messagePlaceholder: 'Pesan Kamu',
        sendButton: 'Kirim Pesan', faqTitle: 'Pertanyaan Umum', faqSubtitle: 'Semua yang perlu kamu tahu tentang pesanan, pengiriman, dan bahan',
        termsTitle: 'Syarat & Ketentuan', privacyTitle: 'Kebijakan Privasi', notFound: 'Halaman Tidak Ditemukan', returnHome: 'Kembali ke Beranda',
        yourCart: 'Keranjang Kamu', yourWishlist: 'Wishlist Kamu', subtotal: 'Subtotal:', checkoutWa: 'Checkout via WhatsApp',
        emptyCart: 'Keranjang kamu masih kosong.', emptyWishlist: 'Wishlist kamu masih kosong.', remove: 'Hapus',
        quickLinks: 'Tautan Cepat', customerCare: 'Layanan Pelanggan', newsletter: 'Newsletter',
        newsletterCopy: 'Berlangganan untuk promo dan update terbaru.', emailAddress: 'Alamat Email',
        rights: '© 2026 Columbina Bakery. Seluruh hak cipta dilindungi. Dibuat untuk Spring.',
        saved: 'Hemat', noProducts: 'Produk tidak ditemukan untuk', cartEmptyAlert: 'Keranjang kamu masih kosong!',
        testiThanks: 'Terima kasih untuk testimoninya! Sudah berhasil ditambahkan.',
        contactThanks: 'Terima kasih! Pesan kamu sudah kami terima.', newsletterThanks: 'Terima kasih sudah berlangganan!',
        waGreeting: 'Halo Columbina', waOrder: 'Saya ingin memesan', waCustomer: 'Nama Pelanggan', waPhone: 'Nomor Telepon', waAddress: 'Alamat', waConfirm: 'Mohon konfirmasi pesanan saya.',
        productNames: {
            1: 'Moon Cake Lotus Signature', 2: 'Moon Cake Kacang Merah Matcha', 3: 'Moon Cake Truffle Cokelat', 4: 'Moon Cake Durian Snow Skin', 5: 'Moon Cake Custard Lava', 6: 'Moon Cake Kacang Campur Klasik',
            7: 'Croissant Prancis Klasik', 8: 'Pain au Chocolat', 9: 'Kouign-Amann', 10: 'Danish Buah Beri', 11: 'Strawberry Shortcake', 12: 'Black Forest Dark Woods', 13: 'Tiramisu Klasik',
            14: 'Roti Sourdough Artisan', 15: 'Baguette Prancis', 16: 'Roti Brioche Mentega', 17: 'Cookie Cokelat Sea Salt', 18: 'Cookie Matcha Macadamia', 19: 'Red Velvet Crinkle', 20: 'Kotak Cookie Campur'
        }
    }
};

const t = (key) => i18n[currentLanguage]?.[key] || i18n.en[key] || key;

// Fungsi pembantu buat narik harga IDR dan ngeformat jadi Rupiah
const getIDR = (id) => priceIDRMap[id] || 100000;
const getSaleIDR = (product) => salePriceIDRMap[product.id] || null;
const getDisplayName = (product) => t('productNames')?.[product.id] || product.name;
const getActivePriceUSD = (product) => product.salePrice || product.price;
const getActivePriceIDR = (product) => getSaleIDR(product) || getIDR(product.id);
const formatIDR = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
const formatUSD = (price) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
const getLinePrices = (product, qty = 1) => ({
    usd: getActivePriceUSD(product) * qty,
    idr: getActivePriceIDR(product) * qty
});

const createPriceHtml = (product, size = 'card') => {
    const hasSale = Boolean(product.salePrice);
    const currentSize = size === 'detail' ? '1.3rem' : '0.9rem';
    if(!hasSale) {
        return `
            <span class="price-current">${formatUSD(product.price)}</span>
            <span class="price-current price-idr">${formatIDR(getIDR(product.id))}</span>
        `;
    }
    return `
        <span class="price-old">${formatUSD(product.price)} / ${formatIDR(getIDR(product.id))}</span>
        <span class="price-current">${formatUSD(getActivePriceUSD(product))}</span>
        <span class="price-current price-idr">${formatIDR(getActivePriceIDR(product))}</span>
        <span class="price-savings" style="font-size: ${currentSize};">${t('saved')} ${formatUSD(product.price - getActivePriceUSD(product))} / ${formatIDR(getIDR(product.id) - getActivePriceIDR(product))}</span>
    `;
};

const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if(element) element.textContent = value;
};

const setPlaceholder = (selector, value) => {
    const element = document.querySelector(selector);
    if(element) element.setAttribute('placeholder', value);
};

const setHTML = (selector, value) => {
    const element = document.querySelector(selector);
    if(element) element.innerHTML = value;
};

const refreshCurrentView = () => {
    const hash = window.location.hash.substring(1) || 'home';
    const parts = hash.split('-');
    const page = parts[0];
    const dataId = parts[1] ? parseInt(parts[1], 10) : null;

    if(page === 'home') initHome();
    if(page === 'products') {
        const activeFilterBtn = document.querySelector('.filter-btn.active');
        const activeFilter = activeFilterBtn ? activeFilterBtn.dataset.filter : 'All';
        const searchInput = document.getElementById('search-input');
        initProducts(activeFilter, searchInput ? searchInput.value : '');
    }
    if(page === 'detail' && dataId) initDetail(dataId);
    if(page === 'blog') initBlog();
    if(page === 'article' && dataId) initArticle(dataId);
    if(page === 'testimonial') initTestimonials();
    if(page === 'faq') initFAQ();

    updateCartUI();
    updateWishlistUI();
};

const applyLanguage = () => {
    document.documentElement.lang = currentLanguage === 'id' ? 'id' : 'en';
    document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.langToggle === currentLanguage);
    });

    setText('.nav-link[href="#home"]', t('navHome'));
    setText('.nav-link[href="#about"]', t('navAbout'));
    setText('.nav-link[href="#products"]', t('navShop'));
    setText('.nav-link[href="#gallery"]', t('navGallery'));
    setText('.nav-link[href="#blog"]', t('navJournal'));
    setText('.nav-link[href="#testimonial"]', t('navTestimonial'));
    setText('.nav-link[href="#contact"]', t('navContact'));

    setText('#page-home .hero h1', t('heroTitle'));
    setText('#page-home .hero p', t('heroText'));
    setText('#page-home .hero-btns .btn-primary', t('orderNow'));
    setText('#page-home .hero-btns .hero-outline', t('ourStory'));
    setText('#page-home .section-padding:first-of-type .section-title', t('signatureCollection'));
    setText('#page-home .section-padding:first-of-type .section-subtitle', t('finestSelection'));
    setText('#page-home .mt-50 .btn', t('exploreAll'));
    setText('#page-home .story-copy .section-title', t('artTitle'));
    setText('#page-home .story-lead', t('artText'));
    setHTML('#page-home .story-list li:nth-child(1)', `<i class="fas fa-check story-check"></i> ${t('artPoint1')}`);
    setHTML('#page-home .story-list li:nth-child(2)', `<i class="fas fa-check story-check"></i> ${t('artPoint2')}`);
    setHTML('#page-home .story-list li:nth-child(3)', `<i class="fas fa-check story-check"></i> ${t('artPoint3')}`);
    setText('#page-home .story-copy .btn', t('discoverMore'));

    setText('#page-products .section-title', t('artisanMenu'));
    setText('#page-products .section-subtitle', t('menuSubtitle'));
    setPlaceholder('#search-input', t('searchPlaceholder'));
    setText('.filter-btn[data-filter="All"]', t('all'));
    setText('.back-link', `← ${t('backMenu')}`);

    setText('#page-about .section-title', t('aboutTitle'));
    setText('#page-about .section-subtitle', t('aboutSubtitle'));
    setText('#page-about .about-heading', t('aboutHeading'));
    setText('#page-about .about-copy:nth-of-type(1)', t('aboutCopy1'));
    setText('#page-about .about-copy:nth-of-type(2)', t('aboutCopy2'));
    setText('#page-gallery .section-title', t('visualFeast'));
    setText('#page-gallery .section-subtitle', t('visualSubtitle'));
    setText('#page-blog .section-title', t('journal'));
    setText('#page-blog .section-subtitle', t('journalSubtitle'));
    setHTML('.article-back-link', `<i class="fas fa-arrow-left"></i> ${t('backJournal')}`);
    setText('#page-testimonial .section-title', t('testimonialTitle'));
    setText('#page-testimonial .section-subtitle', t('testimonialSubtitle'));
    setText('.add-testimonial-form h2', t('sendTesti'));
    setPlaceholder('#testi-nama', t('yourName'));
    setPlaceholder('#testi-pesan', t('testiPlaceholder'));
    setText('#form-testimoni button[type="submit"]', t('submitTesti'));

    setText('#page-contact .section-title', t('contactTitle'));
    setText('#page-contact .section-subtitle', t('contactSubtitle'));
    setText('#page-contact .contact-info-card:first-child .contact-card-title', t('visitBoutique'));
    setText('#page-contact .contact-info-card:nth-child(2) .contact-card-title', t('sendMessage'));
    setText('#page-contact .info-item:nth-child(1) .info-title', t('address'));
    setText('#page-contact .info-item:nth-child(2) .info-title', t('phone'));
    setText('#page-contact .info-item:nth-child(3) .info-title', t('hours'));
    setPlaceholder('#contact-form input:nth-of-type(1)', t('namePlaceholder'));
    setPlaceholder('#contact-form input:nth-of-type(2)', t('emailPlaceholder'));
    setPlaceholder('#contact-form input:nth-of-type(3)', t('subjectPlaceholder'));
    setPlaceholder('#contact-form textarea', t('messagePlaceholder'));
    setText('#contact-form button[type="submit"]', t('sendButton'));

    setText('#page-faq .section-title', t('faqTitle'));
    setText('#page-faq .section-subtitle', t('faqSubtitle'));
    setText('#page-terms .section-title', t('termsTitle'));
    setText('#page-privacy .section-title', t('privacyTitle'));
    setText('#page-404 h2', t('notFound'));
    setText('#page-404 .btn', t('returnHome'));
    setText('#cart-sidebar .sidebar-title', t('yourCart'));
    setText('#wishlist-sidebar .sidebar-title', t('yourWishlist'));
    setText('.cart-total span:first-child', t('subtotal'));
    document.getElementById('checkout-wa-btn')?.lastChild && (document.getElementById('checkout-wa-btn').lastChild.textContent = ` ${t('checkoutWa')}`);
    setText('.footer .grid > div:nth-child(2) h4', t('quickLinks'));
    setText('.footer .grid > div:nth-child(3) h4', t('customerCare'));
    setText('.footer .grid > div:nth-child(4) h4', t('newsletter'));
    setText('.newsletter-desc', t('newsletterCopy'));
    setPlaceholder('.newsletter-input', t('emailAddress'));
    setText('.footer-bottom p', t('rights'));

    refreshCurrentView();
};


const saveCart = () => { localStorage.setItem('columbina_cart', JSON.stringify(cart)); updateCartUI(); }
const saveWishlist = () => { localStorage.setItem('columbina_wishlist', JSON.stringify(wishlist)); updateWishlistUI(); }

/* ==========================================
    3. UI RENDER FUNCTIONS
    ========================================== */

// Render Product Card HTML
const createProductCard = (product) => {
    const isWished = wishlist.some(item => item.id === product.id);
    const badgesHtml = product.badges.map(b => `<span class="badge-tag badge-${b.toLowerCase().replace(' ','')}">${b}</span>`).join('');
    const productName = getDisplayName(product);
    
    return `
        <div class="product-card" data-aos="fade-up">
            <div class="product-badges">${badgesHtml}</div>
            <button class="btn-wishlist-card ${isWished ? 'active' : ''}" data-wishlist-toggle="${product.id}" aria-label="Toggle Wishlist">
                <i class="${isWished ? 'fas' : 'far'} fa-heart"></i>
            </button>
            <div class="product-img-wrap" data-detail-id="${product.id}">
                <img src="${product.img}" alt="${productName}" class="product-img" loading="lazy">
            </div>
            <div class="product-info">
                <span class="product-cat">${product.category}</span>
                <h3 class="product-title" data-detail-id="${product.id}">${productName}</h3>
                <div class="product-rating">
                    ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
                    <span>(${product.reviews})</span>
                </div>
                <div class="product-price">${createPriceHtml(product)}</div>
                <button class="btn btn-outline product-card-add" data-add-cart="${product.id}">${t('addToCart')}</button>
            </div>
        </div>
    `;
};

// Initialize Home Page
const initHome = () => {
    const homeFeatured = document.getElementById('home-featured-products');
    // Show top 4 mooncakes / best sellers
    const featured = productData.filter(p => p.badges.includes('Signature') || p.badges.includes('Best Seller')).slice(0, 4);
    if(homeFeatured) homeFeatured.innerHTML = featured.map(createProductCard).join('');
};

// Initialize Products Page
const initProducts = (filter = 'All', search = '') => {
    const grid = document.getElementById('products-grid');
    if(!grid) return;
    let filtered = productData;
    
    if(filter !== 'All') filtered = filtered.filter(p => p.category === filter);
    if(search.trim() !== '') {
        const s = search.toLowerCase();
        filtered = filtered.filter(p => getDisplayName(p).toLowerCase().includes(s) || p.name.toLowerCase().includes(s) || p.category.toLowerCase().includes(s));
    }
    
    if(filtered.length === 0) {
        grid.innerHTML = `<div class="no-results"><h3>${t('noProducts')} "${search}"</h3></div>`;
    } else {
        grid.innerHTML = filtered.map(createProductCard).join('');
    }
};

// Initialize Product Detail Page
const initDetail = (id) => {
    const product = productData.find(p => p.id === id);
    if(!product) { navigate('404'); return; }
    
    const container = document.getElementById('detail-container');
    if(!container) return;
    const badgesHtml = product.badges.map(b => `<span class="badge-tag badge-${b.toLowerCase().replace(' ','')} detail-badge-inline">${b}</span>`).join('');
    const isWished = wishlist.some(item => item.id === product.id);
    const productName = getDisplayName(product);
    
    container.innerHTML = `
        <div class="detail-gallery" data-aos="fade-right">
            <a href="${product.img}" class="glightbox" data-title="${productName}">
                <img src="${product.img}" alt="${productName}">
            </a>
        </div>
        <div class="detail-info" data-aos="fade-left">
            <button class="btn-wishlist-detail ${isWished ? 'active' : ''}" data-wishlist-toggle="${product.id}" aria-label="Toggle Wishlist">
                <i class="${isWished ? 'fas' : 'far'} fa-heart"></i>
            </button>
            <span class="detail-category-label">${product.category}</span>
            <h1>${productName}</h1>
            <div style="margin-bottom: 15px;">${badgesHtml}</div>
            <div class="product-rating detail-rating-line">
                ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
                <span class="detail-review-count">(${product.reviews} ${t('reviews')})</span>
            </div>
            <div class="detail-price">${createPriceHtml(product, 'detail')}</div>
            <p class="detail-desc">${product.desc}</p>
            
            <div class="qty-selector">
                <span class="qty-label">${t('quantity')}</span>
                <button class="qty-btn" data-temp-qty="-1">−</button>
                <input type="number" id="detail-qty" class="qty-input" value="1" min="1" max="${product.stock}" readonly>
                <button class="qty-btn" data-temp-qty="1">+</button>
                <span class="qty-stock">${product.stock} ${t('available')}</span>
            </div>
            
            <div class="detail-actions">
                <button class="btn btn-outline" data-add-detail-cart="${product.id}" style="justify-content: center; gap: 8px;">
                    <i class="fas fa-shopping-bag"></i> ${t('addToCartUpper')}
                </button>
                <button class="btn btn-wa" data-checkout-single="${product.id}" style="justify-content: center; gap: 8px;">
                    <i class="fab fa-whatsapp"></i> ${t('orderWa')}
                </button>
            </div>
            
            <div class="detail-tabs">
                <div class="tabs">
                    <button class="tab-btn active" data-tab-target="tab-ingredients">${t('ingredients')}</button>
                    <button class="tab-btn" data-tab-target="tab-nutrition">${t('nutrition')}</button>
                    <button class="tab-btn" data-tab-target="tab-shipping">${t('shipping')}</button>
                </div>
                <div id="tab-ingredients" class="tab-content active">${product.ingredients} <br><br><em>${t('allergy')}</em></div>
                <div id="tab-nutrition" class="tab-content">${product.nutrition}</div>
                <div id="tab-shipping" class="tab-content">${t('shippingCopy')}</div>
            </div>
        </div>
    `;
    
    // Re-init lightbox
    GLightbox({ selector: '.glightbox' });
};

// Initialize Gallery
const initGallery = () => {
    const galleryImages = [
        "assets/images/Signature%20Lotus%20Moon%20Cake.png",
        "assets/images/Classic%20French%20Croissant.png",
        "assets/images/Strawberry%20Shortcake.png",
        "assets/images/Assorted%20Cookie%20Box.png",
        "assets/images/Dark%20Woods%20Black%20Forest.png",
        "assets/images/Classic%20Tiramisu.png"
    ];
    const grid = document.getElementById('gallery-grid');
    if(grid) {
        grid.innerHTML = galleryImages.map(src => `
            <a href="${src}" class="glightbox gallery-item">
                <img src="${src}" alt="Gallery Image" class="gallery-img" loading="lazy">
            </a>
        `).join('');
        GLightbox({ selector: '.glightbox' });
    }
};

const blogPosts = [
    {
        id: 1,
        img: "assets/images/The%20Art%20of%20Crafting%20Traditional%20Moon%20Cakes.jpg",
        date: "Jun 26, 2026",
        dateId: "26 Jun 2026",
        en: {
            title: "The Art of Crafting Traditional Moon Cakes",
            cat: "Behind the Scenes",
            excerpt: "Discover the rich heritage and process behind our signature moon cakes, from ingredient selection to the final hand-finished design.",
            content: `<p>At Columbina, each moon cake is crafted with precision and passion. Our bakers use premium lotus seed paste, salted egg yolks, and hand-stamped molds to create an artisanal treat that blends heritage with modern taste.</p><p>We source ingredients with care and maintain strict quality controls to ensure every moon cake is a luxurious experience. The result is a rich, silky texture with a beautifully balanced sweetness that makes every bite memorable.</p>`
        },
        idText: {
            title: "Seni Membuat Moon Cake Tradisional",
            cat: "Di Balik Dapur",
            excerpt: "Kenali warisan rasa dan proses di balik moon cake khas kami, mulai dari pemilihan bahan hingga sentuhan akhir yang dikerjakan tangan.",
            content: `<p>Di Columbina, setiap moon cake dibuat dengan presisi dan penuh perhatian. Para baker kami memakai pasta biji lotus premium, kuning telur asin, dan cetakan tradisional untuk menghadirkan rasa klasik dengan sentuhan modern.</p><p>Kami memilih bahan dengan teliti dan menjaga standar kualitas agar setiap moon cake terasa mewah. Hasilnya adalah tekstur lembut, rasa manis seimbang, dan pengalaman yang berkesan di setiap gigitan.</p>`
        }
    },
    {
        id: 2,
        img: "assets/images/Sourdough%20The%20Secret%20to%20Perfect%20Crust.jpg",
        date: "May 30, 2026",
        dateId: "30 Mei 2026",
        en: {
            title: "Sourdough: The Secret to Perfect Crust",
            cat: "Tips",
            excerpt: "Learn our expert sourdough baking tips so your loaf comes out with the perfect crust and an airy, tender crumb.",
            content: `<p>Creating a perfect sourdough loaf starts with a lively starter and a gentle folding technique. We allow the dough to rest slowly overnight so the flavors develop naturally.</p><p>Our bakers also pay special attention to oven temperature and steam, giving each loaf a crisp crust and a chewy, open crumb that is ideal for sandwiches or simply enjoyed with butter.</p>`
        },
        idText: {
            title: "Sourdough: Rahasia Kulit Roti yang Sempurna",
            cat: "Tips",
            excerpt: "Pelajari tips sourdough dari baker kami agar roti memiliki kulit renyah dan bagian dalam yang lembut serta berongga.",
            content: `<p>Roti sourdough yang baik dimulai dari starter yang aktif dan teknik lipatan yang lembut. Kami membiarkan adonan beristirahat perlahan semalaman agar rasa alaminya berkembang.</p><p>Para baker kami juga memperhatikan suhu oven dan uap panas, sehingga setiap loaf memiliki kulit renyah dan crumb yang kenyal. Cocok untuk sandwich atau dinikmati sederhana dengan mentega.</p>`
        }
    },
    {
        id: 3,
        img: "assets/images/Coffe%20%26%20Pastry%20Pairin%20Guide.jpg",
        date: "Jun 08, 2026",
        dateId: "08 Jun 2026",
        en: {
            title: "Coffee & Pastry Pairing Guide",
            cat: "Guide",
            excerpt: "Find the perfect coffee pairing for your pastry selection, from buttery croissants to fruity danishes.",
            content: `<p>Pairing coffee with pastry is all about balance. Light roast coffees work beautifully with fruity, creamy pastries, while darker roasts stand up well to chocolate and nut-forward treats.</p><p>Our recommendations include a smooth latte with a berry danish, a bright filtered coffee alongside a lemon tart, and an espresso shot with a rich chocolate croissant.</p>`
        },
        idText: {
            title: "Panduan Memadukan Kopi & Pastry",
            cat: "Panduan",
            excerpt: "Temukan pasangan kopi terbaik untuk pilihan pastry kamu, dari croissant buttery sampai danish buah beri.",
            content: `<p>Memadukan kopi dan pastry adalah soal keseimbangan. Kopi light roast cocok untuk pastry buah dan krim, sementara dark roast lebih pas untuk rasa cokelat dan kacang.</p><p>Rekomendasi kami: latte lembut dengan berry danish, kopi filter yang cerah bersama tart lemon, atau espresso dengan chocolate croissant yang kaya rasa.</p>`
        }
    }
];

const getBlogPost = (post) => ({
    ...post,
    ...(currentLanguage === 'id' ? post.idText : post.en),
    date: currentLanguage === 'id' ? post.dateId : post.date
});

const faqItems = {
    en: [
        { q: 'How do I place an order?', a: 'Browse our shop, add your favorites to the cart, and checkout via WhatsApp. You can also contact us directly for custom orders.' },
        { q: 'Do you deliver nationwide?', a: 'We offer local delivery for delicate pastries and nationwide courier shipping for selected items. Check the product details and shipping section for availability.' },
        { q: 'Can I request a custom flavor or gift packaging?', a: 'Yes! Send us a WhatsApp message or use the contact form to discuss custom flavors, packaging, and special event requests.' },
        { q: 'Do your products contain allergens?', a: 'Many of our products contain dairy, nuts, eggs, or gluten. Please review the ingredient details on each product page and contact us if you have specific allergy concerns.' }
    ],
    id: [
        { q: 'Bagaimana cara membuat pesanan?', a: 'Buka halaman belanja, masukkan produk favorit ke keranjang, lalu checkout melalui WhatsApp. Kamu juga bisa menghubungi kami langsung untuk pesanan khusus.' },
        { q: 'Apakah tersedia pengiriman nasional?', a: 'Kami menyediakan pengiriman lokal untuk pastry yang lembut dan kurir nasional untuk produk tertentu. Cek detail produk dan bagian pengiriman untuk ketersediaannya.' },
        { q: 'Bisa request rasa khusus atau kemasan hadiah?', a: 'Bisa. Kirim pesan WhatsApp atau gunakan form kontak untuk mendiskusikan rasa, kemasan, dan kebutuhan acara spesial.' },
        { q: 'Apakah produk mengandung alergen?', a: 'Banyak produk kami mengandung susu, kacang, telur, atau gluten. Silakan cek detail bahan pada halaman produk dan hubungi kami jika ada alergi tertentu.' }
    ]
};

// Initialize Blog
const initBlog = () => {
    const grid = document.getElementById('blog-grid');
    if(grid) {
        grid.innerHTML = blogPosts.map(getBlogPost).map(b => `
            <div class="blog-card">
                <img src="${b.img}" alt="${b.title}" class="blog-img">
                <div class="blog-content">
                    <div class="blog-meta"><span>${b.cat}</span><span>${b.date}</span></div>
                    <h3 class="blog-heading">${b.title}</h3>
                    <p class="blog-excerpt">${b.excerpt}</p>
                    <a href="#article-${b.id}" class="blog-read-link">${t('readArticle')} <i class="fas fa-arrow-right blog-read-icon"></i></a>
                </div>
            </div>
        `).join('');
    }
};

const initArticle = (id) => {
    const articleSource = blogPosts.find(post => post.id === id);
    const article = articleSource ? getBlogPost(articleSource) : null;
    if(!article) { navigate('404'); return; }

    const articleImg = document.getElementById('article-image');
    if(articleImg) articleImg.src = article.img;
    if(articleImg) articleImg.alt = article.title;
    
    const titleEl = document.getElementById('article-title');
    if(titleEl) titleEl.innerText = article.title;
    
    const metaEl = document.getElementById('article-meta');
    if(metaEl) metaEl.innerHTML = `<span>${article.cat}</span><span>${article.date}</span>`;
    
    const contentEl = document.getElementById('article-content');
    if(contentEl) contentEl.innerHTML = article.content;
};

// Initialize Testimonials
const initTestimonials = () => {
    const grid = document.getElementById('testimonial-grid');
    if (!grid) return;
    
    grid.innerHTML = testimonials.map(t => `
        <div class="testimonial-card">
            <div class="product-rating" style="margin-bottom: 10px; color: #f1c40f;">
                ${'<i class="fas fa-star"></i>'.repeat(t.rating)}
            </div>
            <p class="testi-text">"${t.pesan}"</p>
            <h4 style="color: var(--primary); margin-top: 15px;">— ${t.nama}</h4>
        </div>
    `).join('');
};

/* ==========================================
    4. ROUTER (SPA LOGIC)
    ========================================== */
const navigate = (page, dataId = null) => {
    // Hide all pages
    document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));
    
    // Remove active from nav
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    
    // Determine target
    const targetPage = document.getElementById(`page-${page}`);
    if(targetPage) {
        targetPage.classList.add('active');
        const navLink = document.querySelector(`.nav-link[href="#${page}"]`);
        if(navLink) navLink.classList.add('active');
    } else {
        const errorPage = document.getElementById('page-404');
        if(errorPage) errorPage.classList.add('active');
    }

    // Close mobile menu
    const navLinksMenu = document.getElementById('nav-links');
    if(navLinksMenu) navLinksMenu.classList.remove('active');

    // Page specific inits
    if(page === 'home') initHome();
    if(page === 'products') initProducts();
    if(page === 'detail' && dataId) initDetail(dataId);
    if(page === 'gallery') initGallery();
    if(page === 'blog') initBlog();
    if(page === 'article' && dataId) initArticle(dataId);
    if(page === 'testimonial') initTestimonials();
    if(page === 'faq') initFAQ();
    applyLanguage();

    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update URL Hash without jumping
    if(history.pushState) {
        history.pushState(null, null, `#${page}${dataId ? `-${dataId}` : ''}`);
    } else {
        window.location.hash = `#${page}`;
    }

    // Refresh AOS
    if(typeof AOS !== 'undefined') {
        setTimeout(() => AOS.refresh(), 100);
    }
};

// Handle browser back/forward
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1) || 'home';
    const parts = hash.split('-');
    navigate(parts[0], parts[1] ? parseInt(parts[1]) : null);
});

/* ==========================================
    5. CART & WISHLIST LOGIC
    ========================================== */

const addToCart = (id, qty = 1) => {
    const product = productData.find(p => p.id === id);
    if(!product) return;
    
    const existing = cart.find(item => item.id === id);
    if(existing) { existing.qty += qty; } 
    else { cart.push({ id: product.id, qty }); }
    
    saveCart();
    openSidebar('cart-sidebar');
};

const updateCartQty = (id, delta) => {
    const item = cart.find(i => i.id === id);
    if(item) {
        item.qty += delta;
        if(item.qty <= 0) cart = cart.filter(i => i.id !== id);
        saveCart();
    }
};

const removeFromCart = (id) => {
    cart = cart.filter(i => i.id !== id);
    saveCart();
};

const toggleWishlist = (id, event) => {
    if(event) event.stopPropagation();
    const product = productData.find(p => p.id === id);
    const index = wishlist.findIndex(w => w.id === id);
    
    if(index > -1) { wishlist.splice(index, 1); } 
    else { wishlist.push(product); }
    
    saveWishlist();
    
    // Re-render views to update heart icons
    const currentHash = window.location.hash.substring(1) || 'home';
    if(currentHash === 'home') initHome();
    if(currentHash === 'products') {
        const activeFilterBtn = document.querySelector('.filter-btn.active');
        const activeFilter = activeFilterBtn ? activeFilterBtn.dataset.filter : 'All';
        const searchInput = document.getElementById('search-input');
        const searchVal = searchInput ? searchInput.value : '';
        initProducts(activeFilter, searchVal);
    }
};

const updateCartUI = () => {
    const cartCount = document.getElementById('cart-count');
    if(cartCount) cartCount.innerText = cart.reduce((sum, item) => sum + item.qty, 0);
    
    const container = document.getElementById('cart-items');
    if(!container) return;

    if(cart.length === 0) {
        container.innerHTML = `<div class="empty-state"><i class="fas fa-shopping-bag empty-state-icon"></i><p>${t('emptyCart')}</p></div>`;
        const cartTotalPrice = document.getElementById('cart-total-price');
        if(cartTotalPrice) cartTotalPrice.innerHTML = `${formatUSD(0)}<br><span style="font-size: 1rem; color: var(--accent); font-weight: normal;">${formatIDR(0)}</span>`;
        return;
    }

    let totalUSD = 0;
    let totalIDR = 0;

    container.innerHTML = cart.map(item => {
        const product = productData.find(p => p.id === item.id) || item;
        const linePrices = getLinePrices(product, item.qty);
        const productName = getDisplayName(product);
        totalUSD += linePrices.usd;
        totalIDR += linePrices.idr;

        return `
        <div class="cart-item">
            <img src="${product.img}" alt="${productName}" class="cart-item-img">
            <div class="cart-item-main">
                <h4>${productName}</h4>
                <span class="cart-item-price">${createPriceHtml(product)}</span>
                <div class="cart-item-ctrl">
                    <div class="cart-qty-controls">
                        <button data-cart-delta="-1" data-cart-id="${item.id}">-</button>
                        <span>${item.qty}</span>
                        <button data-cart-delta="1" data-cart-id="${item.id}">+</button>
                    </div>
                    <span class="remove-item" data-remove-cart="${item.id}">${t('remove')}</span>
                </div>
            </div>
        </div>
    `}).join('');
    
    const cartTotalPrice = document.getElementById('cart-total-price');
    if(cartTotalPrice) {
        cartTotalPrice.innerHTML = `${formatUSD(totalUSD)} <br><span style="font-size: 1rem; color: var(--accent); font-weight: normal;">${formatIDR(totalIDR)}</span>`;
    }
};

const initFAQ = () => {
    const list = document.querySelector('#page-faq .faq-list');
    if(!list) return;

    list.innerHTML = faqItems[currentLanguage].map((item, index) => `
        <div class="faq-item ${index === 0 ? 'open' : ''}" data-aos="fade-up" data-aos-delay="${150 + (index * 50)}">
            <button class="faq-head" type="button" data-faq-toggle>
                <span>${item.q}</span>
                <i class="fas fa-chevron-down"></i>
            </button>
            <div class="faq-body">${item.a}</div>
        </div>
    `).join('');
};

const updateWishlistUI = () => {
    const wishlistCount = document.getElementById('wishlist-count');
    if(wishlistCount) wishlistCount.innerText = wishlist.length;
    
    const container = document.getElementById('wishlist-items');
    if(!container) return;

    if(wishlist.length === 0) {
        container.innerHTML = `<div class="empty-state"><i class="far fa-heart empty-state-icon"></i><p>${t('emptyWishlist')}</p></div>`;
        return;
    }

    container.innerHTML = wishlist.map(item => {
        const product = productData.find(p => p.id === item.id) || item;
        const productName = getDisplayName(product);
        return `
        <div class="wishlist-item">
            <img src="${product.img}" alt="${productName}" class="wishlist-item-img wishlist-clickable" data-detail-close="${item.id}">
            <div class="cart-item-main">
                <h4 class="wishlist-title" data-detail-close="${item.id}">${productName}</h4>
                <span class="cart-item-price">${createPriceHtml(product)}</span>
                <div class="cart-item-ctrl wishlist-actions">
                    <button class="btn btn-outline wishlist-add" data-add-cart="${item.id}">${t('addToCart')}</button>
                    <span class="remove-item" data-wishlist-toggle="${item.id}">${t('remove')}</span>
                </div>
            </div>
        </div>
    `}).join('');
};

/* ==========================================
    6. WHATSAPP API LOGIC
    ========================================== */
const formatWaMessage = (orderType, items, totalUSD, totalIDR, customerName = "[Name]", phone="[Phone]", address="[Address]") => {
    let text = `${t('waGreeting')} 👋\n${t('waOrder')} (${orderType}):\n\n`;
    items.forEach(i => {
        const product = productData.find(p => p.id === i.id) || i;
        const linePrices = getLinePrices(product, i.qty);
        text += `- ${getDisplayName(product)} (${i.qty}x) = ${formatUSD(linePrices.usd)} | ${formatIDR(linePrices.idr)}\n`;
    });
    text += `\n*Total: ${formatUSD(totalUSD)} | ${formatIDR(totalIDR)}*\n\n`;
    text += `${t('waCustomer')}: ${customerName}\n`;
    text += `${t('waPhone')}: ${phone}\n`;
    text += `${t('waAddress')}: ${address}\n\n`;
    text += t('waConfirm');
    return encodeURIComponent(text);
};

const checkoutWhatsApp = () => {
    if(cart.length === 0) { alert(t('cartEmptyAlert')); return; }
    const totalUSD = cart.reduce((sum, item) => {
        const product = productData.find(p => p.id === item.id) || item;
        return sum + getLinePrices(product, item.qty).usd;
    }, 0);
    const totalIDR = cart.reduce((sum, item) => {
        const product = productData.find(p => p.id === item.id) || item;
        return sum + getLinePrices(product, item.qty).idr;
    }, 0);
    const msg = formatWaMessage('From Cart', cart, totalUSD, totalIDR);
    window.open(`https://wa.me/6281382816395?text=${msg}`, '_blank');
};

const checkoutSingleWhatsApp = (id) => {
    const product = productData.find(p => p.id === id);
    if(!product) return;
    const qtyInput = document.getElementById('detail-qty');
    const qty = parseInt(qtyInput ? qtyInput.value : '1') || 1;
    const item = { id: product.id, qty };
    const linePrices = getLinePrices(product, qty);
    const totalUSD = linePrices.usd;
    const totalIDR = linePrices.idr;
    const msg = formatWaMessage('Direct Order', [item], totalUSD, totalIDR);
    window.open(`https://wa.me/6281382816395?text=${msg}`, '_blank');
};

/* ==========================================
    7. HELPER FUNCTIONS & LISTENERS
    ========================================== */
// Sidebar Toggles
const openSidebar = (id) => {
    const overlay = document.getElementById('sidebar-overlay');
    if(overlay) overlay.classList.add('active');
    const sidebar = document.getElementById(id);
    if(sidebar) sidebar.classList.add('active');
};
const closeSidebars = () => {
    const overlay = document.getElementById('sidebar-overlay');
    if(overlay) overlay.classList.remove('active');
    document.querySelectorAll('.sidebar').forEach(s => s.classList.remove('active'));
};

document.getElementById('cart-btn')?.addEventListener('click', () => openSidebar('cart-sidebar'));
document.getElementById('wishlist-btn')?.addEventListener('click', () => openSidebar('wishlist-sidebar'));
document.getElementById('close-cart')?.addEventListener('click', closeSidebars);
document.getElementById('close-wishlist')?.addEventListener('click', closeSidebars);
document.getElementById('sidebar-overlay')?.addEventListener('click', closeSidebars);

// MENGHUBUNGKAN TOMBOL CHECKOUT VIA WHATSAPP DI CART SIDEBAR
document.getElementById('checkout-wa-btn')?.addEventListener('click', checkoutWhatsApp);

document.addEventListener('click', (event) => {
    const detailLink = event.target.closest('[data-detail-id]');
    const addCartBtn = event.target.closest('[data-add-cart]');
    const addDetailCartBtn = event.target.closest('[data-add-detail-cart]');
    const wishToggleBtn = event.target.closest('[data-wishlist-toggle]');
    const cartDeltaBtn = event.target.closest('[data-cart-delta]');
    const removeCartBtn = event.target.closest('[data-remove-cart]');
    const checkoutSingleBtn = event.target.closest('[data-checkout-single]');
    const detailCloseBtn = event.target.closest('[data-detail-close]');
    const qtyBtn = event.target.closest('[data-temp-qty]');
    const tabBtn = event.target.closest('[data-tab-target]');
    const faqBtn = event.target.closest('[data-faq-toggle]');
    const langBtn = event.target.closest('[data-lang-toggle]');

    if(langBtn) {
        currentLanguage = langBtn.dataset.langToggle;
        localStorage.setItem('columbina_language', currentLanguage);
        applyLanguage();
        return;
    }

    if(tabBtn) {
        window.switchTab(tabBtn, tabBtn.dataset.tabTarget);
        return;
    }

    if(faqBtn) {
        const item = faqBtn.closest('.faq-item');
        if(item) item.classList.toggle('open');
        return;
    }

    if(detailLink && !event.target.closest('[data-add-cart]') && !event.target.closest('[data-wishlist-toggle]')) {
        navigate('detail', parseInt(detailLink.dataset.detailId, 10));
        return;
    }

    if(addCartBtn) {
        addToCart(parseInt(addCartBtn.dataset.addCart, 10));
        return;
    }

    if(addDetailCartBtn) {
        const qtyInput = document.getElementById('detail-qty');
        addToCart(parseInt(addDetailCartBtn.dataset.addDetailCart, 10), parseInt(qtyInput?.value || '1', 10));
        return;
    }

    if(wishToggleBtn) {
        toggleWishlist(parseInt(wishToggleBtn.dataset.wishlistToggle, 10), event);
        return;
    }

    if(cartDeltaBtn) {
        updateCartQty(parseInt(cartDeltaBtn.dataset.cartId, 10), parseInt(cartDeltaBtn.dataset.cartDelta, 10));
        return;
    }

    if(removeCartBtn) {
        removeFromCart(parseInt(removeCartBtn.dataset.removeCart, 10));
        return;
    }

    if(checkoutSingleBtn) {
        checkoutSingleWhatsApp(parseInt(checkoutSingleBtn.dataset.checkoutSingle, 10));
        return;
    }

    if(detailCloseBtn) {
        navigate('detail', parseInt(detailCloseBtn.dataset.detailClose, 10));
        return;
    }

    if(qtyBtn) {
        const delta = parseInt(qtyBtn.dataset.tempQty, 10);
        window.updateTempQty(delta);
        return;
    }
});

// Mobile Menu Toggle
document.getElementById('hamburger')?.addEventListener('click', () => {
    const navLinksMenu = document.getElementById('nav-links');
    if(navLinksMenu) navLinksMenu.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navLinksMenu = document.getElementById('nav-links');
        if(navLinksMenu) navLinksMenu.classList.remove('active');
    });
});

// Detail Page Helpers
window.updateTempQty = (delta) => {
    const input = document.getElementById('detail-qty');
    if(input) {
        let val = parseInt(input.value) + delta;
        const max = parseInt(input.getAttribute('max'));
        if(val < 1) val = 1;
        if(val > max) val = max;
        input.value = val;
    }
};

window.switchTab = (btn, targetId) => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const target = document.getElementById(targetId);
    if(target) target.classList.add('active');
};

// Filter & Search Logic
document.getElementById('category-filters')?.addEventListener('click', (e) => {
    if(e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const filter = e.target.dataset.filter;
        const searchInput = document.getElementById('search-input');
        const search = searchInput ? searchInput.value : '';
        initProducts(filter, search);
        if(typeof AOS !== 'undefined') AOS.refresh();
    }
});

document.getElementById('search-input')?.addEventListener('input', (e) => {
    const activeFilterBtn = document.querySelector('.filter-btn.active');
    const filter = activeFilterBtn ? activeFilterBtn.dataset.filter : 'All';
    initProducts(filter, e.target.value);
    if(typeof AOS !== 'undefined') AOS.refresh();
});

// Theme Toggle (Dark/Light)
const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.querySelector('#theme-toggle i');
    if(icon) {
        if(theme === 'dark') { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); } 
        else { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
    }
};
document.getElementById('theme-toggle')?.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('columbina_theme', currentTheme);
    applyTheme(currentTheme);
});

// Scroll Navbar Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if(nav) {
        if(window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    }
});

/* ==========================================
    8. INIT APP
    ========================================== */
window.addEventListener('DOMContentLoaded', () => {
    // Remove Loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }
    }, 800);

    // Init Plugins
    if(typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 50 });
    }
    applyTheme(currentTheme);
    updateCartUI();
    updateWishlistUI();

    // Setup initial route
    const hash = window.location.hash.substring(1) || 'home';
    const parts = hash.split('-');
    navigate(parts[0], parts[1] ? parseInt(parts[1]) : null);
    applyLanguage();

    // Listener Form Testimoni
    const formTesti = document.getElementById('form-testimoni');
    if(formTesti) {
        formTesti.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const nama = document.getElementById('testi-nama').value;
            const rating = parseInt(document.getElementById('testi-rating').value);
            const pesan = document.getElementById('testi-pesan').value;
            
            testimonials.unshift({ nama, rating, pesan });
            localStorage.setItem('columbina_testi', JSON.stringify(testimonials));
            
            initTestimonials();
            formTesti.reset();
            
            alert(t('testiThanks'));
        });
    }

    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactForm.reset();
            alert(t('contactThanks'));
        });
    }

    const newsletterForm = document.getElementById('newsletter-form');
    if(newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            newsletterForm.reset();
            alert(t('newsletterThanks'));
        });
    }
});
