/**
 * Board member sprites, ported verbatim from design/mock/hot-seat-mock.html.
 *
 * Hand-authored pixel matrices drawn to canvas at runtime. They cost nothing to
 * ship, scale to any size without assets, and a new character for a future
 * scenario is a few lines of data rather than an illustration commission.
 *
 * Mood patches repaint the mouth and brow over the base rows, so one matrix
 * covers every expression a seat needs.
 */
const SPRITES = {
 cfo:{pal:{H:'#AEB3BA',S:'#E9C49F',N:'#D3A87F',G:'#232323',E:'#FFFFFF',P:'#1A1A1A',
           J:'#2A3450',W:'#F5F5F5',X:'#B03A3A',B:'#6E6E6E'},
  rows:[
   "..HHHHHHHHH...",
   ".HHHHHHHHHHH..",
   ".HHSSSSSSSHH..",
   ".HSSSSSSSSSH..",
   ".SSSSSSSSSSS..",
   ".SBBSSSSBBSS..",
   ".GEPGSSSGEPG..",
   ".GGGGGGGGGGG..",
   ".SSSSNNSSSSS..",
   ".SSSSSSSSSSS..",
   ".SSSMMMMSSSS..",
   "..SSSSSSSSS...",
   "...JJJJJJJ....",
   ".JJJWWXXWWJJJ.",
   "JJJJWWXXWWJJJJ"],
  face:{browRow:5,browCols:[[2,3],[8,9]],mouthRow:10,mouthCols:[3,7],skin:'S',brow:'#6E6E6E'}},
 ceo:{pal:{H:'#221E1B',S:'#9C6136',N:'#7E4A26',E:'#FFFFFF',P:'#1A1A1A',
          J:'#6E2436',W:'#EFE3D8',X:'#D9A441',B:'#1A1512'},
  rows:[
   "...HHHHHHH....",
   "..HHHHHHHHH...",
   ".HHHHHHHHHHH..",
   ".HHSSSSSSSHH..",
   ".HSSSSSSSSSH..",
   ".HBBSSSSBBSH..",
   ".HEPSSSSEPSH..",
   ".HSSSSSSSSSH..",
   "XHSSSNNSSSHX..",
   ".HSSSSSSSSSH..",
   ".HSSMMMMSSSH..",
   "..SSSSSSSSS...",
   "...JJJJJJJ....",
   ".JJJJWXWJJJJ..",
   "JJJJJWXWJJJJJ."],
  face:{browRow:5,browCols:[[2,3],[8,9]],mouthRow:10,mouthCols:[3,7],skin:'S',brow:'#1A1512'}},
 pro:{pal:{S:'#D9A16B',N:'#B57F49',E:'#FFFFFF',P:'#1A1A1A',M:'#4A3526',
           J:'#55603A',W:'#E8E3D2',B:'#4A3526'},
  rows:[
   "..............",
   "...SSSSSSS....",
   "..SSSSSSSSS...",
   ".SSSSSSSSSSS..",
   ".SSSSSSSSSSS..",
   ".SBBSSSSBBSS..",
   ".SEPSSSSEPSS..",
   ".SSSSSSSSSSS..",
   ".SSSSNNSSSSS..",
   ".SMMMMMMMMSS..",
   ".SSSMMMMSSSS..",
   "..SSSSSSSSS...",
   "...JJJJJJJ....",
   ".JJJJWWWJJJJ..",
   "JJJJJWWWJJJJJ."],
  face:{browRow:5,browCols:[[2,3],[8,9]],mouthRow:10,mouthCols:[3,7],skin:'S',brow:'#4A3526'}},
 gro:{pal:{H:'#3B2A1E',S:'#C68642',N:'#A26A2F',E:'#FFFFFF',P:'#1A1A1A',
           J:'#2A7F76',W:'#E8E3D2',B:'#2B1F16'},
  rows:[
   "..HHHH.HHHH...",
   ".HHHHHHHHHHH..",
   ".HHHHHHHHHHH..",
   ".HHSSSSSSSHH..",
   ".HSSSSSSSSSH..",
   ".SBBSSSSBBSS..",
   ".SEPSSSSEPSS..",
   ".SSSSSSSSSSS..",
   ".SSSSNNSSSSS..",
   ".SSSSSSSSSSS..",
   ".SSSMMMMSSSS..",
   "..SSSSSSSSS...",
   "...JJJJJJJ....",
   ".JJJJJWJJJJJ..",
   "JJJJJJWJJJJJJ."],
  face:{browRow:5,browCols:[[2,3],[8,9]],mouthRow:10,mouthCols:[3,7],skin:'S',brow:'#2B1F16'}},
};


function drawSprite(cv,who,mood,px){
  const P=px||6;
  const def=SPRITES[who],rows=def.rows,pal=def.pal,f=def.face;
  cv.width=14*P;cv.height=15*P;
  const ctx=cv.getContext('2d');
  ctx.clearRect(0,0,cv.width,cv.height);
  rows.forEach((row,y)=>{
    for(let x=0;x<row.length;x++){
      const ch=row[x];
      if(ch==='.'||!pal[ch])continue;
      ctx.fillStyle=pal[ch];
      ctx.fillRect(x*P,y*P,P,P);
    }
  });
  const skin=pal[f.skin],brow=f.brow,dark='#1A1A1A';
  const p=(x,y,c)=>{ctx.fillStyle=c;ctx.fillRect(x*P,y*P,P,P);};
  const clr=(x,y)=>p(x,y,skin);
  for(let x=f.mouthCols[0];x<=f.mouthCols[1]+1;x++){clr(x,f.mouthRow);clr(x,f.mouthRow-1);}
  if(who==='pro'){for(let x=2;x<=9;x++)p(x,9,pal.M);}
  if(mood==='neutral'){
    for(let x=f.mouthCols[0]+1;x<=f.mouthCols[1];x++)p(x,f.mouthRow,dark);
  }else if(mood==='stern'){
    for(let x=f.mouthCols[0];x<=f.mouthCols[1]+1;x++)p(x,f.mouthRow,dark);
    f.browCols.forEach(([a,b])=>{p(a,f.browRow,brow);p(b,f.browRow,brow);});
  }else if(mood==='pleased'){
    for(let x=f.mouthCols[0]+1;x<=f.mouthCols[1];x++)p(x,f.mouthRow,dark);
    p(f.mouthCols[0],f.mouthRow-1,dark);p(f.mouthCols[1]+1,f.mouthRow-1,dark);
  }else if(mood==='shock'){
    p(5,f.mouthRow-1,dark);p(6,f.mouthRow-1,dark);
    p(5,f.mouthRow,dark);p(6,f.mouthRow,dark);
  }else if(mood==='angry'){
    p(f.mouthCols[0],f.mouthRow,dark);p(f.mouthCols[1]+1,f.mouthRow,dark);
    for(let x=f.mouthCols[0]+1;x<=f.mouthCols[1];x++)p(x,f.mouthRow-1,dark);
    f.browCols.forEach(([a,b])=>{p(b,f.browRow+1,brow);p(a,f.browRow+1,brow);});
  }
}
export { SPRITES, drawSprite }
