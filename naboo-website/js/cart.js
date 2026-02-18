/**
 * Cart Page - Advanced Shopping Cart
 */

// Cart management
let cart = JSON.parse(localStorage.getItem('naboo_cart') || '[]');

const FREE_SHIPPING_THRESHOLD = 200000;
const SHIPPING_COST = 15000;

// Recommended products (mock data)
const RECOMMENDED_PRODUCTS = [
    { id: 5, name: 'سماعات لاسلكية', category: 'electronics', categoryAr: 'إلكترونيات', price: 150000, icon: '🎧', rating: 4, reviews: 276 },
    { id: 6, name: 'نظارة شمسية عصرية', category: 'accessories', categoryAr: 'إكسسوارات', price: 65000, icon: '🕶️', rating: 5, reviews: 158 },
    { id: 7, name: 'حقيبة لابتوب احترافية', category: 'bags', categoryAr: 'حقائب', price: 180000, icon: '💼', rating: 5, reviews: 423 },
    { id: 8, name: 'حقيبة ظهر رياضية', category: 'bags', categoryAr: 'حقائب', price: 95000, icon: '🎒', rating: 4, reviews: 194 }
];

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

function calculateSubtotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function calculateShipping(subtotal) {
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}

function calculateTotal(subtotal, shipping) {
    return subtotal + shipping;
}

function renderCart() {
    const cartContent = document.getElementById('cartContent');
    const emptyCart = document.getElementById('emptyCart');
    const recommendedSection = document.getElementById('recommendedSection');

    if (cart.length === 0) {
        cartContent.style.display = 'none';
        emptyCart.style.display = 'block';
        recommendedSection.style.display = 'none';
        return;
    }

    cartContent.style.display = 'block';
    emptyCart.style.display = 'none';
    recommendedSection.style.display = 'block';

    const subtotal = calculateSubtotal();
    const shipping = calculateShipping(subtotal);
    const total = calculateTotal(subtotal, shipping);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const savingsNeeded = FREE_SHIPPING_THRESHOLD - subtotal;

    const cartHTML = `
        <div class="cart-container">
            <!-- Cart Items -->
            <div class="cart-items">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <h1 style="font-size: 2rem; font-weight: 700; color: var(--text-primary);">
                        سلة المشتريات (${totalItems} ${totalItems === 1 ? 'منتج' : 'منتج'})
                    </h1>
                    <button onclick="clearCart()" style="color: var(--error); background: none; border: none; cursor: pointer; font-size: 1rem; text-decoration: underline; font-weight: 600;">
                        تفريغ السلة
                    </button>
                </div>

                ${shipping > 0 && savingsNeeded > 0 ? `
                    <div style="background: var(--info-light); padding: 1.25rem 1.5rem; border-radius: 0.75rem; margin-bottom: 1.5rem; border-right: 4px solid var(--info);">
                        <div style="display: flex; align-items: center; gap: 0.75rem; color: var(--info); font-weight: 600; margin-bottom: 0.5rem;">
                            <span style="font-size: 1.25rem;">🚚</span>
                            <span>أضف ${savingsNeeded.toLocaleString('ar-IQ')} د.ع واحصل على شحن مجاني!</span>
                        </div>
                        <div style="background: white; height: 8px; border-radius: 999px; overflow: hidden; margin-top: 0.75rem;">
                            <div style="background: var(--info); height: 100%; width: ${(subtotal / FREE_SHIPPING_THRESHOLD * 100)}%; transition: width 0.3s ease;"></div>
                        </div>
                    </div>
                ` : shipping === 0 ? `
                    <div style="background: var(--success-light); padding: 1.25rem 1.5rem; border-radius: 0.75rem; margin-bottom: 1.5rem; border-right: 4px solid var(--success);">
                        <div style="display: flex; align-items: center; gap: 0.75rem; color: var(--success); font-weight: 600;">
                            <span style="font-size: 1.25rem;">✓</span>
                            <span>مبروك! حصلت على شحن مجاني</span>
                        </div>
                    </div>
                ` : ''}

                ${cart.map(item => renderCartItem(item)).join('')}
            </div>

            <!-- Order Summary -->
            <div class="cart-summary">
                <h2 class="cart-summary__title">ملخص الطلب</h2>
                
                <div style="margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--gray-200);">
                    <div class="cart-summary__row">
                        <span>المجموع الفرعي (${totalItems} منتج)</span>
                        <span class="cart-summary__value">${subtotal.toLocaleString('ar-IQ')} د.ع</span>
                    </div>
                    <div class="cart-summary__row">
                        <span>الشحن</span>
                        <span class="cart-summary__value ${shipping === 0 ? 'free' : ''}">
                            ${shipping === 0 ? 'مجاني' : shipping.toLocaleString('ar-IQ') + ' د.ع'}
                        </span>
                    </div>
                    ${shipping === 0 ? `
                        <div class="cart-summary__row" style="color: var(--success); font-size: 0.9rem; padding-top: 0.5rem;">
                            <span>✓ وفرت</span>
                            <span style="font-weight: 600;">${SHIPPING_COST.toLocaleString('ar-IQ')} د.ع</span>
                        </div>
                    ` : ''}
                </div>

                <div class="cart-summary__row total">
                    <span>المجموع الكلي</span>
                    <span class="cart-summary__value total">${total.toLocaleString('ar-IQ')} د.ع</span>
                </div>

                <button onclick="checkout()" class="btn btn-primary" style="width: 100%; justify-content: center; margin-top: 1.5rem; margin-bottom: 1rem; padding: 1.1rem;">
                    <span>🛍️</span>
                    <span>إتمام الشراء</span>
                </button>

                <a href="products.html" class="btn btn-secondary" style="width: 100%; justify-content: center; text-decoration: none;">
                    متابعة التسوق
                </a>

                <div style="margin-top: 2rem; padding: 1.5rem; background: var(--gray-50); border-radius: 0.75rem;">
                    <h3 style="font-size: 1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 1rem;">طرق الدفع المتاحة</h3>
                    <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                        <span style="padding: 0.5rem 1rem; background: white; border-radius: 0.5rem; font-size: 0.85rem; border: 1px solid var(--gray-300);">💵 نقداً</span>
                        <span style="padding: 0.5rem 1rem; background: white; border-radius: 0.5rem; font-size: 0.85rem; border: 1px solid var(--gray-300);">💳 بطاقة</span>
                        <span style="padding: 0.5rem 1rem; background: white; border-radius: 0.5rem; font-size: 0.85rem; border: 1px solid var(--gray-300);">📱 محفظة</span>
                        <span style="padding: 0.5rem 1rem; background: white; border-radius: 0.5rem; font-size: 0.85rem; border: 1px solid var(--gray-300);">🔢 تقسيط</span>
                    </div>
                </div>

                <div style="margin-top: 1.5rem; padding: 1.25rem; background: var(--gold-50); border-radius: 0.75rem; border: 1px solid var(--gold-200);">
                    <div style="display: flex; align-items: start; gap: 0.75rem;">
                        <span style="font-size: 1.5rem;">🏆</span>
                        <div>
                            <h4 style="font-weight: 600; color: var(--gold-600); margin-bottom: 0.25rem;">ضمان Naboo</h4>
                            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
                                منتجات أصلية 100%، إرجاع مجاني، وخدمة عملاء متميزة
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    cartContent.innerHTML = cartHTML;
    renderRecommendedProducts();
}

function renderCartItem(item) {
    const variantsText = item.variants ? 
        Object.entries(item.variants).map(([key, value]) => {
            const labels = {
                'size': 'المقاس',
                'color': 'اللون',
                'storage': 'النوع'
            };
            return `${labels[key] || key}: ${value}`;
        }).join(' • ') : '';

    return `
        <div class="cart-item">
            <div class="cart-item__image">${item.icon}</div>
            
            <div class="cart-item__details">
                <h3 class="cart-item__title">${item.name}</h3>
                <div class="cart-item__category">${item.category}</div>
                ${variantsText ? `
                    <div style="font-size: 0.85rem; color: var(--text-tertiary); margin-top: 0.5rem;">
                        ${variantsText}
                    </div>
                ` : ''}
                <div class="cart-item__price">${item.price.toLocaleString('ar-IQ')} د.ع</div>
            </div>

            <div class="cart-item__actions">
                <div style="display: flex; align-items: center; gap: 0.75rem; background: var(--gray-100); border-radius: 2rem; padding: 0.5rem; border: 1px solid var(--gray-300);">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1}, '${JSON.stringify(item.variants || {}).replace(/"/g, '&quot;')}')" 
                            style="width: 32px; height: 32px; border: none; background: var(--gold-400); color: white; border-radius: 50%; cursor: pointer; font-size: 1.1rem; font-weight: 700; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease;"
                            onmouseover="this.style.background='var(--gold-500)'"
                            onmouseout="this.style.background='var(--gold-400)'">
                        -
                    </button>
                    <span style="font-size: 1rem; font-weight: 600; min-width: 30px; text-align: center;">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1}, '${JSON.stringify(item.variants || {}).replace(/"/g, '&quot;')}')" 
                            style="width: 32px; height: 32px; border: none; background: var(--gold-400); color: white; border-radius: 50%; cursor: pointer; font-size: 1.1rem; font-weight: 700; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease;"
                            onmouseover="this.style.background='var(--gold-500)'"
                            onmouseout="this.style.background='var(--gold-400)'">
                        +
                    </button>
                </div>
                <button onclick="removeItem(${item.id}, '${JSON.stringify(item.variants || {}).replace(/"/g, '&quot;')}')" 
                        style="color: var(--error); background: none; border: none; cursor: pointer; font-size: 0.9rem; text-decoration: underline; font-weight: 500; padding: 0.5rem 0;">
                    حذف
                </button>
            </div>
        </div>
    `;
}

function updateQuantity(itemId, newQuantity, variantsStr) {
    if (newQuantity < 1) {
        removeItem(itemId, variantsStr);
        return;
    }

    const variants = variantsStr ? JSON.parse(variantsStr.replace(/&quot;/g, '"')) : {};
    
    const itemIndex = cart.findIndex(item => 
        item.id === itemId && 
        JSON.stringify(item.variants || {}) === JSON.stringify(variants)
    );

    if (itemIndex >= 0) {
        cart[itemIndex].quantity = Math.min(newQuantity, 99); // Max 99 items
        localStorage.setItem('naboo_cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
    }
}

function removeItem(itemId, variantsStr) {
    const variants = variantsStr ? JSON.parse(variantsStr.replace(/&quot;/g, '"')) : {};
    
    cart = cart.filter(item => !(
        item.id === itemId && 
        JSON.stringify(item.variants || {}) === JSON.stringify(variants)
    ));

    localStorage.setItem('naboo_cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
    showToast('✓ تم حذف المنتج من السلة', 'success');
}

function clearCart() {
    if (cart.length === 0) return;
    
    if (confirm('هل أنت متأكد من تفريغ السلة؟')) {
        cart = [];
        localStorage.setItem('naboo_cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
        showToast('✓ تم تفريغ السلة بنجاح', 'success');
    }
}

function checkout() {
    // Check if user is logged in
    const user = localStorage.getItem('naboo_user');
    
    if (!user) {
        showToast('⚠ يرجى تسجيل الدخول أولاً', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html?return=cart.html';
        }, 1500);
        return;
    }

    // Simulate checkout process
    showToast('✓ جاري معالجة طلبك...', 'success');
    
    setTimeout(() => {
        // Here you would typically redirect to checkout page
        // For now, we'll just show success and clear cart
        alert('شكراً لك! تم استلام طلبك بنجاح.\n\nرقم الطلب: ORD-' + Date.now() + '\n\nسيتم التواصل معك قريباً لتأكيد الطلب.');
        cart = [];
        localStorage.setItem('naboo_cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
    }, 1500);
}

function renderRecommendedProducts() {
    const recommendedHTML = RECOMMENDED_PRODUCTS.map(product => `
        <div style="background: white; border-radius: 1rem; padding: 1.5rem; border: 1px solid var(--gray-200); cursor: pointer; transition: all 0.3s ease; position: relative;" 
             onclick="window.location.href='product-detail.html?id=${product.id}'"
             onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='var(--shadow-lg)'"
             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow=''">
            <div style="font-size: 6rem; text-align: center; margin-bottom: 1rem;">${product.icon}</div>
            <div style="color: var(--gold-600); font-size: 0.85rem; margin-bottom: 0.5rem; font-weight: 600;">${product.categoryAr}</div>
            <h3 style="font-size: 1.1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.75rem; min-height: 2.5rem;">${product.name}</h3>
            <div style="color: var(--gold-400); margin-bottom: 0.75rem; font-size: 0.95rem;">
                ${'★'.repeat(product.rating)}${'☆'.repeat(5-product.rating)}
                <span style="color: var(--text-tertiary); font-size: 0.85rem; margin-right: 0.5rem;">(${product.reviews})</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                <div style="font-size: 1.4rem; font-weight: 700; color: var(--text-primary);">
                    ${product.price.toLocaleString('ar-IQ')} 
                    <span style="font-size: 0.8rem; color: var(--text-secondary);">د.ع</span>
                </div>
                <button onclick="event.stopPropagation(); addRecommendedToCart(${product.id})" 
                        class="btn btn-primary" 
                        style="padding: 0.6rem 1.25rem; font-size: 0.9rem;">
                    أضف للسلة
                </button>
            </div>
        </div>
    `).join('');

    document.getElementById('recommendedGrid').innerHTML = recommendedHTML;
}

function addRecommendedToCart(productId) {
    const product = RECOMMENDED_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        icon: product.icon,
        category: product.categoryAr,
        quantity: 1,
        variants: {}
    };

    const existingIndex = cart.findIndex(item => item.id === cartItem.id);

    if (existingIndex >= 0) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push(cartItem);
    }

    localStorage.setItem('naboo_cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
    showToast('✓ تمت إضافة المنتج للسلة', 'success');
}

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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();
});