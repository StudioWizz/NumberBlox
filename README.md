# NumberBlox: Space Adventure

A local, single-player 3D maths adventure built with Node.js and Three.js. Walk through a little space base as a colourful block character, collect energy crystals, solve codes at world stations, assemble a rocket, and fly to new worlds.

## Run on your Mac or PC

1. Install **Node.js LTS** from https://nodejs.org (Node 20 or newer).
2. Download this repository using **Code → Download ZIP**, then unzip it.
3. Open Terminal in the unzipped folder (the folder containing `package.json`).
4. Run:

```sh
npm start
```

5. Open **http://localhost:3000** in a current browser. Keep Terminal open while playing. Stop the server with **Ctrl+C**.

There are no npm packages to install. Three.js is bundled locally, so the 3D adventure needs no internet connection. A browser with WebGL 2 / hardware acceleration is required; Chrome is recommended if your browser has trouble. The original simpler puzzle game is available from the title screen or at `/classic.html`.

To update a ZIP download, stop the server and download/unzip the latest version. Open Terminal in the new folder and run `npm start` again. Browser progress is retained at the same local address. If you cloned with Git instead, run `git pull origin main` before restarting.

## The adventure

- **3D exploration:** third-person camera, movement, jumping, collision with buildings and trees, and touch controls.
- **Ten block characters:** one to ten, with number-based colours and arrangements, including square Four, rainbow Seven, and square Nine. Characters have original faces and artwork; this is not an official Numberblocks product.
- **Three worlds:** Earth, the Moon with low-gravity jumping, and Crystal Planet.
- **18 story missions / 54 codes:** collect crystals in the world, visit the right station, and use maths to build rocket systems and unlock discoveries.
- **Visible rewards:** rocket sections, explorer homes, gardens, dishes, rovers, and crystal collections.
- **Side quest:** find 24 hidden golden stars, including higher stars reached by jumping. After the story, the rocket can revisit all three worlds.
- **Continuing expeditions:** after the story, new missions generate further number codes. These repeat the collection-and-code game loop; this is a playable small adventure, not a large commercial open-world game.
- **Maths:** addition, multiplication, division, sequences, and simple algebra. Gentle uses addition; Explorer mixes puzzle types; Big Thinker increases quantities. Every level earns the same rewards. Visual groups and optional hints help explain the numbers.
- **Gentle play:** no timers, lost lives, combat, or punishment for mistakes. Sound is off initially. Calm mode removes bobbing/bouncing and skips flights. A pause menu includes a return-to-path button.

Play duration depends on exploration and puzzle pace; the game does not guarantee a fixed number of hours.

## Controls

| Action | Keyboard / mouse |
| --- | --- |
| Move | WASD or arrow keys |
| Jump | Space |
| Turn camera | Drag the world, or Q / E |
| Use a station / board rocket | F, or click the interaction prompt |
| Map | M or Map button |
| Mission log | J or Missions button |
| Pause / close menu | Escape |
| Change block | Change block button |

Touch devices show a directional pad and Jump button; drag the world to turn the camera.

Collect the glowing turquoise crystals near the current mission's station, then approach its gold entrance pad. A direction marker shows the nearest mission crystal or station. Complete three codes to earn each part. After six missions, approach the rocket and board it. Flights can be skipped. Maps show your position and next station.

Progress, difficulty, character, discoveries, and preferences save in this browser's local storage. They do not sync between browsers/devices. New Adventure asks before clearing the 3D save. The original puzzle game keeps its own separate save.

## Development

```sh
npm test
```

The Node test suite checks generated maths across 100 missions and all difficulty settings, mission data, save validation, the original puzzles, and local static serving. The adventure has also been exercised in Chromium with software WebGL: movement, both rocket transitions, all story missions, persistence, and mobile UI. Automated progression checks move the player to collectibles/stations; they do not establish that every walking route is obstacle-free.

`PORT=3001 npm start` selects another port on macOS/Linux. The server binds to your own device (`127.0.0.1`). The bundled Three.js 0.180.0 is distributed under its MIT license in `public/vendor/THREE-LICENSE.txt`.
