document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. ANIMACIÓN 3D TILT EN LA IMAGEN DEL HEADER
    // -------------------------------------------------------------
    const profileImg = document.querySelector('.foto-perfil');

    if (profileImg) {
        profileImg.addEventListener('mousemove', (e) => {
            const rect = profileImg.getBoundingClientRect();
            
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            const rotateX = (-mouseY / (rect.height / 2)) * 15;
            const rotateY = (mouseX / (rect.width / 2)) * 15;

            profileImg.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;
        });

        profileImg.addEventListener('mouseleave', () => {
            profileImg.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }

    // -------------------------------------------------------------
    // 2. ENTRADA SECUENCIAL Y EFECTO MAGNÉTICO EN EL MENÚ
    // -------------------------------------------------------------
    const navLinks = document.querySelectorAll('.lista-nav a');

    navLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(-15px)';

        setTimeout(() => {
            link.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 150 * (index + 1));
    });

    navLinks.forEach((link) => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translate(0px, 0px) scale(1)';
        });
    });

    // -------------------------------------------------------------
    // 3. ANIMACIÓN DE APARICIÓN SUAVE (FADE-IN) PARA EL HERO
    // -------------------------------------------------------------
    const heroSection = document.getElementById('hero');

    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroSection.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        observer.observe(heroSection);
    }
});