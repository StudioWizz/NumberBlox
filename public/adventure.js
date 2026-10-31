export const colors = ['#ed4940','#f39530','#f2cf3d','#62b654','#38b8dc','#6855a8','#9865b0','#dd64a8','#a5aab5','#f7eee1'];
export const stations = [
 {name:'Crystal Quarry',icon:'◆',x:-22,z:-15,color:0x79b9c4},
 {name:'Rocket Workshop',icon:'⚒',x:20,z:-16,color:0xe6a45d},
 {name:'Star Observatory',icon:'✦',x:22,z:20,color:0x9a89c7},
 {name:'Space Garden',icon:'❀',x:-22,z:20,color:0x8fbc70}
];
export const missions = [
 ['Rocket foundations','Collect energy crystals, then make a strong launch platform.',0,'Launch platform'],
 ['Build the hull','The workshop needs a sturdy home for our crew.',1,'Rocket hull'],
 ['Two mighty boosters','Balance the power on both sides of the rocket.',0,'Twin boosters'],
 ['Snacks among the stars','Grow enough space food for the journey.',3,'Crew supplies'],
 ['Find our moon route','The observatory has a secret star code.',2,'Navigation computer'],
 ['One last fuel check','Prepare the fuel. Then visit your rocket!',1,'Moon fuel'],
 ['A home on the Moon','Our explorers need a cosy lunar home.',1,'Moon habitat'],
 ['Moon crystal mystery','Discover what powers these glittering moon rocks.',0,'Crystal scanner'],
 ['Plant a moon garden','Help living things grow a long way from Earth.',3,'Moon greenhouse'],
 ['A message to Earth','Set up an antenna to call our friends.',2,'Communication dish'],
 ['Deep space engines','Build a new engine for a much longer journey.',1,'Explorer engine'],
 ['Follow the comet','Find the way to the beautiful Crystal Planet.',2,'Deep space route'],
 ['Welcome to Crystal Planet','Use local crystals to build our next camp.',0,'Crystal camp'],
 ['An alien garden','Discover new patterns in the planet’s plants.',3,'Discovery garden'],
 ['The rainbow signal','Can we understand this mysterious signal?',2,'Signal decoder'],
 ['A rover for exploring','Build a little rover to explore this new world.',1,'Explorer rover'],
 ['The great crystal puzzle','Our biggest discovery needs your best thinking.',0,'Crystal monument'],
 ['A universe of possibility','Complete your explorer badge. Then keep discovering!',2,'Master explorer badge']
].map(([name,description,station,reward],i)=>({name,description,station,reward,world:Math.floor(i/6),crystals:3+(i%3)}));
export function getMission(index){return missions[index] || {name:`Expedition ${index-17}: another discovery`,description:'Explore, collect, and crack a fresh set of codes.',station:(index-18)%4,reward:'Expedition badge',world:2,crystals:5};}
export function makePuzzle(mission,round,level=1){
 const seed=mission*17+round*7+level*11;
 const a=2+(seed%4), offset=1+seed%7;
 let answer=2+seed%8+(level===2?4:0);
 const kind=level===0?'sum':(mission+round)%5;
 let equation,hint,target,groups;
 if(kind==='sum'||kind===0){target=a+answer;equation=`${a} + ? = ${target}`;hint=`Start at ${a}. Count on to ${target}, or subtract ${a} from ${target}.`;groups=[a,answer];}
 else if(kind===1){target=a*answer;equation=`${a} × ? = ${target}`;hint=`Share ${target} into ${a} equal groups. How many are in each?`;groups=Array(a).fill(answer);}
 else if(kind===2){target=a*answer+offset;equation=`${a} × ★ + ${offset} = ${target}`;hint=`Take away ${offset} from ${target}, then divide by ${a}. Each star has the same value.`;groups=[...Array(a).fill(answer),offset];}
 else if(kind===3){target=answer*a;equation=`${target} ÷ ${a} = ?`;hint=`Split ${target} into ${a} equal groups.`;groups=Array(a).fill(answer);}
 else {answer+=2*a;target=answer+2*a;equation=`${answer-a}, ${answer}, ${answer+a}, ?`;equation=`${answer-2*a}, ${answer-a}, ?, ${answer+a}`;hint=`Each number increases by ${a}. Add ${a} to ${answer-a}.`;groups=[a,a,a];}
 const options=[answer,answer+1,answer+3,Math.max(0,answer-1)];
 const shift=seed%4;options.push(...options.splice(0,shift));
 return {answer,equation,hint,groups,options,kind};
}
export function validSave(s){return !!s&&Number.isInteger(s.mission)&&s.mission>=0&&s.mission<10000&&Number.isInteger(s.round)&&s.round>=0&&s.round<3&&Number.isInteger(s.crystals)&&s.crystals>=0&&s.crystals<=5&&Number.isInteger(s.stars)&&s.stars>=0&&Number.isInteger(s.character)&&s.character>=1&&s.character<=10&&[0,1,2].includes(s.level)&&[0,1,2].includes(s.world);}
