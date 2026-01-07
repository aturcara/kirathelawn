// Partner Data
const partners = [
    {
        name: "MZ Landskap & Nurseri Benut",
        location: "Masai, Johor",
        state: "Johor",
        logo: "assets/img/partners-logo/johor-masai-mzland.jpeg",
        services: ["Penjagaan Rumput", "Lanskap"]
    },
    {
        name: "WHR JB",
        location: "Johor Bahru, Johor",
        state: "Johor",
        logo: "assets/img/partners-logo/johor-jb-whr.png",
        services: ["Pemasangan Rumput", "Maintenance"]
    },
    {
        name: "JC Garden",
        location: "Jitra & Alor Setar, Kedah",
        state: "Kedah",
        logo: "assets/img/partners-logo/kedah-jitra-alor-setar-jc-garden.jpeg",
        services: ["Penjagaan Rumput", "Rawatan Tanah"]
    },
    {
        name: "Scape Tour",
        location: "Sungai Petani, Kedah",
        state: "Kedah",
        logo: "assets/img/partners-logo/kedah-sungai-petani-scapetour.jpeg",
        services: ["Lanskap", "Rumput"]
    },
    {
        name: "Alif Landscape",
        location: "Ipoh, Perak",
        state: "Perak",
        logo: "assets/img/partners-logo/perak-ipoh-alifland.jpeg",
        services: ["Lanskap Hardscape", "Rumput"]
    },
    {
        name: "GLL",
        location: "Seri Iskandar, Perak",
        state: "Perak",
        logo: "assets/img/partners-logo/perak-seri-iskandar-gll.jpeg",
        services: ["Potong Rumput", "Baja"]
    },
    {
        name: "ZBS Lawncare Services",
        location: "Seri Iskandar, Perak",
        state: "Perak",
        logo: "assets/img/partners-logo/perak-seri-iskandar-zbs.jpeg",
        services: ["Nursery", "Rumput"]
    },
    {
        name: "Mommy Daddy Garden",
        location: "Ayer Keroh, Melaka",
        state: "Melaka",
        logo: "assets/img/partners-logo/melaka-ayer-keroh-mommy daddy garden.jpeg",
        services: ["Nursery", "Lanskap"]
    },
    {
        name: "Empayar Lawn",
        location: "Selangor",
        state: "Selangor",
        logo: "assets/img/partners-logo/selangor-empayar.jpg",
        services: ["Pakar Rumput", "Sistem Siraman"]
    },
    {
        name: "Furqan Services",
        location: "Selangor",
        state: "Selangor",
        logo: "assets/img/partners-logo/selangor-furqan.png",
        services: ["Penjagaan Kawasan", "Lanskap"]
    }
];

// State Mapping for display order (optional, but good for sorting)
const stateOrder = [
    "Perlis", "Kedah", "Pulau Pinang", "Perak", "Selangor", "W.P. Kuala Lumpur", 
    "W.P. Putrajaya", "Negeri Sembilan", "Melaka", "Johor", "Pahang", "Terengganu", 
    "Kelantan", "Sabah", "Sarawak", "W.P. Labuan"
];

document.addEventListener('DOMContentLoaded', () => {
    const partnersContainer = document.getElementById('partnersContainer');
    const resetBtn = document.getElementById('resetFilter');
    const statePaths = document.querySelectorAll('.state-path');
    
    // 1. Render Partners Grouped by State
    renderPartners();

    // 1.5 Highlight States with Partners
    const activeStates = new Set(partners.map(p => p.state));
    statePaths.forEach(path => {
        const stateName = path.getAttribute('data-state');
        if (activeStates.has(stateName)) {
            path.classList.add('has-partner');
        }
    });

    // 2. Map Interaction
    statePaths.forEach(path => {
        path.addEventListener('click', () => {
            const stateName = path.getAttribute('data-state');
            
            // Highlight map
            statePaths.forEach(p => p.classList.remove('active'));
            path.classList.add('active');

            // Filter List
            filterPartners(stateName);
            
            // Show reset button
            resetBtn.classList.remove('hidden');
        });
    });

    // 3. Reset Filter
    resetBtn.addEventListener('click', () => {
        statePaths.forEach(p => p.classList.remove('active'));
        renderPartners(); // Re-render all
        resetBtn.classList.add('hidden');
        
        // Scroll to top of list
        partnersContainer.scrollIntoView({ behavior: 'smooth' });
    });

    // Animation observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show'); 
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    function renderPartners(filterState = null) {
        partnersContainer.innerHTML = '';
        
        // Group partners by state
        const grouped = partners.reduce((acc, partner) => {
            if (!acc[partner.state]) {
                acc[partner.state] = [];
            }
            acc[partner.state].push(partner);
            return acc;
        }, {});

        let hasResults = false;

        stateOrder.forEach(state => {
            // If filtering, skip if not match
            if (filterState && state !== filterState) return;

            const statePartners = grouped[state];
            if (statePartners && statePartners.length > 0) {
                hasResults = true;
                const groupDiv = document.createElement('div');
                groupDiv.className = 'state-group fade-up';
                groupDiv.id = `group-${state.replace(/\s+/g, '-')}`;

                const header = document.createElement('div');
                header.className = 'state-header';
                header.innerHTML = `
                    <h2>${state}</h2>
                    <span class="state-count">${statePartners.length}</span>
                `;

                const grid = document.createElement('div');
                grid.className = 'partners-grid';

                statePartners.forEach(partner => {
                    const card = document.createElement('div');
                    card.className = 'partner-card';
                    card.innerHTML = `
                        <div class="partner-logo">
                            <img src="${partner.logo}" alt="${partner.name}">
                        </div>
                        <div class="partner-info">
                            <h3 class="partner-name">${partner.name}</h3>
                            <div class="partner-location">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                ${partner.location}
                            </div>
                            <div class="partner-services">
                                ${partner.services.map(s => `<span class="service-tag">${s}</span>`).join('')}
                            </div>
                        </div>
                    `;
                    grid.appendChild(card);
                });

                groupDiv.appendChild(header);
                groupDiv.appendChild(grid);
                partnersContainer.appendChild(groupDiv);
                
                // Observe the new element for animation
                groupDiv.style.opacity = '0';
                groupDiv.style.transform = 'translateY(20px)';
                groupDiv.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                setTimeout(() => observer.observe(groupDiv), 100);
            }
        });

        if (!hasResults) {
            partnersContainer.innerHTML = `
                <div class="map-instruction" style="margin-top: 3rem;">
                    <h3>Tiada rakan niaga di lokasi ini buat masa ini.</h3>
                    <p>Kami sedang mengembangkan rangkaian kami.</p>
                </div>
            `;
        }
        
        // If filtered, scroll to container
        if (filterState) {
             const group = document.getElementById(`group-${filterState.replace(/\s+/g, '-')}`);
             if(group) {
                 setTimeout(() => {
                     group.scrollIntoView({behavior: 'smooth', block: 'start'});
                 }, 100);
             } else {
                 partnersContainer.scrollIntoView({ behavior: 'smooth' });
             }
        }
    }

    function filterPartners(stateName) {
        renderPartners(stateName);
    }
});

// UI Interaction Logic (Moved from rakan.html)
document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year
    const yearEl = document.getElementById('currentYear');
    if(yearEl) yearEl.textContent = new Date().getFullYear();

    // Mobile Menu
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if(mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open');
            mobileBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Back to top
    const backToTop = document.getElementById('backToTop');
    if(backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});