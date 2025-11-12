// Ambil elemen-elemen penting
const categorySelect = document.getElementById("category");
const plantSelect = document.getElementById("plant");
const inputs = document.querySelectorAll(".inputan input");
const savingsDisplay = document.getElementById("savings");
const formulaRow = document.getElementById("formula");
const kata = document.getElementById("kata");
const motivation = document.getElementById("motivation");
const clearBtn = document.getElementById("clearAll");

// Data rate per kategori & plant
const rateData = {
  electricity: { satu: 16000, dua: 15000, tiga: 17000, empat: 20000 },
  water: { satu: 12000, dua: 13500, tiga: 14000, empat: 16000 },
  fuel: { satu: 15000, dua: 14000, tiga: 17000, empat: 19000 },
};

// Fungsi untuk update satuan di tabel rumus bawah kolom
function updateFormula() {
  const category = categorySelect.value;
  let beforeUnit = "";
  let afterUnit = "";
  let outputUnit = "";

  switch (category) {
    case "electricity":
      beforeUnit = "kWh/kg";
      afterUnit = "kWh/kg";
      outputUnit = "(kg)";
      break;
    case "water":
      beforeUnit = "L/bulan";
      afterUnit = "L/bulan";
      outputUnit = "-";
      break;
    case "fuel":
      beforeUnit = "L/jam";
      afterUnit = "L/jam";
      outputUnit = "(jam)";
      break;
    default:
      beforeUnit = afterUnit = outputUnit = "";
  }

  formulaRow.innerHTML = `
    <td style="text-align:center; font-weight:bold;">${beforeUnit}</td>
    <td style="text-align:center; font-weight:bold;">${afterUnit}</td>
    <td style="text-align:center; font-weight:bold;">${outputUnit}</td>
  `;

  // 🔧 Tambahkan ini agar rate ikut berubah saat kategori berubah
  calculateSavings();
}

// Fungsi untuk menghitung hasil saving
function calculateSavings() {
  const category = categorySelect.value;
  const plant = plantSelect.value;

  if (!category || !plant) return;

  const before = parseFloat(inputs[0].value);
  const after = parseFloat(inputs[1].value);
  const output = parseFloat(inputs[2].value);

  if (
    isNaN(before) ||
    isNaN(after) ||
    (category !== "water" && isNaN(output))
  ) {
    savingsDisplay.textContent = "-";
    return;
  }

  // Ambil rate berdasarkan kategori & plant
  const rate = rateData[category]?.[plant] || 0;
  let saving = 0;

  switch (category) {
    case "electricity":
      saving = (before - after) * output * rate;
      break;
    case "water":
      saving = (before - after) * rate;
      break;
    case "fuel":
      saving = (before - after) * output * rate;
      break;
  }

  // Tampilkan hasil ke ringkasan
  savingsDisplay.textContent = saving.toLocaleString("id-ID");

  // Tentukan motivasi
  if (saving > 0) {
    kata.textContent = "Good Job!";
    motivation.textContent = "Sesuai target, Mantap! 💪";
    kata.style.color = "#1c7430"; // hijau
  } else if (saving < 0) {
    kata.textContent = "Uwaduh!";
    motivation.textContent =
      "Ini bukan kegagalan, Silahkeun evaluasi kembali ⚙️";
    kata.style.color = "#c82333"; // merah
  } else {
    kata.textContent = "Semangat!";
    motivation.textContent = "Masukkan data dengan benar untuk hasil akurat.";
    kata.style.color = "#fff";
  }
}

// Fungsi untuk reset semua input
function clearAll() {
  inputs.forEach((i) => (i.value = ""));
  savingsDisplay.textContent = "-";
  kata.textContent = "Semangat!";
  motivation.textContent = "Semoga hari anda menyenangkan, sukses selalu!";
  formulaRow.innerHTML = "<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
  categorySelect.selectedIndex = 0;
  plantSelect.selectedIndex = 0;
  kata.style.color = "#fff";
}

// Event listener
categorySelect.addEventListener("change", updateFormula);
inputs.forEach((input) => input.addEventListener("input", calculateSavings));
plantSelect.addEventListener("change", calculateSavings);
clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  clearAll();
});
