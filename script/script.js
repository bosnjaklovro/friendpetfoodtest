document.addEventListener('DOMContentLoaded', function () {
    // Function to close the sidenav
    function closeSidenav() {
        var sidenavInstance = M.Sidenav.getInstance(document.querySelector('.sidenav'));
        if (sidenavInstance) {
            sidenavInstance.close();
        }
    }

    // Add click event listeners to back buttons to close the sidenav
    var backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(function (button) {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            closeSidenav();
        });
    });

    // Add click event listeners to contact links for smooth scrolling
    document.querySelectorAll('.contact-link').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            // Scroll smoothly to the Contact section
            document.querySelector('#contactSection').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Initialize Materialize Components
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, { edge: 'left', draggable: true });
    var carouselElems = document.querySelectorAll('.carousel');
    M.Carousel.init(carouselElems);

    // Hide the preloader
    document.getElementById('preloader').style.display = 'none';

    // Load products from JSON files
    loadProducts('productsSectionDog1', './json/dataPro.json');
    loadProducts('productsSectionDog2', './json/dataFriend.json');
    loadProducts('productsSectionDog3', './json/dataEconomy.json');
    loadProducts('productsSectionDog4', './json/dataSnacks.json');

    loadProducts('productsSectionCat1', './json/dataProCat.json');
    loadProducts('productsSectionCat2', './json/dataFriendCat.json');
    loadProducts('productsSectionCat3', './json/dataEconomyCat.json');
    loadProducts('productsSectionCat4', './json/dataSnacksCat.json');

    // Sticky Navbar
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > navbar.offsetHeight) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    // Function to check scroll position and update navbar color
    function checkScroll() {
        var navbar = document.querySelector('.nav-wrapper');
        var zigzagSection = document.querySelector('.zigzag-container');

        if (!zigzagSection || !navbar) return;

        var startZigzag = zigzagSection.offsetTop;
        var endZigzag = startZigzag + zigzagSection.offsetHeight;
        var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollPosition >= startZigzag && scrollPosition <= endZigzag) {
            navbar.classList.add('dark-blue-nav');
        } else {
            navbar.classList.remove('dark-blue-nav');
        }
    }

    // Attach scroll event listener
    window.addEventListener('scroll', checkScroll);

    // Fetch countries from the API and populate the select element
    fetch('https://restcountries.com/v2/all')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Countries fetched:", data);
            populateCountries(data);
        })
        .catch(error => console.error('Error fetching countries:', error));
});

// Function to populate the select element with countries
function populateCountries(countries) {
    const selectElement = document.getElementById('country');
    if (!selectElement) {
        console.error('Select element not found');
        return;
    }
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.name;
        option.textContent = country.name;
        selectElement.appendChild(option);
    });
    console.log("Countries populated");
}

// Function to load products from JSON files and display them
function loadProducts(sectionId, jsonFile) {
    fetch(jsonFile)
        .then(response => response.json())
        .then(products => {
            const section = document.getElementById(sectionId);
            section.innerHTML = ''; // Clear existing content
            products.forEach(product => {
                const productHtml = `
                <div class="col s12 m6 l4">
                    <div class="card">
                        <div class="card-image">
                            <img src="${product.image}" alt="${product.name}" class="product-image" data-name="${product.name}" onclick="openImageModal(this);">
                            <span class="card-title">${product.name}</span>
                        </div>
                        <div class="card-action">
                            <p>${product.Description}</p>
                            <button class="more-info" onclick="openInfoModal('${product.name}', '${product.image}', '${product.Description}', '${product.popUpDescription}')">More Info</button>
                        </div>
                    </div>
                </div>
            `;

                section.innerHTML += productHtml;
            });
        })
        .catch(error => console.error('Error loading products:', error));
}

// Function to open the information modal
function openInfoModal(name, imageSrc, Description, popUpDescription) {
    console.log(name, imageSrc, Description, popUpDescription);  // Debugging

    var modal = document.getElementById("infoModal");
    var modalImg = document.getElementById("infoImg");
    var modalName = document.getElementById("infoName");
    var modalDescription = document.getElementById("infoDescription");
    var modalPopUpDescription = document.getElementById("popUpDescription");  // Add this line

    modal.style.display = "block";
    modalImg.src = imageSrc;
    modalName.textContent = name;
    modalDescription.textContent = Description;
    modalPopUpDescription.textContent = popUpDescription;  // Add this line

    var span = document.getElementsByClassName("close")[1];
    span.onclick = function() {
        modal.style.display = "none";
    }
}


// Function to open the image modal
function openImageModal(imgElement) {
    var imageModal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImage");
    var modalCaption = document.getElementById("caption");

    imageModal.style.display = "block";
    modalImg.src = imgElement.src;
    modalCaption.textContent = imgElement.getAttribute("data-name");

    var span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        imageModal.style.display = "none";
    }
}

// Get the modal and close it when clicking outside
var modal = document.getElementById('myModal');
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
document.querySelectorAll('.brand-logo, .dogIcon, .catIcon, .contact-link').forEach(item => {
    item.addEventListener('click', function (e) {
        // Prevent default anchor click behavior
        e.preventDefault();

        // Extract the target ID from the href attribute
        const targetId = this.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);

        // If there's a target section, scroll to it smoothly
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        // Close the sidenav on mobile view
        closeSidenav();
    });
});

// Adjust the scroll position for Dog section
document.querySelectorAll('.dogIcon').forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        scrollToSection('dog');
    });
});

// Adjust the scroll position for Cat section
document.querySelectorAll('.catIcon').forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        scrollToSection('Cat');
    });
});

// Function to scroll to the section with an offset
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const offset = 100; // Adjust the offset value as needed
    const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({
        top: sectionTop - offset,
        behavior: "smooth"
    });
}



// Scroll to the top of the document when clicking the "Back to Top" button
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}
