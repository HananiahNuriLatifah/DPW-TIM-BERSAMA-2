document.addEventListener("DOMContentLoaded", function () {

    const tabel = document.querySelector("table");

    tabel.addEventListener("click", function (event) {

        if (event.target.classList.contains("button") &&
            event.target.textContent.trim() === "Hapus") {

            event.preventDefault();

            const konfirmasi = confirm("Yakin ingin menghapus data ini?");

            if (konfirmasi) {
                const baris = event.target.closest("tr");
                if (baris) {
                    baris.remove();
                }
            }
        }

    });

});




