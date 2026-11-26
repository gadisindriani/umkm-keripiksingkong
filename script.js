const dataProduk = [
    { id: 'original', nama: 'Original Gurih', harga: 15000, img: 'assets/images/original.jpg' },
    { id: 'balado', nama: 'Balado Pedas', harga: 17000, img: 'assets/images/balado.jpg' }
];

const rupiah = (angka) => "Rp " + angka.toLocaleString('id-ID');
const grid = document.getElementById('gridProduk');
const select = document.getElementById('varian');

dataProduk.forEach(p => {
    let visual = p.img 
        ? `<img src="${p.img}" alt="${p.nama}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><div class="card-img-fallback" style="display:none;">🍠</div>`
        : `<div class="card-img-fallback">🍠</div>`;

    grid.innerHTML += `
        <div class="card">
            ${visual}
            <h3>${p.nama}</h3>
            <span class="price">${rupiah(p.harga)}</span>
            <button class="btn" style="font-size:0.9rem; margin-top: auto;" onclick="pilih('${p.id}')">Pesan Varian Ini</button>
        </div>
    `;

    select.innerHTML += `<option value="${p.id}" data-harga="${p.harga}">${p.nama} - ${rupiah(p.harga)}</option>`;
});

const inputJumlah = document.getElementById('jumlah');
const txtTotal = document.getElementById('txtTotal');

function hitung() {
    let harga = parseInt(select.options[select.selectedIndex].dataset.harga) || 0;
    let qty = parseInt(inputJumlah.value) || 1;
    txtTotal.innerText = rupiah(harga * qty);
}
select.addEventListener('change', hitung);
inputJumlah.addEventListener('input', hitung);
hitung();

function pilih(id) {
    select.value = id;
    hitung();
    document.getElementById('pesan').scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('formPesanan').addEventListener('submit', function(e) {
    e.preventDefault();
    let nama = document.getElementById('nama').value;
    let wa = document.getElementById('wa').value;
    let alamat = document.getElementById('alamat').value;
    let qty = inputJumlah.value;
    let item = dataProduk.find(p => p.id === select.value);
    let total = item.harga * qty;

    let pesan = `Halo Kak Gadis! 💕%0A%0ASaya mau pesan Keripik:%0A*Nama:* ${nama}%0A*WA:* ${wa}%0A*Varian:* ${item.nama}%0A*Jumlah:* ${qty} pack%0A*Total:* ${rupiah(total)}%0A%0A*Alamat:*%0A${alamat}%0A%0AMohon info ongkirnya ya Kak. Terima kasih!`;
    
    window.open(`https://wa.me/6283897404382?text=${pesan}`, '_blank');
});