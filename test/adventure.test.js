import test from 'node:test';
import assert from 'node:assert/strict';
import { makePuzzle,getMission,validSave,missions,stations } from '../public/adventure.js';

test('all story and expedition puzzles have a correct unique choice on each level',()=>{
 for(let m=0;m<100;m++)for(let r=0;r<3;r++)for(let level=0;level<3;level++){
  const p=makePuzzle(m,r,level);
  assert.equal(p.options.length,4);assert.equal(new Set(p.options).size,4);assert.equal(p.options.filter(n=>n===p.answer).length,1);
  assert.ok(p.options.every(n=>Number.isInteger(n)&&n>=0));assert.ok(p.groups.every(n=>n>0));
  if(p.kind===4){const seq=p.equation.split(', ').map(n=>n==='?'?p.answer:Number(n));assert.equal(seq[1]-seq[0],seq[2]-seq[1]);assert.equal(seq[2]-seq[1],seq[3]-seq[2]);}
  else {const [left,right]=p.equation.replace('?',p.answer).replace('★',p.answer).split(' = ');const terms=left.split(' ');let result=Number(terms[0]);for(let i=1;i<terms.length;i+=2){const n=Number(terms[i+1]);result=terms[i]==='+'?result+n:terms[i]==='×'?result*n:result/n;}assert.equal(result,Number(right));}
  if(level===0)assert.match(p.equation,/\+/);
 }
});
test('story covers three worlds and every mission has a usable station',()=>{
 assert.equal(missions.length,18);assert.deepEqual([...new Set(missions.map(m=>m.world))],[0,1,2]);
 for(let i=0;i<100;i++){const m=getMission(i);assert.ok(stations[m.station]);assert.ok(m.crystals>=3&&m.crystals<=5);assert.ok(m.reward.length);}
});
test('invalid saves are rejected',()=>{
 const s={mission:0,round:0,crystals:0,stars:0,character:1,level:1,world:0};assert.equal(validSave(s),true);
 for(const invalid of [null,{}, {...s,mission:-1},{...s,round:3},{...s,character:11},{...s,world:3},{...s,level:'1'}])assert.equal(validSave(invalid),false);
});
