// =====================================================
//  AquaDex — data.js
//  sprite = รูปปกบนการ์ด, imgs = รูปในแกลเลอรี (ว่างได้ จะขึ้นกล่อง ?)
//  หน่วย: size = เมตร, speed = กม./ชม., depth = เมตรจากผิวน้ำ
//  ค่าที่มีคอมเมนต์ "ประมาณ" ยังไม่ได้ยืนยันจากแหล่งอ้างอิง ควรค้นเพิ่ม
// =====================================================

const D = [
  {
    no: '#001', th: 'ปลาการ์ตูน', en: 'Clownfish', cat: 'ปลาทะเล',
    desc: 'อาศัยอยู่กับดอกไม้ทะเล ทุกตัวเกิดเป็นเพศผู้',
    size: [0.08, 0.11],
    speed: [1, 3],          // ประมาณ
    depth: [1, 15],
    diet: 'แพลงก์ตอน สาหร่าย',
    status: 'NE',
    abilities: ['เปลี่ยนเพศได้', 'ภูมิคุ้มกันพิษดอกไม้ทะเล'],
    sprite: 'images/clownfish-sprite.jpg',
    imgs: ['images/clownfish-1.jpg', 'images/clownfish-2.jpg'],
    sound: 'sounds/clownfish.mp3'
  },
  {
    no: '#002', th: 'ปลาสินสมุทรจักรพรรดิ', en: 'Emperor angelfish', cat: 'ปลาทะเล',
    desc: 'ตอนเด็กมีลายวงกลมสีน้ำเงินขาว พอโตจะเปลี่ยนเป็นลายเส้นเหลืองน้ำเงินจนดูเหมือนคนละชนิด',
    size: [0.3, 0.4],
    speed: [1, 5],          // ประมาณ
    depth: [1, 100],
    diet: 'ฟองน้ำ สาหร่าย เพรียงหัวหอม',
    status: 'LC',
    abilities: ['เปลี่ยนลายเมื่อโต', 'ส่งเสียงขู่ได้'],
    sprite: '',
    imgs: [],
    sound: 'sounds/angelfish.mp3'
  },
  {
    no: '#003', th: 'ฉลามหัวค้อนใหญ่', en: 'Great hammerhead', cat: 'ฉลาม',
    desc: 'โดดเด่นด้วยหัวรูปร่างเหมือนค้อน ช่วยในการหาอาหารใต้ทะเลลึก',
    size: [3.5, 6],
    speed: [2, 40],         // ประมาณ
    depth: [1, 300],
    diet: 'ปลากระเบน ปลา หมึก',
    status: 'CR',
    abilities: ['รับคลื่นไฟฟ้าจากเหยื่อ', 'มองเห็นรอบทิศ'],
    sprite: '',
    imgs: [],
    sound: 'sounds/hammerhead.mp3'
  },
  {
    no: '#004', th: 'ปลากระเบนราหู', en: 'Manta ray', cat: 'ปลากระเบน',
    desc: 'ฉายา "ราชาแห่งท้องทะเล" มีขนาดใหญ่ที่สุดในกลุ่มกระเบน',
    size: [4, 7],           // ความกว้างจากปลายครีบถึงปลายครีบ
    speed: [2, 24],         // ประมาณ
    depth: [0, 1000],
    diet: 'แพลงก์ตอนสัตว์',
    status: 'EN',
    abilities: ['สมองใหญ่ที่สุดในหมู่ปลา', 'กระโดดพ้นน้ำได้'],
    sprite: '',
    imgs: [],
    sound: 'sounds/manta.mp3'
  },
  {
    no: '#005', th: 'กั้งตั๊กแตน', en: 'Mantis shrimp', cat: 'สัตว์ไม่มีกระดูกสันหลัง',
    desc: 'สิงห์สังเวียนแห่งท้องทะเล',
    size: [0.05, 0.2],           // ความกว้างจากปลายครีบถึงปลายครีบ
    speed: [16, 40],         // ประมาณ
    depth: [0, 100],    
    diet: 'ปู หอย ปลาขนาดเล็ก',
    status: 'NE',
    abilities: ['หมัดแรงดันสูง'],
    sprite: 'images/mantisshrimp-sprite.jpg',
    imgs: ['images/mantisshrimp-1.jpg', 'images/mantisshrimp-2.jpg'],
    sound: 'sounds/mantisshrimp.mp3'
  }
];