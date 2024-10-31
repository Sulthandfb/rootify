document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('wisataForm');
    const steps = document.querySelectorAll('.step-content');
    const bullets = document.querySelectorAll('.step-bullet');

    // Fungsi untuk navigasi antar langkah
    window.nextStep = function(currentStep) {
        steps[currentStep - 1].classList.remove('active');
        steps[currentStep].classList.add('active');
        updateProgressBar(currentStep + 1);
    }

    window.prevStep = function(currentStep) {
        steps[currentStep - 1].classList.remove('active');
        steps[currentStep - 2].classList.add('active');
        updateProgressBar(currentStep - 1);
    }

    function updateProgressBar(step) {
        bullets.forEach((bullet, index) => {
            if (index < step) {
                bullet.classList.add('active');
            } else {
                bullet.classList.remove('active');
            }
        });
    }

    // Event listener untuk form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        
        // Mengubah checkbox kategori menjadi string
        const kategoriChecked = document.querySelectorAll('input[name="kategori[]"]:checked');
        const kategori = Array.from(kategoriChecked).map(cb => cb.value).join(',');
        formData.set('kategori', kategori);

        // Log data yang akan dikirim
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        fetch('save_preference.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            console.log('Raw response:', response);
            return response.text();
        })
        .then(text => {
            console.log('Response text:', text);
            try {
                const data = JSON.parse(text);
                if (data.success) {
                    alert('Preferensi Anda telah disimpan!');
                    // Redirect atau tindakan lain setelah berhasil
                } else {
                    alert('Terjadi kesalahan: ' + data.message);
                }
            } catch (e) {
                console.error('JSON parsing error:', e);
                alert('Terjadi kesalahan dalam memproses response server');
            }
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            alert('Terjadi kesalahan saat menyimpan preferensi.');
        });
    });

    // Inisialisasi tampilan awal
    updateProgressBar(1);
});