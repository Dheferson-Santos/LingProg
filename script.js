//animação de loade de site 

document.addEventListener('DOMContentLoaded', function() {
    // Esconde o loader após 1.5 segundos
    setTimeout(function() {
        const loader = document.getElementById('loader');
        loader.classList.add('hidden');
    }, 1500);
});

// ========================================== //
// MENU MOBILE                                //
// ========================================== //

const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', function() {
    nav.classList.toggle('open');
    
    // Troca o ícone do menu
    const icon = menuToggle.querySelector('i');
    if (nav.classList.contains('open')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
});

// Fecha o menu ao clicar em um link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function() {
        nav.classList.remove('open');
        menuToggle.querySelector('i').className = 'fas fa-bars';
    });
});

// ========================================== //
// SCROLL SUAVE PARA LINKS                    //
// ========================================== //

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

// ========================================== //
// HEADER FIXO COM SOMBRA                     //
// ========================================== //

const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Adiciona sombra quando rolar
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Esconde/mostra header ao rolar (efeito app)
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ========================================== //
// BOTÃO VOLTAR AO TOPO                       //
// ========================================== //

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

// ========================================== //
// ANIMAÇÃO DOS CARDS AO SCROLL               //
// ========================================== //

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

// ========================================== //
// ANIMAÇÃO DOS NÚMEROS (ESTATÍSTICAS)       //
// ========================================== //

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

// ========================================== //
// DESTAQUE DO LINK ATIVO NO MENU            //
// ========================================== //

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

// ========================================== //
// VALIDAÇÃO DO FORMULÁRIO                    //
// ========================================== //

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome_contato').value.trim();
    const email = document.getElementById('email_contato').value.trim();
    const assunto = document.getElementById('assunto_contato').value;
    const mensagem = document.getElementById('mensagem_contato').value.trim();
    
    // Validação simples
    if (nome === '') {
        alert('⚠️ Por favor, preencha o campo Nome.');
        document.getElementById('nome_contato').focus();
        return;
    }
    
    if (email === '') {
        alert('⚠️ Por favor, preencha o campo E-mail.');
        document.getElementById('email_contato').focus();
        return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        alert('⚠️ Por favor, insira um e-mail válido.');
        document.getElementById('email_contato').focus();
        return;
    }
    
    if (assunto === '') {
        alert('⚠️ Por favor, selecione um assunto.');
        document.getElementById('assunto_contato').focus();
        return;
    }
    
    if (mensagem === '') {
        alert('⚠️ Por favor, preencha a mensagem.');
        document.getElementById('mensagem_contato').focus();
        return;
    }
    
    // Mensagem de sucesso (simulação de envio)
    const btn = contactForm.querySelector('.btn-primary');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    btn.disabled = true;
    
    setTimeout(function() {
        btn.innerHTML = '<i class="fas fa-check"></i> Mensagem enviada!';
        btn.style.background = '#48bb78';
        
        // Reseta o formulário após 2 segundos
        setTimeout(function() {
            contactForm.reset();
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
            alert('✅ Mensagem enviada com sucesso!');
        }, 2000);
    }, 2000);
});

// ========================================== //
// EFEITO PARALAX NO BANNER                   //
// ========================================== //

window.addEventListener('scroll', function() {
    const banner = document.querySelector('.banner');
    const scrolled = window.pageYOffset;
    
    if (banner) {
        banner.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// ========================================== //
// ANIMAÇÃO DE ENTRADA DOS CARDS FLUTUANTES   //
// ========================================== //

// Pequeno efeito de digitação no título do banner
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
    
    // Inicia a animação após o loader
    setTimeout(typeWriter, 2000);
}

console.log('  ProgLing - Site carregado com sucesso!');
console.log('💻 Desenvolvido com ☕ para aprendizado de programação.');