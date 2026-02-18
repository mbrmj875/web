/**
 * Product Detail Page - Advanced Features
 * Amazon-style product details with variants, reviews, and more
 */

// Product Database (Extended with variants and specifications)
const PRODUCTS_DATABASE = {
    1: {
        id: 1,
        name: 'حذاء رياضي فاخر Nike Air Max',
        category: 'shoes',
        categoryAr: 'أحذية رياضية',
        price: 125000,
        originalPrice: 175000,
        discount: 29,
        icon: '👟',
        rating: 4.8,
        reviews: 245,
        badge: 'جديد',
        stock: 'in-stock',
        stockCount: 45,
        description: 'حذاء رياضي فاخر من Nike Air Max بتقنية التوسيد الهوائي المتطور. مصنوع من مواد عالية الجودة توفر راحة استثنائية طوال اليوم. مثالي للجري، المشي، والاستخدام اليومي.',
        longDescription: `
            <p>اكتشف الراحة الفائقة مع حذاء Nike Air Max الرياضي الفاخر، المصمم خصيصاً للرياضيين والأشخاص النشطين. يتميز هذا الحذاء بتقنية Air Max الشهيرة التي توفر توسيداً هوائياً متطوراً يمتص الصدمات ويوفر دعماً ممتازاً للقدم.</p>
            
            <h3>المميزات الرئيسية:</h3>
            <ul>
                <li>تقنية Air Max للتوسيد الهوائي المتقدم</li>
                <li>خامات عالية الجودة مقاومة للاهتراء</li>
                <li>تصميم عصري وأنيق يناسب جميع الإطلالات</li>
                <li>نعل مطاطي مانع للانزلاق</li>
                <li>خفيف الوزن ومرن للغاية</li>
                <li>تهوية ممتازة تمنع تراكم الرطوبة</li>
            </ul>

            <h3>الاستخدامات المثالية:</h3>
            <ul>
                <li>الجري والمشي الرياضي</li>
                <li>التمارين الرياضية في الصالات</li>
                <li>الاستخدام اليومي والتنقل</li>
                <li>الرحلات والسفر</li>
            </ul>
        `,
        images: ['👟', '👟', '👟', '👟'],
        variants: {
            sizes: [
                { label: '39', value: '39', available: true },
                { label: '40', value: '40', available: true },
                { label: '41', value: '41', available: true },
                { label: '42', value: '42', available: true },
                { label: '43', value: '43', available: true },
                { label: '44', value: '44', available: false },
                { label: '45', value: '45', available: true }
            ],
            colors: [
                { label: 'أسود', value: 'black', hex: '#000000', available: true },
                { label: 'أبيض', value: 'white', hex: '#FFFFFF', available: true },
                { label: 'أحمر', value: 'red', hex: '#DC2626', available: true },
                { label: 'أزرق', value: 'blue', hex: '#2563EB', available: false }
            ]
        },
        specifications: {
            'المادة': 'جلد طبيعي ومواد صناعية متطورة',
            'النعل': 'مطاط عالي الجودة مقاوم للانزلاق',
            'الوزن': '320 جرام',
            'الارتفاع': 'متوسط الارتفاع',
            'نوع الإغلاق': 'رباط',
            'التقنية': 'Nike Air Max Cushioning',
            'الضمان': 'سنة واحدة من الشركة المصنعة',
            'بلد المنشأ': 'فيتنام'
        }
    },
    2: {
        id: 2,
        name: 'حقيبة جلدية فاخرة من Gucci',
        category: 'bags',
        categoryAr: 'حقائب',
        price: 200000,
        originalPrice: 285000,
        discount: 30,
        icon: '👜',
        rating: 4.6,
        reviews: 189,
        badge: 'خصم 30%',
        stock: 'in-stock',
        stockCount: 23,
        description: 'حقيبة جلدية فاخرة بتصميم إيطالي أنيق من Gucci. مثالية للاستخدام اليومي والمناسبات الخاصة.',
        longDescription: `
            <p>حقيبة Gucci الجلدية الفاخرة تجمع بين الأناقة الإيطالية الكلاسيكية والعملية الحديثة. مصنوعة من أجود أنواع الجلد الطبيعي مع تشطيبات يدوية دقيقة.</p>
            
            <h3>المميزات:</h3>
            <ul>
                <li>جلد طبيعي 100% عالي الجودة</li>
                <li>تصميم إيطالي أنيق وعصري</li>
                <li>أقسام داخلية متعددة للتنظيم</li>
                <li>إغلاق محكم وآمن</li>
                <li>حزام كتف قابل للتعديل</li>
            </ul>
        `,
        images: ['👜', '👜', '👜'],
        variants: {
            colors: [
                { label: 'بني', value: 'brown', hex: '#8B4513', available: true },
                { label: 'أسود', value: 'black', hex: '#000000', available: true },
                { label: 'بيج', value: 'beige', hex: '#D2B48C', available: true }
            ]
        },
        specifications: {
            'المادة': 'جلد طبيعي فاخر',
            'الأبعاد': '35 × 28 × 12 سم',
            'الوزن': '850 جرام',
            'نوع الإغلاق': 'سحاب + مشبك مغناطيسي',
            'الأقسام الداخلية': '3 أقسام رئيسية + جيوب جانبية',
            'الضمان': 'سنتان من الشركة المصنعة',
            'بلد المنشأ': 'إيطاليا'
        }
    },
    3: {
        id: 3,
        name: 'ساعة ذكية Apple Watch Series 9',
        category: 'watches',
        categoryAr: 'ساعات ذكية',
        price: 350000,
        originalPrice: 350000,
        discount: 0,
        icon: '⌚',
        rating: 4.9,
        reviews: 512,
        badge: 'الأكثر مبيعاً',
        stock: 'in-stock',
        stockCount: 67,
        description: 'ساعة Apple Watch Series 9 الذكية بأحدث التقنيات. شاشة Retina عالية الدقة، متابعة صحية متقدمة، ومقاومة للماء.',
        longDescription: `
            <p>ساعة Apple Watch Series 9 تمثل قمة الابتكار في عالم الساعات الذكية. مزودة بمعالج S9 الجديد وشاشة Retina دائمة العرض ومجموعة شاملة من مستشعرات الصحة واللياقة.</p>
            
            <h3>المميزات الصحية:</h3>
            <ul>
                <li>مراقبة معدل ضربات القلب على مدار الساعة</li>
                <li>قياس مستوى الأكسجين في الدم</li>
                <li>تخطيط كهربائي للقلب (ECG)</li>
                <li>متابعة النوم المتقدمة</li>
                <li>كشف السقوط وحالات الطوارئ</li>
            </ul>

            <h3>المميزات التقنية:</h3>
            <ul>
                <li>معالج Apple S9 فائق السرعة</li>
                <li>شاشة Retina LTPO OLED دائمة العرض</li>
                <li>مقاومة للماء حتى 50 متر</li>
                <li>اتصال خلوي 5G (في بعض الموديلات)</li>
                <li>بطارية تدوم حتى 18 ساعة</li>
            </ul>
        `,
        images: ['⌚', '⌚', '⌚', '⌚', '⌚'],
        variants: {
            sizes: [
                { label: '41mm', value: '41', available: true },
                { label: '45mm', value: '45', available: true }
            ],
            colors: [
                { label: 'منتصف الليل', value: 'midnight', hex: '#1C2B36', available: true },
                { label: 'ستارلايت', value: 'starlight', hex: '#E8E3D9', available: true },
                { label: 'فضي', value: 'silver', hex: '#C0C0C0', available: true },
                { label: '(PRODUCT)RED', value: 'red', hex: '#DC2626', available: true }
            ],
            storage: [
                { label: 'GPS', value: 'gps', available: true },
                { label: 'GPS + Cellular', value: 'cellular', available: true, priceExtra: 50000 }
            ]
        },
        specifications: {
            'الشاشة': 'Retina LTPO OLED دائمة العرض',
            'الحجم': '41mm أو 45mm',
            'المعالج': 'Apple S9 SiP',
            'السعة التخزينية': '64GB',
            'الاتصال': 'Wi-Fi 4, Bluetooth 5.3, NFC',
            'المستشعرات': 'معدل ضربات القلب، الأكسجين، تسارع، جيروسكوب، GPS',
            'مقاومة الماء': '50 متر',
            'عمر البطارية': 'حتى 18 ساعة',
            'نظام التشغيل': 'watchOS 10',
            'الضمان': 'سنة واحدة من Apple'
        }
    },
    4: {
        id: 4,
        name: 'قميص بولو كلاسيكي Ralph Lauren',
        category: 'clothes',
        categoryAr: 'ملابس رجالية',
        price: 85000,
        originalPrice: 85000,
        discount: 0,
        icon: '👕',
        rating: 4.7,
        reviews: 387,
        badge: '',
        stock: 'in-stock',
        stockCount: 120,
        description: 'قميص بولو كلاسيكي من Ralph Lauren، مصنوع من القطن الفاخر 100%. مريح وأنيق لجميع المناسبات.',
        longDescription: `
            <p>قميص بولو Ralph Lauren الأيقوني بقصة كلاسيكية مريحة. مصنوع من قطن بيكيه عالي الجودة يوفر راحة فائقة وأناقة دائمة.</p>
            
            <h3>المميزات:</h3>
            <ul>
                <li>قطن 100% عالي الجودة</li>
                <li>قصة كلاسيكية مريحة</li>
                <li>شعار البولو الأيقوني مطرز</li>
                <li>ياقة مضلعة مع إغلاق بأزرار</li>
                <li>متوفر بألوان متعددة</li>
            </ul>
        `,
        images: ['👕', '👕', '👕'],
        variants: {
            sizes: [
                { label: 'S', value: 's', available: true },
                { label: 'M', value: 'm', available: true },
                { label: 'L', value: 'l', available: true },
                { label: 'XL', value: 'xl', available: true },
                { label: 'XXL', value: 'xxl', available: true }
            ],
            colors: [
                { label: 'أبيض', value: 'white', hex: '#FFFFFF', available: true },
                { label: 'أسود', value: 'black', hex: '#000000', available: true },
                { label: 'أزرق كحلي', value: 'navy', hex: '#001F3F', available: true },
                { label: 'أحمر', value: 'red', hex: '#DC2626', available: true },
                { label: 'أخضر', value: 'green', hex: '#059669', available: false }
            ]
        },
        specifications: {
            'المادة': 'قطن بيكيه 100%',
            'القصة': 'كلاسيكية Regular Fit',
            'نوع الياقة': 'ياقة بولو مضلعة',
            'الإغلاق': 'زران',
            'العناية': 'غسيل آلي على درجة حرارة منخفضة',
            'بلد المنشأ': 'البرتغال'
        }
    }
};

// Mock reviews data
const REVIEWS_DATA = {
    breakdown: [
        { stars: 5, count: 320, percentage: 62 },
        { stars: 4, count: 140, percentage: 27 },
        { stars: 3, count: 35, percentage: 7 },
        { stars: 2, count: 15, percentage: 3 },
        { stars: 1, count: 5, percentage: 1 }
    ],
    reviews: [
        {
            author: 'أحمد محمد',
            rating: 5,
            date: '15 يناير 2026',
            verified: true,
            content: 'منتج ممتاز جداً! الجودة عالية والراحة استثنائية. أنصح به بشدة لكل من يبحث عن منتج موثوق وعملي. التوصيل كان سريع والتغليف ممتاز.',
            helpful: 45
        },
        {
            author: 'سارة علي',
            rating: 5,
            date: '12 يناير 2026',
            verified: true,
            content: 'تجربة رائعة من البداية للنهاية. المنتج فاق توقعاتي من حيث الجودة والمتانة. خدمة العملاء ممتازة ومتعاونة جداً.',
            helpful: 32
        },
        {
            author: 'خالد حسن',
            rating: 4,
            date: '8 يناير 2026',
            verified: true,
            content: 'منتج جيد جداً وبسعر مناسب. الوحيد ملاحظة صغيرة أن التوصيل تأخر يومين عن الموعد المحدد، لكن بشكل عام راضي جداً عن الشراء.',
            helpful: 18
        },
        {
            author: 'ليلى أحمد',
            rating: 5,
            date: '5 يناير 2026',
            verified: true,
            content: 'أفضل عملية شراء قمت بها هذا العام! الجودة فوق الممتازة والسعر منافس جداً. شكراً Naboo على الخدمة الرائعة.',
            helpful: 56
        }
    ]
};

// Get product ID from URL
function getProductId() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id')) || 1;
}

// Get current product
let currentProduct = null;
let selectedVariants = {};

// Cart management
let cart = JSON.parse(localStorage.getItem('naboo_cart') || '[]');

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems > 0) {
        cartCount.textContent = totalItems;
        cartCount.style.display = 'block';
    } else {
        cartCount.style.display = 'none';
    }
}

function addToCart(product, variants) {
    const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        icon: product.icon,
        category: product.categoryAr,
        variants: variants,
        quantity: 1
    };

    const existingIndex = cart.findIndex(item => 
        item.id === cartItem.id && 
        JSON.stringify(item.variants) === JSON.stringify(cartItem.variants)
    );

    if (existingIndex >= 0) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push(cartItem);
    }

    localStorage.setItem('naboo_cart', JSON.stringify(cart));
    updateCartCount();
    showToast('✓ تمت الإضافة للسلة بنجاح', 'success');
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');
    
    toastMessage.textContent = message;
    toastIcon.textContent = type === 'success' ? '✓' : '⚠';
    toast.style.borderRightColor = type === 'success' ? 'var(--success)' : 'var(--warning)';
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// Render product detail
function renderProductDetail() {
    const productId = getProductId();
    currentProduct = PRODUCTS_DATABASE[productId];
    
    if (!currentProduct) {
        window.location.href = 'products.html';
        return;
    }

    // Update breadcrumb
    document.getElementById('productBreadcrumb').textContent = currentProduct.name;

    // Calculate savings
    const savings = currentProduct.originalPrice - currentProduct.price;
    const savingsPercent = Math.round((savings / currentProduct.originalPrice) * 100);

    // Main product detail HTML
    const detailHTML = `
        <!-- Gallery -->
        <div class="product-gallery">
            <div class="product-gallery__thumbnails">
                ${currentProduct.images.map((img, index) => `
                    <div class="product-gallery__thumb ${index === 0 ? 'active' : ''}" onclick="changeMainImage(${index})">
                        <span style="font-size: 2.5rem;">${img}</span>
                    </div>
                `).join('')}
            </div>
            <div class="product-gallery__main">
                ${currentProduct.badge ? `<span class="product-badge">${currentProduct.badge}</span>` : ''}
                <div class="product-gallery__main-icon" id="mainImage">${currentProduct.icon}</div>
            </div>
        </div>

        <!-- Product Info -->
        <div class="product-info">
            <div class="product-category-label">${currentProduct.categoryAr}</div>
            <h1 class="product-title">${currentProduct.name}</h1>
            
            <div class="product-rating">
                <div class="product-rating__stars">${'★'.repeat(Math.floor(currentProduct.rating))}${'☆'.repeat(5 - Math.floor(currentProduct.rating))}</div>
                <div class="product-rating__count">${currentProduct.rating} من 5</div>
                <a href="#reviews" class="product-rating__link">${currentProduct.reviews} تقييم</a>
            </div>

            <div class="product-price">
                ${currentProduct.price.toLocaleString('ar-IQ')}
                <span class="product-price__currency">د.ع</span>
                ${currentProduct.discount > 0 ? `
                    <span class="product-price__original">${currentProduct.originalPrice.toLocaleString('ar-IQ')} د.ع</span>
                    <span class="product-price__save">وفّر ${savings.toLocaleString('ar-IQ')} د.ع (${savingsPercent}%)</span>
                ` : ''}
            </div>

            <div class="product-description">
                <p class="product-description__text">${currentProduct.description}</p>
            </div>

            ${renderVariants()}
        </div>

        <!-- Purchase Section -->
        <div class="purchase-section">
            ${renderStockStatus()}
            
            <div class="delivery-info">
                <div class="delivery-info__row">
                    <span class="delivery-info__label">📦 التوصيل</span>
                    <span class="delivery-info__value">2-3 أيام عمل</span>
                </div>
                <div class="delivery-info__row">
                    <span class="delivery-info__label">💰 رسوم الشحن</span>
                    <span class="delivery-info__value free">مجاني فوق 200,000 د.ع</span>
                </div>
                <div class="delivery-info__row">
                    <span class="delivery-info__label">↩️ الإرجاع</span>
                    <span class="delivery-info__value">مجاني خلال 14 يوم</span>
                </div>
            </div>

            <div class="quantity-selector">
                <span class="quantity-selector__label">الكمية:</span>
                <div class="quantity-selector__controls">
                    <button class="quantity-selector__btn" onclick="changeQuantity(-1)">-</button>
                    <input type="number" class="quantity-selector__input" id="quantity" value="1" min="1" max="${currentProduct.stockCount}" readonly>
                    <button class="quantity-selector__btn" onclick="changeQuantity(1)">+</button>
                </div>
            </div>

            <div class="action-buttons">
                <button class="btn btn-primary" onclick="handleAddToCart()">
                    <span>🛒</span>
                    <span>أضف إلى السلة</span>
                </button>
                <button class="btn btn-secondary" onclick="handleBuyNow()">
                    اشتر الآن
                </button>
            </div>

            <div style="display: flex; gap: 0.75rem; margin-bottom: 1.5rem;">
                <button class="btn btn-icon" onclick="toggleWishlist()" id="wishlistBtn" title="إضافة للمفضلة">
                    ❤️
                </button>
                <button class="btn btn-icon" onclick="shareProduct()" title="مشاركة">
                    🔗
                </button>
            </div>

            <div class="trust-badges">
                <div class="trust-badge">
                    <span class="trust-badge__icon">✓</span>
                    <span>ضمان الجودة</span>
                </div>
                <div class="trust-badge">
                    <span class="trust-badge__icon">🔒</span>
                    <span>دفع آمن</span>
                </div>
                <div class="trust-badge">
                    <span class="trust-badge__icon">🚚</span>
                    <span>توصيل سريع</span>
                </div>
                <div class="trust-badge">
                    <span class="trust-badge__icon">↩️</span>
                    <span>إرجاع مجاني</span>
                </div>
            </div>
        </div>
    `;

    document.getElementById('productDetail').innerHTML = detailHTML;

    // Render tabs content
    renderTabsContent();
    renderRelatedProducts();
}

function renderStockStatus() {
    if (currentProduct.stock === 'in-stock') {
        if (currentProduct.stockCount > 10) {
            return `
                <div class="stock-status">
                    <span class="stock-status__icon">✓</span>
                    <span class="stock-status__text">متوفر في المخزون (${currentProduct.stockCount} قطعة)</span>
                </div>
            `;
        } else {
            return `
                <div class="stock-status low">
                    <span class="stock-status__icon">⚠️</span>
                    <span class="stock-status__text">كمية محدودة! (${currentProduct.stockCount} قطعة فقط)</span>
                </div>
            `;
        }
    } else {
        return `
            <div class="stock-status out">
                <span class="stock-status__icon">✕</span>
                <span class="stock-status__text">غير متوفر حالياً</span>
            </div>
        `;
    }
}

function renderVariants() {
    if (!currentProduct.variants) return '';

    let html = '<div class="product-variants">';

    // Sizes
    if (currentProduct.variants.sizes) {
        html += `
            <div class="variant-group">
                <div class="variant-label">اختر المقاس:</div>
                <div class="variant-options">
                    ${currentProduct.variants.sizes.map(size => `
                        <button class="variant-option ${!size.available ? 'disabled' : ''}" 
                                onclick="selectVariant('size', '${size.value}')"
                                ${!size.available ? 'disabled' : ''}>
                            ${size.label}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Colors
    if (currentProduct.variants.colors) {
        html += `
            <div class="variant-group">
                <div class="variant-label">اختر اللون:</div>
                <div class="variant-options">
                    ${currentProduct.variants.colors.map(color => `
                        <div class="color-swatch ${!color.available ? 'disabled' : ''}" 
                             style="background-color: ${color.hex};"
                             onclick="selectVariant('color', '${color.value}')"
                             title="${color.label}">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Storage/Version
    if (currentProduct.variants.storage) {
        html += `
            <div class="variant-group">
                <div class="variant-label">اختر النوع:</div>
                <div class="variant-options">
                    ${currentProduct.variants.storage.map(storage => `
                        <button class="variant-option ${!storage.available ? 'disabled' : ''}" 
                                onclick="selectVariant('storage', '${storage.value}')"
                                ${!storage.available ? 'disabled' : ''}>
                            ${storage.label}
                            ${storage.priceExtra ? `<br><small>+${storage.priceExtra.toLocaleString('ar-IQ')} د.ع</small>` : ''}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    html += '</div>';
    return html;
}

function selectVariant(type, value) {
    selectedVariants[type] = value;
    
    // Update UI
    document.querySelectorAll(`.variant-option, .color-swatch`).forEach(el => {
        el.classList.remove('selected');
    });
    
    event.target.classList.add('selected');
}

function changeMainImage(index) {
    document.getElementById('mainImage').textContent = currentProduct.images[index];
    document.querySelectorAll('.product-gallery__thumb').forEach(thumb => {
        thumb.classList.remove('active');
    });
    document.querySelectorAll('.product-gallery__thumb')[index].classList.add('active');
}

let quantity = 1;

function changeQuantity(delta) {
    quantity = Math.max(1, Math.min(currentProduct.stockCount, quantity + delta));
    document.getElementById('quantity').value = quantity;
}

function handleAddToCart() {
    // Validate variant selection
    if (currentProduct.variants) {
        if (currentProduct.variants.sizes && !selectedVariants.size) {
            showToast('⚠ يرجى اختيار المقاس', 'warning');
            return;
        }
        if (currentProduct.variants.colors && !selectedVariants.color) {
            showToast('⚠ يرجى اختيار اللون', 'warning');
            return;
        }
    }

    for (let i = 0; i < quantity; i++) {
        addToCart(currentProduct, {...selectedVariants});
    }
}

function handleBuyNow() {
    handleAddToCart();
    setTimeout(() => {
        window.location.href = 'cart.html';
    }, 500);
}

let isInWishlist = false;

function toggleWishlist() {
    isInWishlist = !isInWishlist;
    const btn = document.getElementById('wishlistBtn');
    btn.classList.toggle('active');
    
    if (isInWishlist) {
        showToast('✓ تمت الإضافة للمفضلة', 'success');
    } else {
        showToast('تمت الإزالة من المفضلة', 'success');
    }
}

function shareProduct() {
    if (navigator.share) {
        navigator.share({
            title: currentProduct.name,
            text: currentProduct.description,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(window.location.href);
        showToast('✓ تم نسخ الرابط', 'success');
    }
}

// Tabs functionality
function renderTabsContent() {
    // Description tab
    document.getElementById('productDescriptionFull').innerHTML = currentProduct.longDescription;

    // Specifications tab
    if (currentProduct.specifications) {
        const specsHTML = `
            <table style="width: 100%; border-collapse: separate; border-spacing: 0;">
                ${Object.entries(currentProduct.specifications).map(([key, value], index) => `
                    <tr style="background: ${index % 2 === 0 ? 'var(--gray-50)' : 'white'};">
                        <td style="padding: 1rem 1.5rem; font-weight: 600; color: var(--text-primary); border-bottom: 1px solid var(--gray-200); width: 30%;">${key}</td>
                        <td style="padding: 1rem 1.5rem; color: var(--text-secondary); border-bottom: 1px solid var(--gray-200);">${value}</td>
                    </tr>
                `).join('')}
            </table>
        `;
        document.getElementById('productSpecs').innerHTML = specsHTML;
    }

    // Reviews tab
    renderReviews();
}

function renderReviews() {
    // Rating breakdown
    const breakdownHTML = REVIEWS_DATA.breakdown.map(item => `
        <div class="rating-breakdown__row">
            <div class="rating-breakdown__label">${item.stars} نجوم</div>
            <div class="rating-breakdown__bar">
                <div class="rating-breakdown__fill" style="width: ${item.percentage}%"></div>
            </div>
            <div class="rating-breakdown__count">${item.count}</div>
        </div>
    `).join('');
    document.getElementById('ratingBreakdown').innerHTML = breakdownHTML;

    // Individual reviews
    const reviewsHTML = REVIEWS_DATA.reviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <div class="review-avatar">${review.author.charAt(0)}</div>
                <div>
                    <div class="review-author">${review.author}</div>
                    <div class="review-date">${review.date}</div>
                </div>
                ${review.verified ? '<span class="review-verified">✓ عملية شراء موثقة</span>' : ''}
            </div>
            <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            <div class="review-content">${review.content}</div>
            <div style="display: flex; gap: 1rem; margin-top: 1rem; color: var(--text-tertiary); font-size: 0.9rem;">
                <button style="background: none; border: none; color: inherit; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;" onclick="likeReview()">
                    👍 مفيد (${review.helpful})
                </button>
                <button style="background: none; border: none; color: inherit; cursor: pointer;">
                    الإبلاغ
                </button>
            </div>
        </div>
    `).join('');
    document.getElementById('reviewsList').innerHTML = reviewsHTML;

    // Update review count
    document.getElementById('avgRating').textContent = currentProduct.rating;
    document.getElementById('avgStars').textContent = '★'.repeat(Math.floor(currentProduct.rating)) + '☆'.repeat(5 - Math.floor(currentProduct.rating));
    document.getElementById('reviewCount').textContent = `${currentProduct.reviews} تقييم`;
}

function renderRelatedProducts() {
    const relatedProducts = Object.values(PRODUCTS_DATABASE).filter(p => 
        p.id !== currentProduct.id && p.category === currentProduct.category
    ).slice(0, 4);

    const relatedHTML = relatedProducts.map(product => `
        <div style="background: white; border-radius: 1rem; padding: 1.5rem; border: 1px solid var(--gray-200); cursor: pointer; transition: all 0.3s ease;" onclick="window.location.href='product-detail.html?id=${product.id}'">
            <div style="font-size: 6rem; text-align: center; margin-bottom: 1rem;">${product.icon}</div>
            <div style="color: var(--gold-600); font-size: 0.85rem; margin-bottom: 0.5rem;">${product.categoryAr}</div>
            <h3 style="font-size: 1.1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.75rem;">${product.name}</h3>
            <div style="color: var(--gold-400); margin-bottom: 0.5rem;">${'★'.repeat(product.rating)}${'☆'.repeat(5-product.rating)}</div>
            <div style="font-size: 1.5rem; font-weight: 700; color: var(--text-primary);">
                ${product.price.toLocaleString('ar-IQ')} <span style="font-size: 0.9rem; color: var(--text-secondary);">د.ع</span>
            </div>
        </div>
    `).join('');

    document.getElementById('relatedGrid').innerHTML = relatedHTML;
}

// Tab switching
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab-button')) {
        const tabName = e.target.dataset.tab;
        
        // Update buttons
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');
        
        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');
        
        // Scroll to tabs
        document.querySelector('.product-tabs').scrollIntoView({ behavior: 'smooth' });
    }
});

function likeReview() {
    showToast('✓ شكراً على تقييمك', 'success');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderProductDetail();
});


// =====================================
// دوال للتحقق من حجم الشاشة
// =====================================

function getDeviceType() {
    const width = window.innerWidth;
    if (width <= 320) return 'xs-phone';
    if (width <= 375) return 'small-phone';
    if (width <= 425) return 'medium-phone';
    if (width <= 768) return 'large-phone';
    if (width <= 1024) return 'tablet';
    if (width <= 1280) return 'small-laptop';
    if (width <= 1440) return 'medium-laptop';
    if (width <= 1680) return 'large-laptop';
    if (width <= 1920) return 'full-hd';
    if (width <= 2560) return '2k';
    return '4k';
}

function isPhone() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function isLaptop() {
    return window.innerWidth > 1024 && window.innerWidth <= 1440;
}

function isDesktop() {
    return window.innerWidth > 1440;
}

function getOrientation() {
    return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
}

// =====================================
// تحسين أداء التمرير للهواتف
// =====================================
if (isPhone()) {
    // إيقاف التمرير عندما تكون القائمة مفتوحة
    document.addEventListener('touchmove', function(e) {
        if (document.body.classList.contains('menu-open')) {
            e.preventDefault();
        }
    }, { passive: false });
}

// =====================================
// تحسين حجم الخط بناءً على الشاشة
// =====================================
function adjustFontSize() {
    const device = getDeviceType();
    const orientation = getOrientation();
    
    let baseSize = 16;
    
    if (device === 'xs-phone') baseSize = 14;
    else if (device === 'small-phone') baseSize = 14.5;
    else if (device === 'medium-phone') baseSize = 15;
    else if (device === 'large-phone') baseSize = 15.5;
    else if (device === 'tablet' && orientation === 'landscape') baseSize = 16;
    else if (device === 'tablet') baseSize = 15.5;
    else if (device === 'small-laptop') baseSize = 16;
    else if (device === 'medium-laptop') baseSize = 16;
    else if (device === 'large-laptop') baseSize = 16;
    else if (device === 'full-hd') baseSize = 16;
    else if (device === '2k') baseSize = 18;
    else if (device === '4k') baseSize = 20;
    
    document.documentElement.style.fontSize = baseSize + 'px';
}

// استدعاء الدالة عند التحميل وعند تغيير حجم الشاشة
window.addEventListener('load', adjustFontSize);
window.addEventListener('resize', adjustFontSize);

// =====================================
// تحسين عرض الجداول على الشاشات الصغيرة
// =====================================
function optimizeTables() {
    document.querySelectorAll('table').forEach(table => {
        const parent = table.parentElement;
        if (window.innerWidth <= 768) {
            if (!parent.classList.contains('table-responsive')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'table-responsive';
                wrapper.style.overflowX = 'auto';
                wrapper.style.WebkitOverflowScrolling = 'touch';
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
        }
    });
}

window.addEventListener('load', optimizeTables);
window.addEventListener('resize', optimizeTables);

// =====================================
// تحسين عرض الصور
// =====================================
function optimizeImages() {
    document.querySelectorAll('img').forEach(img => {
        if (img.naturalWidth > window.innerWidth) {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
        }
    });
}

window.addEventListener('load', optimizeImages);
