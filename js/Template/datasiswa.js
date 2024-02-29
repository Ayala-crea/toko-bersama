
document.addEventListener("DOMContentLoaded", function() {
    getData();
});
function getData() {
    const apiUrl = "http://127.0.0.1:3000/api/belajar";
    const dataBody = document.getElementById("dataBody"); // Mengambil referensi ke elemen tbody
  
    fetch(apiUrl)
      .then((result) => result.json())
      .then((response) => {
        // Pastikan respons memiliki properti 'data' yang merupakan array
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Format respons tidak sesuai");
        }
        
        // Menghapus data yang sudah ada sebelumnya
        dataBody.innerHTML = "";
  
        // Iterasi data dan masukkan ke dalam tabel
        response.data.forEach((item, index) => {
          const row = document.createElement("tr"); // Membuat elemen tr baru untuk setiap item data
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.nama}</td>
            <td>${item.npm}</td>
            <td>${item.kelas}</td>
            <td>${item.asal_kota}</td>
          `;
          dataBody.appendChild(row); // Menambahkan baris baru ke dalam elemen tbody
        });
      })
      .catch((error) => console.error(error));
  }
  
  document.getElementById("formData").addEventListener("submit", function(event) {
    event.preventDefault(); // Menghentikan aksi default dari form submit
  
    // Mengambil nilai dari input
    const nama = document.getElementById("nama").value;
    const npm = document.getElementById("npm").value;
    const kelas = document.getElementById("kelas").value;
    const asalKota = document.getElementById("asal_kota").value;
  
    // Menyusun data yang akan dikirim
    const data = {
      nama: nama,
      npm: npm,
      kelas: kelas,
      asal_kota: asalKota
    };
  
    // Panggil fungsi untuk mengirim data
    postData(data);
  });
  
  function postData(data) {
    const apiUrl = "http://127.0.0.1:3000/api/belajar/tambahdata";
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  
    fetch(apiUrl, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error("Gagal mengirim data");
        }
        return response.json();
      })
      .then(data => {
        console.log("Data berhasil dikirim:", data);
        alert("Data berhasil terkirim");
        // Hapus isi form
        document.getElementById("nama").value = "";
        document.getElementById("npm").value = "";
        document.getElementById("kelas").value = "";
        document.getElementById("asal_kota").value = "";
      })
      .catch(error => {
        console.error("Terjadi kesalahan:", error);
      });
  }
  