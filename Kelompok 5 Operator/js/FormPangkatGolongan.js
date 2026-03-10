let intervalRedirect;

function tampilkanForm() {
    const status = document.getElementById("status").value;
    const dosen = document.getElementById("formDosen");
    const tendik = document.getElementById("formTendik");

    dosen.style.display = "none";
    tendik.style.display = "none";

    if (status === "dosen") {
        dosen.style.display = "block";
    } else if (status === "tendik") {
        tendik.style.display = "block";
    }
}


function validasiForm() {
    const status = document.getElementById("status").value;
    const regexNama = /^[a-zA-Z\s,.]+$/;
    const regexAngka = /^[0-9]+$/;

    let valid = true;

    // RESET SEMUA ERROR DULU
    const errorIds = [
        "error_nama_dosen",
        "error_nip_dosen",
        "error_nama_tendik",
        "error_nip_tendik",
        "error_file_dosen",
        "error_file_tendik"
    ];

    errorIds.forEach(id => {
        if (document.getElementById(id)) {
            document.getElementById(id).textContent = "";
        }
    });

    if (status === "") {
        alert("Silakan pilih Status Pegawai terlebih dahulu!");
        return false;
    }

    let nama, nip, label, errorNama, errorNip;

    if (status === "dosen") {
        nama = document.getElementById("nama_dosen").value.trim();
        nip = document.getElementById("nip_dosen").value.trim();
        errorNama = document.getElementById("error_nama_dosen");
        errorNip = document.getElementById("error_nip_dosen");
        label = "Dosen";
    } else {
        nama = document.getElementById("nama_tendik").value.trim();
        nip = document.getElementById("nip_tendik").value.trim();
        errorNama = document.getElementById("error_nama_tendik");
        errorNip = document.getElementById("error_nip_tendik");
        label = "Tendik";
    }

    // VALIDASI NAMA
    if (nama === "") {
        errorNama.textContent = "Nama " + label + " tidak boleh kosong!";
        valid = false;
    } 
    else if (!regexNama.test(nama)) {
        errorNama.textContent = "Nama hanya boleh huruf (tanpa angka/simbol).";
        valid = false;
    }

    // VALIDASI NIP
    if (nip === "") {
        errorNip.textContent = "NIP tidak boleh kosong!";
        valid = false;
    } 
    else if (!regexAngka.test(nip)) {
        errorNip.textContent = "NIP hanya boleh berisi angka.";
        valid = false;
    }

let fileInput, errorFile;

if (status === "dosen") {
    fileInput = document.getElementById("sk_dosen");
    errorFile = document.getElementById("error_file_dosen");
} else {
    fileInput = document.getElementById("sk_tendik");
    errorFile = document.getElementById("error_file_tendik");
}

if (!fileInput || fileInput.files.length === 0) {
    errorFile.textContent = "File SK wajib diupload!";
    valid = false;
} else {
    const file = fileInput.files[0];
    const maxSize = 10 * 1024 * 1024; // 10MB dalam byte

    if (file.size > maxSize) {
        errorFile.textContent = "Ukuran file maksimal 10MB!";
        valid = false;
    }
}

    if (!valid) return false;

    // JIKA LOLOS
    alert("Data Berhasil Disimpan! Anda akan dialihkan dalam 3 detik.");

let detik = 3;
    intervalRedirect = setInterval(function () {
        detik--;

        if (detik <= 0) {
            clearInterval(intervalRedirect);
            window.location.href = "pangkat_golongan.html";
        }
    }, 1000);

    return false;
}

// ===============================
// KONFIRMASI RESET
// ===============================
function konfirmasiReset() {
    let yakin = confirm("Apakah Anda yakin ingin menghapus semua isian?");
    
    if (yakin) {
        if (intervalRedirect) clearInterval(intervalRedirect);

        document.getElementById("formDosen").style.display = "none";
        document.getElementById("formTendik").style.display = "none";
        return true;
    }

    return false;
}
function kembaliHalaman() {
    window.location.href = "pangkat_golongan.html";
}