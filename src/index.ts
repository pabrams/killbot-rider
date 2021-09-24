import {Warrior} from './Warrior';

let player;
try {
  player = new Warrior();
  player.chooseAttributes().then(() => console.log('done'));
} catch (e) {
  console.error(e, e.message);
}
