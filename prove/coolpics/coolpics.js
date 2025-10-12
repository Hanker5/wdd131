const gallery = document.querySelector('#pictures');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');
const menuButton = document.querySelector('#menu-button');
const menuOptions = document.querySelector('#menu-options');

// Event listener for opening the modal
gallery.addEventListener('click', openModal);
menuButton.addEventListener('click', toggleMenu);

function openModal(e) {
    // Code to show modal  - Use event parameter 'e'   
    console.log(e.target);
    const img = e.target;
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');
    const full = src.replace('small', 'full');

    modalImage.src = full;
    modalImage.alt = alt;

    modal.showModal();
}

function toggleMenu() {
    menuOptions.classList.toggle('hide');
}
// Close modal on button click
closeButton.addEventListener('click', () => {
    modal.close();
});

// Close modal if clicking outside the image
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});
          