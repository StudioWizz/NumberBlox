export const stages = [
  { name: 'Build', title: 'Build your rocket', subtitle: 'Every great adventure starts with a little building.', item: 'Rocket body', icon: '🚀', action: 'Fit the rocket body', kind: 'sum', a: 7, answer: 5, target: 12, hint: 'Start at 7. Count on until you reach 12.', fact: '12 blocks make one brilliant rocket body!' },
  { name: 'Power', title: 'Power up the engines', subtitle: 'Our rocket needs two equally powerful boosters.', item: 'Twin boosters', icon: '⚡', action: 'Attach the boosters', kind: 'multiply', a: 2, answer: 6, target: 12, hint: 'Split 12 into two equal groups. How many in each?', fact: 'Two groups of 6 give us 12 units of thrust!' },
  { name: 'Pack', title: 'Pack the moon snacks', subtitle: 'A space explorer needs a well-stocked snack box.', item: 'Space supplies', icon: '🍎', action: 'Load the supplies', kind: 'sum', a: 9, answer: 7, target: 16, hint: '9 + 1 makes 10. How many more to reach 16?', fact: '16 space snacks. Enough for the whole crew!' },
  { name: 'Navigate', title: 'Find the moon route', subtitle: 'Solve the star code to set our course.', item: 'Star navigator', icon: '✦', action: 'Set the moon course', kind: 'algebra', a: 3, offset: 2, answer: 4, target: 14, hint: 'Take away the extra 2 first. Then share 12 between 3 stars.', fact: 'Each star is worth 4. Our moon route is ready!' },
  { name: 'Launch', title: 'Ready for liftoff!', subtitle: 'One final fuel check. The moon is waiting.', item: 'Moon fuel', icon: '🌙', action: 'Launch to the moon', kind: 'multiply', a: 4, answer: 5, target: 20, hint: 'Count in fours: 4, 8, 12… how many groups make 20?', fact: 'Fuel is full. Crew is ready. Let’s go to the moon!' }
];
export function puzzleFor(index, hard = false) {
  const p = { ...stages[index] };
  if (hard) { p.answer += 3; p.target = p.kind === 'sum' ? p.a + p.answer : p.a * p.answer + (p.offset || 0); p.hint = p.kind === 'sum' ? `Find the difference between ${p.target} and ${p.a}.` : `First subtract ${p.offset || 0} from ${p.target}, then divide by ${p.a}.`; p.fact = 'You cracked the explorer challenge. Fantastic thinking!'; }
  return p;
}
export function choicesFor(p) { return [p.answer - 2, p.answer + 1, p.answer, p.answer + 3]; }
