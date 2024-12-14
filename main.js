// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Three.js Abstract Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('.abstract-background').appendChild(renderer.domElement);

// Create abstract geometry
const geometry = new THREE.IcosahedronGeometry(1, 0);
const material = new THREE.MeshPhongMaterial({
    color: 0x0071e3,
    wireframe: true
});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Add lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animate footer elements when in view
const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-text').forEach((el, index) => {
                el.style.animationDelay = `${index * 0.2}s`;
                el.classList.add('animate');
            });
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.footer').forEach(footer => {
    footerObserver.observe(footer);
});

// Add abstract shapes to hero visual
const createAbstractShapes = () => {
    const container = document.querySelector('.abstract-shape-container');
    for (let i = 0; i < 5; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        shape.style.animationDelay = `${i * 0.5}s`;
        container.appendChild(shape);
    }
};

createAbstractShapes();

// Particle.js Configuration
particlesJS('particles-js', {
    particles: {
        number: { value: 80 },
        color: { value: '#0071e3' },
        shape: { type: 'circle' },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            }
        }
    }
});

// Create floating cube
const createFloatingCube = () => {
    const cube = document.querySelector('.floating-cube');
    const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    
    faces.forEach(face => {
        const div = document.createElement('div');
        div.className = `cube-face ${face}`;
        cube.appendChild(div);
    });
};

createFloatingCube();

// Initialize Three.js sphere
// const initSphere = () => {
//     const container = document.getElementById('sphere-container');
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ alpha: true });
    
//     renderer.setSize(300, 300);
//     container.appendChild(renderer.domElement);
    
//     const geometry = new THREE.SphereGeometry(1, 32, 32);
//     const material = new THREE.MeshPhongMaterial({
//         color: 0x0071e3,
//         wireframe: true
//     });
//     const sphere = new THREE.Mesh(geometry, material);
    
//     scene.add(sphere);
    
//     const light = new THREE.DirectionalLight(0xffffff, 1);
//     light.position.set(1, 1, 1);
//     scene.add(light);
    
//     camera.position.z = 3;
    
//     const animate = () => {
//         requestAnimationFrame(animate);
//         sphere.rotation.x += 0.01;
//         sphere.rotation.y += 0.01;
//         renderer.render(scene, camera);
//     };
    
//     animate();
// };

// initSphere();

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-content')) {
        navLinks.classList.remove('active');
    }
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
}); 

// transition
document.addEventListener("DOMContentLoaded", () => {
    const roles = ["Software Engineer", "Full Stack Developer"];
    const roleElement = document.getElementById("role");
    let roleIndex = 0;
    let charIndex = 0;

    function typeRole() {
        if (charIndex < roles[roleIndex].length) {
            roleElement.textContent += roles[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeRole, 100); // Adjust typing speed (100ms per character)
        } else {
            setTimeout(eraseRole, 2000); // Pause before erasing (2 seconds)
        }
    }

    function eraseRole() {
        if (charIndex > 0) {
            roleElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseRole, 50); // Adjust erasing speed (50ms per character)
        } else {
            roleIndex = (roleIndex + 1) % roles.length; // Move to the next role
            setTimeout(typeRole, 500); // Pause before typing the next role (500ms)
        }
    }

    // Start the typewriter effect
    typeRole();

    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = CONFIG;
    
        // Initialize EmailJS (replace "YOUR_USER_ID" with your EmailJS User ID)
        emailjs.init({
            publicKey: PUBLIC_KEY,
        });
    
        // Collect form data
        const formData = {
          name: document.querySelector('input[placeholder="Your Name"]').value,
          email: document.querySelector('input[placeholder="Your Email"]').value,
          subject: document.querySelector('input[placeholder="Subject"]').value,
          message: document.querySelector('textarea[placeholder="Message"]').value,
        };
    
        // Send the email (replace "YOUR_SERVICE_ID" and "YOUR_TEMPLATE_ID" with your EmailJS service/template IDs)
        emailjs.send(SERVICE_ID, TEMPLATE_ID, formData)
          .then(function () {
            alert('Email sent successfully!');
            e.target.reset();
          })
          .catch(function (error) {
            alert('Failed to send email: ' + JSON.stringify(error));
          });
    });   

});

