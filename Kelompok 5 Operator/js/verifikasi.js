document.addEventListener("DOMContentLoaded", function () {

  // MODAL KONFIRMASI
  const modal = document.getElementById("modalConfirm");
  const modalMessage = document.getElementById("modalMessage");
  const confirmYes = document.getElementById("confirmYes");
  const confirmNo = document.getElementById("confirmNo");

  let selectedRow = null;
  let actionType = null;

  function openModal(message, row, type) {
    modalMessage.textContent = message;
    modal.style.display = "flex";
    selectedRow = row;
    actionType = type;
  }

  function closeModal() {
    modal.style.display = "none";
    selectedRow = null;
    actionType = null;
  }

  // BUTTON VERIFIKASI
  document.querySelectorAll(".btn-verif").forEach((button) => {
    button.addEventListener("click", function () {
      const row = this.closest("tr");

      if (row.getAttribute("data-status") === "verified") {
        openModal("Data sudah diverifikasi sebelumnya.", row, "info");
        return;
      }

      openModal("Yakin ingin memverifikasi data ini?", row, "verif");
    });
  });

  // BUTTON DELETE
  document.querySelectorAll(".btn-delete").forEach((button) => {
    button.addEventListener("click", function () {
      const row = this.closest("tr");

      if (row.getAttribute("data-status") === "verified") {
        openModal("Data sudah diverifikasi dan tidak dapat dihapus.", row, "blocked");
        return;
      }

      openModal("Yakin ingin menghapus data ini?", row, "delete");
    });
  });

  // CONFIRM YES
  confirmYes.addEventListener("click", function () {

    if (!selectedRow) return;

    // VERIFIKASI
    if (actionType === "verif") {

      if (selectedRow.getAttribute("data-status") === "verified") {
        closeModal();
        return;
      }

      const verifBtn = selectedRow.querySelector(".btn-verif");
      const deleteBtn = selectedRow.querySelector(".btn-delete");

      selectedRow.setAttribute("data-status", "verified");

      if (verifBtn) verifBtn.remove();

      if (deleteBtn) {
        deleteBtn.disabled = true;
        deleteBtn.style.opacity = "0.5";
        deleteBtn.style.cursor = "not-allowed";
      }

      if (!selectedRow.querySelector(".status-badge")) {
        const badge = document.createElement("span");
        badge.textContent = "Terverifikasi";
        badge.classList.add("status-badge", "status-verified");

        selectedRow.querySelector("td:last-child").prepend(badge);
      }
    }

    // DELETE
    if (actionType === "delete") {

      if (selectedRow.getAttribute("data-status") === "verified") {
        closeModal();
        return;
      }

      selectedRow.remove();
    }

    closeModal();
  });

  // CONFIRM NO
  confirmNo.addEventListener("click", closeModal);


  // PREVIEW PDF
  const pdfLinks = document.querySelectorAll(".pdf-link");
  const pdfModal = document.getElementById("pdfModal");
  const pdfViewer = document.getElementById("pdfViewer");
  const closePdfBtn = document.getElementById("closePdf");

  pdfLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const filePath = this.getAttribute("href");
      pdfViewer.src = filePath;
      pdfModal.style.display = "flex";
    });
  });

  closePdfBtn.addEventListener("click", function () {
    pdfViewer.src = "";
    pdfModal.style.display = "none";
  });

});