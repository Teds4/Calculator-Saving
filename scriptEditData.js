// === Default rate awal ===
const defaultRates = {
  electricity: { satu: 16000, dua: 15000, tiga: 17000, empat: 20000 },
  water: { satu: 12000, dua: 13500, tiga: 14000, empat: 16000 },
  fuel: { satu: 15000, dua: 14000, tiga: 17000, empat: 19000 },
};

// === Ambil rate dari localStorage (kalau ada) ===
const savedRates = JSON.parse(localStorage.getItem("rates") || "{}");

// Gabungkan default dan yang tersimpan
const rateData = { ...defaultRates };

// Perbarui dengan nilai tersimpan, jika ada
Object.keys(savedRates).forEach((cat) => {
  if (!rateData[cat]) rateData[cat] = {};
  Object.keys(savedRates[cat]).forEach((plant) => {
    rateData[cat][plant] = savedRates[cat][plant];
  });
});

// === Buat tabel ===
const tbody = document.querySelector("#rateTable tbody");
tbody.innerHTML = "";

Object.keys(rateData).forEach((category) => {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td style="font-weight:bold;">${category}</td>
    ${["satu", "dua", "tiga", "empat"]
      .map(
        (plant) => `
      <td>
        <input 
          type="number" 
          value="${rateData[category][plant] || 0}" 
          data-category="${category}" 
          data-plant="${plant}" 
        />
      </td>
    `
      )
      .join("")}
  `;

  tbody.appendChild(row);
});

// === Simpan perubahan ===
document.getElementById("saveRates").addEventListener("click", () => {
  const inputs = document.querySelectorAll("input[data-category]");
  const updatedRates = {};

  inputs.forEach((input) => {
    const category = input.dataset.category;
    const plant = input.dataset.plant;
    const value = parseFloat(input.value) || 0;

    if (!updatedRates[category]) updatedRates[category] = {};
    updatedRates[category][plant] = value;
  });

  // Simpan ke localStorage
  localStorage.setItem("rates", JSON.stringify(updatedRates));
  alert("✅ Rate berhasil disimpan!");
});

// === Hilangkan efek hover saat input aktif ===
const tableCells = document.querySelectorAll("td");

tableCells.forEach((cell) => {
  const input = cell.querySelector("input");
  if (input) {
    input.addEventListener("focus", () => {
      cell.style.backgroundColor = "transparent";
    });
    input.addEventListener("blur", () => {
      cell.style.backgroundColor = "";
    });
  }
});
