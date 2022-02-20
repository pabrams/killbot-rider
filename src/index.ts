import {Warrior} from './Warrior';
import * as Defaults from './Defaults';

let player;
try {
  player = new Warrior(
    Defaults.Player_Name,
    Defaults.Player_Age,
    Defaults.Starting_Attribute_Points
  );
  player.chooseAttributes().then(() => console.log('done'));
} catch (e) {
  console.error(e, e.message);
}
