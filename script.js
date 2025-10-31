document.addEventListener('DOMContentLoaded', () => {
    
    const preloader = document.getElementById('preloader');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const successMessage = document.getElementById('success-message');
    const buttonContainer = document.getElementById('button-container');
    const mainContainer = document.getElementById('main-container');
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const btnReset = document.getElementById('btn-reset'); 

    // === FUNGSI LOADING (BARU) ===
    setTimeout(() => {
        // 1. Sembunyikan preloader (dengan fade-out)
        preloader.classList.add('preloader-hidden');

        // 2. Tampilkan konten utama (akan terpicu animasi fadeIn dari CSS)
        mainContainer.classList.remove('hidden');
        btnReset.classList.remove('hidden');

        // 3. Hapus preloader dari DOM setelah animasinya selesai
        preloader.addEventListener('transitionend', () => {
            preloader.remove();
        });
    }, 1500); // Set 1.5 detik

    // === SISA SCRIPT (TETAP SAMA) ===
    let areButtonsLocked = false;

    function moveButton() {
        
        const isMobile = window.innerWidth <= 480;

        if (!areButtonsLocked) {
            
            const buttonContainerRect = buttonContainer.getBoundingClientRect();
            buttonContainer.style.height = `${buttonContainerRect.height}px`;

            const containerRect = mainContainer.getBoundingClientRect();
            
            const yesRect = btnYes.getBoundingClientRect();
            btnYes.style.position = 'absolute';
            btnYes.style.top = `${yesRect.top - containerRect.top}px`;
            btnYes.style.left = `${yesRect.left - containerRect.left}px`;
            
            const noRect = btnNo.getBoundingClientRect();
            btnNo.style.position = 'absolute';
            btnNo.style.top = `${noRect.top - containerRect.top}px`;
            btnNo.style.left = `${noRect.left - containerRect.left}px`;

            if (isMobile) {
                btnYes.style.width = `${yesRect.width}px`;
                btnNo.style.width = `${noRect.width}px`;
            }
            
            areButtonsLocked = true;
        }

        const containerRect = mainContainer.getBoundingClientRect();
        const btnNoRect = btnNo.getBoundingClientRect();
        const btnWidth = btnNoRect.width;
        const btnHeight = btnNoRect.height;
        
        const containerStyle = window.getComputedStyle(mainContainer);
        const paddingLeft = parseFloat(containerStyle.paddingLeft);
        const paddingTop = parseFloat(containerStyle.paddingTop);
        const paddingRight = parseFloat(containerStyle.paddingRight);
        const paddingBottom = parseFloat(containerStyle.paddingBottom);

        const maxX = containerRect.width - btnWidth - paddingLeft - paddingRight;
        const maxY = containerRect.height - btnHeight - paddingTop - paddingBottom;

        let randomX = Math.floor(Math.random() * maxX) + paddingLeft;
        let randomY = Math.floor(Math.random() * maxY) + paddingTop;

        btnNo.style.left = `${randomX}px`;
        btnNo.style.top = `${randomY}px`;
    }

    btnNo.addEventListener('click', moveButton);

    btnYes.addEventListener('click', () => {
        title.style.display = 'none';
        description.style.display = 'none';
        
        if (btnYes) {
            btnYes.remove();
        }
        if (btnNo) {
            btnNo.remove(); 
        }

        successMessage.classList.remove('hidden');
    });

    btnReset.addEventListener('click', () => {
        location.reload();
    });
});
