import { Warrior } from './Warrior';
import * as Defaults from './Defaults';

function main() {
  let player;
  try {
    player = new Warrior(
      Defaults.Player_Name,
      Defaults.Player_Age,
      Defaults.Starting_Attribute_Points
    );
    go(player).then(
      () => console.log('all done')
    );
  } catch (e) {
    console.error(e, e.message);
  }
}

async function go(player) {
  await player.chooseAttributes();

  return;
}

main();