// TEMA CLARO / ESCURO                        //
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Função para aplicar o tema
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.className = 'fas fa-sun';
    } else {
        document.body.classList.remove('dark-mode');
        themeIcon.className = 'fas fa-moon';
    }
}

// Carrega o tema salvo no navegador
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    applyTheme(savedTheme);
} else {
    // Se não houver tema salvo, verifica a preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
}

// Alterna o tema ao clicar no botão
themeToggle.addEventListener('click', function() {
    const isDark = document.body.classList.contains('dark-mode');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
});

// ANIMAÇÃO DE LOADER                         //

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const loader = document.getElementById('loader');
        loader.classList.add('hidden');
    }, 1500);
});


// MENU MOBILE                                //


const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', function() {
    nav.classList.toggle('open');
    
    const icon = menuToggle.querySelector('i');
    if (nav.classList.contains('open')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
});

document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function() {
        nav.classList.remove('open');
        menuToggle.querySelector('i').className = 'fas fa-bars';
    });
});

// SCROLL SUAVE PARA LINKS                    //


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// HEADER FIXO COM SOMBRA                     //


const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});


// BOTÃO VOLTAR AO TOPO                       //


const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// ANIMAÇÃO DOS CARDS AO SCROLL               //


const cards = document.querySelectorAll('.card');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            cardObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

cards.forEach(card => {
    cardObserver.observe(card);
});


// ANIMAÇÃO DOS NÚMEROS (ESTATÍSTICAS)       //


const statNumbers = document.querySelectorAll('.stat-number');

const statObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-count'));
            const duration = 2000;
            const start = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                const value = Math.floor(progress * target);
                
                if (target >= 1000) {
                    entry.target.textContent = value.toLocaleString() + '+';
                } else {
                    entry.target.textContent = value;
                }
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }
            
            requestAnimationFrame(updateCounter);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statObserver.observe(stat);
});


// DESTAQUE DO LINK ATIVO NO MENU            //


const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// EFEITO PARALAX NO BANNER                   //

window.addEventListener('scroll', function() {
    const banner = document.querySelector('.banner');
    const scrolled = window.pageYOffset;
    
    if (banner) {
        banner.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// EFEITO DE DIGITAÇÃO NO TÍTULO              //


const bannerTitle = document.querySelector('.banner-text h2 .highlight');
if (bannerTitle) {
    const text = bannerTitle.textContent;
    bannerTitle.textContent = '';
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            bannerTitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 2000);
}

console.log('LingProg - Site carregado com sucesso!');