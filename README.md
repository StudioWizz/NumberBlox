# NumberBlox: Moon Mission

A gentle, visual maths adventure: build a rocket, solve addition and multiplication puzzles, crack a simple algebra code, and fly to the moon. Includes optional harder explorer challenges, hints, calm mode, opt-in quiet sounds, and local progress saving. No timers, accounts, advertisements, or penalties for trying again.

## Run locally

Install Node.js 20 or newer. In this folder, run:

```sh
npm start
```

Open **http://localhost:3000** in your browser. Stop with Ctrl+C. Set `PORT` to use another port. The server listens only on your own device. No npm dependencies or installation needed. Optional Google Fonts improve the typography when online; system fonts work offline. All game features work offline once the local server is running.

## Play

Choose the missing number to earn each of five rocket parts. Blocks show quantities; a hint helps explain the next step. After each answer, choose the highlighted action to continue. Explorer challenge increases the numbers and can be toggled per puzzle. Calm mode removes decorative star details and transitions; sound starts off. Progress and preferences are saved in this browser when local storage is available. Restart asks before clearing progress.

The game uses original block characters inspired by a love of numbers; it is not an official Numberblocks product.

## Check

```sh
npm test
```
