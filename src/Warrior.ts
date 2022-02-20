/* eslint-disable require-jsdoc */
/* eslint-disable indent */
import {IAttributes, BaseAttribute} from './Attribute';
import inquirer from 'inquirer';
import * as Defaults from './Defaults';
import {Color} from './Colors';

export interface IWarrior {
  nickname: string;
  age: number;

  attributePoints: number;
  attributes: IAttributes;

  aimstat: () => number;
  reactionStat: () => number;
  tacticsStat: () => number;
  pilotingStat: () => number;
}


/**
 * The warrior class
 */
export class Warrior implements IWarrior {
  nickname: string;
  age: number;

  attributePoints: number;
  attributes = {
    0: new BaseAttribute(
      'eyesight',
      'eye',
      1,
    ),
    1: new BaseAttribute(
      'dexterity',
      'dex',
      1,
    ),
    2: new BaseAttribute(
      'reflexes',
      'rfx',
      1
    ),
    3: new BaseAttribute(
      'intellect',
      'int',
      1,
    ),
    4: new BaseAttribute(
      'fortitude',
      'frt',
      1,
    ),
    [Symbol.iterator]: function* () {
      yield this[0];
      yield this[1];
      yield this[2];
      yield this[3];
      yield this[4];
    },
    findByText: function(text: string) {
      for (const attribute of this) {
        if (attribute.text == text) {
          return attribute;
        }
      }
      return null;
    },
    findByStext: function(stext: string) {
      for (const attribute of this) {
        if (attribute.stext == stext) {
          return attribute;
        }
      }
      return null;
    },
  };

  eyesight() {
    return this.attributes.findByText('eyesight');
  }

  dexterity() {
    return this.attributes.findByText('dexterity');
  }

  reflexes() {
    return this.attributes.findByText('reflexes');
  }

  intellect() {
    return this.attributes.findByText('intellect');
  }

  fortitude() {
    return this.attributes.findByText('fortitude');
  }

  /**
   * @param {string} nickname
   * @param {number} age
   * @param {number} attributePoints
   * @param {IAttributes} attributes
   */
  constructor(
      nickname:string = Defaults.Player_Name,
      age:number = Defaults.Player_Age,
      attributePoints: number = Defaults.Starting_Attribute_Points,
  ) {
    this.nickname = nickname;
    this.age = age;
    this.attributePoints = attributePoints;
  }

  /**
   * @return {number} aimstat
   */
  aimstat() {
    return (
      this.eyesight().value +
      this.dexterity().value
    ) * 100 / 2;
  }

  /**
   * @return {number} reactionStat
   */
  reactionStat() {
    return (100 * this.reflexes().value);
  }

  /**
  * @return {number} tacticsStat
  */
   tacticsStat() {
    return (100 * this.intellect().value);
  }

  /**
  * @return {number} fatigueStat
  */
   fatigueStat() {
    return (100 * this.fortitude().value);
  }

  /**
 * @return {number} pilotingStat
 */
  pilotingStat() {
    return (
      this.eyesight().value +
      this.dexterity().value +
      this.fortitude().value +
      this.intellect().value +
      this.reflexes().value
    ) * 100 / 5;
  }

  /**
   *
   */
  async chooseAttributes() {
    let lastAnswer = '0';
    while (lastAnswer != 'q') {
      console.log("");
      this.showAttributePoints();
      this.showDerivedStats();
      this.showAdjustmentMessages();
      inquirer.registerPrompt(
        'autosubmit',
        require('inquirer-autosubmit-prompt'),
      );

      try {
        const answer = await inquirer.prompt([
          {
            type: 'autosubmit',
            message: 'Adjust your attribute points.  Use \'q\' to quit.',
            name: 'choice',
            autoSubmit: (input) => input.length === 1,
            choices: [
              {
                key: this.eyesight().decKey(),
                value: this.eyesight().decKey(),
                name: this.eyesight().text,
              },
              {
                key: this.eyesight().incKey(),
                value: this.eyesight().incKey(),
                name: this.eyesight().text,
              },
              {
                key: this.dexterity().decKey(),
                value: this.dexterity().decKey(),
                name: this.dexterity().text,
              },
              {
                key: this.dexterity().incKey(),
                value: this.dexterity().incKey(),
                name: this.dexterity().text,
              },
              {
                key: this.reflexes().decKey(),
                value: this.reflexes().decKey(),
                name: this.reflexes().text,
              },
              {
                key: this.reflexes().incKey(),
                value: this.reflexes().incKey(),
                name: this.reflexes().text,
              },
              {
                key: this.intellect().decKey(),
                value: this.intellect().decKey(),
                name: this.intellect().text,
              },
              {
                key: this.intellect().incKey(),
                value: this.intellect().incKey(),
                name: this.intellect().text,
              },
              {
                key: this.fortitude().decKey(),
                value: this.fortitude().decKey(),
                name: this.fortitude().decKey(),
              },
              {
                key: this.fortitude().incKey(),
                value: this.fortitude().incKey(),
                name: this.fortitude().text,
              },
            ],
          },
        ]);
        lastAnswer = answer.choice;
        switch (lastAnswer) {
          case this.eyesight().decKey():
            if (this.eyesight().value > 1) {
              this.eyesight().value -= 1;
              this.attributePoints += 1;
            }
            break;
          case this.eyesight().incKey():
            if (this.attributePoints > 0) {
              if (this.eyesight().value < 12) {
                this.eyesight().value += 1;
                this.attributePoints -= 1;
              }
            }
            break;

          case this.dexterity().decKey():
            if (this.dexterity().value > 1) {
              this.dexterity().value--;
              this.attributePoints++;
            }
            break;
          case this.dexterity().incKey():
            if (this.attributePoints > 0) {
              if (this.dexterity().value < 12) {
                this.dexterity().value++;
                this.attributePoints--;
              }
            }
            break;

          case this.reflexes().decKey():
            if (this.reflexes().value > 1) {
              this.reflexes().value--;
              this.attributePoints++;
            }
            break;
          case this.reflexes().incKey():
            if (this.attributePoints > 0) {
              if (this.reflexes().value < 12) {
                this.reflexes().value++;
                this.attributePoints--;
              }
            }
            break;

          case this.intellect().decKey():
            if (this.intellect().value > 1) {
              this.intellect().value--;
              this.attributePoints++;
            }
            break;
          case this.intellect().incKey():
            if (this.attributePoints > 0) {
              if (this.intellect().value < 12) {
                this.intellect().value++;
                this.attributePoints--;
              }
            }
            break;

          case this.fortitude().decKey():
            if (this.fortitude().value > 1) {
              this.fortitude().value--;
              this.attributePoints++;
            }
            break;
          case this.fortitude().incKey():
            if (this.attributePoints > 0) {
              if (this.fortitude().value < 12) {
                this.fortitude().value++;
                this.attributePoints--;
              }
            }
            break;
          default:
            break;
        }
      } catch (e) {
        console.error('rethrowing ' + e.message);
        throw (e);
      }
    }
  };

  /**
   *
   */
  showAttributePoints() {
    console.log(
      Color.altText("Attribute points to allocate: ") + 
      Color.highlight(this.attributePoints)
    );
    console.log("");
  }

  /**
   *
   */
  showDerivedStats() {
    console.log(
      Color.altText("aim") + 
      Color.subduedLine("----------") + 
      Color.statValue(this.aimstat())
    );

    console.log(
      Color.altText("reaction") + 
      Color.subduedLine("----------") + 
      Color.statValue(this.reactionStat())
    );

    console.log(
      Color.altText("tactics") + 
      Color.subduedLine("----------") + 
      Color.statValue(this.tacticsStat())
    );

    console.log(
      Color.altText("piloting") + 
      Color.subduedLine("----------") + 
      Color.statValue(this.pilotingStat())
    );
    console.log("");
  };

  /**
   *
   */
  showAdjustmentMessages() {
    for (const attribute of this.attributes) {
      console.log(attribute.toAdjustmentString());
    }
    console.log("");
  };
};
