document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. ANIMACIÓN 3D TILT EN LA IMAGEN DEL HEADER
    // -------------------------------------------------------------
    const profileImg = document.querySelector('header img');

    if (profileImg) {
        // Al mover el ratón dentro de la imagen
        profileImg.addEventListener('mousemove', (e) => {
            const rect = profileImg.getBoundingClientRect();
            
            // Obtener el centro de la imagen
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calcular distancia del cursor respecto al centro
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            // Convertir a ángulos de rotación (máximo +/- 15 grados)
            const rotateX = (-mouseY / (rect.height / 2)) * 15;
            const rotateY = (mouseX / (rect.width / 2)) * 15;

            // Aplicar transformación 3D con leve escalado (zoom)
            profileImg.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;
        });

        // Restaurar posición cuando el ratón sale de la imagen
        profileImg.addEventListener('mouseleave', () => {
            profileImg.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }

    // -------------------------------------------------------------
    // 2. ENTRADA SECUENCIAL Y EFECTO MAGNÉTICO EN EL MENÚ
    // -------------------------------------------------------------
    const navLinks = document.querySelectorAll('nav a');

    // Entrada animada secuencial (Staggered Animation) al cargar
    navLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(-15px)';

        setTimeout(() => {
            link.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 150 * (index + 1));
    });

    // Efecto Magnético: el enlace "persigue" suavemente al cursor
    navLinks.forEach((link) => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Desplazamiento sutil hacia donde apunta el ratón
            link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
        });

        link.addEventListener('mouseleave', () => {
            // Regresa a su estado original al quitar el cursor
            link.style.transform = 'translate(0px, 0px) scale(1)';
        });
    });
});
// -------------------------------------------------------------
    // 3. ANIMACIÓN DE APARICIÓN SUAVE (FADE-IN) PARA EL HERO
    // -------------------------------------------------------------
    const heroSection = document.getElementById('hero');

    if (heroSection) {
        // Creamos un observador de intersección
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Si la sección #hero es visible en la pantalla
                if (entry.isIntersecting) {
                    heroSection.classList.add('visible');
                    // Dejamos de observar una vez que ya apareció
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2 // Se activa cuando el 20% del hero entra en pantalla
        });

        // Iniciamos la observación
        observer.observe(heroSection);
    }