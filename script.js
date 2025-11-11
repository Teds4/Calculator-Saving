// Ambil elemen-elemen penting
const categorySelect = document.getElementById("category");
const plantSelect = document.getElementById("plant");
const inputs = document.querySelectorAll(".inputan input");
const savingsDisplay = document.getElementById("savings");
const formulaRow = document.getElementById("formula");
const kata = document.getElementById("kata");
const motivation = document.getElementById("motivation");
const clearBtn = document.getElementById("clearAll");

// Variabel penyimpanan data per plant (misal tarif atau faktor pengali berbeda)
const plantMultiplier = {
  satu: 1.0,
  dua: 1.2,
  tiga: 0.9,
  empat: 1.1,
};

// Variabel tarif dan harga per kategori
const categorySettings = {
  electricity: { label: "Electricity", rate: 16000 },
  water: { label: "Water", rate: 12000 },
  fuel: { label: "Fuel", rate: 15000 },
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
}

// Fungsi untuk menghitung hasil saving
function calculateSavings() {
  const category = categorySelect.value;
  const plant = plantSelect.value;

  if (!category || !plant) return;

  const before = parseFloat(inputs[0].value);
  const after = parseFloat(inputs[1].value);
  const output = parseFloat(inputs[2].value);

  if (isNaN(before) || isNaN(after) || isNaN(output)) {
    savingsDisplay.textContent = "-";
    return;
  }

  const multiplier = plantMultiplier[plant];
  const { rate } = categorySettings[category];
  let saving = 0;

  switch (category) {
    case "electricity":
      saving = (before - after) * output * rate * multiplier;
      break;
    case "water":
      saving = (before - after) * rate * multiplier;
      break;
    case "fuel":
      saving = (before - after) * output * rate * multiplier;
      break;
  }

  // Tampilkan hasil ke ringkasan
  savingsDisplay.textContent = saving.toLocaleString("id-ID");

  // Tentukan motivasi
  if (saving > 0) {
    kata.textContent = "Good Job!";
    motivation.textContent = "Sesuai target, Mantap! 💪";
    kata.style.color = "#1c7430"; // hijau
  } else {
    kata.textContent = "Uwaduh!";
    motivation.textContent =
      "Ini bukan kegagalan, Silahkeun evaluasi kembali ⚙️";
    kata.style.color = "#c82333"; // merah
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
  kata.style.color = "#ffff";
}

// Event listener
categorySelect.addEventListener("change", updateFormula);
inputs.forEach((input) => input.addEventListener("input", calculateSavings));
plantSelect.addEventListener("change", calculateSavings);
clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  clearAll();
});

