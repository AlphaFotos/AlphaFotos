document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('.nav-menu');
    const dropdown = document.querySelector('.portfolio-dropdown');
    const submenu = document.querySelector('.portfolio-dropdown .submenu');

    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    function toggleNavMenu() {
        navMenu.classList.toggle('nav-active');
        burger.classList.toggle('active');

        if (navMenu.classList.contains('nav-active')) {
            submenu.style.display = 'flex';
        } else {
            submenu.style.display = 'none';
        }
    }

    const toggleDropdown = (event) => {
        event.stopPropagation();
        submenu.style.display = (submenu.style.display === 'flex') ? 'none' : 'flex';
    };

    const preventMenuClose = (event) => event.stopPropagation();

    const closeMenuOnOutsideClick = (event) => {
        if (!navMenu.contains(event.target) && !burger.contains(event.target)) {
            navMenu.classList.remove('nav-active');
            burger.classList.remove('active');
            submenu.style.display = 'none';
        }
    };

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (event) => {
            const isDropdownLink = dropdown.contains(event.target);
            const isSubmenuLink = submenu && submenu.contains(event.target);

            if (!isDropdownLink) {
                navMenu.classList.remove('nav-active');
                burger.classList.remove('active');
            }

            if (isSubmenuLink) {
                navMenu.classList.remove('nav-active');
                submenu.style.display = 'none';
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