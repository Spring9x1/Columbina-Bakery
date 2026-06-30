/* ==========================================
           1. DATA (MOCK JSON)
           ========================================== */
        

        /* ==========================================
           2. APP STATE & LOCAL STORAGE
           ========================================== */
        let cart = JSON.parse(localStorage.getItem('columbina_cart')) || [];
        let wishlist = JSON.parse(localStorage.getItem('columbina_wishlist')) || [];
        let currentTheme = localStorage.getItem('columbina_theme') || 'light';
        
        let defaultTesti = [
            { nama: "Ahmad", rating: 5, pesan: "Kuenya enak banget! Cocok buat nemenin santai sore." },
            { nama: "Budi", rating: 4, pesan: "Manisnya pas, teksturnya juga lembut." }
        ];
        let testimonials = JSON.parse(localStorage.getItem('columbina_testi')) || defaultTesti;

        const saveCart = () => { localStorage.setItem('columbina_cart', JSON.stringify(cart)); updateCartUI(); }
        const saveWishlist = () => { localStorage.setItem('columbina_wishlist', JSON.stringify(wishlist)); updateWishlistUI(); }

        /* ==========================================
           3. UI RENDER FUNCTIONS
           ========================================== */
        
        // Render Product Card HTML
        const createProductCard = (product) => {
            const isWished = wishlist.some(item => item.id === product.id);
            const badgesHtml = product.badges.map(b => `<span class="badge-tag badge-${b.toLowerCase().replace(' ','')}">${b}</span>`).join('');
            
            return `
                <div class="product-card" data-aos="fade-up">
                    <div class="product-badges">${badgesHtml}</div>
                    <button class="btn-wishlist-card ${isWished ? 'active' : ''}" data-wishlist-toggle="${product.id}" aria-label="Toggle Wishlist">
                        <i class="${isWished ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                    <div class="product-img-wrap" data-detail-id="${product.id}">
                        <img src="${product.img}" alt="${product.name}" class="product-img" loading="lazy">
                    </div>
                    <div class="product-info">
                        <span class="product-cat">${product.category}</span>
                        <h3 class="product-title" data-detail-id="${product.id}">${product.name}</h3>
                        <div class="product-rating">
                            ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
                            <span>(${product.reviews})</span>
                        </div>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <button class="btn btn-outline product-card-add" data-add-cart="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `;
        };

        // Initialize Home Page
        const initHome = () => {
            const homeFeatured = document.getElementById('home-featured-products');
            // Show top 4 mooncakes / best sellers
            const featured = productData.filter(p => p.badges.includes('Signature') || p.badges.includes('Best Seller')).slice(0, 4);
            homeFeatured.innerHTML = featured.map(createProductCard).join('');
        };

        // Initialize Products Page
        const initProducts = (filter = 'All', search = '') => {
            const grid = document.getElementById('products-grid');
            let filtered = productData;
            
            if(filter !== 'All') filtered = filtered.filter(p => p.category === filter);
            if(search.trim() !== '') {
                const s = search.toLowerCase();
                filtered = filtered.filter(p => p.name.toLowerCase().includes(s) || p.category.toLowerCase().includes(s));
            }
            
            if(filtered.length === 0) {
                grid.innerHTML = `<div class="no-results"><h3>No products found for "${search}"</h3></div>`;
            } else {
                grid.innerHTML = filtered.map(createProductCard).join('');
            }
        };

        // Initialize Product Detail Page
        const initDetail = (id) => {
            const product = productData.find(p => p.id === id);
            if(!product) { navigate('404'); return; }
            
            const container = document.getElementById('detail-container');
            const badgesHtml = product.badges.map(b => `<span class="badge-tag badge-${b.toLowerCase().replace(' ','')} detail-badge-inline">${b}</span>`).join('');
            const isWished = wishlist.some(item => item.id === product.id);
            
            container.innerHTML = `
                <div class="detail-gallery" data-aos="fade-right">
                    <a href="${product.img}" class="glightbox" data-title="${product.name}">
                        <img src="${product.img}" alt="${product.name}">
                    </a>
                </div>
                <div class="detail-info" data-aos="fade-left">
                    <button class="btn-wishlist-detail ${isWished ? 'active' : ''}" data-wishlist-toggle="${product.id}" aria-label="Toggle Wishlist">
                        <i class="${isWished ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                    <span class="detail-category-label">${product.category}</span>
                    <h1>${product.name}</h1>
                    <div style="margin-bottom: 15px;">${badgesHtml}</div>
                    <div class="product-rating detail-rating-line">
                        ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
                        <span class="detail-review-count">(${product.reviews} Reviews)</span>
                    </div>
                    <div class="detail-price">$${product.price.toFixed(2)}</div>
                    <p class="detail-desc">${product.desc}</p>
                    
                    <div class="qty-selector">
                        <span class="qty-label">Quantity:</span>
                        <button class="qty-btn" data-temp-qty="-1">−</button>
                        <input type="number" id="detail-qty" class="qty-input" value="1" min="1" max="${product.stock}" readonly>
                        <button class="qty-btn" data-temp-qty="1">+</button>
                        <span class="qty-stock">${product.stock} available</span>
                    </div>
                    
                    <div class="detail-actions">
                        <button class="btn btn-outline" data-add-detail-cart="${product.id}" style="justify-content: center; gap: 8px;">
                            <i class="fas fa-shopping-bag"></i> ADD TO CART
                        </button>
                        <button class="btn btn-wa" data-checkout-single="${product.id}" style="justify-content: center; gap: 8px;">
                            <i class="fab fa-whatsapp"></i> ORDER VIA WHATSAPP
                        </button>
                    </div>
                    
                    <div class="detail-tabs">
                        <div class="tabs">
                            <button class="tab-btn active" data-tab-target="tab-ingredients">Ingredients</button>
                            <button class="tab-btn" data-tab-target="tab-nutrition">Nutrition Facts</button>
                            <button class="tab-btn" data-tab-target="tab-shipping">Shipping</button>
                        </div>
                        <div id="tab-ingredients" class="tab-content active">${product.ingredients} <br><br><em>*Allergy info: Processed in a facility handling nuts and dairy.</em></div>
                        <div id="tab-nutrition" class="tab-content">${product.nutrition}</div>
                        <div id="tab-shipping" class="tab-content">Nationwide shipping available for Cookies. Delicate pastries and cakes are strictly for local delivery via same-day courier to preserve freshness.</div>
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
            grid.innerHTML = galleryImages.map(src => `
                <a href="${src}" class="glightbox gallery-item">
                    <img src="${src}" alt="Gallery Image" class="gallery-img" loading="lazy">
                </a>
            `).join('');
            GLightbox({ selector: '.glightbox' });
        };

        const blogPosts = [
            { id: 1, img: "assets/images/The%20Art%20of%20Crafting%20Traditional%20Moon%20Cakes.jpg", title: "The Art of Crafting Traditional Moon Cakes", cat: "Behind the Scenes", date: "Jun 26, 2026", excerpt: "Discover the rich heritage and process behind our signature moon cakes, from ingredient selection to the final hand-finished design.", content: `<p>At Columbina, each moon cake is crafted with precision and passion. Our bakers use premium lotus seed paste, salted egg yolks, and hand-stamped molds to create an artisanal treat that blends heritage with modern taste.</p><p>We source ingredients with care and maintain strict quality controls to ensure every moon cake is a luxurious experience. The result is a rich, silky texture with a beautifully balanced sweetness that makes every bite memorable.</p>` },
            { id: 2, img: "assets/images/Sourdough%20The%20Secret%20to%20Perfect%20Crust.jpg", title: "Sourdough: The Secret to Perfect Crust", cat: "Tips", date: "May 30, 2026", excerpt: "Learn our expert sourdough baking tips so your loaf comes out with the perfect crust and an airy, tender crumb.", content: `<p>Creating a perfect sourdough loaf starts with a lively starter and a gentle folding technique. We allow the dough to rest slowly overnight so the flavors develop naturally.</p><p>Our bakers also pay special attention to oven temperature and steam, giving each loaf a crisp crust and a chewy, open crumb that is ideal for sandwiches or simply enjoyed with butter.</p>` },
            { id: 3, img: "assets/images/Coffe%20%26%20Pastry%20Pairin%20Guide.jpg", title: "Coffee & Pastry Pairing Guide", cat: "Guide", date: "Jun 08, 2026", excerpt: "Find the perfect coffee pairing for your pastry selection, from buttery croissants to fruity danishes.", content: `<p>Pairing coffee with pastry is all about balance. Light roast coffees work beautifully with fruity, creamy pastries, while darker roasts stand up well to chocolate and nut-forward treats.</p><p>Our recommendations include a smooth latte with a berry danish, a bright filtered coffee alongside a lemon tart, and an espresso shot with a rich chocolate croissant.</p>` }
        ];

        // Initialize Blog
        const initBlog = () => {
            document.getElementById('blog-grid').innerHTML = blogPosts.map(b => `
                <div class="blog-card">
                    <img src="${b.img}" alt="${b.title}" class="blog-img">
                    <div class="blog-content">
                        <div class="blog-meta"><span>${b.cat}</span><span>${b.date}</span></div>
                        <h3 class="blog-heading">${b.title}</h3>
                        <p class="blog-excerpt">${b.excerpt}</p>
                        <a href="#article-${b.id}" class="blog-read-link">Read Article <i class="fas fa-arrow-right blog-read-icon"></i></a>
                    </div>
                </div>
            `).join('');
        };

        const initArticle = (id) => {
            const article = blogPosts.find(post => post.id === id);
            if(!article) { navigate('404'); return; }

            document.getElementById('article-image').src = article.img;
            document.getElementById('article-image').alt = article.title;
            document.getElementById('article-title').innerText = article.title;
            document.getElementById('article-meta').innerHTML = `<span>${article.cat}</span><span>${article.date}</span>`;
            document.getElementById('article-content').innerHTML = article.content;
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
                document.getElementById('page-404').classList.add('active');
            }

            // Close mobile menu
            document.getElementById('nav-links').classList.remove('active');

            // Page specific inits
            if(page === 'home') initHome();
            if(page === 'products') initProducts();
            if(page === 'detail' && dataId) initDetail(dataId);
            if(page === 'gallery') initGallery();
            if(page === 'blog') initBlog();
            if(page === 'article' && dataId) initArticle(dataId);
            if(page === 'testimonial') initTestimonials();

            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Update URL Hash without jumping
            if(history.pushState) {
                history.pushState(null, null, `#${page}${dataId ? `-${dataId}` : ''}`);
            } else {
                window.location.hash = `#${page}`;
            }

            // Refresh AOS
            setTimeout(() => AOS.refresh(), 100);
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
            else { cart.push({ ...product, qty }); }
            
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
                const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
                const searchVal = document.getElementById('search-input').value;
                initProducts(activeFilter, searchVal);
            }
        };

        const updateCartUI = () => {
            document.getElementById('cart-count').innerText = cart.reduce((sum, item) => sum + item.qty, 0);
            const container = document.getElementById('cart-items');
            
            if(cart.length === 0) {
                container.innerHTML = `<div class="empty-state"><i class="fas fa-shopping-bag empty-state-icon"></i><p>Your cart is empty.</p></div>`;
                document.getElementById('cart-total-price').innerText = '$0.00';
                return;
            }

            let total = 0;
            container.innerHTML = cart.map(item => {
                total += item.price * item.qty;
                return `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-main">
                        <h4>${item.name}</h4>
                        <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                        <div class="cart-item-ctrl">
                            <div class="cart-qty-controls">
                                <button data-cart-delta="-1" data-cart-id="${item.id}">-</button>
                                <span>${item.qty}</span>
                                <button data-cart-delta="1" data-cart-id="${item.id}">+</button>
                            </div>
                            <span class="remove-item" data-remove-cart="${item.id}">Remove</span>
                        </div>
                    </div>
                </div>
            `}).join('');
            
            document.getElementById('cart-total-price').innerText = `$${total.toFixed(2)}`;
        };

        const updateWishlistUI = () => {
            document.getElementById('wishlist-count').innerText = wishlist.length;
            const container = document.getElementById('wishlist-items');
            
            if(wishlist.length === 0) {
                container.innerHTML = `<div class="empty-state"><i class="far fa-heart empty-state-icon"></i><p>Your wishlist is empty.</p></div>`;
                return;
            }

            container.innerHTML = wishlist.map(item => `
                <div class="wishlist-item">
                    <img src="${item.img}" alt="${item.name}" class="wishlist-item-img wishlist-clickable" data-detail-close="${item.id}">
                    <div class="cart-item-main">
                        <h4 class="wishlist-title" data-detail-close="${item.id}">${item.name}</h4>
                        <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                        <div class="cart-item-ctrl wishlist-actions">
                            <button class="btn btn-outline wishlist-add" data-add-cart="${item.id}">Add to Cart</button>
                            <span class="remove-item" data-wishlist-toggle="${item.id}">Remove</span>
                        </div>
                    </div>
                </div>
            `).join('');
        };

        /* ==========================================
           6. WHATSAPP API LOGIC
           ========================================== */
        const formatWaMessage = (orderType, items, total, customerName = "[Name]", phone="[Phone]", address="[Address]") => {
            let text = `Hello Columbina ðŸ‘‹\nI would like to order (${orderType}):\n\n`;
            items.forEach(i => {
                text += `- ${i.name} (${i.qty}x) = $${(i.price * i.qty).toFixed(2)}\n`;
            });
            text += `\n*Total: $${total.toFixed(2)}*\n\n`;
            text += `Customer Name: ${customerName}\n`;
            text += `Phone Number: ${phone}\n`;
            text += `Address: ${address}\n\n`;
            text += `Please confirm my order.`;
            return encodeURIComponent(text);
        };

        const checkoutWhatsApp = () => {
            if(cart.length === 0) { alert("Your cart is empty!"); return; }
            const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
            const msg = formatWaMessage('From Cart', cart, total);
            window.open(`https://wa.me/6281234567890?text=${msg}`, '_blank');
        };

        const checkoutSingleWhatsApp = (id) => {
            const product = productData.find(p => p.id === id);
            const qty = parseInt(document.getElementById('detail-qty').value) || 1;
            const item = { ...product, qty };
            const msg = formatWaMessage('Direct Order', [item], item.price * qty);
            window.open(`https://wa.me/6281234567890?text=${msg}`, '_blank');
        };

        /* ==========================================
           7. HELPER FUNCTIONS & LISTENERS
           ========================================== */
        // Sidebar Toggles
        const openSidebar = (id) => {
            document.getElementById('sidebar-overlay').classList.add('active');
            document.getElementById(id).classList.add('active');
        };
        const closeSidebars = () => {
            document.getElementById('sidebar-overlay').classList.remove('active');
            document.querySelectorAll('.sidebar').forEach(s => s.classList.remove('active'));
        };

        document.getElementById('cart-btn').addEventListener('click', () => openSidebar('cart-sidebar'));
        document.getElementById('wishlist-btn').addEventListener('click', () => openSidebar('wishlist-sidebar'));
        document.getElementById('close-cart').addEventListener('click', closeSidebars);
        document.getElementById('close-wishlist').addEventListener('click', closeSidebars);
        document.getElementById('sidebar-overlay').addEventListener('click', closeSidebars);

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

            if(detailLink && !event.target.closest('[data-add-cart]') && !event.target.closest('[data-wishlist-toggle]')) {
                navigate('detail', parseInt(detailLink.dataset.detailId, 10));
                return;
            }

            if(addCartBtn) {
                addToCart(parseInt(addCartBtn.dataset.addCart, 10));
                return;
            }

            if(addDetailCartBtn) {
                addToCart(parseInt(addDetailCartBtn.dataset.addDetailCart, 10), parseInt(document.getElementById('detail-qty')?.value || '1', 10));
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
        document.getElementById('hamburger').addEventListener('click', () => {
            document.getElementById('nav-links').classList.toggle('active');
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => document.getElementById('nav-links').classList.remove('active'));
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
            document.getElementById(targetId).classList.add('active');
        };

        // Filter & Search Logic
        document.getElementById('category-filters')?.addEventListener('click', (e) => {
            if(e.target.classList.contains('filter-btn')) {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                const filter = e.target.dataset.filter;
                const search = document.getElementById('search-input').value;
                initProducts(filter, search);
                AOS.refresh();
            }
        });

        document.getElementById('search-input')?.addEventListener('input', (e) => {
            const filter = document.querySelector('.filter-btn.active').dataset.filter;
            initProducts(filter, e.target.value);
            AOS.refresh();
        });

        // Theme Toggle (Dark/Light)
        const applyTheme = (theme) => {
            document.documentElement.setAttribute('data-theme', theme);
            const icon = document.querySelector('#theme-toggle i');
            if(theme === 'dark') { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); } 
            else { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
        };
        document.getElementById('theme-toggle').addEventListener('click', () => {
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('columbina_theme', currentTheme);
            applyTheme(currentTheme);
        });

        // Scroll Navbar Effect
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('navbar');
            if(window.scrollY > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        });

        /* ==========================================
           8. INIT APP
           ========================================== */
        window.addEventListener('DOMContentLoaded', () => {
            // Remove Loader
            setTimeout(() => {
                const loader = document.getElementById('loader');
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 500);
            }, 800);

            // Init Plugins
            AOS.init({ duration: 800, once: true, offset: 50 });
            applyTheme(currentTheme);
            updateCartUI();
            updateWishlistUI();

            // Setup initial route
            const hash = window.location.hash.substring(1) || 'home';
            const parts = hash.split('-');
            navigate(parts[0], parts[1] ? parseInt(parts[1]) : null);

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
                    
                    alert('Makasih ya testimoninya! Udah masuk tuh. 👍');
                });
            }
        });