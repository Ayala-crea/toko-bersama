document.addEventListener("DOMContentLoaded", function () {
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
            <td>
            <button onclick="deleteUserData(${
              index + 1
            })" class="btn btn-danger delete-btn" data-id="${
          item.id_user
        }">Hapus</button>
            <!-- Tombol edit -->
          <button onclick="editUserData(${
            index + 1
          })" class="btn btn-primary edit-btn" data-id="${
          item.id_user
        }">Edit</button>

            </td>
          `;
        dataBody.appendChild(row); // Menambahkan baris baru ke dalam elemen tbody
      });
    })
    .catch((error) => console.error(error));
}

document
  .getElementById("formData")
  .addEventListener("submit", function (event) {
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
      asal_kota: asalKota,
    };

    // Panggil fungsi untuk mengirim data
    postData(data);
  });

function postData(data) {
  const apiUrl = "http://127.0.0.1:3000/api/belajar/tambahdata";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(apiUrl, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Gagal mengirim data");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data berhasil dikirim:", data);
      alert("Data berhasil terkirim");
      // Hapus isi form
      document.getElementById("nama").value = "";
      document.getElementById("npm").value = "";
      document.getElementById("kelas").value = "";
      document.getElementById("asal_kota").value = "";
    })
    .catch((error) => {
      console.error("Terjadi kesalahan:", error);
    });
}

function deleteUserData(id_user) {
  fetch(`http://127.0.0.1:3000/api/belajar/hapus/${id_user}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Pengguna berhasil dihapus:", data);
      // Menampilkan alert bahwa pengguna berhasil dihapus
      alert("Pengguna berhasil dihapus");
      // Memuat ulang halaman setelah alert ditampilkan
      window.location.reload();
    })
    .catch((error) => {
      console.error("There was a problem with the delete operation:", error);
    });
}

// Fungsi untuk menangani operasi pengeditan
function editUserData(id_user) {
  // Memanggil endpoint API untuk mendapatkan data pengguna berdasarkan ID
  fetch(`http://127.0.0.1:3000/api/belajar/${id_user}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Mengonversi respons menjadi JSON
    })
    .then((data) => {
      // Memuat data pengguna ke dalam formulir untuk diedit
      document.getElementById("nama").value = data.nama;
      document.getElementById("npm").value = data.npm;
      document.getElementById("kelas").value = data.kelas;
      document.getElementById("asal_kota").value = data.asal_kota;
    })
    .catch((error) => {
      console.error(
        "Terjadi masalah saat memuat data pengguna untuk diedit:",
        error
      );
    });
}

// Mengambil nilai input dari form
const nama = document.getElementById('nama').value;
const npm = document.getElementById('npm').value;
const kelas = document.getElementById('kelas').value;
const asal_kota = document.getElementById('asal_kota').value;

// Membuat objek newData dari nilai input
const newData = {
  nama: nama,
  npm: npm,
  kelas: kelas,
  asal_kota: asal_kota
};

// Memanggil fungsi updateUserData dengan ID pengguna (ganti 123 dengan ID pengguna yang sesuai)
const id_user = 123; // Ganti 123 dengan ID pengguna yang ingin diperbarui
updateUserData(id_user, newData);


// Fungsi untuk melakukan permintaan PUT ke API
function updateUserData(id_user, newData) {
// Menentukan URL endpoint dengan menggunakan ID pengguna yang diberikan
const url = `http://127.0.0.1:3000/api/belajar/update/${id_user}`;

// Konfigurasi permintaan PUT
const requestOptions = {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newData) // Mengonversi data baru menjadi JSON
};

// Mengirim permintaan PUT ke server
fetch(url, requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Mengonversi respons menjadi JSON
  })
  .then(data => {
    console.log('Data berhasil diperbarui:', data);
    alert('Data berhasil diperbarui'); // Menampilkan alert ketika data berhasil diperbarui
    // Lakukan sesuatu setelah data diperbarui, jika diperlukan
  })
  .catch(error => {
    console.error('Terjadi masalah saat memperbarui data:', error);
  });
}

// Menambahkan event listener untuk form
document.getElementById('updateForm').addEventListener('submit', handleSubmit);