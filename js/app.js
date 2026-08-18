window.__A__={"img": {"room2": "assets/images/room2.png", "opening_concrete": "assets/images/opening_concrete.png", "g1": "assets/images/g1.png", "g1_still": "assets/images/g1_still.png", "g1_return": "assets/images/g1_return.png", "g2": "assets/images/g2.png", "g2_cut": "assets/images/g2_cut.png", "g2_offer": "assets/images/g2_offer.png", "g2_reach": "assets/images/g2_reach.png", "g2_final": "assets/images/g2_final.jpg", "g3": "assets/images/g3.jpg", "g3_field": "assets/images/g3_field.png", "g3_road": "assets/images/g3_road.png", "g3_sky": "assets/images/g3_sky.png", "g3_grandpa": "assets/images/g3_grandpa.png", "g4": "assets/images/g4.jpg", "g5": "assets/images/g5.png", "g5_blackout": "assets/images/g5_blackout.png", "g5_candle": "assets/images/g5_candle.png", "g7": "assets/images/g7.jpg", "corridor": "assets/images/corridor.jpg", "icu_sign": "assets/images/icu_sign.jpg", "icu_gap": "assets/images/icu_gap.jpg", "room_grass": "assets/images/room2.png", "g8_door": "assets/images/g8_door.png", "portrait": "assets/images/portrait.png", "concrete": "assets/images/concrete.jpg", "kids": "assets/images/kids.jpg", "mapart": "assets/images/mapart.jpg"}, "clip": {"ground": "assets/video/ground.mp4", "fire": "assets/video/fire.mp4"}};


"use strict";
const IMG=window.__A__.img, CLIPS=window.__A__.clip;
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const touch=matchMedia('(hover:none)').matches;
const $=id=>document.getElementById(id);
const wait=ms=>new Promise(r=>setTimeout(r,ms));
function wordCount(html){
  const plain=String(html||'').replace(/<br\s*\/?\s*>/gi,' ').replace(/<[^>]*>/g,' ').replace(/&(?:nbsp|#8230|hellip);/gi,' ').replace(/\s+/g,' ').trim();
  return plain?plain.split(' ').length:0
}
function readingMs(html){
  const n=wordCount(html);
  if(n<=6)return 5600;
  if(n<=12)return 7000;
  if(n<=18)return 8200;
  if(n<=25)return 10000;
  return 12000
}

/* ========== 内容 ========== */
const PRO=[
 {l:['Chalk on concrete. Eight squares.','That was the whole game, when we were small.'],bg:null,grid:1},
 {l:['Every square held a picture of something.','Land in it, finish what is inside,','and only then may you go on.'],bg:'kids'},
 {l:['Last winter they came to pull the old house down.','I went back to clear it out.'],bg:'room2'},
 {l:['The chalk was still there on the floor.','So faint you could almost look straight through it.'],bg:'concrete'},
 {l:['I crouched down and traced the lines again.'],bg:'concrete'}
];
/* the board: 1 / 2-3 / 4 / 5 / 6-7 / 8 - the shape from the photograph */
const BOARD=[
 {n:1,x:180,y:545,w:110,h:74,img:'g1'},
 {n:2,x:122,y:461,w:110,h:74,img:'g2_final'},
 {n:3,x:238,y:461,w:110,h:74,img:'g3_grandpa'},
 {n:4,x:180,y:377,w:110,h:74,img:'g4'},
 {n:5,x:180,y:293,w:110,h:74,img:'g5_candle'},
 {n:6,x:122,y:209,w:110,h:74,img:'icu_sign'},
 {n:7,x:238,y:209,w:110,h:74,img:'g7'},
 {n:8,x:180,y:117,w:110,h:82,img:'room_grass'}
];
const ORD=['','One','Two','Three','Four','Five','Six','Seven','Eight'];

const CELLS=[
 {img:'room2',t:'Prelude / The Doorway',warm:.5,snd:'room',pfx:'dust',frag:null,
  tint:'linear-gradient(0deg,rgba(16,20,26,.84),rgba(40,52,64,.22))',
  act:'chalk',tip:'Hold, and trace the lines on the floor',
  p:'The old house. The television is dark.<br>On the concrete, a chalk line so faint it is almost not there.'},

 {img:'g1',t:'The First Square / Firelight',warm:1,snd:'fire',pfx:'ember',frag:'Firelight',
  tint:'linear-gradient(0deg,rgba(40,18,4,.72),rgba(120,60,18,.26))',
  act:'click3',tip:'Feed the stove',hot:{x:50,y:63},
  clip:'fire', clipLbl:'The fire was burning for me.', clipStill:'g1_still', clipStillMs:3600, returnImg:'g1_return',
  voice:'"Not so close. Fire burns."',
  p:'Firelight in the stove, and his hands inside the light.'},

 {img:'g2',t:'The Second Square / Watermelon',warm:1,snd:'cicada',pfx:'dust',frag:'Summer',
  tint:'linear-gradient(0deg,rgba(50,16,16,.55),rgba(150,70,40,.2))',
  act:'memory2',tip:'Press the remote once. Let summer return.',hot:{x:38.5,y:71.5},takeTip:'Double-click the watermelon.',
  sequence:['g2_cut','g2_offer','g2_reach'], sequencePos:['center 55%','center 60%','center 46%'], returnImg:'g2_final',
  clipLbl:'Summer, split open and handed to me.',
  voice:"\"This one's sweet. Take it.\"",
  p:'The kind of sweetness you could catch with both hands.'},

 {img:'g3',t:'The Third Square / The Tricycle',warm:.85,snd:'wind',pfx:'dust',frag:'A gust of wind',
  tint:'linear-gradient(0deg,rgba(20,30,46,.5),rgba(120,150,180,.16))',
  act:'ride',tip:'Hold to ride with him. Release, and the memory waits.',
  stillSequence:['g3_field','g3_road','g3_sky','g3_grandpa'], stillPos:['center 55%','center 52%','center 44%','center 54%'], clipLbl:'He pedals. The wind is safe.',
  p:'In the cart behind him.<br>His back in front of me, the sky above.'},

 {img:'g4',t:'The Fourth Square / The Car Window',warm:.42,snd:'car',pfx:'cold',frag:'The last look',
  tint:'linear-gradient(0deg,rgba(18,24,34,.74),rgba(70,90,110,.18))',
  act:'hold',tip:'Hold to keep looking.',
  voice:'"Get home safe."',
  p:'The car pulls away.<br>Through the glare on the glass, he is waving.'},

 {img:'g5',t:'The Fifth Square / The Blackout',warm:.5,cd:1,snd:'candle',pfx:'ember',frag:'One small flame',
  tint:'linear-gradient(0deg,rgba(10,8,6,.82),rgba(120,70,20,.2))',
  act:'candle',tip:'Keep clicking. Light the candle',hot:{x:57,y:52},
  blackoutImg:'g5_blackout', candleImg:'g5_candle', candlePos:'center 46%',
  voice:"\"Don't be afraid. I'm here.\"",
  p:'The screen goes black, and so does the house.<br>Somewhere in the dark, a match is struck.'},

 {img:'corridor',t:'The Sixth Square / ICU',warm:.18,fail:1,snd:'icu',pfx:'cold',
  tint:'linear-gradient(0deg,rgba(20,26,32,.76),rgba(150,170,185,.14))',
  act:'door',tip:'Walk up to that door',
  voice:'I never got to say goodbye.',
  p:'A little machine-light leaks through the seam of the door.<br>The handle is cold.'},

 {img:'g7',t:'The Seventh Square / Static',warm:.3,ch:1,snd:'chaos',pfx:'chaos',
  tint:'linear-gradient(0deg,rgba(12,10,14,.8),rgba(90,40,30,.18))',
  act:'wrong',tip:'Try the remembered square. Let the year hold still.',
  p:'The stove burns inside the hospital. The tricycle crosses the living room.<br>The harder I try to go back, the less the memory obeys.'},

 {img:'room_grass',t:'The Eighth Square / The Old House',warm:.08,fin:1,snd:'room',pfx:'dust',
  tint:'linear-gradient(0deg,rgba(4,9,14,.46),rgba(20,31,42,.04) 54%,rgba(5,10,16,.18))',
  act:'room',tip:'',
  p:''}
];
function touchTip(){return matchMedia('(hover:none)').matches?'Swipe up. Lift your head':'Move the mouse up. Lift your head'}

const INTER={0:'Come on. Play hopscotch with me &#8230;',
 4:'Back then I always thought there would be many more times.',
 6:'Later, he was taken to the hospital.<br>I bought a ticket home. Then I returned it.',
 7:'I was just outside.<br>And still, I missed him.'};

const ROOM=[
 {name:'Television',x:17,y:43,w:25,h:36,l:'The television is dark.',hold:3400},
 {name:'Window',x:51,y:25,w:38,h:44,l:'The light still comes in.',hold:3400},
 {name:'Doorway',x:90,y:39,w:18,h:58,l:'The door is open.<br>No one is there.',hold:4300},
 {name:'Newspaper',x:15,y:14,w:23,h:25,l:'__P__',final:1}
];

/* ========== 音频 ========== */
const A={ctx:null,mst:null,duck:null,on:false,cur:null,nodes:[],timer:null};
function aInit(){if(A.ctx)return;const C=window.AudioContext||window.webkitAudioContext;A.ctx=new C();
 A.mst=A.ctx.createGain();A.mst.gain.value=0;A.mst.connect(A.ctx.destination);
 A.duck=A.ctx.createGain();A.duck.gain.value=1;A.duck.connect(A.mst)}
function nb(){const c=A.ctx,l=c.sampleRate*2,b=c.createBuffer(1,l,c.sampleRate),d=b.getChannelData(0);
 for(let i=0;i<l;i++)d[i]=Math.random()*2-1;return b}
function stopScape(fade){const old=A.nodes.slice();A.nodes=[];
 if(A.timer){clearInterval(A.timer);A.timer=null}
 if(!old.length)return;
 const release=()=>old.slice().reverse().forEach(n=>{try{n.stop?n.stop():n.disconnect()}catch(e){}});
 const g=old[0],sec=fade||0;
 if(sec&&A.ctx&&g&&g.gain){const t=A.ctx.currentTime;try{g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(g.gain.value,t);g.gain.linearRampToValueAtTime(.0001,t+sec)}catch(e){}setTimeout(release,sec*1000+140)}else release()}
function build(k){const c=A.ctx,g=c.createGain();g.gain.value=0;g.connect(A.duck);const keep=[g];
 const N=(t,f,q,v,lr,ld)=>{const s=c.createBufferSource();s.buffer=nb();s.loop=true;
   const bf=c.createBiquadFilter();bf.type=t;bf.frequency.value=f;if(q)bf.Q.value=q;
   const vg=c.createGain();vg.gain.value=v;s.connect(bf);bf.connect(vg);vg.connect(g);s.start();keep.push(s,bf,vg);
   if(lr){const o=c.createOscillator();o.frequency.value=lr;const d=c.createGain();d.gain.value=ld;
     o.connect(d);d.connect(vg.gain);o.start();keep.push(o,d)}return{f:bf,vg}};
 const T=(fr,v,t)=>{const o=c.createOscillator();o.type=t||'sine';o.frequency.value=fr;
   const vg=c.createGain();vg.gain.value=v;o.connect(vg);vg.connect(g);o.start();keep.push(o,vg)};
 switch(k){
  case 'room':N('lowpass',360,0,.05,.08,.02);T(60,.015);break;
  case 'fire':N('lowpass',700,0,.07,.4,.04);N('bandpass',1600,1,.03);
   {const pop=()=>{if(A.cur!==g)return;const s=c.createBufferSource();s.buffer=nb();
     const f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=800+Math.random()*1800;f.Q.value=4;
     const vg=c.createGain();vg.gain.value=0;s.connect(f);f.connect(vg);vg.connect(g);
     const t=c.currentTime;vg.gain.setValueAtTime(0,t);vg.gain.linearRampToValueAtTime(.1+Math.random()*.12,t+.005);
     vg.gain.exponentialRampToValueAtTime(.001,t+.06+Math.random()*.08);s.start(t);s.stop(t+.2)};
    A.timer=setInterval(()=>{if(Math.random()<.7)pop()},140)}break;
  case 'cicada':N('bandpass',5200,8,.028,10,.018);N('bandpass',3600,6,.018,7,.014);N('lowpass',430,0,.035,.28,.02);N('highpass',4200,0,.008,.08,.01);T(47,.012);T(94,.006);break;
  case 'wind':{const w=N('lowpass',500,0,.1,.05,.06);const o=c.createOscillator();o.frequency.value=.06;
    const d=c.createGain();d.gain.value=260;o.connect(d);d.connect(w.f.frequency);o.start();keep.push(o,d)}break;
  case 'car':N('lowpass',180,0,.12,.5,.03);N('highpass',2200,0,.012);T(48,.03);break;
  case 'cabin':N('lowpass',150,0,.18,.24,.025);N('bandpass',430,1.8,.026,.11,.012);T(43,.04);break;
  case 'candle':N('lowpass',280,0,.05,.3,.03);N('bandpass',900,2,.018,.6,.01);T(55,.02);break;
  case 'icu':N('highpass',3000,0,.018);N('lowpass',150,0,.04);T(58,.02);
   {const bp=()=>{if(A.cur!==g)return;const o=c.createOscillator();o.frequency.value=1050;
     const vg=c.createGain();vg.gain.value=0;o.connect(vg);vg.connect(g);const t=c.currentTime;
     vg.gain.setValueAtTime(0,t);vg.gain.linearRampToValueAtTime(.14,t+.01);vg.gain.setValueAtTime(.14,t+.09);
     vg.gain.exponentialRampToValueAtTime(.0006,t+.18);o.start(t);o.stop(t+.25);pulse()};
    A.timer=setInterval(bp,1150)}break;
  case 'chaos':N('bandpass',1400,3,.04,3.3,.03);N('lowpass',500,0,.05,.9,.05);
   T(110,.02);T(116.6,.018);T(220,.012,'triangle');break;
  case 'final':N('lowpass',420,0,.05,.06,.02);T(65,.02);T(98,.012);break;
  case 'empty':N('lowpass',300,0,.03,.05,.01);T(70,.008);break;
 }
 A.nodes=keep;return g}
function scape(k){if(!A.on||!A.ctx)return;stopScape(3.2);const g=build(k);A.cur=g;const t=A.ctx.currentTime;
 g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(1,t+3.4)}
function silence(ms){if(!A.on||!A.ctx)return;const t=A.ctx.currentTime;
 A.duck.gain.cancelScheduledValues(t);A.duck.gain.linearRampToValueAtTime(0,t+.05);
 setTimeout(()=>{if(!A.ctx)return;A.duck.gain.linearRampToValueAtTime(1,A.ctx.currentTime+1.5)},ms)}
function duck(v,t){if(!A.on||!A.ctx)return;A.duck.gain.linearRampToValueAtTime(v,A.ctx.currentTime+(t||1))}
function sfx(k){if(!A.on||!A.ctx)return;const c=A.ctx,t=c.currentTime;const g=c.createGain();g.connect(A.duck);
 const nz=(d,ty,f,q,v,to)=>{const s=c.createBufferSource();s.buffer=nb();const bf=c.createBiquadFilter();
   bf.type=ty;bf.frequency.setValueAtTime(f,t);if(q)bf.Q.value=q;if(to)bf.frequency.exponentialRampToValueAtTime(to,t+d);
   const vg=c.createGain();vg.gain.setValueAtTime(0,t);vg.gain.linearRampToValueAtTime(v,t+.012);
   vg.gain.exponentialRampToValueAtTime(.0008,t+d);s.connect(bf);bf.connect(vg);vg.connect(g);s.start(t);s.stop(t+d+.05)};
 const tn=(f,d,v,ty,to)=>{const o=c.createOscillator();o.type=ty||'sine';o.frequency.setValueAtTime(f,t);
   if(to)o.frequency.exponentialRampToValueAtTime(to,t+d);const vg=c.createGain();
   vg.gain.setValueAtTime(0,t);vg.gain.linearRampToValueAtTime(v,t+.01);vg.gain.exponentialRampToValueAtTime(.0008,t+d);
   o.connect(vg);vg.connect(g);o.start(t);o.stop(t+d+.05)};
 switch(k){
  case 'chalk':nz(.16,'bandpass',2600+Math.random()*1200,3,.15);break;
  case 'chalkkid':{const cf=2100+Math.random()*1500;nz(.1+Math.random()*.07,'bandpass',cf,4,.055,1200+Math.random()*650);if(Math.random()<.28)tn(cf*.82,.06,.012,'triangle',cf*.62)}break;
  case 'glass':nz(1.35,'bandpass',2800,1.1,.055,720);nz(.85,'highpass',4300,0,.022,1700);break;
  case 'step':nz(.18,'lowpass',260,0,.26);tn(70,.14,.1);break;
  case 'wood':nz(.09,'bandpass',900+Math.random()*600,5,.28);tn(150,.08,.09,'triangle',60);break;
  case 'cut':nz(.14,'highpass',3200,0,.19);tn(420,.1,.05,'triangle',180);break;
  case 'remote':nz(.045,'bandpass',780,1.6,.105,260);nz(.025,'lowpass',220,0,.055,92);break;
  case 'tvswell':nz(.5,'highpass',3100,0,.018,720);nz(.32,'bandpass',140,1.1,.012,82);break;
  case 'slice':nz(.22,'lowpass',1250,0,.13,330);nz(.12,'bandpass',430,1.2,.08,180);tn(82,.18,.025,'triangle',48);break;
  case 'touch':nz(.14,'lowpass',480,0,.045,165);break;
  case 'take':nz(.24,'lowpass',380,0,.105,138);nz(.11,'bandpass',170,1.2,.035,92);break;
  case 'ridewood':nz(.22,'lowpass',620,0,.08,180);tn(104,.18,.026,'triangle',68);break;
  case 'ridewind':nz(1.8,'bandpass',1500,1.2,.055,420);nz(1.2,'highpass',4100,0,.018,1700);break;
  case 'ridewire':nz(.42,'highpass',3600,0,.035,1200);tn(760,.28,.018,'sine',410);break;
  case 'ridequiet':nz(1.9,'lowpass',460,0,.026,125);tn(72,1.8,.01,'triangle',58);break;
  case 'wrongsoft':nz(.34,'bandpass',860,2,.055,260);tn(122,.42,.018,'triangle',82);break;
  case 'roomtouch':nz(.18,'lowpass',520,0,.045,190);tn(86,.16,.014,'triangle',62);break;
  case 'photograph':nz(1.8,'bandpass',1180,1.2,.028,420);tn(216,.9,.014,'sine',136);break;
  case 'doorpress':nz(1.25,'lowpass',290,0,.075,78);nz(.75,'bandpass',760,2,.04,210);break;
  case 'dooropen':nz(2.2,'lowpass',360,0,.11,82);nz(1.8,'bandpass',920,1.4,.045,240);tn(58,2.1,.024,'triangle',46);break;
  case 'gust':nz(1.4,'lowpass',900,0,.2,300);break;
  case 'match':nz(.28,'bandpass',3600,2,.24,900);tn(180,.3,.05,'triangle');break;
  case 'door':nz(.22,'lowpass',180,0,.38);tn(70,.26,.16,'square',44);break;
  case 'lock':tn(1400,.05,.1,'square');tn(900,.08,.07,'square');break;
  case 'frag':tn(880,1.6,.06);tn(1320,1.6,.03);break;
  case 'break':nz(.5,'bandpass',600,1,.2,120);tn(120,.6,.09,'sawtooth',50);break;
  case 'memoryhover':nz(2.2,'lowpass',880,0,.026,260);nz(1.8,'bandpass',4200,5,.018,1600);tn(92,2.1,.012,'triangle',68);tn(1250,.16,.018,'sine',620);break;
  case 'doorhover':nz(2.1,'lowpass',520,0,.027,170);tn(64,2,.012,'sine',51);break;
  case 'rewind':nz(1.45,'bandpass',260,1.2,.13,4200);tn(720,1.35,.05,'triangle',74);break;
  case 'loopfire':nz(.2,'bandpass',2600,2.6,.09,720);tn(108,.18,.024,'triangle',72);break;
  case 'loopsummer':nz(.28,'highpass',3300,0,.065,980);tn(610,.34,.028,'sine',230);break;
  case 'looproad':nz(2.2,'lowpass',760,0,.15,260);nz(1.8,'bandpass',1800,1.2,.045,3200);break;
  case 'loopwindow':nz(2.2,'lowpass',410,0,.055,130);tn(78,2.1,.02,'triangle',58);tn(1120,.22,.018,'sine',540);break;
  case 'glitch':nz(.14,'bandpass',400+Math.random()*3000,8,.19);break;
  case 'beep':tn(1050,.9,.13,'sine',180);break;
 }
 setTimeout(()=>{try{g.disconnect()}catch(e){}},2400)}

/* ========== 粒子 / 灯 ========== */
const fxc=$('fx'),fxx=fxc.getContext('2d');
let ps=[],pm='dust',W=0,H=0,mx=.5,my=.5,rafx=null;
function rs(){W=fxc.width=innerWidth;H=fxc.height=innerHeight}
addEventListener('resize',rs);rs();
function spawn(m){pm=m;ps=[];const n=m==='chaos'?66:m==='ember'?44:m==='cold'?50:38;
 for(let i=0;i<n;i++)ps.push(np(m,true))}
function np(m,i){const p={};
 if(m==='ember'){p.x=Math.random()*W;p.y=i?Math.random()*H:H+10;p.vx=(Math.random()-.5)*.3;p.vy=-(.3+Math.random()*.9);
  p.r=1+Math.random()*2.2;p.l=1;p.f=.002+Math.random()*.004;p.h=28+Math.random()*22;p.k=Math.random()*6}
 else if(m==='cold'){p.x=Math.random()*W;p.y=i?Math.random()*H:-10;p.vx=(Math.random()-.5)*.25;p.vy=.15+Math.random()*.5;
  p.r=.6+Math.random()*1.8;p.l=1;p.f=.0015+Math.random()*.002;p.h=205;p.k=0}
 else if(m==='chaos'){p.x=Math.random()*W;p.y=Math.random()*H;p.vx=(Math.random()-.5)*1.6;p.vy=(Math.random()-.5)*1.6;
  p.r=.8+Math.random()*2;p.l=1;p.f=.004+Math.random()*.006;p.h=Math.random()<.5?30:205;p.k=Math.random()*6}
 else{p.x=Math.random()*W;p.y=Math.random()*H;p.vx=(Math.random()-.5)*.18;p.vy=(Math.random()-.5)*.12-.03;
  p.r=.5+Math.random()*1.6;p.l=1;p.f=.0008+Math.random()*.0012;p.h=44;p.k=Math.random()*6}
 return p}
function tick(){rafx=requestAnimationFrame(tick);fxx.clearRect(0,0,W,H);
 const ox=(mx-.5)*18,oy=(my-.5)*12;
 for(let i=0;i<ps.length;i++){const p=ps[i];p.x+=p.vx+ox*.002;p.y+=p.vy+oy*.002;
  if(pm==='ember'||pm==='chaos')p.k+=.2;p.l-=p.f;
  if(p.l<=0||p.y<-20||p.y>H+20||p.x<-20||p.x>W+20){ps[i]=np(pm,false);continue}
  const a=p.l;let c;
  if(pm==='ember'){const f=.6+Math.sin(p.k)*.4;c=`hsla(${p.h},90%,${55+f*15}%,${a*.8*f})`}
  else if(pm==='cold')c=`hsla(${p.h},25%,82%,${a*.45})`;
  else if(pm==='chaos'){const f=.6+Math.sin(p.k)*.4;c=`hsla(${p.h},70%,60%,${a*.55*f})`}
  else c=`hsla(${p.h},40%,80%,${a*.38})`;
  fxx.beginPath();fxx.arc(p.x,p.y,p.r,0,6.283);fxx.fillStyle=c;fxx.fill()}}
const lamp=$('lamp');let lx=innerWidth/2,ly=innerHeight/2,tx=lx,ty=ly,parX=0,parY=0;
const fineParallax=!reduce&&matchMedia('(pointer:fine)').matches;
addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;mx=e.clientX/innerWidth;my=e.clientY/innerHeight;idle()},{passive:true});
addEventListener('pointerleave',()=>{tx=innerWidth/2;ty=innerHeight/2;mx=.5;my=.5},{passive:true});
function tl(){requestAnimationFrame(tl);lx+=(tx-lx)*.12;ly+=(ty-ly)*.12;
 lamp.style.left=lx+'px';lamp.style.top=ly+'px';
 const aimX=fineParallax?(tx/Math.max(1,innerWidth)-.5)*-56:0;
 const aimY=fineParallax?(ty/Math.max(1,innerHeight)-.5)*-32:0;
 parX+=(aimX-parX)*.065;parY+=(aimY-parY)*.065;
 const root=document.documentElement.style;
 root.setProperty('--par-x',parX.toFixed(2)+'px');root.setProperty('--par-y',parY.toFixed(2)+'px');
 root.setProperty('--par-x-soft',(parX*.72).toFixed(2)+'px');root.setProperty('--par-y-soft',(parY*.72).toFixed(2)+'px');
}
function actionTraceFor(target,x,y){if(reduce||!target||target.classList.contains('remote-hot'))return;const r=target.getBoundingClientRect(),p=document.createElement('i');p.className='action-trace'+(target.classList.contains('cold')?' cold':'');p.style.left=(Number.isFinite(x)?x:r.left+r.width/2)+'px';p.style.top=(Number.isFinite(y)?y:r.top+r.height/2)+'px';document.body.appendChild(p);setTimeout(()=>p.remove(),1500)}
addEventListener('pointerdown',e=>{const t=e.target.closest&&e.target.closest('.hot,.mtake');if(t)actionTraceFor(t,e.clientX,e.clientY)},{capture:true,passive:true});
addEventListener('click',e=>{if(e.detail!==0)return;const t=e.target.closest&&e.target.closest('.hot,.mtake');if(t)actionTraceFor(t)},true);
function pulse(){const h=$('heart');h.style.transition='none';
 h.style.boxShadow='inset 0 0 200px 50px rgba(140,170,190,.15)';h.style.opacity='1';
 requestAnimationFrame(()=>{h.style.transition='box-shadow .6s ease,opacity .6s ease';
  h.style.boxShadow='inset 0 0 200px 40px rgba(140,170,190,0)';h.style.opacity='0'})}

/* ========== DOM ========== */
const SVGNS='http://www.w3.org/2000/svg';
function mk(t,a){const e=document.createElementNS(SVGNS,t);for(const k in a)e.setAttribute(k,a[k]);return e}
/* 序章里那块自己画出来的跳房子（缩小版，形状同 BOARD） */
const proCells=[];
(function(){const g=$('proGrid');
 BOARD.forEach(c=>{
   const x=(c.x-c.w/2)*.72+22, y=(c.y-c.h/2)*.72-42, w=c.w*.72, h=c.h*.72;
   const r=mk('rect',{x,y,width:w,height:h,fill:'none',stroke:'rgba(240,236,224,.8)','stroke-width':1.8,filter:'url(#ch)'});
   const L=2*(w+h);r.style.strokeDasharray=L;r.style.strokeDashoffset=L;
   r.style.transition='stroke-dashoffset 1.5s ease';g.appendChild(r);
   const t=mk('text',{x:c.x*.72+22,y:c.y*.72-42+6,'text-anchor':'middle','font-size':13,
     fill:'rgba(240,236,224,.55)','font-family':'JT Kiddo, Kiddo, sans-serif'});
   t.textContent=c.n;t.style.opacity=0;t.style.transition='opacity 1s ease';g.appendChild(t);
   proCells.push([r,t])})})();

const scEl=$('scenes');
CELLS.forEach((c,i)=>{const s=document.createElement('div');
 s.className='sc'+(c.ch?' ch':'')+(c.fin?' fin':'')+(c.cd?' cd':'');
 s.innerHTML=`<div class="bg"><div class="im" style="background-image:url('${IMG[c.img]}')"></div></div>
  <div class="tint" style="background:${c.tint}"></div><div class="vig"></div><div class="black"></div>
  <div class="hots"></div>
  <div class="cap"><div class="t">${c.t}</div><p>${c.p}</p></div>`;
 scEl.appendChild(s)});
const scenes=[...document.querySelectorAll('.sc')];

/* 跳房子板 —— 每完成一段记忆，那一格就被填上那张画 */
const mapSvg=$('mapSvg'),mapCells={};
(function(){
  const defs=mk('defs',{});mapSvg.appendChild(defs);
  BOARD.forEach(c=>{
    const x=c.x-c.w/2,y=c.y-c.h/2;
    const cp=mk('clipPath',{id:'cp'+c.n});
    cp.appendChild(mk('rect',{x,y,width:c.w,height:c.h}));defs.appendChild(cp);
    const g=mk('g',{class:'cell'});
    const im=mk('image',{x,y,width:c.w,height:c.h,class:'pic',
      'clip-path':'url(#cp'+c.n+')',preserveAspectRatio:'xMidYMid slice'});
    im.setAttributeNS('http://www.w3.org/1999/xlink','href',IMG[c.img]);
    im.setAttribute('href',IMG[c.img]);
    g.appendChild(im);
    g.appendChild(mk('rect',{x,y,width:c.w,height:c.h,class:'ln'}));
    const t=mk('text',{x:c.x,y:c.y+6,class:'nm'});t.textContent=c.n;g.appendChild(t);
    const cr=mk('path',{class:'cross',d:`M${x+14} ${y+14} L${x+c.w-14} ${y+c.h-14} M${x+c.w-14} ${y+14} L${x+14} ${y+c.h-14}`,fill:'none'});
    g.appendChild(cr);
    mapSvg.appendChild(g);
    mapCells[c.n]={g,im,t,cr};
  });
  // 起跳的箭头
  const a=mk('path',{d:'M180 578 L162 602 L174 602 L174 620 L186 620 L186 602 L198 602 Z',
    fill:'none',stroke:'rgba(240,236,224,.5)','stroke-width':2,filter:'url(#ch)'});
  mapSvg.appendChild(a);
})();
const mapEl=$('map'),mapCap=$('mapCap');
function openMap(){$('mapBg').style.backgroundImage=`url('${IMG.concrete}')`;
  mapEl.classList.remove('archive-recall');void mapEl.offsetWidth;mapEl.classList.add('archive-recall');
  document.body.classList.add('cine');mapEl.classList.add('on')}
function closeMap(){mapEl.classList.remove('on');mapCap.classList.remove('on','narration');
  document.body.classList.remove('cine')}
/* 落一格：图画填进格子里 */
async function fillCell(i,cap,stayOpen){
  const c=mapCells[i];if(!c)return;
  openMap();
  await wait(reduce?200:1600);
  if(A.on)sfx('frag');
  c.im.classList.add('in');
  if(cap){mapCap.classList.remove('narration');mapCap.innerHTML=cap;await wait(900);mapCap.classList.add('on')}
  await wait(cap?readingMs(cap):5600);
  if(!stayOpen){
    closeMap();
    await wait(reduce?220:1850);
  }
}

const pro=$('pro'),proLines=$('proLines'),proNext=$('proNext'),board=$('board'),rules=$('rules');
const openingBg=$('openingBg'),openingConcrete=$('openingConcrete'),openingRoom=$('openingRoom');
openingConcrete.style.backgroundImage=`url('${IMG.opening_concrete}')`;
openingRoom.style.backgroundImage=`url('${IMG.room2}')`;
const memoryAfter=$('memoryAfter'),archiveTag=$('archiveTag'),archiveText=$('archiveText');
const il=$('il'),ilT=$('ilT'),voice=$('voice'),sys=$('sys'),tip=$('tip'),prog=$('prog'),progI=$('progI');
const goEl=$('go'),goBtn=$('goBtn'),goLb=$('goLb');
const clipEl=$('clip'),cv=$('clipv'),clipStill=$('clipStill'),clipLbl=$('clipLbl'),memEl=$('memory'),memA=$('memA'),memB=$('memB'),memTake=$('memTake'),memLbl=$('memLbl'),thirdEl=$('thirdMemory'),thirdA=$('thirdA'),thirdB=$('thirdB'),thirdLbl=$('thirdLbl'),seventhChoice=$('seventhChoice'),memoryChoice=$('memoryChoice'),doorChoice=$('doorChoice'),seventhChoiceStatus=$('seventhChoiceStatus'),memoryLoop=$('memoryLoop'),loopA=$('loopA'),loopB=$('loopB'),loopStatus=$('loopStatus'),glEl=$('gl'),gv=$('glv');
const veil=$('veil'),flash=$('flash'),coda=$('coda'),codaLn=$('codaLn'),endEl=$('end');
const snd=$('snd'),sndL=$('sndL');
let idx=-1,busy=false,started=false,gate=false,mapGate=false;
let memoryLoopUsed=false,seventhChoiceBusy=false,loopFront=0;
['g1_return','g2_final','g3_grandpa','g4','g7','g8_door','room_grass','portrait'].forEach(k=>{if(IMG[k]){const preload=new Image();preload.src=IMG[k]}});
['g1_still','g1_return','g2_cut','g2_offer','g2_reach','g2_final','g3_field','g3_road','g3_sky','g3_grandpa','g5','g5_blackout','g5_candle'].forEach(k=>{const preload=new Image();preload.src=IMG[k]});

/* ---- 影像：把 base64 变成 blob url ---- */
const URLS={};
let clipsReady=(async()=>{
  for(const k in CLIPS){
    try{const b=await(await fetch(CLIPS[k])).blob();URLS[k]=URL.createObjectURL(b);CLIPS[k]=null}
    catch(e){URLS[k]=CLIPS[k]}
  }
})();
function clipURL(k){return URLS[k]||CLIPS[k]}

/* 播放一段记忆影像：动作的回报 */
const PLAYED=new Set();
function playClip(name,label,stillKey,stillMs,beforeClose){
  return new Promise(res=>{
    const u=clipURL(name);
    if(!u||PLAYED.has(name)){
      if(beforeClose)beforeClose();
      res();return
    }
    PLAYED.add(name);
    let ending=false,done=false,prepared=false,started=false;
    const prepareReturn=()=>{if(prepared)return;prepared=true;if(beforeClose)beforeClose()};
    const close=()=>{if(done)return;done=true;
      prepareReturn();
      clipLbl.classList.remove('on');
      clipEl.classList.remove('on');
      duck(1,1.6);
      setTimeout(()=>{
        try{cv.pause();cv.removeAttribute('src');cv.load()}catch(e){}
        cv.onended=null;cv.onerror=null;
        clipStill.classList.remove('on');
        clipStill.style.backgroundImage='';
        res()
      },reduce?220:2020)};
    const fin=()=>{if(done||ending)return;ending=true;
      try{cv.pause()}catch(e){}
      if(stillKey&&IMG[stillKey]){
        clipStill.style.backgroundImage=`url('${IMG[stillKey]}')`;
        requestAnimationFrame(()=>clipStill.classList.add('on'));
        setTimeout(prepareReturn,reduce?0:1450);
        setTimeout(close,reduce?500:(stillMs||3800));
      }else close()
    };
    const begin=()=>{if(started||done)return;started=true;
      document.body.classList.add('cine');
      duck(.35,1.4);
      clipEl.classList.add('on');
      requestAnimationFrame(()=>{const pr=cv.play();if(pr&&pr.catch)pr.catch(fin)});
      if(label)setTimeout(()=>{if(!done){clipLbl.innerHTML=label;clipLbl.classList.add('on')}},1100)
    };
    cv.onended=fin;
    cv.onerror=fin;
    cv.src=u;cv.currentTime=0;
    cv.load();
    if(cv.readyState>=2)begin();else cv.addEventListener('loadeddata',begin,{once:true});
    setTimeout(begin,1800);
    setTimeout(()=>{if(!done&&!ending&&(cv.readyState<2||cv.paused))fin()},3200);
    setTimeout(fin,26000);
  });
}

async function playMemorySequence(c,sceneIm,inputMode){
  const keys=(c.sequence||[]).filter(k=>IMG[k]);
  if(keys.length<3)return;
  const frames=[memA,memB],positions=c.sequencePos||[];
  frames.forEach(f=>{f.classList.remove('on','received');f.style.backgroundImage='';f.style.backgroundPosition='center'});
  memEl.classList.remove('melon-caught');
  memTake.classList.remove('ready','primed','taken');memTake.disabled=true;memTake.tabIndex=-1;memTake.onclick=null;memTake.onpointerdown=null;memTake.setAttribute('aria-hidden','true');
  memLbl.classList.remove('on');memLbl.innerHTML='';
  frames[0].style.backgroundImage=`url('${IMG[keys[0]]}')`;
  frames[0].style.backgroundPosition=positions[0]||'center';
  frames[0].style.transition='none';frames[0].classList.add('on');void frames[0].offsetWidth;frames[0].style.transition='';
  memEl.setAttribute('aria-hidden','false');memEl.classList.add('on');
  document.body.classList.add('cine');duck(.58,1.5);
  setTimeout(()=>sfx('slice'),reduce?80:850);
  setTimeout(()=>sfx('slice'),reduce?180:1750);
  const fade=reduce?220:2300;
  await wait(reduce?900:3700);

  frames[1].style.backgroundImage=`url('${IMG[keys[1]]}')`;
  frames[1].style.backgroundPosition=positions[1]||'center';
  frames[1].classList.add('on');
  await wait(fade);frames[0].classList.remove('on');
  await wait(reduce?260:1250);

  tipNow(c.takeTip||'Double-click the watermelon.');
  memTake.disabled=false;memTake.tabIndex=0;memTake.setAttribute('aria-hidden','false');memTake.classList.add('ready');
  if(inputMode==='keyboard')setTimeout(()=>memTake.focus({preventScroll:true}),reduce?20:180);
  await new Promise(resolve=>{
    let clicks=0,timer=null,done=false,lastPointer='mouse';
    memTake.onpointerdown=e=>{lastPointer=e.pointerType||'mouse'};
    const catchMelon=()=>{if(done)return;done=true;clearTimeout(timer);
      memTake.disabled=true;memTake.tabIndex=-1;memTake.onclick=null;memTake.onpointerdown=null;memTake.blur();
      memTake.classList.remove('ready','primed');memTake.classList.add('taken');
      frames[1].classList.add('received');memEl.classList.add('melon-caught');clearTip();sfx('take');resolve()};
    memTake.onclick=e=>{if(memTake.disabled||done)return;
      if(e.detail===0){catchMelon();return}
      clicks++;clearTimeout(timer);
      if(clicks===1){sfx('touch');memTake.classList.add('primed');tipNow('Once more. Take it.',true);
        const windowMs=lastPointer==='touch'?1500:1050;
        timer=setTimeout(()=>{clicks=0;memTake.classList.remove('primed');if(!done)tipNow(c.takeTip||'Double-click the watermelon.')},windowMs);return}
      catchMelon()}
  });
  await wait(reduce?180:1120);

  frames[0].style.backgroundImage=`url('${IMG[keys[2]]}')`;
  frames[0].style.backgroundPosition=positions[2]||'center';
  frames[0].classList.add('on');
  await wait(fade);frames[1].classList.remove('on','received');
  await wait(reduce?180:850);
  memLbl.innerHTML=c.clipLbl||'';memLbl.classList.add('on');
  const spoken=c.voice?say(c.voice):0;
  await wait(spoken?spoken+(reduce?80:450):(reduce?500:4300));
  memLbl.classList.remove('on');

  if(c.returnImg&&IMG[c.returnImg]){
    sceneIm.classList.remove('kb');sceneIm.style.transition='none';
    sceneIm.style.backgroundImage=`url('${IMG[c.returnImg]}')`;sceneIm.style.filter='';sceneIm.style.transform='scale(1.075)';
    void sceneIm.offsetWidth;sceneIm.style.transition='filter 2.6s ease,transform 8s cubic-bezier(.22,1,.36,1),opacity 1.8s ease';
    requestAnimationFrame(()=>sceneIm.style.transform='scale(1.02)')
  }
  await wait(reduce?220:1100);memEl.classList.remove('on');duck(1,1.8);
  await wait(reduce?240:2150);
  frames.forEach(f=>{f.classList.remove('on','received');f.style.backgroundImage=''});
  memEl.classList.remove('melon-caught');
  memTake.classList.remove('ready','primed','taken');memTake.disabled=true;memTake.tabIndex=-1;memTake.onclick=null;memTake.onpointerdown=null;memTake.setAttribute('aria-hidden','true');
  memEl.setAttribute('aria-hidden','true');document.body.classList.remove('cine')
}

async function playThirdMemorySequence(c){
  const keys=(c.stillSequence||[]).filter(k=>IMG[k]);
  if(keys.length<4)return;
  const frames=[thirdA,thirdB],positions=c.stillPos||[];
  frames.forEach(f=>{f.style.transition='none';f.style.opacity='0';f.style.backgroundImage='';f.style.backgroundPosition='center';f.style.transform='scale(1.055)';f.style.filter='brightness(.9) saturate(.86) contrast(.98)'});
  thirdLbl.classList.remove('on');thirdLbl.innerHTML='';
  thirdEl.classList.remove('skyward');thirdEl.setAttribute('aria-hidden','false');thirdEl.classList.add('on');
  document.body.classList.add('cine');duck(.48,1.8);
  let current=null,frameIndex=0;
  const stage=async(key,position,fade,hold,startTransform,endTransform,exitTransform,skyward,label,overlap)=>{
    const next=frames[frameIndex%frames.length];frameIndex++;
    next.style.transition='none';next.style.backgroundImage=`url('${IMG[key]}')`;
    next.style.backgroundPosition=position||'center';next.style.opacity='0';
    next.style.transform=startTransform;next.style.filter='blur(1.6px) brightness(.9) saturate(.86) contrast(.98)';
    void next.offsetWidth;
    next.style.transition=`opacity ${fade}ms cubic-bezier(.22,1,.36,1),transform ${fade+hold+900}ms cubic-bezier(.22,1,.36,1),filter ${fade+700}ms cubic-bezier(.22,1,.36,1)`;
    if(skyward)thirdEl.classList.add('skyward');
    const outgoing=current;
    requestAnimationFrame(()=>{
      next.style.opacity=overlap?'.86':'1';next.style.transform=endTransform;next.style.filter='blur(0) brightness(.99) saturate(.96) contrast(1)';
      if(outgoing){
        outgoing.style.transition=`opacity ${fade}ms cubic-bezier(.22,1,.36,1),transform ${fade+850}ms cubic-bezier(.22,1,.36,1),filter ${fade}ms ease`;
        outgoing.style.opacity=overlap?'.42':'0';outgoing.style.transform=exitTransform;outgoing.style.filter=overlap?'blur(1.2px) brightness(.94) saturate(.88)':'blur(3px) brightness(.88) saturate(.78)'
      }
    });
    await wait(fade);
    if(outgoing&&overlap){
      const settle=reduce?180:2500;
      next.style.transition=`opacity ${settle}ms cubic-bezier(.22,1,.36,1),transform ${fade+hold+900}ms cubic-bezier(.22,1,.36,1),filter ${settle}ms cubic-bezier(.22,1,.36,1)`;
      outgoing.style.transition=`opacity ${settle}ms cubic-bezier(.22,1,.36,1),transform ${settle+500}ms cubic-bezier(.22,1,.36,1),filter ${settle}ms ease`;
      requestAnimationFrame(()=>{next.style.opacity='1';outgoing.style.opacity='0';outgoing.style.filter='blur(4px) brightness(.9) saturate(.78)'});
      setTimeout(()=>{outgoing.style.backgroundImage='';outgoing.style.transition='none'},settle+120)
    }else if(outgoing){outgoing.style.backgroundImage='';outgoing.style.transition='none'}
    current=next;
    if(label&&c.clipLbl){thirdLbl.innerHTML=c.clipLbl;thirdLbl.classList.add('on')}
    await wait(hold);
    if(label&&c.clipLbl){thirdLbl.classList.remove('on');await wait(reduce?80:520)}
  };
  await stage(keys[0],positions[0],reduce?160:1900,reduce?260:2700,'scale(1.055)','scale(1.018)','scale(1.065)',false,false);
  await stage(keys[1],positions[1],reduce?180:2750,reduce?300:3650,'scale(1.072)','scale(1.022)','scale(1.066) translateY(-.6%)',false,true);
  await stage(keys[2],positions[2],reduce?180:2750,reduce?280:3350,'scale(1.058) translateY(1.2%)','scale(1.02) translateY(-.4%)','scale(1.07) translateY(1.2%)',true,false);
  await stage(keys[3],positions[3],reduce?200:3650,reduce?360:5200,'scale(1.052)','scale(1.018)','scale(1.065)',true,false,true);
  if(current){current.style.transition=`opacity ${reduce?180:2200}ms cubic-bezier(.22,1,.36,1),transform ${reduce?180:2600}ms cubic-bezier(.22,1,.36,1),filter ${reduce?180:2200}ms ease`;current.style.opacity='0';current.style.transform='scale(1.055)';current.style.filter='blur(3px) brightness(.9) saturate(.82)'}
  thirdEl.classList.remove('on');duck(1,2.2);
  await wait(reduce?220:2250);
  frames.forEach(f=>{f.style.transition='none';f.style.opacity='0';f.style.backgroundImage=''});
  thirdEl.classList.remove('skyward');thirdEl.setAttribute('aria-hidden','true');document.body.classList.remove('cine')
}
const glImg=document.createElement('div');
glImg.style.cssText='position:absolute;inset:0;background-size:cover;background-position:center';
glEl.appendChild(glImg);
function glitchClip(name){
  const u=IMG[name];if(!u)return;
  glImg.style.backgroundImage=`url('${u}')`;
  glImg.style.filter=`contrast(1.6) saturate(.35) hue-rotate(${Math.random()*60-30}deg)`;
  glImg.style.transform=`scale(${1.05+Math.random()*.25}) rotate(${Math.random()*3-1.5}deg) translate(${(Math.random()-.5)*6}%,${(Math.random()-.5)*6}%)`;
  glEl.style.opacity=String(.55+Math.random()*.35);glEl.classList.add('on');
  setTimeout(()=>{glEl.style.transition='opacity .35s ease';glEl.style.opacity='0';
    setTimeout(()=>{glEl.classList.remove('on');glEl.style.transition='none'},380)},240+Math.random()*260);
}

/* ========== 序章 ========== */
let step=0,pTimer=null,pAuto=null,pReady=false;
const pbs=[$('pb1'),$('pb2'),$('pb3')];let pbi=0;
const proVid=$('proVid');
function proBg(key){
  if(!key)return;
  const el=pbs[pbi%pbs.length];pbi++;
  el.style.backgroundImage=`url('${IMG[key]}')`;
  requestAnimationFrame(()=>el.classList.add('on'));
  pbs.forEach(o=>{if(o!==el)o.classList.remove('on')});
  proVid.classList.remove('on');
}
function proMovie(key){                     // 序章里就让影像动起来
  const u=clipURL(key);if(!u)return;
  if(proVid.dataset.k!==key){proVid.dataset.k=key;proVid.src=u;proVid.play().catch(()=>{})}
  proVid.classList.add('on');
  pbs.forEach(o=>o.classList.remove('on'));
}
function renderPro(){
  const g=PRO[step];
  proLines.innerHTML=g.l.map(t=>`<div class="pl">${t}</div>`).join('');
  const ls=[...proLines.querySelectorAll('.pl')];
  ls.forEach((l,i)=>setTimeout(()=>{l.classList.add('in');sfx('chalk')},500+i*1900));
  if(g.grid){
    $('proGrid').classList.add('on');
    proCells.forEach(([r,t],i)=>setTimeout(()=>{r.style.strokeDashoffset='0';
      setTimeout(()=>t.style.opacity=.55,700);sfx('chalk')},900+i*420));
  }else{
    $('proGrid').classList.add('away');
    if(g.vid)proMovie(g.vid); else proBg(g.bg);
  }
  proNext.classList.remove('in');pReady=false;
  clearTimeout(pTimer);clearTimeout(pAuto);
  const wait_=500+ls.length*1900+(g.grid?2600:1600);
  pTimer=setTimeout(()=>{
    proNext.classList.add('in');pReady=true;
    pAuto=setTimeout(proAdv,5500);   // 自己往下走，不逼人点
  },wait_);
}
function proAdv(){
  if(!pReady)return;pReady=false;clearTimeout(pAuto);sfx('step');
  [...proLines.querySelectorAll('.pl')].forEach(l=>l.classList.add('out'));
  proNext.classList.remove('in');
  setTimeout(()=>{step++;if(step>=PRO.length){endPro();return}renderPro()},1300);
}
function endPro(){
  openingBg.classList.add('title');
  $('proBg').classList.add('opening-away');
  pro.classList.add('gone');proNext.style.display='none';
  setTimeout(()=>{try{proVid.pause();proVid.removeAttribute('src');proVid.load()}catch(e){}},2400);
  setTimeout(()=>{pro.style.display='none';
    board.classList.add('show');
    [['.eyebrow',.3],['.title',.7],['.subtitle',1.4],['.enter',3.6],['.hint',4.2]]
      .forEach(([s,d])=>{board.querySelector(s).style.animation=`fi 2s ease ${d}s forwards`})},1700);
}
pro.addEventListener('click',proAdv);
setTimeout(()=>snd.classList.add('on'),1400);
renderPro();

/* ========== 规则 ========== */
function prepareChalkRuleText(){
  [...rules.querySelectorAll('.rule .rt')].forEach(rt=>{
    if(rt.dataset.chalkReady)return;
    const text=rt.textContent;
    rt.dataset.chalkReady='1';rt.setAttribute('aria-label',text);rt.textContent='';
    let ci=0;
    text.split(/(\s+)/).forEach(part=>{
      if(!part)return;
      if(/^\s+$/.test(part)){rt.appendChild(document.createTextNode(part));return}
      const word=document.createElement('span');
      word.className='chalk-word';word.setAttribute('aria-hidden','true');
      [...part].forEach(glyph=>{
        const ch=document.createElement('span');
        ch.className='chalk-char';ch.textContent=glyph;ch.dataset.glyph=glyph;
        ch.style.setProperty('--char',ci++);
        ch.style.setProperty('--tilt',(((ci%7)-3)*.13)+'deg');
        word.appendChild(ch)
      });
      rt.appendChild(word)
    })
  })
}
function chalkWritingAudio(rule){
  if(reduce||!rule)return;
  const chars=rule.querySelectorAll('.chalk-char').length||28;
  const duration=Math.min(3900,Math.max(1250,chars*46+320));
  let elapsed=45;
  const stroke=()=>{
    if(!rules.classList.contains('show')||elapsed>duration)return;
    sfx('chalkkid');
    const pause=88+Math.random()*132;
    elapsed+=pause;setTimeout(stroke,pause)
  };
  setTimeout(stroke,45)
}
prepareChalkRuleText();
let rReady=false,openingStarted=false;
$('startBtn').onclick=()=>{
  if(openingStarted)return;openingStarted=true;
  startBtn.classList.add('is-committed');
  $('startBtn').disabled=true;
  openingBg.classList.add('expanded');
  setTimeout(()=>openingBg.classList.add('room-on'),reduce?0:650);
  setTimeout(()=>openingBg.classList.add('blurred'),reduce?0:1400);
  board.classList.add('gone');
  setTimeout(()=>{board.style.display='none'},reduce?40:5050);
  setTimeout(()=>{
    rules.classList.add('show');
    const rs_=[...rules.querySelectorAll('.rule')],ruleWriteDelays=[500,3400,7200,11100];
    rs_.forEach((r,i)=>setTimeout(()=>{r.classList.add('in');chalkWritingAudio(r)},ruleWriteDelays[i]));
    setTimeout(()=>{sfx('break');$('r4').classList.add('wiped')},15000);
    setTimeout(()=>$('rfoot').classList.add('in'),16300);
    setTimeout(()=>{$('rgo').classList.add('in');rReady=true;
      setTimeout(()=>{if(rReady)rules.click()},9000);},17800);
  },reduce?80:5250);
};
rules.addEventListener('click',()=>{if(!rReady)return;rReady=false;sfx('step');
  rules.classList.remove('show');setTimeout(start,1400)});

/* ========== 过场 ========== */
let ilRes=null,ilReady=false,ilScene=null;
let ilAuto=null,ilActiveHtml='',narrativeLastMotion=performance.now();
addEventListener('pointermove',()=>{narrativeLastMotion=performance.now()},{passive:true});
addEventListener('visibilitychange',()=>{if(!document.hidden)narrativeLastMotion=performance.now()});
function armInterAuto(delay){clearTimeout(ilAuto);ilAuto=setTimeout(()=>{
  if(!ilReady)return;
  if(document.hidden||performance.now()-narrativeLastMotion<2200){armInterAuto(1400);return}
  il.click()
 },delay===undefined?readingMs(ilActiveHtml):delay)}
function inter(html){return new Promise(r=>{
  ilActiveHtml=html;ilT.innerHTML=html;il.classList.toggle('grandpa',html===INTER[0]);il.classList.add('show');
  ilScene=scenes[idx]||null;if(ilScene)ilScene.classList.add('inter-muted');
  document.body.classList.add('cine');
  setTimeout(()=>il.classList.add('lit'),800);
  setTimeout(()=>{il.classList.add('rdy');ilReady=true;
    armInterAuto(readingMs(html))},3800);
  ilRes=r})}
il.addEventListener('click',()=>{if(!ilReady)return;ilReady=false;clearTimeout(ilAuto);sfx('step');
  il.classList.remove('lit','rdy');
  setTimeout(()=>{il.classList.remove('show');document.body.classList.remove('cine');
    if(ilScene){ilScene.classList.remove('inter-muted');ilScene=null}
    const r=ilRes;ilRes=null;r&&r()},1500)});

/* idle hints */
let idleT=null,tipTxt='',tipUrg=false;
function setTip(t,urg){tipTxt=t;tipUrg=!!urg;tip.classList.remove('on');idle()}
function tipNow(t,urg){tipTxt=t;tipUrg=!!urg;clearTimeout(idleT);tip.innerHTML=t;tip.classList.toggle('urg',!!urg);tip.classList.add('on')}
function clearTip(){tipTxt='';tip.classList.remove('on');clearTimeout(idleT)}
function idle(){
  clearTimeout(idleT);
  if(!tipTxt)return;
  tip.classList.remove('on');
  idleT=setTimeout(()=>{tip.innerHTML=tipTxt;tip.classList.toggle('urg',tipUrg);tip.classList.add('on')},reduce?300:4200);
}
addEventListener('pointerdown',idle);
function showProg(cls){prog.className=(cls||'')+' on';progI.style.width='0%'}
function setProg(p){progI.style.width=(p*100)+'%'}
function hideProg(){prog.classList.remove('on')}

let voiceTimer=null;
const GRANDPA_DIALOGUE=new Set([
  '"Not so close. Fire burns."',
  "\"This one's sweet. Take it.\"",
  '"Get home safe."',
  "\"Don't be afraid. I'm here.\""
]);
function say(t,cold){const ms=readingMs(t);voice.innerHTML=t;voice.classList.toggle('grandpa',GRANDPA_DIALOGUE.has(t));voice.classList.toggle('cold',!!cold);
 voice.style.setProperty('--voice-ms',ms+'ms');clearTimeout(voiceTimer);
 voice.classList.remove('on');void voice.offsetWidth;voice.classList.add('on');
 voiceTimer=setTimeout(()=>voice.classList.remove('on'),ms);return ms}
function sysSay(t){$('sysT').textContent=t;sys.classList.remove('on');void sys.offsetWidth;sys.classList.add('on');sfx('lock')}
function flashS(a,c){flash.style.background=c||'#fff';flash.style.transition='none';flash.style.opacity=a;
 requestAnimationFrame(()=>{flash.style.transition='opacity .7s ease';flash.style.opacity='0'})}

async function mapDead(){            // ICU：门是打不开的，前面的记忆全部失色
  openMap();
  await wait(1800);
  const c=mapCells[6];c.im.classList.add('in');
  await wait(1400);sfx('beep');c.cr.classList.add('on');
  await wait(1200);mapEl.classList.add('dead');
  fragEls_break();
  mapCap.classList.add('narration');
  mapCap.innerHTML='Six squares.<br><span style="font-size:.8em;color:#a89e8c">Everything I carried is still here. Not one piece is any use.</span>';
  await wait(700);mapCap.classList.add('on');
  await wait(8200);
  closeMap();await wait(1400);
}
function fragEls_break(){if(A.on)sfx('break')}
const WRONG_MEMORY_STEPS=[
  {images:['g1_return','g2_final','g5_candle'],positions:['48% 48%','50% 50%','55% 46%'],words:['FIRELIGHT','SUMMER','CANDLE']},
  {images:['g3_grandpa','g2_reach','g4'],positions:['57% 35%','50% 48%','50% 52%'],words:['ROAD','WINDOW','GOODBYE']},
  {images:['g5_blackout','icu_gap','g3_sky'],positions:['50% 48%','50% 50%','50% 42%'],words:['HOME','HOSPITAL','YEAR']}
];
function ensureWrongMemoryEcho(layer,anchor){
  let echo=layer.querySelector('.wrong-memory-echo');
  if(echo)return echo;
  echo=document.createElement('div');echo.className='wrong-memory-echo';echo.setAttribute('aria-hidden','true');
  ['primary','secondary','accent'].forEach(kind=>{const frame=document.createElement('div');frame.className='echo-frame '+kind;echo.appendChild(frame)});
  layer.insertBefore(echo,anchor||layer.firstChild);return echo
}
async function wrongMemoryEcho(layer,anchor,step){
  const echo=ensureWrongMemoryEcho(layer,anchor),data=WRONG_MEMORY_STEPS[Math.max(0,Math.min(step-1,WRONG_MEMORY_STEPS.length-1))];
  const layouts=[
    [{x:'8%',y:'13%',w:'42vw',r:'-1.1deg',dx:'-8px',dy:'-7px',op:'.3',delay:'0s'},{x:'49%',y:'19%',w:'39vw',r:'.85deg',dx:'8px',dy:'-3px',op:'.24',delay:'.18s'},{x:'28%',y:'51%',w:'47vw',r:'-.45deg',dx:'5px',dy:'-9px',op:'.2',delay:'.34s'}],
    [{x:'45%',y:'8%',w:'43vw',r:'.65deg',dx:'7px',dy:'-8px',op:'.28',delay:'0s'},{x:'7%',y:'39%',w:'39vw',r:'-1deg',dx:'-6px',dy:'5px',op:'.23',delay:'.16s'},{x:'48%',y:'53%',w:'44vw',r:'.35deg',dx:'9px',dy:'-7px',op:'.19',delay:'.32s'}],
    [{x:'5%',y:'12%',w:'45vw',r:'-.7deg',dx:'-8px',dy:'4px',op:'.25',delay:'0s'},{x:'51%',y:'15%',w:'42vw',r:'1deg',dx:'7px',dy:'-8px',op:'.21',delay:'.17s'},{x:'26%',y:'50%',w:'50vw',r:'-.25deg',dx:'4px',dy:'-10px',op:'.18',delay:'.34s'}]
  ][step-1];
  [...echo.querySelectorAll('.echo-frame')].forEach((frame,i)=>{
    const l=layouts[i];frame.style.backgroundImage=`url('${IMG[data.images[i]]}')`;frame.style.setProperty('--pos',data.positions[i]);
    for(const k in l)frame.style.setProperty('--'+k,l[k]);frame.style.animation='none';void frame.offsetWidth;frame.style.animation=''
  });
  echo.querySelectorAll('.echo-word').forEach(el=>el.remove());
  const wordLayouts=[['17%','72%','-1.3deg','-8px','.12s'],['68%','64%','.8deg','7px','.34s'],['56%','31%','-.5deg','5px','.55s']];
  data.words.forEach((word,i)=>{const el=document.createElement('span');el.className='echo-word';el.textContent=word;el.style.setProperty('--x',wordLayouts[i][0]);el.style.setProperty('--y',wordLayouts[i][1]);el.style.setProperty('--r',wordLayouts[i][2]);el.style.setProperty('--dx',wordLayouts[i][3]);el.style.setProperty('--delay',wordLayouts[i][4]);echo.appendChild(el)});
  echo.className='wrong-memory-echo';void echo.offsetWidth;echo.classList.add('on','step-'+step);
  await wait(reduce?620:3350);echo.classList.remove('on');await wait(reduce?120:520)
}

const MAP_MEMORY_FRAGMENTS=[
  {key:'g1_return',x:'39%',y:'69%',w:'clamp(78px,8.7vw,132px)',r:'-1deg',dx:'-9px',dy:'6px',turn:'-.8deg',op:'.28',pos:'50% 52%',word:'FIRELIGHT'},
  {key:'g2_final',x:'60%',y:'66%',w:'clamp(78px,8.7vw,132px)',r:'.8deg',dx:'8px',dy:'-5px',turn:'.7deg',op:'.26',pos:'50% 48%',word:'SUMMER'},
  {key:'g3_grandpa',x:'50%',y:'55%',w:'clamp(74px,8.2vw,124px)',r:'-.45deg',dx:'-6px',dy:'-8px',turn:'-.55deg',op:'.22',pos:'56% 42%',word:'ROAD'},
  {key:'g4',x:'41%',y:'43%',w:'clamp(72px,7.8vw,118px)',r:'.7deg',dx:'7px',dy:'5px',turn:'.8deg',op:'.2',pos:'50% 50%',word:'WINDOW'},
  {key:'g5_blackout',x:'59%',y:'40%',w:'clamp(72px,7.8vw,118px)',r:'-.8deg',dx:'-8px',dy:'-6px',turn:'-.7deg',op:'.19',pos:'50% 48%',word:'CANDLE'},
  {key:'icu_gap',x:'49%',y:'28%',w:'clamp(68px,7.4vw,110px)',r:'.5deg',dx:'6px',dy:'7px',turn:'.65deg',op:'.17',pos:'50% 50%',word:'HOSPITAL'}
];
function buildMapMemoryScramble(){
  let layer=mapEl.querySelector('.map-memory-scramble');
  if(layer)return layer;
  layer=document.createElement('div');layer.className='map-memory-scramble';layer.setAttribute('aria-hidden','true');
  MAP_MEMORY_FRAGMENTS.forEach((item,index)=>{
    const fragment=document.createElement('div');fragment.className='map-memory-fragment';fragment.style.backgroundImage=`url('${IMG[item.key]}')`;
    ['x','y','w','r','dx','dy','turn','op','pos'].forEach(key=>fragment.style.setProperty('--'+key,item[key]));layer.appendChild(fragment);
    const word=document.createElement('div');word.className='map-memory-word';word.style.setProperty('--x',item.x);word.style.setProperty('--y',`calc(${item.y} + ${index%2?'-5.4':'5.4'}vh)`);word.style.setProperty('--r',item.r);
    [...item.word].forEach((letter,i)=>{const span=document.createElement('span');span.className='map-memory-letter';span.textContent=letter;span.style.setProperty('--lx',`${((i*5+index*3)%13)-6}px`);span.style.setProperty('--ly',`${((i*7+index*2)%11)-5}px`);span.style.setProperty('--lr',`${((i*9+index*4)%15)-7}deg`);span.style.setProperty('--lo',String(.38+((i+index)%4)*.13));word.appendChild(span)});layer.appendChild(word)
  });
  mapEl.insertBefore(layer,mapCap);return layer
}
async function mapScramble(){
  const original={};for(const k in mapCells)original[k]=mapCells[k].t.textContent;
  openMap();mapEl.classList.remove('scram','smudge','memory-confused');mapEl.classList.add('seventh-return');
  const memoryLayer=buildMapMemoryScramble();memoryLayer.className='map-memory-scramble';
  const arrow=mapSvg.querySelector(':scope > path:last-of-type');if(arrow)arrow.classList.add('map-arrow-awake');
  await wait(reduce?650:1650);
  const c=mapCells[7];if(c&&c.im)c.im.classList.add('in');
  memoryLayer.classList.add('forming');
  await wait(reduce?420:1450);
  const changed={1:'2',2:'5',3:'1',4:'7',5:'3',6:'8',7:'4',8:'6'};
  const order=[1,4,2,6,3,8,5,7];
  for(const n of order){
    if(mapCells[n])mapCells[n].t.textContent=changed[n];
    if(A.on)sfx('chalkkid');
    await wait(reduce?180:470)
  }
  memoryLayer.classList.add('confused');mapEl.classList.add('memory-confused');
  await wait(reduce?480:1450);
  mapCap.classList.add('narration');
  mapCap.innerHTML='The path is here.<br><span style="font-size:.8em;color:#a89e8c">But the years no longer sit inside the right squares.</span>';
  await wait(reduce?280:850);mapCap.classList.add('on');
  await wait(reduce?2300:5700);
  memoryLayer.classList.add('fading');mapEl.classList.remove('memory-confused');
  mapCap.classList.remove('on');await wait(reduce?380:1550);
  closeMap();await wait(reduce?500:1750);
  for(const k in original)if(mapCells[k])mapCells[k].t.textContent=original[k];
  if(arrow)arrow.classList.remove('map-arrow-awake');
  memoryLayer.className='map-memory-scramble';
  mapEl.classList.remove('seventh-return','memory-confused');mapCap.innerHTML=''
}
/* ========== Continue gate ========== */
let gt=null;
function openGate(d,label,onMap){clearTimeout(gt);
 gt=setTimeout(()=>{mapGate=!!onMap;goEl.classList.toggle('map-gate',mapGate);gate=true;goEl.classList.add('on','rdy');goLb.textContent=label||'Jump to the next square'},
   d===undefined?(reduce?300:3000):(reduce?300:d))}
function closeGate(){gate=false;mapGate=false;goEl.classList.remove('on','rdy','map-gate')}

/* ========== 场景切换 ========== */
function start(){
  if(started)return;started=true;
  if(!rafx)tick();
  lamp.classList.add('on');fxc.classList.add('on');
  inter(INTER[0]).then(()=>go(0,true));
}
async function go(n,first,fromMap){
  if(busy||n<0)return;
  if(n>=CELLS.length){toCoda();return}
  if(fromMap){
    busy=true;closeGate();clearTip();hideProg();
    veil.style.transition='opacity .2s ease';veil.style.opacity='1';
    await wait(reduce?20:180);
    closeMap();
    await wait(reduce?220:1850);
    if(INTER[n]&&n!==idx)await inter(INTER[n]);
    busy=false
  }else if(!first&&INTER[n]&&n!==idx){busy=true;closeGate();await inter(INTER[n]);busy=false}
  if(busy)return;
  busy=true;closeGate();clearTip();hideProg();
  const leaving=!fromMap&&idx>0&&scenes[idx]&&scenes[idx].classList.contains('on')?CELLS[idx]:null;
  if(leaving){const ghostKey=leaving.returnImg||leaving.img;
    if(IMG[ghostKey]){memoryAfter.classList.remove('on','fade');memoryAfter.style.backgroundImage=`url('${IMG[ghostKey]}')`;void memoryAfter.offsetWidth;memoryAfter.classList.add('on')}}
  veil.style.transition='opacity .6s ease';veil.style.opacity=first?'0':fromMap?'1':'.72';
  if(!first)sfx('step');
  await wait(first?100:reduce?150:700);
  scenes.forEach(s=>{s.classList.remove('on','rv','dark','opening-soft','opening-clear','last-look-release');
    const im=s.querySelector('.im');if(im){im.classList.remove('kb');im.style.filter='';im.style.transform='';im.style.opacity='1'}});
  const sc=scenes[n],openingReveal=first&&n===0;
  if(openingReveal)sc.classList.add('opening-soft');else sc.classList.add('memory-arrive');
  sc.classList.add('on');void sc.offsetWidth;
  sc.querySelector('.im').classList.add('kb');
  if(!openingReveal)requestAnimationFrame(()=>requestAnimationFrame(()=>sc.classList.remove('memory-arrive')));
  if(leaving)requestAnimationFrame(()=>memoryAfter.classList.add('fade'));
  if(openingReveal)requestAnimationFrame(()=>requestAnimationFrame(()=>{
    sc.classList.add('opening-clear');
    openingBg.classList.add('reveal');
    setTimeout(()=>sc.classList.remove('opening-soft','opening-clear'),reduce?50:6100);
  }));
  idx=n;
  const c=CELLS[n];
  const archiveName=(c.frag||(c.t.split('/').pop())||'memory').trim();
  const archiveScene=n;archiveTag.classList.remove('on');
  if(n===8){archiveText.textContent=''}
  else{
    archiveText.textContent=(n===0?'THRESHOLD':'MEMORY FRAGMENT')+'  \u00B7  '+archiveName;
    setTimeout(()=>{if(idx===archiveScene)archiveTag.classList.add('on')},openingReveal?(reduce?80:4300):(reduce?80:1150))
  }
  document.documentElement.style.setProperty('--amb',c.warm);
  spawn(c.pfx);if(A.on)scape(c.snd);
  veil.style.transition='opacity 1.6s ease';veil.style.opacity='0';
  busy=false;
  await wait(openingReveal?(reduce?200:4400):(reduce?200:2600));       // 先让人看画面
  sc.classList.add('rv');             // 叙述文字
  await wait(reduce?200:2600);
  runAct(n);
}

/* ========== 每格的动作 ========== */
function hot(sc,x,y,cold){const h=document.createElement('button');h.type='button';h.className='hot'+(cold?' cold':'');h.setAttribute('aria-label','Interact with '+(sc.querySelector('.cap .t')?.textContent||'this memory').trim());
 h.style.left=x+'%';h.style.top=y+'%';sc.querySelector('.hots').appendChild(h);return h}

function runAct(i){
  const c=CELLS[i],sc=scenes[i];
  sc.querySelector('.hots').innerHTML='';
  const im=sc.querySelector('.im');

  // 动作做完 → 记忆活过来（播放影像）→ 台词 → 碎片 → 放行
  const payoff=async(withClip,skipVoice)=>{
    clearTip();hideProg();
    if(withClip&&c.stillSequence){
      await wait(reduce?140:700);
      await playThirdMemorySequence(c);
      await wait(reduce?160:700);
    }else if(withClip&&c.clip){
      await wait(c.returnImg?(reduce?180:950):600);
      await playClip(c.clip,c.clipLbl,c.clipStill,c.clipStillMs,c.returnImg?()=>{
        im.style.backgroundImage=`url('${IMG[c.returnImg]}')`;
        im.style.filter='';
      }:null);
      if(c.clip2){await wait(300);await playClip(c.clip2,null)}
      document.body.classList.remove('cine');
      await wait(c.returnImg?(reduce?220:1100):500);
    }
    if(c.voice&&!skipVoice){await wait(say(c.voice))}
    if(c.returnImg)await wait(reduce?220:800);
    const useMapGate=i===1||i===2;
    if(i>=1&&i<=5)await fillCell(i,c.frag?`Square ${ORD[i]} &nbsp;/&nbsp; ${c.frag}`:'',useMapGate);
    openGate(reduce?300:1800,undefined,useMapGate);
  };

  switch(c.act){
    /* 0 · 描粉笔线 */
    case 'chalk':{
      setTip(c.tip);showProg();
      let d=0,down=false,fin=false;const need=touch?600:1000;
      const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.setAttribute('viewBox','0 0 1000 560');
      svg.classList.add('prelude-trace');
      svg.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none';
      const rr=[];[[500,470],[500,410],[440,350],[560,350],[500,290],[440,230],[560,230],[500,170]]
        .forEach(([x,y],ri)=>{const r=document.createElementNS('http://www.w3.org/2000/svg','rect');
          r.setAttribute('x',x-55);r.setAttribute('y',y-26);r.setAttribute('width',110);r.setAttribute('height',52);
          r.setAttribute('fill','none');r.setAttribute('stroke','rgba(240,235,220,.8)');r.setAttribute('stroke-width',2);
          r.classList.add('prelude-chalk-rect');
          r.setAttribute('filter','url(#ch)');r.style.strokeDasharray=324;r.style.strokeDashoffset=324;
          r.style.transition='stroke-dashoffset .6s ease';svg.appendChild(r);rr.push(r)});
      sc.querySelector('.hots').appendChild(svg);
      const dn=()=>{down=true;lamp.classList.add('tight')},up=()=>{down=false;lamp.classList.remove('tight')};
      const finish=async()=>{
        fin=true;up();rr.forEach(r=>r.style.strokeDashoffset='0');
        removeEventListener('pointerdown',dn);removeEventListener('pointerup',up);removeEventListener('pointermove',mv);
        clearTip();hideProg();busy=true;flashS('.1','#e9e3d4');
        await wait(reduce?80:650);       // let the final chalk stroke settle
        await wait(reduce?120:1750);     // hold the completed board still
        const cap=sc.querySelector('.cap');
        if(cap){cap.style.transition='opacity 2.35s ease';cap.style.opacity='0'}
        if(reduce)svg.style.opacity='0';
        else{
          sc.classList.add('prelude-opening');
          svg.style.transform='translate3d(0,0,0) scale(1)';
          void svg.getBoundingClientRect();
          requestAnimationFrame(()=>svg.classList.add('prelude-dissolve'));
        }
        await wait(reduce?180:4300);     // let the intact board enlarge and nearly finish dissolving
        busy=false;go(1,false);
        setTimeout(()=>{svg.remove();sc.classList.remove('prelude-opening')},reduce?250:900);
      };
      const mv=e=>{if(!down||fin)return;
        d+=Math.hypot(e.movementX||0,e.movementY||0)||6;
        if(Math.random()<.13)sfx('chalk');
        const p=Math.min(1,d/need);setProg(p);
        const k=Math.floor(p*8);rr.forEach((r,j)=>{if(j<k)r.style.strokeDashoffset='0'});
        if(p>=1)finish()};
      addEventListener('pointerdown',dn);addEventListener('pointerup',up);addEventListener('pointermove',mv);
      break}

    /* 1 路 娣绘煷 脳3 */
    case 'click3':{
      setTip(c.tip);
      let n=0;const h=hot(sc,c.hot.x,c.hot.y);
      h.onclick=()=>{n++;sfx('wood');flashS('.14','#ffb968');spawn('ember');
        document.documentElement.style.setProperty('--amb',String(.5+n*.17));
        im.style.filter=`brightness(${1+n*.08}) saturate(${1+n*.07})`;
        if(n>=3){h.onclick=null;h.disabled=true;h.classList.add('done');setTimeout(()=>h.classList.add('hid'),500);payoff(true)}};
      break}

    /* 2 · 双击接西瓜 */
    /* 2 路 閬ユ帶鍣ㄦ墦寮€澶忓ぉ鐨勮蹇?*/
    case 'memory2':{
      const layer=sc.querySelector('.hots');
      const h=document.createElement('button');h.type='button';h.className='hot remote-hot ui';
      h.style.left=c.hot.x+'%';h.style.top=c.hot.y+'%';
      h.setAttribute('aria-label','Press the remote to wake the summer memory');layer.appendChild(h);
      const tv=document.createElement('div');tv.className='tvwake';tv.setAttribute('aria-hidden','true');layer.appendChild(tv);
      let started=false,inputMode='pointer';
      h.addEventListener('pointerdown',()=>{inputMode='pointer'});
      h.addEventListener('keydown',()=>{inputMode='keyboard'});
      tipNow(c.tip);
      h.onclick=async()=>{if(started)return;started=true;h.disabled=true;clearTip();
        h.classList.add('pressed');tv.classList.add('on');sfx('remote');
        setTimeout(()=>sfx('tvswell'),reduce?30:180);
        im.style.transition='filter 1.4s cubic-bezier(.22,1,.36,1),transform 2.1s cubic-bezier(.22,1,.36,1)';
        im.style.filter='brightness(1.08) saturate(1.04)';im.style.transform='scale(1.045)';
        tipNow('The screen wakes.');
        await wait(reduce?180:1500);h.classList.add('hid');clearTip();sc.classList.add('inter-muted');
        await playMemorySequence(c,im,inputMode);
        sc.classList.remove('inter-muted');
        await wait(reduce?400:3800);
        await payoff(false,true)
      };
      break}
    case 'dbl':{
      setTip(c.tip);
      const h=hot(sc,c.hot.x,c.hot.y);let t=null;
      h.ondblclick=()=>{sfx('cut');flashS('.12','#ff8f7a');h.ondblclick=null;h.onclick=null;h.disabled=true;
        h.classList.add('done');setTimeout(()=>h.classList.add('hid'),500);payoff(true)};
      h.onclick=()=>{clearTimeout(t);t=setTimeout(()=>{if(!h.classList.contains('done'))
        setTip('Use both hands. Double-click',true)},340)};
      break}

    /* 3 · 抬头看天 */
    /* 3 路 Ride with him. The player controls the time. */
    case 'ride':{
      const keys=(c.stillSequence||[]).filter(k=>IMG[k]),positions=c.stillPos||[];
      if(keys.length<4){payoff(false,true);break}
      const rideControl=$('rideControl'),rideVeil=$('rideVeil'),rideStage=$('rideStage'),rideGuide=$('rideGuide'),rideGuideText=$('rideGuideText'),ridePointer=$('ridePointer'),rideParticles=$('rideParticles'),frames=[thirdA,thirdB];
      const stageCopy=['The fields begin to move.','The road unfolds beneath us.','Look up. The sky is still there.'];
      let current=null,front=0,ctx=null,canvasRect=null,ready=false,dragging=false,completing=false,finished=false,autoRaf=0,resizeRaf=0,thresholdTimer=0,hintTimer=0,stageTimer=0;
      let pointerX=innerWidth*.5,pointerY=innerHeight*.52,lastPoint=null,lastMoveAt=0,firstStrokeAt=0,weightedDistance=0,particleAt=0,coveredCount=0;
      const gridCols=36,gridRows=22,covered=new Uint8Array(gridCols*gridRows),traces=[];
      const skyImage=new Image();skyImage.src=IMG[keys[2]];
      const clearTimers=()=>{clearTimeout(thresholdTimer);clearTimeout(hintTimer);clearTimeout(stageTimer);cancelAnimationFrame(autoRaf);cancelAnimationFrame(resizeRaf)};
      const showStage=(copy,duration=reduce?650:2450)=>{clearTimeout(stageTimer);rideStage.textContent=copy;rideStage.classList.add('on');stageTimer=setTimeout(()=>rideStage.classList.remove('on'),duration)};
      const positionPointer=(clientX,clientY)=>{const r=thirdEl.getBoundingClientRect();pointerX=Math.max(0,Math.min(r.width,clientX-r.left));pointerY=Math.max(0,Math.min(r.height,clientY-r.top));ridePointer.style.transform=`translate3d(${pointerX}px,${pointerY}px,0) translate(-50%,-50%) rotate(-8deg)`;thirdEl.classList.add('wipe-pointer-ready')};
      const dust=(count=1,x=pointerX,y=pointerY,wide=false)=>{
        if(reduce||!rideParticles)return;
        for(let i=0;i<count;i++){
          const p=document.createElement('i'),a=-Math.PI*.9+Math.random()*Math.PI*.8,distance=(wide?28:12)+Math.random()*(wide?68:34);
          p.className='wipe-particle';p.style.setProperty('--x',`${x+(Math.random()-.5)*(wide?70:20)}px`);p.style.setProperty('--y',`${y+(Math.random()-.5)*(wide?44:16)}px`);
          p.style.setProperty('--dx',`${Math.cos(a)*distance}px`);p.style.setProperty('--dy',`${Math.sin(a)*distance-(wide?20:8)}px`);p.style.setProperty('--s',`${1.2+Math.random()*2.5}px`);p.style.setProperty('--d',`${1.05+Math.random()*.9}s`);
          rideParticles.appendChild(p);setTimeout(()=>p.remove(),2200)
        }
      };
      const drawCover=(image,w,h)=>{
        if(!ctx||!image.naturalWidth)return false;
        const scale=Math.max(w/image.naturalWidth,h/image.naturalHeight),dw=image.naturalWidth*scale,dh=image.naturalHeight*scale;
        ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.clearRect(0,0,w,h);ctx.drawImage(image,(w-dw)/2,(h-dh)/2,dw,dh);return true
      };
      const dab=(x,y,r,alpha,record=true)=>{
        if(!ctx)return;
        ctx.save();ctx.globalCompositeOperation='destination-out';
        const g=ctx.createRadialGradient(x,y,Math.max(1,r*.08),x,y,r);
        g.addColorStop(0,`rgba(0,0,0,${Math.min(.98,alpha)})`);g.addColorStop(.48,`rgba(0,0,0,${Math.min(.88,alpha*.82)})`);g.addColorStop(.82,`rgba(0,0,0,${Math.min(.38,alpha*.32)})`);g.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);ctx.restore();
        if(record&&traces.length<2200)traces.push({x:x/rideVeil.width,y:y/rideVeil.height,r:r/Math.min(rideVeil.width,rideVeil.height),a:alpha})
      };
      const layoutVeil=()=>{
        if(finished||!skyImage.naturalWidth)return;
        const r=rideVeil.getBoundingClientRect(),scale=Math.min(.9,1800/Math.max(1,r.width),1100/Math.max(1,r.height));
        const w=Math.max(1,Math.round(r.width*scale)),h=Math.max(1,Math.round(r.height*scale));canvasRect=r;
        if(rideVeil.width!==w||rideVeil.height!==h){rideVeil.width=w;rideVeil.height=h;ctx=rideVeil.getContext('2d',{alpha:true});drawCover(skyImage,w,h);traces.forEach(t=>dab(t.x*w,t.y*h,t.r*Math.min(w,h),t.a,false))}
        else if(!ctx)ctx=rideVeil.getContext('2d',{alpha:true})
      };
      const markCoverage=(nx,ny,rn)=>{
        const minX=Math.max(0,Math.floor((nx-rn)*gridCols)),maxX=Math.min(gridCols-1,Math.ceil((nx+rn)*gridCols));
        const minY=Math.max(0,Math.floor((ny-rn)*gridRows)),maxY=Math.min(gridRows-1,Math.ceil((ny+rn)*gridRows));
        for(let y=minY;y<=maxY;y++)for(let x=minX;x<=maxX;x++){
          const dx=(x+.5)/gridCols-nx,dy=(y+.5)/gridRows-ny;
          if(dx*dx+dy*dy<=rn*rn*1.45){const k=y*gridCols+x;if(!covered[k]){covered[k]=1;coveredCount++}}
        }
      };
      const detach=()=>{
        rideControl.onpointerenter=rideControl.onpointermove=rideControl.onpointerleave=rideControl.onpointerdown=rideControl.onpointerup=rideControl.onpointercancel=rideControl.onkeydown=rideControl.onblur=null;
        removeEventListener('resize',onResize);clearTimers();rideControl.disabled=true;rideControl.tabIndex=-1
      };
      const completeReveal=async()=>{
        if(completing||finished)return;completing=true;ready=false;dragging=false;detach();rideGuide.classList.remove('on');rideStage.classList.remove('on');
        thirdEl.classList.remove('wipe-active','wipe-pointer-ready');thirdEl.classList.add('wipe-complete');rideVeil.classList.add('dissolve');dust(22,innerWidth*.5,innerHeight*.57,true);
        if(A.on)sfx('ridequiet');await wait(reduce?220:2850);
        thirdLbl.innerHTML='<span>He pedals.</span><span>The wind is safe.</span>';thirdLbl.classList.add('on');
        await wait(reduce?1100:5900);finished=true;
        im.classList.remove('kb');im.style.transition='none';im.style.backgroundImage=`url('${IMG.g3_grandpa}')`;im.style.backgroundPosition='center';im.style.filter='';im.style.transform='scale(1.035)';
        thirdLbl.classList.remove('on');thirdEl.classList.remove('on');duck(1,1.8);await wait(reduce?220:1650);
        frames.forEach(f=>{f.className='tmf';f.style.cssText='';f.style.backgroundImage='';f.style.opacity='0'});rideParticles.innerHTML='';rideVeil.className='ride-veil';rideVeil.width=1;rideVeil.height=1;ctx=null;
        thirdEl.className='';thirdEl.setAttribute('aria-hidden','true');document.body.classList.remove('cine');await payoff(false,true)
      };
      const maybeComplete=()=>{
        if(completing||!firstStrokeAt)return;
        const coverage=coveredCount/covered.length,needed=Math.min(innerWidth,innerHeight)*1.35;
        if(coverage<.12||weightedDistance<needed)return;
        const remaining=Math.max(0,(reduce?0:2500)-(performance.now()-firstStrokeAt));clearTimeout(thresholdTimer);thresholdTimer=setTimeout(completeReveal,remaining)
      };
      const erasePoint=(clientX,clientY,pointerType='mouse',synthetic=false)=>{
        if(!ready||completing)return;layoutVeil();if(!ctx||!canvasRect)return;
        const now=performance.now(),sx=rideVeil.width/canvasRect.width,sy=rideVeil.height/canvasRect.height;
        const x=(clientX-canvasRect.left)*sx,y=(clientY-canvasRect.top)*sy,cssRadius=pointerType==='touch'?128:96,r=cssRadius*(sx+sy)*.5;
        const prev=lastPoint,distCss=prev?Math.hypot((x-prev.x)/sx,(y-prev.y)/sy):0,dt=Math.max(12,now-(lastMoveAt||now-16)),speed=distCss/dt;
        const strength=synthetic ? .9 : Math.max(.34,Math.min(.94,.96-speed*.19)),steps=prev?Math.max(1,Math.min(28,Math.ceil(Math.hypot(x-prev.x,y-prev.y)/(r*.3)))):1;
        for(let i=1;i<=steps;i++){const t=i/steps,px=prev?prev.x+(x-prev.x)*t:x,py=prev?prev.y+(y-prev.y)*t:y;dab(px,py,r,strength);markCoverage(px/rideVeil.width,py/rideVeil.height,(r/Math.min(rideVeil.width,rideVeil.height))*.78)}
        weightedDistance+=distCss*strength;lastPoint={x,y};lastMoveAt=now;if(now>=particleAt){particleAt=now+85;dust(1,pointerX,pointerY)};maybeComplete()
      };
      const beginStroke=e=>{
        if(!ready||completing)return;e.preventDefault();dragging=true;clearTimeout(hintTimer);rideGuide.classList.remove('on');thirdEl.classList.add('wipe-active');
        positionPointer(e.clientX,e.clientY);if(!firstStrokeAt){firstStrokeAt=performance.now();if(A.on)sfx('ridewind')}
        lastPoint=null;lastMoveAt=performance.now();try{rideControl.setPointerCapture(e.pointerId)}catch(_){};
        if(reduce){completeReveal();return}erasePoint(e.clientX,e.clientY,e.pointerType||'mouse')
      };
      const endStroke=()=>{
        if(!dragging)return;dragging=false;lastPoint=null;thirdEl.classList.remove('wipe-active');
        if(!completing){rideGuideText.textContent='Move across another part of the sky.';hintTimer=setTimeout(()=>{if(ready&&!dragging&&!completing)rideGuide.classList.add('on')},1150)}
      };
      const autoWipe=()=>{
        if(!ready||completing||autoRaf)return;if(!firstStrokeAt){firstStrokeAt=performance.now();if(A.on)sfx('ridewind')}
        clearTimeout(hintTimer);rideGuide.classList.remove('on');thirdEl.classList.add('wipe-active');const start=performance.now(),duration=reduce?240:4200;
        const step=now=>{
          if(completing||finished){autoRaf=0;return}const p=Math.min(1,(now-start)/duration),leg=Math.min(2,Math.floor(p*3)),u=p*3-leg;
          const left=leg===1 ? .76-(u*.52) : .24+(u*.52),top=[.43,.57,.7][leg]+Math.sin(u*Math.PI)*.035,r=thirdEl.getBoundingClientRect();
          const cx=r.left+r.width*left,cy=r.top+r.height*top;positionPointer(cx,cy);erasePoint(cx,cy,'mouse',true);
          if(p<1)autoRaf=requestAnimationFrame(step);else{autoRaf=0;thirdEl.classList.remove('wipe-active');maybeComplete();if(!completing)thresholdTimer=setTimeout(completeReveal,reduce?0:650)}
        };autoRaf=requestAnimationFrame(step)
      };
      const onResize=()=>{cancelAnimationFrame(resizeRaf);resizeRaf=requestAnimationFrame(layoutVeil)};
      const showFrame=async(n,hold)=>{
        const next=frames[front%2],outgoing=current,transitionMs=reduce?180:[1150,1350,1500][n];front++;
        next.className='tmf';next.style.cssText='';next.style.zIndex='1';next.style.backgroundImage=`url('${IMG[keys[n]]}')`;next.style.backgroundPosition=positions[n]||'center';next.style.opacity='0';next.style.transform='scale(1.058)';next.style.filter='blur(1.8px) brightness(.86) saturate(.78)';
        void next.offsetWidth;next.style.transition=`opacity ${transitionMs}ms cubic-bezier(.22,1,.36,1),transform ${transitionMs+1800}ms cubic-bezier(.22,1,.36,1),filter ${transitionMs}ms ease`;
        requestAnimationFrame(()=>{next.style.opacity='1';next.style.transform='scale(1.035)';next.style.filter='blur(0) brightness(.97) saturate(.92)'});
        if(outgoing&&outgoing!==next){outgoing.style.zIndex='0';outgoing.style.transition=`opacity ${transitionMs}ms cubic-bezier(.22,1,.36,1),filter ${transitionMs}ms ease`;outgoing.style.opacity='0';outgoing.style.filter='blur(2px) brightness(.8) saturate(.7)'}
        current=next;showStage(stageCopy[n]);if(A.on&&n>0)sfx(n===1?'ridewind':'ridewire');await wait(transitionMs+hold)
      };
      frames.forEach(f=>{f.className='tmf';f.style.cssText='';f.style.opacity='0';f.style.backgroundImage=''});thirdLbl.classList.remove('on');thirdLbl.innerHTML='';rideParticles.innerHTML='';rideStage.classList.remove('on');rideGuide.classList.remove('on');
      rideVeil.className='ride-veil';rideControl.disabled=true;rideControl.tabIndex=-1;thirdEl.className='on wipe-mode';thirdEl.setAttribute('aria-hidden','false');document.body.classList.add('cine');duck(.56,1.5);clearTip();
      rideControl.onpointerenter=e=>{if(ready)positionPointer(e.clientX,e.clientY)};
      rideControl.onpointermove=e=>{if(!ready)return;positionPointer(e.clientX,e.clientY);if(dragging)erasePoint(e.clientX,e.clientY,e.pointerType||'mouse')};
      rideControl.onpointerleave=()=>{if(!dragging)thirdEl.classList.remove('wipe-pointer-ready')};rideControl.onpointerdown=beginStroke;rideControl.onpointerup=endStroke;rideControl.onpointercancel=endStroke;rideControl.onblur=endStroke;
      rideControl.onkeydown=e=>{if((e.key===' '||e.key==='Enter')&&!e.repeat){e.preventDefault();autoWipe()}};
      void(async()=>{
        await showFrame(0,reduce?220:2050);if(finished)return;await showFrame(1,reduce?250:2350);if(finished)return;thirdEl.classList.add('skyward');await showFrame(2,reduce?260:1350);if(finished)return;
        if(!skyImage.complete||!skyImage.naturalWidth){try{await skyImage.decode()}catch(_){}}
        if(finished)return;
        const lower=frames.find(f=>f!==current)||frames[0];lower.className='tmf';lower.style.cssText='';lower.style.zIndex='0';lower.style.backgroundImage=`url('${IMG[keys[3]]}')`;lower.style.backgroundPosition='center';lower.style.opacity='1';lower.style.transform='scale(1)';lower.style.filter='brightness(.99) saturate(.96)';
        layoutVeil();if(ctx&&skyImage.naturalWidth){rideVeil.style.transition='none';rideVeil.style.opacity='1';rideVeil.classList.add('ready');void rideVeil.offsetWidth;await wait(80);current.style.opacity='0';current.style.zIndex='0';rideVeil.style.opacity='';rideVeil.style.transition=''}
        else{rideVeil.classList.add('ready');current.style.opacity='0'}
        ready=true;rideControl.disabled=false;rideControl.tabIndex=0;rideControl.setAttribute('aria-label','Press and move slowly across the sky to reveal Grandfather. Keyboard users can press Enter.');thirdEl.classList.add('wipe-ready');
        rideGuideText.textContent='Press, then move slowly across the sky.';hintTimer=setTimeout(()=>{if(ready&&!firstStrokeAt)rideGuide.classList.add('on')},reduce?100:850);addEventListener('resize',onResize)
      })();
      break}

    /* 4 - Keep looking. */    case 'hold':{
      setTip(c.tip);showProg('cold');
      const MAX=reduce?1:11;
      let holding=false,elapsed=0,raf=null,fin=false,ever=false,last=performance.now();
      const h=hot(sc,50,50,true);h.classList.add('hold-field');
      h.setAttribute('aria-label','Hold to keep looking; release to let go');
      const reflection=document.createElement('div');reflection.className='last-look-reflection';
      reflection.setAttribute('aria-hidden','true');sc.querySelector('.hots').insertBefore(reflection,h);
      const detach=()=>{cancelAnimationFrame(raf);h.onpointerdown=h.onpointerup=h.onpointercancel=h.onkeydown=h.onkeyup=h.onblur=null;h.disabled=true};
      const end=async rel=>{
        if(fin)return;fin=true;detach();h.classList.add('hid');lamp.classList.remove('tight');clearTip();hideProg();
        sc.classList.add('last-look-release');
        im.style.transition='filter 3.8s cubic-bezier(.22,1,.36,1),transform 4.4s cubic-bezier(.22,1,.36,1)';
        im.style.filter='blur(8px) brightness(.62) saturate(.48) hue-rotate(10deg)';im.style.transform='scale(1.17)';
        if(A.on){scape('cabin');sfx('glass')}
        await wait(reduce?180:1800);
        const lookLine=rel?'You let go.<br><span style="font-size:.7em;color:#b8c2c9">And just like that, he was gone from the window.</span>'
               :'You watched him until the road turned.<br><span style="font-size:.7em;color:#b8c2c9">Even the longest look comes to an end.</span>';
        await wait(say(lookLine,true));
        await wait(say(c.voice,true));
        await fillCell(4,'Square Four &nbsp;/&nbsp; The last look');
        openGate(reduce?300:1800);
      };
      const loop=now=>{raf=requestAnimationFrame(loop);const dt=Math.min(.1,Math.max(0,(now-last)/1000));last=now;
        if(holding){elapsed+=dt;const p=Math.min(1,elapsed/MAX);setProg(p);
          im.style.filter=`brightness(${1+p*.07}) contrast(${1+p*.05})`;
          im.style.transform=`scale(${1.1-p*.05})`;
          if(p>=1)end(false)}};
      const begin=e=>{if(fin||holding)return;holding=true;ever=true;last=performance.now();lamp.classList.add('tight');
        if(e&&e.pointerId!==undefined&&h.setPointerCapture){try{h.setPointerCapture(e.pointerId)}catch(err){}}};
      const release=()=>{lamp.classList.remove('tight');if(!ever||!holding)return;holding=false;end(true)};
      h.onpointerdown=begin;h.onpointerup=release;h.onpointercancel=release;
      h.onkeydown=e=>{if((e.key===' '||e.key==='Enter')&&!e.repeat){e.preventDefault();begin(e)}};
      h.onkeyup=e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();release()}};
      h.onblur=()=>{if(holding)release()};
      raf=requestAnimationFrame(loop);
      break}

    /* 5 璺?閸嬫粎鏁?閳?閻愮婀ｉ悜?*/
    case 'candle':{
      (async()=>{
        const bg=sc.querySelector('.bg'),b=sc.querySelector('.black');
        const makeFrame=(key,pos)=>{
          const f=document.createElement('div');f.className='fifth-frame';
          f.setAttribute('aria-hidden','true');f.style.backgroundImage=`url('${IMG[key]}')`;
          f.style.backgroundPosition=pos||'center';bg.appendChild(f);return f
        };
        clearTip();

        /* Let the television remain a memory for one last beat, then let its
           light collapse before the room itself disappears into the outage. */
        await wait(reduce?80:850);
        silence(reduce?240:3800);
        sc.classList.remove('cd');im.classList.remove('kb');im.style.animation='none';
        const outage=makeFrame(c.blackoutImg,'center');
        outage.style.transition=`opacity ${reduce?.18:1.85}s cubic-bezier(.22,1,.36,1),transform ${reduce?.18:4.6}s cubic-bezier(.22,1,.36,1),filter ${reduce?.18:2.5}s cubic-bezier(.22,1,.36,1)`;
        im.style.transition=`filter ${reduce?.18:.62}s ease,opacity ${reduce?.18:1.45}s cubic-bezier(.22,1,.36,1),transform ${reduce?.18:3.8}s cubic-bezier(.22,1,.36,1)`;
        im.style.filter='brightness(.16) saturate(.18) contrast(1.06)';
        im.style.opacity='.42';im.style.transform='scale(1.075)';
        await wait(reduce?20:90);outage.classList.add('on');
        await wait(reduce?180:2050);
        im.style.backgroundImage=`url('${IMG[c.blackoutImg]}')`;im.style.backgroundPosition='center';
        im.style.opacity='1';im.style.filter='none';im.style.transform='scale(1.055)';
        await wait(reduce?20:100);outage.remove();

        /* Hold on the powerless room before asking the viewer to make light. */
        await wait(reduce?120:1450);
        sc.classList.add('dark');lamp.classList.add('tight');
        b.style.transition=`opacity ${reduce?.18:1.3}s cubic-bezier(.22,1,.36,1)`;
        b.style.opacity='.94';
        document.documentElement.style.setProperty('--amb','.06');
        await wait(reduce?180:1350);

        setTip(c.tip,true);
        const h=hot(sc,c.hot.x,c.hot.y);h.style.opacity='.5';
        h.setAttribute('aria-label','Strike a match to light the candle');
        let n=0,finished=false;const need=5;
        h.onclick=async()=>{
          if(finished)return;
          n++;sfx('match');flashS(String(.04+n*.03),'#ffcf87');
          b.style.transition=`opacity ${reduce?.12:.42}s ease`;
          b.style.opacity=String(Math.max(.14,.94-n/need*.8));
          document.documentElement.style.setProperty('--amb',String(.06+n*.07));
          h.style.opacity=String(.5+n*.1);
          if(n<need)return;

          finished=true;h.onclick=null;h.disabled=true;h.classList.add('done');
          setTimeout(()=>h.classList.add('hid'),reduce?30:600);
          clearTip();sc.classList.remove('dark');lamp.classList.remove('tight');

          /* The last match does not simply brighten the blackout: it brings
             his hand and the candle back into view. Only then may he speak. */
          const candle=makeFrame(c.candleImg,c.candlePos);
          candle.style.transition=`opacity ${reduce?.18:3.05}s cubic-bezier(.22,1,.36,1),transform ${reduce?.18:5.2}s cubic-bezier(.22,1,.36,1),filter ${reduce?.18:3.4}s cubic-bezier(.22,1,.36,1)`;
          b.style.transition=`opacity ${reduce?.18:3.15}s cubic-bezier(.22,1,.36,1)`;
          b.style.opacity='0';document.documentElement.style.setProperty('--amb','.5');
          spawn('ember');
          await wait(reduce?20:90);candle.classList.add('on');
          await wait(reduce?220:3200);
          im.style.backgroundImage=`url('${IMG[c.candleImg]}')`;im.style.backgroundPosition=c.candlePos||'center';
          im.style.opacity='1';im.style.filter='none';im.style.transform='scale(1.055)';
          await wait(reduce?20:100);candle.remove();
          await wait(reduce?180:1150);
          await payoff(false)
        };
      })();
      break}

    /* 6 路 ICU锛氶棬鎵撲笉寮€锛岀敾闈笉鍐嶅洖搴?*/
    case 'door':{
      setTip(c.tip);
      const h0=hot(sc,50,50,true);
      h0.onclick=()=>{
        sfx('step');h0.remove();clearTip();
        im.style.transition='opacity 1.6s ease';im.style.opacity='0';
        setTimeout(()=>{im.style.backgroundImage=`url('${IMG.icu_sign}')`;im.style.opacity='1';
          setTimeout(pull,1800)},1700);
      };
      function pull(){
        setTip('Pull the door open',true);showProg('cold');
        const h=hot(sc,68,64,true);
        let n=0,p=0,fin=false;
        const dec=setInterval(()=>{if(fin)return;p=Math.max(0,p-.035);setProg(p)},60);
        h.onclick=async()=>{
          if(fin)return;
          n++;p=Math.min(.8,p+.15);setProg(p);sfx('door');
          $('stage').style.transform=`translateX(${(Math.random()-.5)*10}px)`;
          setTimeout(()=>$('stage').style.transform='',90);
          if(n===4)setTip('The door is locked.',true);
          if(n>=8){
            fin=true;clearInterval(dec);clearTip();
            prog.className='fail on';setProg(0);
            h.onclick=null;h.disabled=true;h.classList.add('done');
            sfx('beep');
            await wait(800);sysSay('ACCESS DENIED');
            await wait(3000);
            im.style.transition='opacity 2.2s ease';im.style.opacity='0';
            await wait(2200);
            im.style.backgroundImage=`url('${IMG.icu_gap}')`;im.style.opacity='1';
            hideProg();
            await wait(2600);
            await wait(say(c.voice,true));
            await mapDead();
            openGate(reduce?300:1600,'Step back');
          }
        };
      }
      break}

    /* 7 · 混乱：记忆只剩碎片，而且是错的 */
    /* 7 路 Try to jump back; the path refuses to stay fixed. */
    case 'wrong':{
      tipNow(c.tip,true);
      const layer=sc.querySelector('.hots');
      const h=hot(sc,50,50,true);h.classList.add('wrong-field');
      h.setAttribute('aria-label','Try the remembered square');
      const echo=ensureWrongMemoryEcho(layer,h);
      const status=document.createElement('div');status.className='wrong-step-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');layer.insertBefore(status,h);
      const messages=['The first square slips away.','The numbers no longer agree.','The path will not hold.'];
      let attempts=0,locked=false,finished=false;
      h.onclick=async()=>{
        if(locked||finished)return;locked=true;attempts++;
        h.classList.add('is-pressed');status.textContent=messages[attempts-1];status.classList.add('on');
        if(A.on)sfx('wrongsoft');flashS('.045','#e9e2d1');
        im.style.transition='transform 3.6s cubic-bezier(.22,1,.36,1),filter 2.8s cubic-bezier(.22,1,.36,1)';
        im.style.transform=`scale(${1.05+attempts*.013}) translate(${attempts%2?-.4:.34}%,${attempts===2?-.18:.12}%)`;
        im.style.filter=`brightness(${.96-attempts*.032}) saturate(${.9-attempts*.065})`;
        setTimeout(()=>h.classList.remove('is-pressed'),reduce?120:420);
        await wrongMemoryEcho(layer,h,attempts);
        status.classList.remove('on');
        await wait(reduce?220:620);
        if(attempts<3){locked=false;tipNow('Try once more. The square has moved.');return}
        finished=true;h.disabled=true;h.classList.add('done');clearTip();echo.remove();
        await wait(reduce?650:1650);
        status.textContent='There is no straight way back.';status.classList.add('on');
        await wait(reduce?1000:2800);status.classList.remove('on');
        await wait(say('Did I jump wrong?<br>Was I supposed to go back?',true));
        await wait(reduce?500:1400);
        await mapScramble();
        await wait(reduce?350:1000);
        showSeventhChoices(sc,false)
      };
      setTimeout(()=>h.focus({preventScroll:true}),reduce?20:850);
      break}

    /* 8 路 Look around the old house. */
            /* 8 路 瀵绘壘缂哄腑锛氬厛鐪嬭绌猴紝鍐嶅彂鐜扮暀涓嬬殑鐥曡抗銆?*/
    case 'room':{
      const layer=sc.querySelector('.hots');
      sc.classList.add('room-explore');clearTip();

      const tracker=document.createElement('div');
      tracker.className='room-object-count';tracker.setAttribute('role','status');tracker.setAttribute('aria-live','polite');
      tracker.innerHTML='<span>LOOK AROUND</span><b>0 / 3</b>';layer.appendChild(tracker);

      const guide=document.createElement('div');
      guide.className='room-guide on';guide.setAttribute('role','status');guide.setAttribute('aria-live','polite');
      guide.textContent='Look around.';layer.appendChild(guide);

      const observation=document.createElement('div');
      observation.className='room-observation';observation.setAttribute('role','status');observation.setAttribute('aria-live','polite');
      layer.appendChild(observation);

      const paperVeil=document.createElement('div');paperVeil.className='room-paper-veil';paperVeil.setAttribute('aria-hidden','true');layer.appendChild(paperVeil);
      const finalLine=document.createElement('div');finalLine.className='room-final-line';finalLine.setAttribute('role','status');finalLine.setAttribute('aria-live','polite');layer.appendChild(finalLine);

      let found=0,roomBusy=false,paperHot=null,firstTouch=true;
      const settle=()=>{roomBusy=false;layer.setAttribute('aria-busy','false');sc.classList.remove('room-listening')};
      const dust=(r,amount=8)=>{
        const total=reduce?3:amount;
        for(let i=0;i<total;i++){
          const mote=document.createElement('i');mote.className='room-memory-dust';
          mote.style.left=(r.x+(Math.random()-.5)*Math.min(r.w*.55,9))+'%';
          mote.style.top=(r.y+(Math.random()-.5)*Math.min(r.h*.42,8))+'%';
          mote.style.setProperty('--dx',((Math.random()-.5)*34)+'px');mote.style.setProperty('--dy',(-12-Math.random()*34)+'px');
          mote.style.animationDelay=(Math.random()*.16)+'s';layer.appendChild(mote);setTimeout(()=>mote.remove(),1900)
        }
      };
      const observe=async(r)=>{
        observation.innerHTML=r.l;observation.classList.add('on');
        await wait(reduce?1250:r.hold);observation.classList.remove('on');
        await wait(reduce?240:820)
      };

      ROOM.forEach(r=>{
        const h=hot(sc,r.x,r.y);h.classList.add('room-hot');h.dataset.label=r.name;
        h.style.width=r.w+'%';h.style.height=r.h+'%';h.setAttribute('aria-pressed','false');
        h.setAttribute('aria-label',r.final?'A faint newspaper remains on the wall':`Look at the ${r.name.toLowerCase()}`);
        if(r.final){paperHot=h;h.disabled=true;h.tabIndex=-1;h.setAttribute('aria-disabled','true');h.classList.add('locked','paper-hot')}
        h.onclick=async()=>{
          if(roomBusy||h.disabled)return;
          roomBusy=true;layer.setAttribute('aria-busy','true');sc.classList.add('room-listening');
          h.classList.add('is-pressed');dust(r,r.final?11:8);if(A.on)sfx(r.final?'photograph':'roomtouch');flashS(r.final?'.04':'.022',r.final?'#f1dfb7':'#d7e1e8');
          await wait(reduce?110:460);h.classList.remove('is-pressed');

          if(r.final){
            h.classList.remove('ready');h.classList.add('found');h.disabled=true;h.setAttribute('aria-pressed','true');
            guide.classList.remove('on','remains');observation.classList.remove('on');tracker.classList.add('leaving');
            await portrait(sc,paperVeil);
            finalLine.innerHTML='<span>The house is still here.</span><span>But it no longer feels like home.</span>';finalLine.classList.add('on');
            await wait(reduce?3300:8200);finalLine.classList.remove('on');
            await wait(reduce?350:1300);document.body.classList.remove('cine');duck(1,1.8);
            await fillCell(8,'Square Eight &nbsp;/&nbsp; The old house');
            settle();sc.classList.remove('room-explore','room-ready');openGate(reduce?300:1800,'Walk out');return
          }

          if(firstTouch){firstTouch=false;guide.classList.remove('on');sc.classList.add('room-first-seen')}
          if(h.dataset.seen==='1'){
            await observe(r);settle();return
          }

          h.dataset.seen='1';h.classList.add('found');h.setAttribute('aria-pressed','true');found++;
          await observe(r);tracker.querySelector('b').textContent=`${found} / 3`;

          if(found===3&&paperHot){
            tracker.classList.add('complete');duck(.55,1.35);
            await wait(reduce?420:1450);sc.classList.add('room-search-complete');tracker.classList.add('leaving');
            await wait(reduce?350:1150);guide.textContent='Something remains.';guide.classList.add('on','remains');
            paperVeil.classList.add('discovered');sc.classList.add('room-paper-ready');
            await wait(reduce?620:2150);
            paperHot.disabled=false;paperHot.tabIndex=0;paperHot.setAttribute('aria-disabled','false');paperHot.classList.remove('locked');paperHot.classList.add('ready');
            await wait(reduce?400:1900);guide.classList.remove('on')
          }
          settle()
        }
      });

      setTimeout(()=>sc.classList.add('room-ready'),reduce?80:1100);
      break}
  }
}

/* 墙上的照片 */
/* 鎶ョ焊鍍忚鍏夋摝鍘伙紝鐣欎笅閭ｄ釜浜烘浘缁忓湪杩欓噷鐨勮瘉鎹€?*/
async function portrait(sc,paperVeil){
  const layer=sc.querySelector('.hots'),im=sc.querySelector('.im');
  const reveal=document.createElement('div');reveal.className='room-portrait-reveal';reveal.setAttribute('role','img');reveal.setAttribute('aria-label','A quiet portrait of grandfather on the old wall');reveal.style.backgroundImage=`url('${IMG.portrait}')`;layer.appendChild(reveal);
  const whisper=document.createElement('div');whisper.className='room-portrait-whisper';whisper.setAttribute('role','status');whisper.setAttribute('aria-live','polite');whisper.textContent='He was here.';layer.appendChild(whisper);
  document.body.classList.add('cine');sc.classList.add('room-portraiting');duck(.2,2.4);
  if(paperVeil)paperVeil.classList.add('erasing');
  im.style.transition='filter 5.6s cubic-bezier(.22,1,.36,1),transform 7.2s cubic-bezier(.22,1,.36,1)';
  im.style.filter='brightness(.62) saturate(.38) blur(3px)';im.style.transform='scale(1.055)';
  await wait(reduce?180:900);requestAnimationFrame(()=>reveal.classList.add('on'));
  await wait(reduce?1250:5600);whisper.classList.add('on');
  await wait(reduce?1600:3300);whisper.classList.remove('on');
  await wait(reduce?350:1200)
}

/* ========== Seventh Square branching ========== */
function setSeventhMood(kind,on){
  seventhChoice.classList.toggle(kind+'-hover',!!on);
  if(!on){duck(1,.85);return}
  if(kind==='memory')sfx('memoryhover');
  else{duck(.28,.7);sfx('doorhover')}
}
function hideSeventhChoices(){
  seventhChoice.classList.remove('on','memory-hover','door-hover');
  seventhChoice.setAttribute('aria-hidden','true');
  duck(1,.9);
}
function showSeventhChoices(sc,afterLoop){
  if(!sc||idx!==7)return;
  seventhChoiceBusy=false;
  memoryChoice.disabled=!!memoryLoopUsed;
  memoryChoice.setAttribute('aria-disabled',memoryLoopUsed?'true':'false');
  seventhChoiceStatus.textContent=afterLoop?'The memories have already slipped away.':'';
  seventhChoiceStatus.classList.toggle('on',!!afterLoop);
  seventhChoice.setAttribute('aria-hidden','false');
  seventhChoice.classList.add('on');
  setTimeout(()=>{(memoryLoopUsed?doorChoice:memoryChoice).focus({preventScroll:true})},reduce?20:900);
}
memoryChoice.addEventListener('pointerenter',()=>{if(!memoryChoice.disabled)setSeventhMood('memory',true)});
memoryChoice.addEventListener('pointerleave',()=>setSeventhMood('memory',false));
memoryChoice.addEventListener('focus',()=>{if(!memoryChoice.disabled)setSeventhMood('memory',true)});
memoryChoice.addEventListener('blur',()=>setSeventhMood('memory',false));
doorChoice.addEventListener('pointerenter',()=>setSeventhMood('door',true));
doorChoice.addEventListener('pointerleave',()=>setSeventhMood('door',false));
doorChoice.addEventListener('focus',()=>setSeventhMood('door',true));
doorChoice.addEventListener('blur',()=>setSeventhMood('door',false));
async function pressSeventhChoice(button){
  button.classList.add('is-pressed');if(A.on)sfx('chalkkid');
  await wait(reduce?110:420);button.classList.remove('is-pressed')
}
memoryChoice.addEventListener('click',async()=>{
  if(memoryLoopUsed||seventhChoiceBusy)return;
  seventhChoiceBusy=true;await pressSeventhChoice(memoryChoice);seventhChoiceBusy=false;runMemoryLoop(scenes[7])
});
doorChoice.addEventListener('click',async()=>{
  if(seventhChoiceBusy)return;
  seventhChoiceBusy=true;await pressSeventhChoice(doorChoice);hideSeventhChoices();voice.classList.remove('on');clearTimeout(voiceTimer);
  sfx('door');enterRoom()
});
function loopMessage(text){
  loopStatus.textContent=text||'';
  loopStatus.classList.toggle('on',!!text);
}
async function loopFrame(key,pos,hold,mode){
  const incoming=loopFront?loopA:loopB,outgoing=loopFront?loopB:loopA;
  loopFront=loopFront?0:1;
  incoming.className='loop-frame'+(mode?' '+mode:'');
  incoming.style.backgroundImage=`url('${IMG[key]}')`;
  incoming.style.backgroundPosition=pos||'center';
  void incoming.offsetWidth;incoming.classList.add('on');
  await wait(reduce?100:(mode==='flash'?280:920));
  outgoing.classList.remove('on');
  await wait(reduce?180:hold);
}
async function loopBlank(ms){
  loopA.classList.remove('on');loopB.classList.remove('on');
  await wait(reduce?100:ms);
}
async function runMemoryLoop(sc){
  if(memoryLoopUsed||seventhChoiceBusy||idx!==7)return;
  memoryLoopUsed=true;seventhChoiceBusy=true;busy=true;
  hideSeventhChoices();clearTip();voice.classList.remove('on');clearTimeout(voiceTimer);
  sysSay('Rewinding memory...');sfx('rewind');flashS('.42','#f3eee1');
  await wait(reduce?120:520);
  memoryLoop.setAttribute('aria-hidden','false');memoryLoop.classList.add('on');
  loopMessage('Rewinding memory...');
  await wait(reduce?160:1050);

  sfx('loopfire');setTimeout(()=>sfx('loopfire'),430);setTimeout(()=>sfx('loopfire'),920);
  await loopFrame('g1_return','center 50%',reduce?180:1850,'broken');
  loopMessage('Memory unstable.');
  sfx('glitch');await loopBlank(reduce?90:310);

  sfx('loopsummer');await loopFrame('g2_final','center 54%',reduce?900:1850,'flash');
  sfx('glitch');await loopBlank(reduce?100:620);

  sfx('looproad');await loopFrame('g3_grandpa','center 54%',reduce?1100:2900,'noisy');
  loopMessage('Memory unstable.');
  sfx('glitch');await loopBlank(reduce?100:360);

  sfx('loopwindow');await loopFrame('g4','center 50%',reduce?220:3450,'repeat');
  await loopBlank(reduce?120:700);
  loopMessage('');
  memoryLoop.classList.remove('on');memoryLoop.setAttribute('aria-hidden','true');
  await wait(reduce?180:1550);
  sys.classList.remove('on');busy=false;seventhChoiceBusy=false;
  say('I tried to go back.<br>But the memories would not stay still.',true);
  await wait(reduce?220:1300);
  showSeventhChoices(sc,true);
}

/* ========== 绗叓鏍硷細鎺ㄩ棬杩涘眿锛堝奖鍍忥級 ========== */
async function enterRoom(){
  if(busy)return;
  hideSeventhChoices();memoryLoop.classList.remove('on');memoryLoop.setAttribute('aria-hidden','true');
  busy=true;closeGate();clearTip();hideProg();voice.classList.remove('on');clearTimeout(voiceTimer);
  const doorMemory=$('doorMemory'),doorFrame=$('doorFrame'),doorSlit=$('doorSlit'),doorHint=$('doorHint'),doorControl=$('doorControl');
  doorFrame.style.backgroundImage=`url('${IMG.g8_door}')`;doorFrame.style.transform='scale(1.035)';doorFrame.style.filter='brightness(.84) saturate(.76)';
  doorSlit.style.width='2px';doorSlit.style.opacity='.12';doorHint.textContent='Hold to push the door open';
  doorControl.disabled=false;doorControl.tabIndex=0;doorMemory.classList.remove('leaving');doorMemory.setAttribute('aria-hidden','false');doorMemory.classList.add('on');
  document.body.classList.add('cine');duck(.42,1.8);
  await wait(reduce?300:1500);
  let progress=0,holding=false,done=false,raf=0,last=performance.now(),creakStep=0;
  const duration=reduce?2200:3600;
  const detach=()=>{cancelAnimationFrame(raf);doorControl.onpointerdown=doorControl.onpointerup=doorControl.onpointercancel=doorControl.onkeydown=doorControl.onkeyup=doorControl.onblur=null};
  const begin=()=>{
    if(done||holding)return;holding=true;last=performance.now();doorHint.textContent='Keep pushing. The wood remembers.';
    if(A.on)sfx('doorpress')
  };
  const release=()=>{
    if(done)return;holding=false;
    if(progress<1)doorHint.textContent=progress>.46?'The room is close. Push once more.':'The door waits under your hand.'
  };
  const finish=async()=>{
    if(done)return;done=true;holding=false;detach();doorControl.disabled=true;doorHint.textContent='The room gives way.';
    if(A.on)sfx('dooropen');
    doorFrame.style.transition='transform 3.6s cubic-bezier(.22,1,.36,1),filter 3.2s ease';
    doorFrame.style.transform=reduce?'scale(1.04)':'scale(1.105) translateX(-1.2%)';doorFrame.style.filter='brightness(.98) saturate(.82)';
    doorSlit.style.transition='width 3.2s cubic-bezier(.22,1,.36,1),opacity 2.4s ease,filter 2.4s ease';
    doorSlit.style.width=reduce?'10vw':'24vw';doorSlit.style.opacity='.94';doorSlit.style.filter='blur(11px)';
    await wait(reduce?800:1700);
    busy=false;
    const entering=go(8,false);
    await wait(reduce?250:800);doorMemory.classList.add('leaving');
    await wait(reduce?350:3250);
    doorMemory.classList.remove('on','leaving');doorMemory.setAttribute('aria-hidden','true');doorFrame.style.backgroundImage='';
    document.body.classList.remove('cine');duck(1,1.8);
    await entering
  };
  doorControl.onpointerdown=e=>{e.preventDefault();try{doorControl.setPointerCapture(e.pointerId)}catch(_){};begin()};
  doorControl.onpointerup=release;doorControl.onpointercancel=release;doorControl.onblur=release;
  doorControl.onkeydown=e=>{if((e.key===' '||e.key==='Enter')&&!e.repeat){e.preventDefault();begin()}};
  doorControl.onkeyup=e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();release()}};
  const tick=now=>{
    raf=requestAnimationFrame(tick);const dt=Math.min(80,Math.max(0,now-last));last=now;
    if(!holding||done)return;progress=Math.min(1,progress+dt/duration);
    const eased=1-Math.pow(1-progress,3);
    if(!reduce)doorFrame.style.transform=`scale(${1.035+eased*.052}) translateX(${-eased*.55}%)`;
    doorFrame.style.filter=`brightness(${.84+eased*.1}) saturate(${.76+eased*.07})`;
    doorSlit.style.width=`${2+eased*7.5}vw`;doorSlit.style.opacity=String(.12+eased*.58);
    const step=Math.floor(progress*3);if(step>creakStep){creakStep=step;if(A.on)sfx('doorpress')}
    if(progress>=1)finish()
  };
  last=performance.now();raf=requestAnimationFrame(tick);
  setTimeout(()=>doorControl.focus({preventScroll:true}),reduce?30:700)
}

/* ========== Coda ========== */
async function toCoda(){
  archiveTag.classList.remove('on');
  busy=true;closeGate();clearTip();hideProg();
  lamp.classList.remove('on');fxc.classList.remove('on');
  scenes.forEach(s=>s.classList.remove('on'));
  if(A.on)scape('empty');
  await wait(1600);
  openMap();
  await wait(reduce?400:3400);
  // 图画一张张褪掉
  for(let n=8;n>=1;n--){const c=mapCells[n];
    if(c&&c.im.classList.contains('in')){c.im.style.transition='opacity 2.6s ease';c.im.classList.remove('in');
      c.cr.classList.remove('on');sfx('chalk')}
    await wait(reduce?100:900)}
  await wait(reduce?300:2400);
  mapEl.classList.add('fade');           // 粉笔线也褪
  mapCap.classList.add('narration');
  mapCap.innerHTML='The chalk fades.<br>Only old concrete is left.';
  await wait(reduce?300:2600);mapCap.classList.add('on');
  await wait(reduce?400:7000);mapCap.classList.remove('on');
  await wait(reduce?300:3000);
  mapCap.classList.add('narration');
  mapCap.innerHTML='I jumped back into that year.<br>But he was no longer there.';
  mapCap.classList.add('on');
  await wait(reduce?600:10000);
  mapCap.classList.remove('on');
  await wait(2400);
  closeMap();
  await wait(2200);
  endEl.classList.add('show');snd.classList.remove('on');
  if(A.on&&A.ctx)setTimeout(()=>A.mst.gain.linearRampToValueAtTime(0,A.ctx.currentTime+5),2000);
}

/* ========== 控制 ========== */
function next(){
  if(!started||busy||!gate)return;
  const fromMap=mapGate&&mapEl.classList.contains('on');
  if(idx===7){closeGate();enterRoom();return}   // 第七格 → 推门 → 第八格
  if(idx>=CELLS.length-1){closeGate();toCoda();return}
  go(idx+1,false,fromMap);
}
goBtn.onclick=next;
snd.onclick=()=>{
  if(!A.on){aInit();if(A.ctx.state==='suspended')A.ctx.resume();A.on=true;
    A.mst.gain.linearRampToValueAtTime(.85,A.ctx.currentTime+1);
    if(idx>=0)scape(CELLS[idx].snd);
    snd.classList.add('act');sndL.textContent='sound on'}
  else{A.on=false;A.mst.gain.linearRampToValueAtTime(0,A.ctx.currentTime+.6);
    snd.classList.remove('act');sndL.textContent='sound off'}
};
$('again').onclick=()=>location.reload();
addEventListener('keydown',e=>{
  if((e.key==='Enter'||e.key===' ')&&e.target.closest&&e.target.closest('button'))return;
  if(e.key==='Enter'||e.key===' '||e.key==='ArrowDown'){
    e.preventDefault();
    if(!pro.classList.contains('gone')){proAdv();return}
    if(rules.classList.contains('show')){rules.click();return}
    if(il.classList.contains('show')){il.click();return}
    if(board.classList.contains('show')&&!board.classList.contains('gone')){$('startBtn').click();return}
    next();
  }
});
let wl=false;
addEventListener('wheel',()=>{if(wl||!started)return;wl=true;setTimeout(()=>wl=false,1400);next()},{passive:true});
tl();closeGate();
