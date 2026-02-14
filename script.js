// Menu Navigation
document.addEventListener('DOMContentLoaded', function() {
    const menuNavItems = document.querySelectorAll('.menu-nav-item');

    menuNavItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            menuNavItems.forEach(navItem => navItem.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });

    // Delivery Tabs
    const deliveryTabs = document.querySelectorAll('.delivery-tab');
    const deliveryText = document.getElementById('delivery-text');
    const pickupText = document.getElementById('pickup-text');

    deliveryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            deliveryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            if (this.textContent.trim().includes('Самовывоз')) {
                deliveryText.style.display = 'none';
                pickupText.style.display = 'flex';
            } else {
                deliveryText.style.display = 'flex';
                pickupText.style.display = 'none';
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header background on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
        }
    });

    // Animate menu cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.menu-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Product Modal
    const modal = document.getElementById('productModal');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalPrice = document.getElementById('modalPrice');
    const extraCheckboxes = document.querySelectorAll('.extra-item input');

    let basePrice = 0;

    function openModal(card) {
        const img = card.querySelector('.menu-card-image img');
        const title = card.querySelector('.menu-card-title').textContent;
        const description = card.querySelector('.menu-card-description').textContent;
        const priceText = card.querySelector('.menu-card-price span').textContent;
        basePrice = parseInt(priceText.replace(/\D/g, ''));

        modalImage.src = img.src;
        modalImage.alt = title;
        modalTitle.textContent = title.toUpperCase();
        modalDescription.textContent = description;

        // Reset extras
        extraCheckboxes.forEach(cb => cb.checked = false);
        updateModalPrice();

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateModalPrice() {
        let total = basePrice;
        extraCheckboxes.forEach(cb => {
            if (cb.checked) {
                total += parseInt(cb.dataset.price);
            }
        });
        modalPrice.textContent = total + ' ₽';
    }

    // Click on menu cards
    document.querySelectorAll('.menu-card').forEach(card => {
        card.addEventListener('click', function(e) {
            openModal(this);
        });
    });

    // Close modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Update price on extras change
    extraCheckboxes.forEach(cb => {
        cb.addEventListener('change', updateModalPrice);
    });
});
