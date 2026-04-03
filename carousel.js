document.addEventListener('DOMContentLoaded', () => {
    // scroll - Target the content area that actually has the scrollbar
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

    // Optional: Add touch support for mobile "dead zones"
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
});



function carouselmodal(){
    //carousel
    const carousel = document.querySelector('.product-carousel');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');

    // Define how far one click should scroll
    // 200px accounts for the card width + gap
    const scrollAmount = 100; 

    // --- AUTO SCROLL LOGIC ---
    let autoScrollInterval;
    const scrollSpeed = 1000; // 3 seconds per slide

    const startAutoScroll = () => {
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
        // Wait 2 seconds after the user stops touching before restarting
        setTimeout(startAutoScroll, 2000);
    }, {passive: true});

    // Next Button Click
    nextBtn.addEventListener('click', () => {
        stopAutoScroll(); // Stop completely or just restart the timer
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth' // Smooth sliding animation
        });
    });

    // Previous Button Click
    prevBtn.addEventListener('click', () => {
        stopAutoScroll(); // Stop completely or just restart the timer
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Optional: Auto-hide buttons at the start/end of the scroll
    carousel.addEventListener('scroll', () => {
        const scrollLeft = carousel.scrollLeft;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;

        // If at the very beginning, fade the prev button slightly
        prevBtn.style.opacity = scrollLeft <= 0 ? "0.3" : "1";
        
        // If at the very end, fade the next button slightly
        nextBtn.style.opacity = scrollLeft >= maxScroll ? "0.3" : "1";
    });
}

function journalmodal(){
    // Journal
    const modal = document.getElementById('journal-modal');
    const closeBtn = document.querySelector('.journal-close');
    const polaroids = document.querySelectorAll('.polaroid');

    // Data for your scrapbook entries
    const journalData = {
        p1: {
            title: "BLUE_MIST_VIBES.exe",
            text: "Today's fit is inspired by early 2000s street style. Paired the chunky sneakers with baggy cargos for that perfect silhouette. Stay cute!",
            img: "images/outfit1-img.png"
        },
        p2: {
            title: "PINK_CORE_LOG.txt",
            text: "Found these vintage leg warmers! They match the Lavender Glow shoes perfectly. Feeling like a total digital princess today. <3",
            img: "images/outfit2-img.png"
        },
        p3: {
            title: "3 Cute Outfit Ideas to Style Your MiroMiro Sneakers 💖 <br>URBAN_FAIRY.exe",
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
            <a href="https://www.instagram.com/" target="_blank">Instagram</a> |
            <a href="https://www.tiktok.com/" target="_blank">TikTok</a>
            </div>
            `,
            img: "images/outfit3-img.png"
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
                // document.getElementById('journal-img1').src = data.img;
                
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
    document.getElementById('main-detail-img').src = src;
    // Update active thumbnail styling
    document.querySelectorAll('.angle-thumb').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
}
