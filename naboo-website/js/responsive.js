// =====================================
// responsive.js - تحسينات متقدمة للتجاوب مع جميع الأجهزة
// =====================================

// مدير الشاشات المتجاوبة الرئيسي
const ResponsiveManager = {
    // متغيرات الحالة
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    orientation: 'portrait',
    deviceType: 'desktop',
    screenWidth: 0,
    screenHeight: 0,
    
    // تهيئة المدير
    init() {
        this.checkScreenSize();
        this.checkOrientation();
        this.setupListeners();
        this.optimizeForDevice();
        this.setViewportMeta();
        this.detectDeviceCapabilities();
        console.log('ResponsiveManager initialized. Device:', this.deviceType);
    },
    
    // فحص حجم الشاشة
    checkScreenSize() {
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
        
        this.isMobile = this.screenWidth <= 768;
        this.isTablet = this.screenWidth > 768 && this.screenWidth <= 1024;
        this.isDesktop = this.screenWidth > 1024;
        
        // تحديد نوع الجهاز بدقة
        if (this.screenWidth <= 320) this.deviceType = 'xs-phone';
        else if (this.screenWidth <= 375) this.deviceType = 'small-phone';
        else if (this.screenWidth <= 425) this.deviceType = 'medium-phone';
        else if (this.screenWidth <= 768) this.deviceType = 'large-phone';
        else if (this.screenWidth <= 1024) this.deviceType = 'tablet';
        else if (this.screenWidth <= 1280) this.deviceType = 'small-laptop';
        else if (this.screenWidth <= 1440) this.deviceType = 'medium-laptop';
        else if (this.screenWidth <= 1680) this.deviceType = 'large-laptop';
        else if (this.screenWidth <= 1920) this.deviceType = 'full-hd';
        else if (this.screenWidth <= 2560) this.deviceType = '2k';
        else this.deviceType = '4k';
        
        // تحديث المتغيرات في CSS
        document.documentElement.style.setProperty('--viewport-width', this.screenWidth + 'px');
        document.documentElement.style.setProperty('--viewport-height', this.screenHeight + 'px');
        
        // إضافة كلاسات للـ body
        document.body.classList.toggle('mobile-device', this.isMobile);
        document.body.classList.toggle('tablet-device', this.isTablet);
        document.body.classList.toggle('desktop-device', this.isDesktop);
        document.body.classList.toggle('xs-phone', this.deviceType === 'xs-phone');
        document.body.classList.toggle('small-phone', this.deviceType === 'small-phone');
        document.body.classList.toggle('medium-phone', this.deviceType === 'medium-phone');
        document.body.classList.toggle('large-phone', this.deviceType === 'large-phone');
        document.body.classList.toggle('tablet', this.deviceType === 'tablet');
        document.body.classList.toggle('laptop', this.deviceType.includes('laptop'));
        document.body.classList.toggle('desktop', this.deviceType.includes('hd') || this.deviceType.includes('k'));
        
        return { 
            isMobile: this.isMobile, 
            isTablet: this.isTablet, 
            isDesktop: this.isDesktop,
            deviceType: this.deviceType,
            width: this.screenWidth,
            height: this.screenHeight
        };
    },
    
    // فحص اتجاه الشاشة
    checkOrientation() {
        this.orientation = this.screenHeight > this.screenWidth ? 'portrait' : 'landscape';
        document.body.classList.toggle('portrait', this.orientation === 'portrait');
        document.body.classList.toggle('landscape', this.orientation === 'landscape');
        return this.orientation;
    },
    
    // إعداد المستمعين
    setupListeners() {
        // مستمع تغيير الحجم مع تحسين الأداء
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.checkScreenSize();
                this.checkOrientation();
                this.optimizeForDevice();
                this.adjustFontSize();
                this.optimizeTables();
                this.handleViewportChange();
            }, 150);
        });
        
        // مستمع تغيير الاتجاه
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.checkOrientation();
                this.optimizeForDevice();
                this.handleOrientationChange();
            }, 100);
        });
        
        // مستمع التمرير لتحسين الأداء
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // مستمع لتحميل الصور
        window.addEventListener('load', () => {
            this.optimizeImages();
            this.adjustFontSize();
        });
    },
    
    // تحسينات للجهاز الحالي
    optimizeForDevice() {
        if (this.isMobile) {
            this.mobileOptimizations();
        } else if (this.isTablet) {
            this.tabletOptimizations();
        } else {
            this.desktopOptimizations();
        }
        
        // تحسينات عامة
        this.fix100vh();
        this.handleSafeArea();
    },
    
    // تحسينات للجوال
    mobileOptimizations() {
        // إضافة دعم السحب للقوائم
        this.enableSwipeForMenus();
        
        // تحسين حجم الخط
        document.querySelectorAll('p, span, a, h1, h2, h3, h4, h5, h6').forEach(el => {
            if (el.offsetWidth > this.screenWidth) {
                el.style.wordBreak = 'break-word';
                el.style.hyphens = 'auto';
            }
        });
        
        // إخفاء العناصر غير الضرورية
        document.querySelectorAll('.desktop-only').forEach(el => {
            el.style.display = 'none';
        });
        
        // إظهار العناصر المخصصة للجوال
        document.querySelectorAll('.mobile-only').forEach(el => {
            el.style.display = '';
        });
        
        // تحسين القوائم المنسدلة
        this.setupMobileDropdowns();
        
        // إضافة زر العودة للأعلى
        this.addBackToTop();
    },
    
    // تحسينات للتابلت
    tabletOptimizations() {
        // إظهار بعض العناصر المخفية
        document.querySelectorAll('.desktop-only').forEach(el => {
            if (el.dataset.tabletShow === 'true') {
                el.style.display = '';
            }
        });
        
        document.querySelectorAll('.mobile-only').forEach(el => {
            el.style.display = 'none';
        });
        
        // تحسين القوائم
        this.optimizeMenusForTablet();
        
        // ضبط أحجام الخطوط
        this.adjustFontSize();
    },
    
    // تحسينات لسطح المكتب
    desktopOptimizations() {
        // إظهار كل العناصر
        document.querySelectorAll('.desktop-only').forEach(el => {
            el.style.display = '';
        });
        
        document.querySelectorAll('.mobile-only').forEach(el => {
            el.style.display = 'none';
        });
        
        // تفعيل hover effects
        this.enableHoverEffects();
    },
    
    // إعداد meta viewport
    setViewportMeta() {
        let viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            viewport = document.createElement('meta');
            viewport.name = 'viewport';
            document.head.appendChild(viewport);
        }
        
        if (this.isMobile) {
            viewport.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=yes, viewport-fit=cover';
        } else {
            viewport.content = 'width=device-width, initial-scale=1, user-scalable=yes';
        }
    },
    
    // كشف إمكانيات الجهاز
    detectDeviceCapabilities() {
        const capabilities = {
            touch: 'ontouchstart' in window,
            pointer: window.matchMedia('(pointer: fine)').matches,
            hover: window.matchMedia('(hover: hover)').matches,
            retina: window.devicePixelRatio > 1
        };
        
        document.body.classList.toggle('touch-device', capabilities.touch);
        document.body.classList.toggle('mouse-device', !capabilities.touch);
        document.body.classList.toggle('retina-display', capabilities.retina);
        
        return capabilities;
    },
    
    // تفعيل السحب للقوائم
    enableSwipeForMenus() {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe(touchStartX, touchStartY, touchEndX, touchEndY);
        }, { passive: true });
    },
    
    // معالجة السحب
    handleSwipe(startX, startY, endX, endY) {
        const swipeThreshold = 50;
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // تحديد إذا كان السحب أفقياً أو عمودياً
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
            // سحب أفقي
            const drawer = document.getElementById('drawer');
            const overlay = document.getElementById('drawerOverlay');
            
            if (!drawer || !overlay) return;
            
            if (diffX > 0) {
                // سحب لليسار - إغلاق
                if (drawer.classList.contains('open')) {
                    drawer.classList.remove('open');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            } else {
                // سحب لليمين - فتح
                if (!drawer.classList.contains('open') && startX < 50) {
                    drawer.classList.add('open');
                    overlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }
        }
    },
    
    // إعداد القوائم المنسدلة للجوال
    setupMobileDropdowns() {
        document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
            trigger.removeEventListener('click', this.handleDropdownClick);
            trigger.addEventListener('click', this.handleDropdownClick);
        });
    },
    
    handleDropdownClick(e) {
        e.preventDefault();
        e.stopPropagation();
        const dropdown = this.nextElementSibling;
        if (dropdown) {
            dropdown.classList.toggle('open');
        }
    },
    
    // تحسين القوائم للتابلت
    optimizeMenusForTablet() {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && navLinks.children.length > 5) {
            // إضافة زر "المزيد" إذا كان هناك عناصر كثيرة
            this.addMoreButton(navLinks);
        }
    },
    
    // إضافة زر المزيد
    addMoreButton(navLinks) {
        // التحقق من وجود الزر بالفعل
        if (document.querySelector('.more-menu')) return;
        
        const moreButton = document.createElement('li');
        moreButton.className = 'nav-item more-menu';
        moreButton.innerHTML = `
            <a href="#" class="nav-link">
                <span>⋯</span>
                <span>المزيد</span>
            </a>
            <div class="dropdown-menu more-dropdown">
                ${Array.from(navLinks.children).slice(4).map(li => li.outerHTML).join('')}
            </div>
        `;
        
        // حذف العناصر الزائدة
        while (navLinks.children.length > 4) {
            navLinks.removeChild(navLinks.lastChild);
        }
        
        navLinks.appendChild(moreButton);
    },
    
    // تفعيل تأثيرات hover
    enableHoverEffects() {
        // إعادة تفعيل hover effects لسطح المكتب
    },
    
    // معالجة التمرير
    handleScroll() {
        const header = document.querySelector('.main-header');
        if (!header) return;
        
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // إخفاء/إظهار زر العودة للأعلى
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    },
    
    // إضافة زر العودة للأعلى
    addBackToTop() {
        if (document.querySelector('.back-to-top')) return;
        
        const backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '↑';
        backToTop.setAttribute('aria-label', 'العودة للأعلى');
        backToTop.onclick = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        
        document.body.appendChild(backToTop);
        
        // إضافة التنسيقات الأساسية
        const style = document.createElement('style');
        style.textContent = `
            .back-to-top {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: var(--gold-primary);
                color: white;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: var(--shadow-lg);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 1000;
            }
            
            .back-to-top.visible {
                opacity: 1;
                visibility: visible;
            }
            
            .back-to-top:hover {
                transform: translateY(-5px);
                box-shadow: var(--shadow-xl);
            }
            
            @media (max-width: 768px) {
                .back-to-top {
                    bottom: 1rem;
                    right: 1rem;
                    width: 40px;
                    height: 40px;
                    font-size: 1.2rem;
                }
            }
        `;
        document.head.appendChild(style);
    },
    
    // إصلاح مشكلة 100vh على الهواتف
    fix100vh() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    },
    
    // معالجة safe area للأجهزة الحديثة
    handleSafeArea() {
        if (this.isMobile) {
            document.body.style.paddingTop = 'env(safe-area-inset-top)';
            document.body.style.paddingBottom = 'env(safe-area-inset-bottom)';
            document.body.style.paddingLeft = 'env(safe-area-inset-left)';
            document.body.style.paddingRight = 'env(safe-area-inset-right)';
        }
    },
    
    // معالجة تغيير اتجاه الشاشة
    handleOrientationChange() {
        this.fix100vh();
        this.optimizeImages();
        this.optimizeTables();
        
        // إعادة حساب أحجام النوافذ المنبثقة
        document.querySelectorAll('.modal-container').forEach(modal => {
            if (this.isMobile) {
                modal.style.maxHeight = (this.screenHeight - 40) + 'px';
                modal.style.overflowY = 'auto';
            }
        });
    },
    
    // معالجة تغيير حجم الشاشة
    handleViewportChange() {
        this.fix100vh();
        this.adjustFontSize();
        this.optimizeTables();
        this.optimizeImages();
    },
    
    // ضبط حجم الخط
    adjustFontSize() {
        let baseSize = 16;
        
        if (this.deviceType === 'xs-phone') baseSize = 14;
        else if (this.deviceType === 'small-phone') baseSize = 14.5;
        else if (this.deviceType === 'medium-phone') baseSize = 15;
        else if (this.deviceType === 'large-phone') baseSize = 15.5;
        else if (this.deviceType === 'tablet' && this.orientation === 'landscape') baseSize = 16;
        else if (this.deviceType === 'tablet') baseSize = 15.5;
        else if (this.deviceType === 'small-laptop') baseSize = 16;
        else if (this.deviceType === 'medium-laptop') baseSize = 16;
        else if (this.deviceType === 'large-laptop') baseSize = 16;
        else if (this.deviceType === 'full-hd') baseSize = 16;
        else if (this.deviceType === '2k') baseSize = 18;
        else if (this.deviceType === '4k') baseSize = 20;
        
        document.documentElement.style.fontSize = baseSize + 'px';
    },
    
    // تحسين عرض الجداول
    optimizeTables() {
        document.querySelectorAll('table').forEach(table => {
            const parent = table.parentElement;
            
            if (table.offsetWidth > this.screenWidth) {
                if (!parent.classList.contains('table-responsive')) {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'table-responsive';
                    wrapper.style.overflowX = 'auto';
                    wrapper.style.WebkitOverflowScrolling = 'touch';
                    wrapper.style.borderRadius = '0.5rem';
                    wrapper.style.margin = '1rem 0';
                    
                    table.parentNode.insertBefore(wrapper, table);
                    wrapper.appendChild(table);
                    
                    // إضافة تلميح للتمرير
                    wrapper.setAttribute('data-hint', 'اسحب لرؤية المزيد ←');
                    
                    // إضافة تنسيقات للتلميح
                    const style = document.createElement('style');
                    style.textContent = `
                        .table-responsive[data-hint] {
                            position: relative;
                        }
                        .table-responsive[data-hint]::after {
                            content: attr(data-hint);
                            position: absolute;
                            top: 0.5rem;
                            left: 0.5rem;
                            background: rgba(0,0,0,0.7);
                            color: white;
                            padding: 0.25rem 0.75rem;
                            border-radius: 1rem;
                            font-size: 0.75rem;
                            pointer-events: none;
                            animation: hintPulse 2s infinite;
                        }
                        @keyframes hintPulse {
                            0%, 100% { opacity: 0.7; }
                            50% { opacity: 1; }
                        }
                        @media (min-width: 769px) {
                            .table-responsive[data-hint]::after {
                                display: none;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                    
                    // إخفاء التلميح بعد فترة
                    setTimeout(() => {
                        wrapper.removeAttribute('data-hint');
                    }, 5000);
                }
            }
        });
    },
    
    // تحسين عرض الصور
    optimizeImages() {
        document.querySelectorAll('img').forEach(img => {
            if (img.naturalWidth > this.screenWidth) {
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
            }
            
            // تحميل الصور بتأخير للهواتف
            if (this.isMobile && img.loading !== 'lazy') {
                img.loading = 'lazy';
            }
        });
    }
};

// =====================================
// مدير القوائم المتجاوبة
// =====================================
const ResponsiveMenu = {
    init() {
        this.setupMobileMenu();
        this.setupDropdowns();
        this.setupHamburgerMenu();
    },
    
    setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                mobileMenu.classList.toggle('open');
                document.body.classList.toggle('menu-open');
            });
        }
    },
    
    setupDropdowns() {
        document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
            if (ResponsiveManager.isMobile || ResponsiveManager.isTablet) {
                trigger.removeEventListener('click', ResponsiveManager.handleDropdownClick);
                trigger.addEventListener('click', ResponsiveManager.handleDropdownClick);
            }
        });
    },
    
    setupHamburgerMenu() {
        const hamburger = document.getElementById('hamburger');
        const drawer = document.getElementById('drawer');
        const overlay = document.getElementById('drawerOverlay');
        
        if (hamburger && drawer && overlay) {
            hamburger.addEventListener('click', () => {
                drawer.classList.toggle('open');
                overlay.classList.toggle('active');
                hamburger.classList.toggle('active');
                document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
            });
            
            overlay.addEventListener('click', () => {
                drawer.classList.remove('open');
                overlay.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    }
};

// =====================================
// مدير النوافذ المنبثقة المتجاوبة
// =====================================
const ResponsiveModals = {
    init() {
        this.adjustModals();
        window.addEventListener('resize', () => this.adjustModals());
    },
    
    adjustModals() {
        document.querySelectorAll('.modal-container').forEach(modal => {
            if (ResponsiveManager.isMobile) {
                modal.style.maxHeight = (window.innerHeight - 40) + 'px';
                modal.style.overflowY = 'auto';
                modal.style.width = '95%';
                modal.style.padding = '1.5rem';
            } else if (ResponsiveManager.isTablet) {
                modal.style.maxHeight = '85vh';
                modal.style.width = '90%';
            } else {
                modal.style.maxHeight = '90vh';
                modal.style.width = 'auto';
            }
        });
    },
    
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.adjustModals();
        }
    },
    
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
};

// =====================================
// دوال مساعدة للتجاوب
// =====================================

// دوال للتحقق من حجم الشاشة
function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function isDesktop() {
    return window.innerWidth > 1024;
}

function isLandscape() {
    return window.innerHeight < window.innerWidth;
}

function isPortrait() {
    return window.innerHeight > window.innerWidth;
}

function getDeviceType() {
    return ResponsiveManager.deviceType;
}

// دوال للتحكم في النوافذ المنبثقة
function openModal(modalId) {
    ResponsiveModals.openModal(modalId);
}

function closeModal(modalId) {
    ResponsiveModals.closeModal(modalId);
}

// دوال للتحكم في القائمة الجانبية
function toggleDrawer() {
    const drawer = document.getElementById('drawer');
    const overlay = document.getElementById('drawerOverlay');
    const hamburger = document.getElementById('hamburger');
    
    if (drawer && overlay && hamburger) {
        drawer.classList.toggle('open');
        overlay.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
    }
}

function closeDrawer() {
    const drawer = document.getElementById('drawer');
    const overlay = document.getElementById('drawerOverlay');
    const hamburger = document.getElementById('hamburger');
    
    if (drawer && overlay && hamburger) {
        drawer.classList.remove('open');
        overlay.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// =====================================
// تهيئة جميع المديرين
// =====================================
document.addEventListener('DOMContentLoaded', () => {
    ResponsiveManager.init();
    ResponsiveMenu.init();
    ResponsiveModals.init();
    
    // إضافة مستمع لإغلاق القوائم عند النقر خارجها
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-trigger') && !e.target.closest('.dropdown-menu')) {
            document.querySelectorAll('.dropdown-menu.open').forEach(menu => {
                menu.classList.remove('open');
            });
        }
    });
    
    // منع التمرير عندما تكون القائمة مفتوحة على الهواتف
    if (isMobile()) {
        document.addEventListener('touchmove', (e) => {
            if (document.body.classList.contains('menu-open')) {
                e.preventDefault();
            }
        }, { passive: false });
    }
});

// تصدير الدوال للاستخدام العام
window.ResponsiveManager = ResponsiveManager;
window.ResponsiveMenu = ResponsiveMenu;
window.ResponsiveModals = ResponsiveModals;
window.isMobile = isMobile;
window.isTablet = isTablet;
window.isDesktop = isDesktop;
window.isLandscape = isLandscape;
window.isPortrait = isPortrait;
window.getDeviceType = getDeviceType;
window.openModal = openModal;
window.closeModal = closeModal;
window.toggleDrawer = toggleDrawer;
window.closeDrawer = closeDrawer;