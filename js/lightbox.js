document.addEventListener('DOMContentLoaded', function () {
    const imageModal = document.getElementById('imageModal');
    imageModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const imgSrc = button.getAttribute('data-bs-img-src');
        const modalImage = imageModal.querySelector('#modalImage');
        modalImage.src = imgSrc;
    });
});
