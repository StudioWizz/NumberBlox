import { stages, puzzleFor, choicesFor } from './puzzles.js';
let saved = {};
try { saved = JSON.parse(localStorage.getItem('moon-mission') || '{}') || {}; } catch {}
let step = Number.isInteger(saved.step) ? Math.max(0, Math.min(5, saved.step)) : 0;
let hard = saved.hard === true, calm = saved.calm === true, sound = false, solved = false, selected = null;
const $ = s => document.querySelector(s);
function save() { try { localStorage.setItem('moon-mission', JSON.stringify({ step, hard, calm })); } catch {} }
function tone(win) { if (!sound) return; try { const ctx = new AudioContext(); const osc = ctx.createOscillator(), gain = ctx.createGain(); osc.connect(gain); gain.connect(ctx.destination); osc.frequency.value = win ? 660 : 330; gain.gain.setValueAtTime(.035, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .3); osc.start(); osc.stop(ctx.currentTime + .3); osc.onended = () => ctx.close(); } catch {} }
function equation(p) { return p.kind === 'sum' ? `<span>${p.a}</span><b>+</b><span class="unknown">?</span><b>=</b><span>${p.target}</span>` : p.kind === 'algebra' ? `<span>${p.a}<small>×</small>★</span><b>+</b><span>${p.offset}</span><b>=</b><span>${p.target}</span>` : `<span>${p.a}</span><b>×</b><span class="unknown">?</span><b>=</b><span>${p.target}</span>`; }
function render() {
  document.body.classList.toggle('calm', calm);
  $('#motion').setAttribute('aria-pressed', String(calm));
  $('#motion').textContent = calm ? '◌ Calm mode on' : '◌ Calm mode';
  $('#progress').innerHTML = stages.map((p,i) => `<div class="progress-step ${i < step ? 'done' : ''} ${i === step ? 'active' : ''}" ${i === step ? 'aria-current="step"' : ''}><span>${i < step ? '✓' : i+1}</span><strong>${p.name}</strong>${i < 4 ? '<i></i>' : ''}</div>`).join('');
  $('#part-count').textContent = `${step} / 5 PARTS`;
  $('#rocket').className = `rocket parts-${step} ${step === 5 ? 'launched' : ''}`;
  $('#scene-status').textContent = step === 5 ? 'Moon landing complete!' : step > 0 ? `${stages[step-1].item} fitted!` : 'Rocket assembly in progress';
  if (step === 5) { $('#challenge').innerHTML = `<div class="eyebrow">MISSION COMPLETE</div><div class="victory-icon">🌕</div><h2 id="challenge-title">Hello, Moon!</h2><p class="description">You built a rocket and used brilliant maths to bring your crew to the moon.</p><div class="moon-badge">✦ OFFICIAL MOON EXPLORER ✦</div><p class="completion-note">Five challenges. One giant achievement.<br>What will you discover next?</p><button class="primary" id="again">${hard ? 'Fly another mission' : 'Try an explorer mission'} <span>↗</span></button><button class="text-button" id="replay">Play this mission again</button>`; $('#again').onclick = () => { hard = true; restart(); }; $('#replay').onclick = restart; return; }
  const p = puzzleFor(step, hard);
  $('#challenge').innerHTML = `<div class="challenge-top"><span class="eyebrow">MISSION ${String(step+1).padStart(2,'0')} / 05</span><label class="difficulty"><input id="hard" type="checkbox" ${hard ? 'checked' : ''}> Explorer challenge</label></div><h2 id="challenge-title">${p.title}</h2><p class="description">${p.subtitle}</p><div class="part-card"><span class="part-icon">${p.icon}</span><div><small>YOU’RE UNLOCKING</small><strong>${p.item}</strong></div><span class="part-lock">${solved ? '✓' : '◇'}</span></div><div class="puzzle-label">${p.kind === 'algebra' ? 'What number is hiding behind each star?' : p.kind === 'multiply' ? `Each of ${p.a} groups has the same number. Find it!` : `We have ${p.a} blocks. How many more make ${p.target}?`}</div><div class="equation" aria-label="${p.kind === 'sum' ? `${p.a} plus what equals ${p.target}` : p.kind === 'algebra' ? `${p.a} times star plus ${p.offset} equals ${p.target}` : `${p.a} times what equals ${p.target}`}">${equation(p)}</div><div class="visual-model" aria-label="${p.target} blocks in total">${Array.from({length:p.target},(_,i)=>`<span class="mini-block ${p.kind === 'sum' && i >= p.a ? 'outline' : ''}" style="--group:${Math.floor(i / (p.kind === 'sum' ? p.a : p.answer)) % 2}"></span>`).join('')}</div><p class="choose-label">CHOOSE YOUR ANSWER</p><div class="answers">${choicesFor(p).map(n=>`<button class="answer ${selected === n ? solved ? 'correct' : 'retry' : ''}" data-answer="${n}" ${solved ? 'disabled' : ''}>${n}<span>${Array.from({length:n},()=>'<i></i>').join('')}</span></button>`).join('')}</div><div id="feedback" role="status" aria-live="polite">${solved ? `✦ ${p.fact}` : selected !== null ? 'Good thinking. Try another number — you can take your time.' : ''}</div><button class="primary" id="next" ${solved ? '' : 'disabled'}>${solved ? p.action : 'Solve the code to unlock'} <span>${solved ? '→' : '◇'}</span></button><button class="text-button" id="hint" aria-expanded="false">☀ A little hint?</button><p id="hint-text" hidden>${p.hint}</p>`;
  $('#hard').onchange = e => { hard = e.target.checked; selected = null; solved = false; save(); render(); };
  document.querySelectorAll('[data-answer]').forEach(button => button.onclick = () => { selected = Number(button.dataset.answer); solved = selected === p.answer; tone(solved); render(); if (solved) $('#next').focus(); });
  $('#hint').onclick = () => { const open = $('#hint-text').hidden; $('#hint-text').hidden = !open; $('#hint').setAttribute('aria-expanded', String(open)); };
  $('#next').onclick = () => { if (!solved) return; step++; solved = false; selected = null; save(); render(); $('#challenge-title').setAttribute('tabindex','-1'); $('#challenge-title').focus(); };
}
function restart() { step = 0; selected = null; solved = false; save(); render(); }
$('#motion').onclick = () => { calm = !calm; save(); render(); };
$('#sound').onclick = () => { sound = !sound; $('#sound').textContent = sound ? '♫ Sound on' : '♫ Sound off'; $('#sound').setAttribute('aria-pressed',String(sound)); };
$('#restart').onclick = () => $('#restart-dialog').showModal();
$('#cancel-reset').onclick = () => $('#restart-dialog').close();
$('#confirm-reset').onclick = () => { $('#restart-dialog').close(); restart(); };
render();
