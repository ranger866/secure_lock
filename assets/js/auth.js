function checkAuth() {
  const session = localStorage.getItem("user_session");

  // 1. Cek apakah datanya ada?
  if (!session) {
    window.location.href = "index.html";
    return null;
  }

  try {
    // 2. Coba parse. Jika isinya cuma teks "session" (bukan JSON), dia akan gagal di sini
    return JSON.parse(session);
  } catch (e) {
    // 3. Jika gagal parse, hapus data rusak dan tendang ke login
    console.error("Data session rusak, menghapus...");
    localStorage.removeItem("user_session");
    window.location.href = "index.html";
    return null;
  }
}

// Fungsi Login
function loginUser(username, password) {
  return $.ajax({
    url: `${SB_URL}/users?username=eq.${username}&password=eq.${password}&select=*`,
    method: "GET",
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
  });
}

function logoutUser() {
  Swal.fire({
    title: "Logout?",
    text: "Anda akan dikeluarkan dari sistem!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Keluar",
  }).then((res) => {
    if (res.isConfirmed) {
      localStorage.clear();
      window.location.href = "index.html";
    }
  });
}
