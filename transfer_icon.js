const fs=require('fs');
const b64=fs.readFileSync('/mnt/user-data/outputs/vc_icon_b64.txt','utf8').trim();
const buf=Buffer.from(b64,'base64');
fs.writeFileSync('/Users/robertolunaosorio/Documents/VS/vibecodingmx/apple-touch-icon.png',buf);
console.log('✅ apple-touch-icon.png written:', buf.length, 'bytes');
