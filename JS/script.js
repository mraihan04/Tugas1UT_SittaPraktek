//modal

function bukaModal(id) {
    document.getElementById(id).classList.add('aktif');
}

function tutupModal(id) {
    document.getElementById(id).classList.remove('aktif');
}

//login

function doLogin() {
    var email = document.getElementById('inp-email').value.trim();
    var pass  = document.getElementById('inp-password').value;

    if (!email || !pass) {
        bukaModal('modal-error');
        return;
    }

    var user = null;
    for (var i = 0; i < dataPengguna.length; i++) {
        if (dataPengguna[i].email === email && dataPengguna[i].password === pass) {
            user = dataPengguna[i];
            break;
        }
    }

    if (!user) {
        bukaModal('modal-error');
        return;
    }

    sessionStorage.setItem('user_login', JSON.stringify(user));
    window.location.href = 'dashboard.html';
}

//lupa password

function kirimReset() {
    var email = document.getElementById('inp-reset-email').value.trim();
    if (!email) {
        alert('Masukkan email terlebih dahulu.');
        return;
    }
    tutupModal('modal-lupa');
    alert('Link reset password telah dikirim ke ' + email);
}

//Daftar

function doDaftar() {
    tutupModal('modal-daftar');
    alert('Pendaftaran berhasil! Silahkan login.');
}

function toggleDropdown(el) {
        var content = el.nextElementSibling;
        var arrow   = el.querySelector('.arrow');
        var isOpen  = content.classList.contains('open');
        content.classList.toggle('open', !isOpen);
        arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
    }

//Dropdown navigasi

function toggleDropdown(el) {
        var content = el.nextElementSibling;
        var arrow   = el.querySelector('.arrow');
        var isOpen  = content.classList.contains('open');
        content.classList.toggle('open', !isOpen);
        arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
    }

// keluar

function doKeluar() {
    sessionStorage.removeItem('user_login');
    window.location.href = 'index.html';
}

//Dashboard

function dashboard() {
    var jam = new Date().getHours();
    var sapa;

    if (jam >= 5 && jam < 11) {
        sapa = 'selamat pagi';
    } else if (jam >= 11 && jam < 15) {
        sapa = 'selamat siang';
    } else if (jam >= 15 && jam < 19) {
        sapa = 'selamat sore';
    } else {
        sapa = 'selamat malam';
    }

    document.getElementById('welcome').textContent = sapa;
}

// Bahan Ajar

var listBuku = JSON.parse(JSON.stringify(dataBahanAjar));
    function renderBuku() {
        var container = document.getElementById('list-buku');
        container.innerHTML = '';
        listBuku.forEach(function(item) {
            var card = document.createElement('div');
            card.className = 'buku-card';
            var coverHTML = item.cover
                ? '<img src="' + item.cover + '" alt="' + item.namaBarang + '">'
                : '<span class="cover-placeholder">📘</span>';
            card.innerHTML =
                '<div class="buku-cover">' + coverHTML + '</div>' +
                '<div class="buku-info">' +
                    '<div class="buku-nama">' + item.namaBarang + '</div>' +
                    '<div class="buku-meta">' +
                        '<span>Kode &nbsp;&nbsp;: <strong>' + item.kodeBarang + '</strong></span>' +
                        '<span>Lokasi &nbsp;: <strong>' + item.kodeLokasi + '</strong></span>' +
                        '<span>Edisi &nbsp;&nbsp;: <strong>' + item.edisi + '</strong></span>' +
                    '</div>' +
                '</div>' +
                '<div class="buku-stok">stok : ' + item.stok + '</div>';
            container.appendChild(card);
        });
    }

function tambahStok() {
        var kode   = document.getElementById('inp-kode').value.trim().toUpperCase();
        var jumlah = parseInt(document.getElementById('inp-jumlah').value);
        var found = false;
        for (var i = 0; i < listBuku.length; i++) {
            if (listBuku[i].kodeBarang.toUpperCase() === kode) {
                listBuku[i].stok += jumlah;
                found = true;
                break;
            }
        }
        if (!found) {
            bukaModal('modal-error-buku');
            return;
        }
        renderBuku();
        document.getElementById('inp-kode').value   = '';
        document.getElementById('inp-jumlah').value = '';
    }

//tracking

function doLacak() {
    var no   = document.getElementById('input-do').value.trim();
    var wrap = document.getElementById('tracking-result');

    if (!no) {
        wrap.innerHTML = '';
        return;
    }

    var data = dataTracking[no];

    if (!data) {
        wrap.innerHTML =
            '<div class="tracking-kosong">' +
                '<p>Nomor DO <strong>' + no + '</strong> tidak ditemukan.</p>' +
            '</div>';
        return;
    } 

    var perjalanan = data.perjalanan.slice().reverse();

    var perjalananHTML = perjalanan.map(function(item, idx) {
        var isLatest = idx === 0;
        var parts    = item.waktu.split(' ');
        var tanggal  = parts[0];
        var jam      = parts[1];
        return (
            '<div class="journey-item ' + (isLatest ? 'latest' : '') + '">' +
                '<div class="journey-dot"></div>' +
                '<div class="journey-ket">' + item.keterangan + '</div>' +
                '<div class="journey-waktu">' +
                    '<span>' + tanggal + '</span>' +
                    '<span>' + jam + '</span>' +
                '</div>' +
            '</div>'
        );
    }).join('');

    wrap.innerHTML =
        '<div class="tracking-card">' +

            '<div class="trk-header">' +
                '<div class="trk-nama">' + data.nama.toUpperCase() + '</div>' +
                '<div class="trk-tanggal">' + data.tanggalKirim + '</div>' +
            '</div>' +

            '<div class="trk-info-atas">' +
                '<div class="trk-row"><span class="trk-label">Nomor DO</span><span class="trk-sep">:</span><span>' + data.nomorDO + '</span></div>' +
                '<div class="trk-row"><span class="trk-label">Status</span><span class="trk-sep">:</span><span>' + data.status + '</span></div>' +
            '</div>' +

            '<hr class="trk-divider">' +

            '<div class="trk-info-bawah">' +
                '<div class="trk-row"><span class="trk-label">Ekspedisi</span><span class="trk-sep">:</span><span>' + data.ekspedisi + '</span></div>' +
                '<div class="trk-row"><span class="trk-label">Paket</span><span class="trk-sep">:</span><span>' + data.paket + '</span></div>' +
                '<div class="trk-row"><span class="trk-label">Total Bayar</span><span class="trk-sep">:</span><span>' + data.total + '</span></div>' +
            '</div>' +

        '</div>' +

        /* ── Perjalanan paket ── */
        '<div class="tracking-card">' +
            '<div class="journey-title">Perjalanan Paket</div>' +
            '<div class="journey-list">' + perjalananHTML + '</div>' +
        '</div>';
}