document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('.nav-menu');
    const dropdown = document.querySelector('.portfolio-dropdown');
    const submenu = document.querySelector('.portfolio-dropdown .submenu');
    const burgerIcon = burger.querySelector('i');

    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    // Funcionalidad del menú de navegación móvil (tipo hamburguesa)
    function toggleNavMenu() {
        navMenu.classList.toggle('nav-active');

        // Asegura que el submenú siempre esté desplegado al abrir el menú
        if (navMenu.classList.contains('nav-active')) {
            submenu.style.display = 'flex'; // Despliega el submenú
            burgerIcon.classList.remove('fa-bars');
            burgerIcon.classList.add('fa-times'); // Cambia el ícono a "X"
        } else {
            submenu.style.display = 'none'; // Oculta el submenú si se cierra el menú principal
            burgerIcon.classList.remove('fa-times');
            burgerIcon.classList.add('fa-bars'); // Cambia el ícono a hamburguesa
        }
    }

     // Función para alternar el submenú manualmente
     const toggleDropdown = (event) => {
        event.stopPropagation();
        submenu.style.display = (submenu.style.display === 'flex') ? 'none' : 'flex';
    };

    const preventMenuClose = (event) => event.stopPropagation();
    
    const closeMenuOnOutsideClick = (event) => {
        if (!navMenu.contains(event.target) && !burger.contains(event.target)) {
            navMenu.classList.remove('nav-active');
            dropdown.classList.remove('nav-active');
            submenu.style.display = 'none'; // Oculta el submenú si se hace clic fuera del menú
            burgerIcon.classList.remove('fa-times');
            burgerIcon.classList.add('fa-bars'); // Cambia el ícono a hamburguesa
        }
    };

    // Cierre del menú cuando se hace clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (event) => {
            const isDropdownLink = dropdown.contains(event.target);
            const isSubmenuLink = submenu && submenu.contains(event.target);

            // Evita cerrar el menú si se interactúa con "Portafolio"
            if (!isDropdownLink) {
                navMenu.classList.remove('nav-active');
                burgerIcon.classList.remove('fa-times');
                burgerIcon.classList.add('fa-bars'); // Cambia el ícono a hamburguesa
            }

            // Cierra el menú si se selecciona un enlace dentro del submenú
            if (isSubmenuLink) {
                navMenu.classList.remove('nav-active');
                submenu.style.display = 'none';
                burgerIcon.classList.remove('fa-times');
                burgerIcon.classList.add('fa-bars'); // Cambia el ícono a hamburguesa
            }
        });
    });

    burger.addEventListener('click', toggleNavMenu);
    dropdown.addEventListener('click', toggleDropdown);
    document.querySelectorAll('.submenu a').forEach(item => {
        item.addEventListener('click', preventMenuClose);
    });
    document.addEventListener('click', closeMenuOnOutsideClick);

    // Envío de datos del formulario a Google Sheets
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        fetch('https://script.google.com/macros/s/AKfycbyPE5fDTCgcGj1wYvqi7VS3uQtmyN2Q-FLJBzY71mvmMS-DhDfzORsBC32wENeZry2-/exec', {
            method: 'POST',
            body: formData
        }).then(response => {
            alert(response.ok ? 'Gracias por contactarnos!' : 'Hubo un problema al enviar el formulario.');
            if (response.ok) this.reset();
        }).catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al enviar el formulario.');
        });
    });

    // Animación de imágenes con Intersection Observer
    const images = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible'); // Esto permite que la animación se repita al volver a ser visible
            }
        });
    }, {
        threshold: 0.1 // Ajusta el umbral según prefieras
    });

    images.forEach(image => {
        observer.observe(image);
    });
});