// =========================================
// AREA CALCULATOR PAGE SCRIPTS
// =========================================

// Set current year in footer
const currentYearEl = document.getElementById('currentYear');
if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
}

// Mobile Menu Toggle (Fixed)
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');

        // Toggle hamburger icon
        this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            mobileMenuBtn.textContent = '☰';
        });
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            mobileMenuBtn.textContent = '☰';
        }
    });
}

// =========================================
// SAVE INPUT DATA TO LOCALSTORAGE
// =========================================
const calcFields = [
    'pesticideAmount', 'pesticideUnit',
    'waterAmount', 'waterUnit',
    'labelArea', 'labelAreaUnit',
    'yourArea', 'sandThickness', 'sandArea'
];

window.addEventListener('DOMContentLoaded', () => {
    calcFields.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const saved = localStorage.getItem('thelawn_' + id);
            if (saved !== null) {
                el.value = saved;
                // Trigger slider update if it's the slider
                if (id === 'sandThickness') {
                    const display = document.getElementById('thicknessValue');
                    if (display) display.textContent = saved;
                }
            }
        }
    });
});

calcFields.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('input', () => localStorage.setItem('thelawn_' + id, el.value));
        el.addEventListener('change', () => localStorage.setItem('thelawn_' + id, el.value));
    }
});

// =========================================
// CALCULATOR TABS TOGGLE
// =========================================
const calcTabs = document.querySelectorAll('.calc-toggle-btn');
const calcContents = document.querySelectorAll('.calc-tab-content');

if (calcTabs.length > 0) {
    calcTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            calcTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            calcContents.forEach(content => {
                content.style.display = 'none';
                content.classList.remove('active');
            });
            
            const targetId = tab.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.style.display = 'block';
                setTimeout(() => targetContent.classList.add('active'), 10);
            }
        });
    });
}

// =========================================
// PESTICIDE CALCULATOR
// =========================================
const calculatePesticideBtn = document.getElementById('calculatePesticide');
if (calculatePesticideBtn) {
    calculatePesticideBtn.addEventListener('click', () => {
        const pAmount = parseFloat(document.getElementById('pesticideAmount').value) || 0;
        const pUnit = document.getElementById('pesticideUnit').value;
        const wAmount = parseFloat(document.getElementById('waterAmount').value) || 0;
        const wUnit = document.getElementById('waterUnit').value;
        const lArea = parseFloat(document.getElementById('labelArea').value) || 0;
        const lAreaUnit = document.getElementById('labelAreaUnit').value;
        const yArea = parseFloat(document.getElementById('yourArea').value) || 0;

        if (!pAmount || !wAmount || !lArea || !yArea) {
            alert('Sila isi semua ruangan');
            return;
        }

        let lAreaSqft = lArea;
        if (lAreaUnit === 'm2') lAreaSqft = lArea * 10.764;
        else if (lAreaUnit === 'hectare') lAreaSqft = lArea * 107639;

        const ratio = yArea / lAreaSqft;

        let pNeeded = pAmount * ratio;
        let pDisplay = '';
        if (pUnit === 'liter') pNeeded *= 1000;
        
        if (pNeeded >= 1000) pDisplay = (pNeeded / 1000).toFixed(2) + ' liter';
        else pDisplay = pNeeded.toFixed(1) + ' ml';

        let wNeeded = wAmount * ratio;
        let wDisplay = '';
        if (wUnit === 'ml') wNeeded /= 1000;

        if (wNeeded < 1) wDisplay = (wNeeded * 1000).toFixed(0) + ' ml';
        else wDisplay = wNeeded.toFixed(2) + ' liter';

        document.getElementById('pesticideNeeded').textContent = pDisplay;
        document.getElementById('waterNeeded').textContent = wDisplay;
        document.getElementById('pesticideResult').style.display = 'block';
    });
}

// =========================================
// SAND CALCULATOR (Slider + Volume)
// =========================================
const sandSlider = document.getElementById('sandThickness');
const thicknessValue = document.getElementById('thicknessValue');

if (sandSlider && thicknessValue) {
    sandSlider.addEventListener('input', function() {
        thicknessValue.textContent = this.value;
    });
}

const calculateSandBtn = document.getElementById('calculateSand');
if (calculateSandBtn) {
    calculateSandBtn.addEventListener('click', () => {
        const thickness = parseFloat(document.getElementById('sandThickness').value) || 0;
        const area = parseFloat(document.getElementById('sandArea').value) || 0;

        if (!thickness || !area) {
            alert('Sila isi semua ruangan');
            return;
        }

        const areaM2 = area * 0.0929;
        const thicknessM = thickness / 1000;
        const volumeM3 = areaM2 * thicknessM;
        const tons = volumeM3 * 1.6;

        let sandDisplay = '';
        if (tons < 1) sandDisplay = (tons * 1000).toFixed(0) + ' kg';
        else sandDisplay = tons.toFixed(2) + ' tan';

        document.getElementById('sandVolume').textContent = sandDisplay;
        
        const volEl = document.getElementById('sandVolumeM3');
        if (volEl) volEl.textContent = volumeM3.toFixed(2);

        document.getElementById('sandResult').style.display = 'block';
    });
}



// =========================================
// BACK TO TOP
// =========================================
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        backToTopBtn.classList.toggle('show', window.pageYOffset > 300);
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}