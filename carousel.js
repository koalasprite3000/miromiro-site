window.addEventListener('load', () => {
    // Initialize Basket
    updateBasketUI();

    // Scroll - Target the content area that actually has the scrollbar
    const contentArea = document.querySelector('.content-area');

    // Listen for scroll wheels anywhere in the browser window
    window.addEventListener('wheel', (event) => {
        const shopModal = document.querySelector('.shop-window');
        const journalModal = document.querySelector('.journal-container');
        const isInsideShop = event.composedPath().includes(shopModal);
        const isInsideJournal= event.composedPath().includes(journalModal);

        // Check if the mouse is NOT over the content area
        // (If it IS over, the browser handles it automatically)
        if (!event.composedPath().includes(contentArea) && !isInsideShop && !isInsideJournal) {
            // Manually scroll the content area by the 'deltaY' (vertical scroll amount)
            contentArea.scrollTop += event.deltaY;
            
            // Prevent the main page from trying to scroll (stops "bounce" effects)
            event.preventDefault();
        }
    }, { passive: false });

    // Add touch support for mobile "dead zones"
    window.addEventListener('touchmove', (event) => {
        if (!event.composedPath().includes(contentArea)) {
            // Basic touch logic is more complex, but this 
            // ensures the content area still receives the gesture.
            contentArea.scrollTop += event.touches[0].clientY;
        }
    }, { passive: true });

    carouselmodal();

    journalmodal();

    shopmodal();

    //Close drop downmenu on clicking outside the book
    window.addEventListener('click', (e) => {
        const container = document.querySelector('.header-left');
        const checkbox = document.querySelector('.menu-checkbox');

        // If the click is NOT inside the header-left container at all
        if (!container.contains(e.target)) {
            checkbox.checked = false;
        }
    });
});



function carouselmodal(){

    const basketexists = document.getElementById('basket-items-list');
    if (basketexists) return; //If the basket exist (e.g., your on basket.html), stop

    // carousel animations to only fire for desktop
    const isMobile = window.innerWidth <= 768;
    const carousel = document.querySelector('.product-carousel');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    const scrollAmount = 100; // Define how far one click should scroll
    let touchRestartTimeout;

    // --- AUTO SCROLL LOGIC ---
    let autoScrollInterval;
    const scrollSpeed = 1000; // 1 second per slide

    const startAutoScroll = () => {
        if (isMobile) return;
        clearInterval(autoScrollInterval);

        autoScrollInterval = setInterval(() => {
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            
            // If we've reached the end, snap back to the start
            if (carousel.scrollLeft >= maxScroll - 10) {
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }, scrollSpeed);
    };

    const stopAutoScroll = () => {
        clearInterval(autoScrollInterval);
    };

    // Start auto-scrolling on load
    startAutoScroll();

    // Pause when the user hovers/touch (so they can select a pair!)
    const selectPairSection = document.getElementById('select-pair-section');
    selectPairSection.addEventListener('mouseenter', stopAutoScroll);
    selectPairSection.addEventListener('mouseleave', startAutoScroll);
    selectPairSection.addEventListener('touchstart', stopAutoScroll, {passive: true});
    selectPairSection.addEventListener('touchend', () => {
        clearTimeout(touchRestartTimeout);
        touchRestartTimeout = setTimeout(startAutoScroll, 2000);//wait 2 seconds after the user stops touching before restarting
    }, {passive: true});

    // Next Button Click
    let isTransitioning = false;
    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        stopAutoScroll(); // Stop completely
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth' // Smooth sliding animation
        });
        setTimeout(() => {
            isTransitioning = false;
        }, 500); // Matches CSS transition time
    });

    // Previous Button Click
    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        stopAutoScroll(); // Stop completely 
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
        setTimeout(() => {
            isTransitioning = false;
        }, 500); // Matches CSS transition time
    });
    
    // Auto-hide buttons at the start/end of the scroll
    carousel.addEventListener('scroll', () => {
        const scrollLeft = carousel.scrollLeft;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;

        // If at the very beginning, fade the prev button slightly
        prevBtn.style.opacity = scrollLeft <= 0 ? "0.3" : "1";
        
        // If at the very end, fade the next button slightly - add 10 pixel buffer to maxscroll to ensure button fades
        nextBtn.style.opacity = scrollLeft >= (maxScroll - 10) ? "0.3" : "1";
        nextBtn.style.pointerEvents = scrollLeft >= (maxScroll - 10) ? "none" : "auto";
    });
}

function journalmodal(){
    const basketexists = document.getElementById('basket-items-list');
    if (basketexists) return; //If the basket exist (e.g., your on basket.html), stop

    // Journal animations to only fire for desktop
    const modal = document.getElementById('journal-modal');
    const closeBtn = document.querySelector('.journal-close');
    const polaroids = document.querySelectorAll('.polaroid');

    // Data for journal/blog entries
    const journalData = {
        p1: {
            title: "3 Cute Outfit Ideas to Style Your MiroMiro Sneakers 💖 <br>BLUE_MIST_VIBES.txt",
            text: `
            <p>
            The <strong>Y2K aesthetic</strong> is all about making a statement, and nothing says "iconic" like chunky, dark silhouettes. These <strong>cute shoes</strong> draw heavy inspiration from <strong>Korean styles</strong>, where oversized sneakers meet feminine, structured layers for a perfectly balanced look.
            </p>

            <p>
            In this fit, the deep black sneakers provide a solid foundation for a pleated skirt and leg-warmer combo—a staple in modern <strong>Korean fashion</strong>. By mixing high-contrast tones with retro textures, you create an outfit that feels both nostalgic and futuristic. These sneakers aren't just footwear; they are the centerpiece of your street-style rotation.
            </p>

            <p>
            At <strong>MiroMiro</strong>, we prioritize the "Soft Girl" meets "Cyber" vibe, ensuring our shoes offer the platform height you want with the comfort your daily life demands.
            </p>

            <p>
            For more outfit inspiration, check out 
            <a href="https://www.pinterest.com/" target="_blank">Pinterest</a>.
            </p>

            <div class="journal-socials">
            <strong>Follow us:</strong><br>
            <a href="https://www.tiktok.com/@miromiroshoes" target="_blank">TikTok</a>
            </div>
            `,
            img: "images/outfit1-img.png",
            img1: "images/shoe3-img.png"
        },
        p2: {
            title: "3 Cute Outfit Ideas to Style Your MiroMiro Sneakers 💖 <br>PINK_CORE_LOG.txt",
            text: `
            <p>
            Step into a lighter side of the <strong>Y2K aesthetic</strong> with clean whites and metallic accents. This look highlights how <strong>cute shoes</strong> can soften a streetwear silhouette, blending <strong>Korean styles</strong> with a dreamy, coquette-inspired color palette that works for any season.
            </p>

            <p>
            The star details on these sneakers pop against denim or light-wash cargos, embodying the playful spirit of early 2000s fashion. <strong>Korean fashion</strong> often utilizes light-colored, chunky footwear to elongate the legs while keeping the overall vibe effortless and airy. Whether you're heading to a café or a photoshoot, these shoes keep the energy high.
            </p>

            <p>
            At <strong>MiroMiro</strong>, we design with the Gen Z trendsetter in mind—crafting aesthetic footwear that bridges the gap between casual comfort and high-fashion "it-girl" moments.
            </p>

            <p>
            For more outfit inspiration, check out 
            <a href="https://www.pinterest.com/" target="_blank">Pinterest</a>.
            </p>

            <div class="journal-socials">
            <strong>Follow us:</strong><br>
            <a href="https://www.tiktok.com/@miromiroshoes" target="_blank">TikTok</a>
            </div>
            `,
            img: "images/outfit2-img.png",
            img1: "images/shoe6-img.png"
        },
        p3: {
            title: "3 Cute Outfit Ideas to Style Your MiroMiro Sneakers 💖 <br>URBAN_FAIRY.txt",
            text: `
            <p>
            The return of <strong>Y2K aesthetic</strong> fashion is redefining everyday style — and nothing completes the look better than the right pair of <strong>cute shoes</strong>. Inspired by <strong>Korean styles</strong>, this outfit blends minimal structure with playful streetwear energy.
            </p>

            <p>
            The bold red sneakers add contrast to a neutral skirt, creating a balanced and eye-catching silhouette. This is a key element of Korean fashion—mixing simplicity with statement pieces. These <strong>cute shoes</strong> are designed to elevate even the most minimal outfit.
            </p>

            <p>
            At <strong>MiroMiro</strong>, we create footwear that fits seamlessly into your aesthetic—whether you're into soft girl vibes, streetwear, or casual Y2K looks.
            </p>

            <p>
            For more outfit inspiration, check out 
            <a href="https://www.pinterest.com/" target="_blank">Pinterest</a>.
            </p>

            <div class="journal-socials">
            <strong>Follow us:</strong><br>
            <a href="https://www.tiktok.com/@miromiroshoes" target="_blank">TikTok</a>
            </div>
            `,
            img: "images/outfit3-img.png",
            img1: "images/shoe5-img.png"
        }
    };

    // Open Modal logic
    polaroids.forEach(p => {
        p.addEventListener('click', () => {
            // Find which polaroid was clicked (p1, p2, or p3 class)
            const id = Array.from(p.classList).find(c => journalData[c]);
            const data = journalData[id];

            if (data) {
                document.getElementById('journal-title').innerHTML = data.title;
                document.getElementById('journal-text').innerHTML = data.text;
                document.getElementById('journal-img').src = data.img;
                document.getElementById('journal-img1').src = data.img1;
                
                modal.style.display = 'flex';
                // Prevent background scrolling when open
                document.body.style.overflow = 'hidden'; 
            }
        });
    });

    // Close Modal logic
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close on clicking outside the book
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

function shopmodal(){
    const basketexists = document.getElementById('basket-items-list');
    if (basketexists) return; //If the basket exist (e.g., your on basket.html), stop

    //Opening shopping modal
    const shopModal = document.getElementById('shop-modal');
    const detailView = document.getElementById('product-detail-view');
    const backBtn = document.querySelector('.detail-back-btn');
    
    // Select BOTH carousel cards and shop items
    const allClickableShoes = document.querySelectorAll('.shop-item, .product-card');

    allClickableShoes.forEach(item => {
        item.addEventListener('click', () => {
            // 1. Identify which naming class to use
            const isCarousel = item.classList.contains('product-card');
            const nameEl = isCarousel ? item.querySelector('.product-label') : item.querySelector('.item-name');
            const priceEl = item.querySelector('.item-price'); // Only exists in shop, so we'll fallback
            const img = item.querySelector('img').src;

            const name = nameEl ? nameEl.innerText : "UNKNOWN_ITEM";
            const price = priceEl ? priceEl.innerText : "$85.00"; // Fallback price for carousel clicks

            // 2. Inject data into detail view
            document.getElementById('detail-name-title').innerText = name.replace(" ", "_") + ".exe";
            document.getElementById('detail-name').innerText = name;
            document.getElementById('main-detail-img').src = img;
            document.querySelector('.price-tag').innerText = price;

            // 3. Open BOTH windows
            shopModal.style.display = 'flex';   // Open the main folder
            detailView.style.display = 'flex'; // Open the specific properties on top
            
            document.body.style.overflow = 'hidden'; 
        });
    });

    // add to basket
    const addBtn = document.querySelector('.add-to-cart-big');
    addBtn.addEventListener('click', () => {
        const name = document.getElementById('detail-name').innerText;
        const price = document.querySelector('.price-tag').innerText;
        const img = document.getElementById('main-detail-img').src;
        addToBasket(name, price, img);
        // detailView.style.display = 'none';
    });

    // Back button only closes the detail view, keeping the shop open
    backBtn.addEventListener('click', () => {
        detailView.style.display = 'none';
    });

    // Shop close button (X) closes everything
    document.querySelector('.shop-close').addEventListener('click', () => {
        shopModal.style.display = 'none';
        detailView.style.display = 'none'; // Ensure sub-window resets
        document.body.style.overflow = 'auto';
    });

    // Close on clicking outside the book
    window.addEventListener('click', (e) => {
        if (e.target === shopModal) {
            shopModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === detailView) {
            detailView.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Add click events to all items in the shop grid
    // document.querySelectorAll('.shop-item').forEach(item => {
    //     item.addEventListener('click', () => {
    //         const name = item.querySelector('.item-name').innerText;
    //         const price = item.querySelector('.item-price').innerText;
    //         const img = item.querySelector('img').src;

    //         // Inject data into detail view
    //         document.getElementById('detail-name-title').innerText = name + ".exe";
    //         document.getElementById('detail-name').innerText = name;
    //         document.getElementById('main-detail-img').src = img;
    //         document.querySelector('.price-tag').innerText = price;
            
    //         detailView.style.display = 'flex';
    //     });
    // });

    // backBtn.addEventListener('click', () => {
    //     detailView.style.display = 'none';
    // });

}

// shopping window modal product detail sub window - Function to update the main image in the detail view
function updateMainImg(src) {
    const basketexists = document.getElementById('basket-items-list');
    if (basketexists) return; //If the basket exist (e.g., your on basket.html), stop
    
    document.getElementById('main-detail-img').src = src;
    // Update active thumbnail styling
    document.querySelectorAll('.angle-thumb').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
}

// basket logic
function updateBasketUI() {
    const badge = document.getElementById('basket-count');
    if (!badge) return;

    const basket = JSON.parse(localStorage.getItem('miro_basket')) || [];
    const totalItems = basket.length;
    
    badge.innerText = totalItems;
    badge.style.display = totalItems > 0 ? 'inline-block' : 'none';

    const totalSum = basket.reduce((acc, item) => {
        // Remove "£" or any non-numeric characters except the decimal point
        const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, ''));
        return acc + (isNaN(numericPrice) ? 0 : numericPrice);
    }, 0);

    const totalElement = document.getElementById('basket-total');
    if (totalElement) {
        totalElement.innerText = `£${totalSum.toFixed(2)}`;
    }
}

// Function to add item
function addToBasket(name, price, img) {
    let basket = JSON.parse(localStorage.getItem('miro_basket')) || [];
    const item = { name, price, img, id: Date.now() };

    basket.push(item);
    localStorage.setItem('miro_basket', JSON.stringify(basket));
    updateBasketUI();
    
    // Visual feedback to confirm item is added to basket
    alert(name + " added to system basket ❤️");
}

function displayBasket() {
    updateBasketUI();

    const basketexists = document.getElementById('basket-items-list');
    if (!basketexists) return; //If the basket doesn't exist (e.g., your on index.html), stop

    const list = document.getElementById('basket-items-list');
    const basket = JSON.parse(localStorage.getItem('miro_basket')) || [];
    
    if (basket.length === 0) {
        list.innerHTML = "<p style='padding:20px;'>Your basket is empty...</p>";
        return;
    }

    list.innerHTML = basket.map(item => `
        <div class="basket-item" style="display:flex; align-items:center; gap:15px; border-bottom:1px solid #000; padding:10px;">
            <img src="${item.img}" style="width:50px; height:50px; border:1px solid #000;">
            <div>
                <div style="font-weight:bold;">${item.name}</div>
                <div>${item.price}</div>
            </div>
        </div>
    `).join('');
}
displayBasket();