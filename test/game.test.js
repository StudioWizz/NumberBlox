import test from 'node:test';
import assert from 'node:assert/strict';
import { stages, puzzleFor, choicesFor } from '../public/puzzles.js';
import { server } from '../server.js';

test('every mission and explorer puzzle has one correct offered answer', () => {
  for (const hard of [false,true]) for (let i=0;i<stages.length;i++) {
    const p=puzzleFor(i,hard), choices=choicesFor(p);
    assert.equal(new Set(choices).size,4);
    assert.equal(choices.filter(n=>n===p.answer).length,1);
    assert.ok(choices.every(n=>n>0));
    assert.equal(p.kind==='sum' ? p.a+p.answer : p.a*p.answer+(p.offset||0),p.target);
  }
});
test('local server serves the game and rejects missing resources', async () => {
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  try {
    const base=`http://127.0.0.1:${server.address().port}`;
    for(const route of ['/','/world.js','/world.css','/adventure.js','/vendor/three.module.js','/vendor/three.core.js','/classic.html','/app.js','/style.css','/puzzles.js']) { const r=await fetch(base+route); assert.equal(r.status,200); assert.ok((await r.text()).length>100); }
    assert.equal((await fetch(base+'/missing')).status,404);
    assert.equal((await fetch(base+'/%2e%2e%2fpackage.json')).status,403);
  } finally { await new Promise(resolve=>server.close(resolve)); }
});
