// Inisialisasi SDK Supabase untuk Real-time (WebSocket)
const supabaseClient = supabase.createClient(SB_URL.replace('/rest/v1', ''), SB_KEY);

function fetchPeminjaman() {
    $.ajax({
        url: `${SB_URL}/peminjaman?select=*,ruangan(*)&status_kunci=neq.2`,
        method: "GET",
        headers: SB_HEADERS,
        success: function(data) {
            renderPintu(data);
        }
    });
}

function renderPintu(data) {
    let html = '';
    if (data.length === 0) {
        html = `<div class="col-12 text-center text-muted">Tidak ada aktivitas peminjaman saat ini.</div>`;
    } else {
        data.forEach(p => {
            const isOpen = p.status_kunci === '1';
            const theme = isOpen ? 'success' : 'primary';
            html += `
            <div class="col-md-6 col-lg-4">
                <div class="card border-0 shadow-sm rounded-4 p-4 mb-3">
                    <div class="d-flex justify-content-between mb-3">
                        <div class="p-3 bg-${theme} bg-opacity-10 rounded-4">
                            <i class="bi bi-door-${isOpen ? 'open' : 'closed'}-fill text-${theme} fs-3"></i>
                        </div>
                        <span class="badge bg-${theme}-subtle text-${theme} rounded-pill px-3 py-2 align-self-start small fw-bold">
                            ${isOpen ? 'UNLOCKED' : 'LOCKED'}
                        </span>
                    </div>
                    <h5 class="fw-bold mb-1">${p.ruangan.nama_ruangan}</h5>
                    <p class="text-muted small mb-4"><i class="bi bi-geo-alt me-1"></i>${p.ruangan.lokasi}</p>
                    <button onclick="controlPintu(${p.id}, '${isOpen ? '0' : '1'}')" class="btn btn-${theme} w-100 rounded-3 fw-bold py-2 shadow-sm">
                        ${isOpen ? 'KUNCI PINTU' : 'BUKA PINTU'}
                    </button>
                </div>
            </div>`;
        });
    }
    $('#pintuContainer').html(html);
}

function controlPintu(id, status) {
    $.ajax({
        url: `${SB_URL}/peminjaman?id=eq.${id}`,
        method: "PATCH",
        headers: SB_HEADERS,
        data: JSON.stringify({ status_kunci: status })
    });
}

// Fungsi Real-time: Update otomatis tanpa refresh
function initRealtime() {
    supabaseClient
        .channel('db-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'peminjaman' }, () => {
            fetchPeminjaman();
        })
        .subscribe();
}