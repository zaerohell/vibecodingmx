const { createCanvas } = require('canvas');
const fs = require('fs');

const W = 180, H = 180, R = 38;
const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

function rrect(x1,y1,x2,y2,r){
  ctx.beginPath();
  ctx.moveTo(x1+r,y1);ctx.lineTo(x2-r,y1);ctx.arcTo(x2,y1,x2,y1+r,r);
  ctx.lineTo(x2,y2-r);ctx.arcTo(x2,y2,x2-r,y2,r);
  ctx.lineTo(x1+r,y2);ctx.arcTo(x1,y2,x1,y2-r,r);
  ctx.lineTo(x1,y1+r);ctx.arcTo(x1,y1,x1+r,y1,r);
  ctx.closePath();
}

// Clip
rrect(0,0,W,H,R); ctx.clip();

// BG black
ctx.fillStyle='#000'; ctx.fillRect(0,0,W,H);

// Blue orb top-left
const g1=ctx.createRadialGradient(20,20,0,20,20,110);
g1.addColorStop(0,'rgba(0,80,200,0.70)');g1.addColorStop(1,'rgba(0,0,0,0)');
ctx.fillStyle=g1;ctx.fillRect(0,0,W,H);

// Blue orb bottom-right
const g2=ctx.createRadialGradient(W-20,H-20,0,W-20,H-20,90);
g2.addColorStop(0,'rgba(20,30,120,0.55)');g2.addColorStop(1,'rgba(0,0,0,0)');
ctx.fillStyle=g2;ctx.fillRect(0,0,W,H);

// Glass card
rrect(10,10,W-10,H-10,26);
ctx.fillStyle='rgba(255,255,255,0.06)';ctx.fill();
rrect(10,10,W-10,H-10,26);
ctx.strokeStyle='rgba(255,255,255,0.18)';ctx.lineWidth=1;ctx.stroke();

// Specular
const sg=ctx.createLinearGradient(30,0,W-30,0);
sg.addColorStop(0,'rgba(255,255,255,0)');sg.addColorStop(0.5,'rgba(255,255,255,0.55)');sg.addColorStop(1,'rgba(255,255,255,0)');
ctx.beginPath();ctx.rect(30,10,W-60,1.5);ctx.fillStyle=sg;ctx.fill();

// Accent glow behind text
const gMX=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,48);
gMX.addColorStop(0,'rgba(41,151,255,0.35)');gMX.addColorStop(1,'rgba(41,151,255,0)');
ctx.fillStyle=gMX;ctx.fillRect(0,0,W,H);

// "VIBE" light top
ctx.font='300 20px "Helvetica Neue",sans-serif';ctx.textAlign='center';
ctx.fillStyle='rgba(255,255,255,0.55)';ctx.fillText('VIBE',W/2,60);

// "Coding" heavy center — accent blue
ctx.font='bold 52px "Helvetica Neue",sans-serif';
ctx.fillStyle='#2997ff';ctx.fillText('C.',W/2,118);

// "MX" tiny bottom
ctx.font='500 16px "Helvetica Neue",sans-serif';
ctx.fillStyle='rgba(255,255,255,0.45)';ctx.fillText('BUILD IN PUBLIC',W/2,148);

const out=fs.createWriteStream(__dirname+'/apple-touch-icon.png');
canvas.createPNGStream().pipe(out);
out.on('finish',()=>console.log('✅ apple-touch-icon.png (180x180)'));
