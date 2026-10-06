// =====================================================
//  AquaDex — app.js
//  ลำดับไฟล์: ค่าคงที่ → สถานะ → ฟังก์ชันช่วย → วาดหน้าจอ → เหตุการณ์ → เริ่มต้น
// =====================================================


// ---------- 1. ค่าคงที่ (ไม่เปลี่ยนระหว่างใช้งาน) ----------

const STATUS = {
  CR: { th: 'ใกล้สูญพันธุ์อย่างยิ่ง', color: '#ff5a5a' },
  EN: { th: 'ใกล้สูญพันธุ์',        color: '#ff8c4a' },
  VU: { th: 'มีแนวโน้มใกล้สูญพันธุ์', color: '#ffc94a' },
  NT: { th: 'ใกล้ถูกคุกคาม',        color: '#d9e36b' },
  LC: { th: 'ความกังวลน้อยที่สุด',   color: '#6fdc8c' },
  NE: { th: 'ยังไม่ได้ประเมิน',      color: '#a9b8c8' }
};

const SOUND_DELAY = 1000;   // รอกี่มิลลิวินาทีก่อนเล่นเสียงสัตว์

const scanSound = new Audio('sounds/scan.mp3');
scanSound.volume = 0.5;

const grid = document.querySelector('#grid');
const detail = document.querySelector('#detail');


// ---------- 2. สถานะปัจจุบัน (เปลี่ยนตามการใช้งาน) ----------

let currentCat = 'ทั้งหมด';
let currentQuery = '';
let currentAnimal = 0;
let currentImg = 0;
let scanTimer = null;


// ---------- 3. ฟังก์ชันช่วย ----------

// แปลงความยาวจากเมตร เป็นข้อความที่อ่านง่าย
function formatLength(m) {
  if (m < 1) return Math.round(m * 100) + ' ซม.';
  return m + ' ม.';
}

// คืนแท็กรูปจากที่อยู่ไฟล์ ถ้าไม่มีที่อยู่ (ว่างหรือ undefined) จะคืนกล่อง ? แทน
function picture(src, cls) {
  if (src) {
    return `<img class="${cls}" src="${src}">`;
  }
  return `<div class="${cls} placeholder">?</div>`;
}

// เล่นเสียงสแกนทันที แล้วตามด้วยเสียงสัตว์
function playSounds(e) {
  scanSound.currentTime = 0;
  scanSound.play();

  clearTimeout(scanTimer);
  if (e.sound) {
    scanTimer = setTimeout(() => new Audio(e.sound).play(), SOUND_DELAY);
  }
}


// ---------- 4. วาดหน้าจอ ----------

// วาดรายการการ์ดตามหมวดและคำค้นปัจจุบัน
function render() {
  grid.innerHTML = '';

  const list = D.filter(e =>
    (currentCat === 'ทั้งหมด' || e.cat === currentCat) &&
    (e.th.includes(currentQuery) ||
     e.en.toLowerCase().includes(currentQuery.toLowerCase()) ||
     e.no.includes(currentQuery))
  );

  for (const e of list) {
    grid.innerHTML += `
      <div class="card" data-no="${D.indexOf(e)}">
        ${picture(e.sprite, 'card-img')}
        <span class="no">${e.no}</span>
        <h3>${e.th}</h3>
        <p>${e.en}</p>
      </div>`;
  }
}

// เปิดหน้ารายละเอียดของสัตว์ลำดับที่ i
function showDetail(i) {
  currentAnimal = i;
  currentImg = 0;
  const e = D[i];
  const manyImgs = e.imgs.length > 1;

  detail.innerHTML = `
    <button id="close">✕ ปิด</button>

    <div id="viewer">
      ${manyImgs ? '<button id="prev">‹</button>' : ''}
      ${picture(e.imgs[0], 'big')}
      ${manyImgs ? '<button id="next">›</button>' : ''}
    </div>
    <div id="thumbs">
      ${e.imgs.map((src, i) => `<img class="thumb" src="${src}" data-i="${i}">`).join('')}
    </div>

    <span class="no">${e.no}</span>
    <h2>${e.th}</h2>
    <p><i>${e.en}</i></p>
    <p>${e.desc}</p>

    <dl class="facts">
      <dt>ความยาว</dt> <dd>${formatLength(e.size[0])}–${formatLength(e.size[1])}</dd>
      <dt>ความเร็ว</dt> <dd>${e.speed[0]}–${e.speed[1]} กม./ชม.</dd>
      <dt>ความลึก</dt>  <dd>${e.depth[0].toLocaleString()}–${e.depth[1].toLocaleString()} ม.</dd>
      <dt>อาหาร</dt>   <dd>${e.diet}</dd>
      <dt>สถานะ</dt>
      <dd>
        <span class="status" style="background:${STATUS[e.status].color}">${e.status}</span>
        ${STATUS[e.status].th}
      </dd>
    </dl>

    <div class="abilities">
      ${e.abilities.map(a => `<span class="ability">${a}</span>`).join('')}
    </div>`;

  detail.classList.add('open');
  playSounds(e);
}

// เปลี่ยนรูปใหญ่ให้ตรงกับ currentImg
function showImage() {
  const imgs = D[currentAnimal].imgs;
  document.querySelector('.big').src = imgs[currentImg];
}


// ---------- 5. เหตุการณ์ ----------

// กดปุ่มหมวด
document.querySelector('#chips').addEventListener('click', ev => {
  const btn = ev.target.closest('button');
  if (btn) {
    currentCat = btn.dataset.cat;
    render();
  }
});

// พิมพ์ในช่องค้นหา
document.querySelector('#search').addEventListener('input', ev => {
  currentQuery = ev.target.value;
  render();
});

// กดการ์ด
grid.addEventListener('click', ev => {
  const card = ev.target.closest('.card');
  if (card) showDetail(Number(card.dataset.no));
});

// กดของในหน้ารายละเอียด: ปุ่มเลื่อน รูปย่อ ปุ่มปิด
detail.addEventListener('click', ev => {
  const total = D[currentAnimal].imgs.length;

  if (ev.target.id === 'prev') {
    currentImg = currentImg - 1;
    if (currentImg < 0) currentImg = total - 1;
    showImage();
  }
  if (ev.target.id === 'next') {
    currentImg = currentImg + 1;
    if (currentImg >= total) currentImg = 0;
    showImage();
  }
  if (ev.target.classList.contains('thumb')) {
    currentImg = Number(ev.target.dataset.i);
    showImage();
  }
  if (ev.target.id === 'close') {
    detail.classList.remove('open');
  }
});


// ---------- 6. เริ่มต้น ----------

render();