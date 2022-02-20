/* eslint-disable require-jsdoc */
/* eslint-disable indent */
import {IAttributes, BaseAttribute} from './Attribute';
import inquirer from 'inquirer';
import * as Defaults from './Defaults';
import {Color} from './Colors';

inquirer.registerPrompt(
  'autosubmit',
  require('inquirer-autosubmit-prompt'),
);

export interface IWarrior {
  nickname: string;
  age: number;

  attributePoints: number;
  attributes: IAttributes;
}

/**
 * The warrior class
 */
export class Warrior implements IWarrior {
  nickname: string;
  age: number;
  attributePoints: number = 0;
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
  eyesight = () => this.attributes.findByText('eyesight');
  dexterity = () => this.attributes.findByText('dexterity');
  reflexes = () => this.attributes.findByText('reflexes');
  intellect = () => this.attributes.findByText('intellect');
  fortitude = () => this.attributes.findByText('fortitude');
  attributeChoices = [];
  derivedStats = {
    0: {
      name: "aim", 
      value: () => 
        60 * this.eyesight().value + 
        40 * this.dexterity().value
    },
    1: {
      name: "reaction", 
      value: () => 100 * this.reflexes().value
    },
    2: {
      name: "tactics", 
      value: () => 100 * this.intellect().value
    },
    3: {
      name: "fatigue", 
      value: () => 100 * this.fortitude().value
    },
    4: {
      name: "piloting", 
      value: () =>
        20 * this.eyesight().value +
        30 * this.dexterity().value +
        10 * this.fortitude().value +
        10 * this.intellect().value +
        30 * this.reflexes().value
    },
    [Symbol.iterator]: function* () {
      yield this[0];
      yield this[1];
      yield this[2];
      yield this[3];
      yield this[4];
    },
    findByName: function(text: string) {
      for (const derivedStat of this) {
        if (derivedStat.name == text) {
          return derivedStat;
        }
      }
      return null;
    },
  };
  aimStat = () => this.derivedStats.findByName('aim');
  reactionStat = () => this.derivedStats.findByName('reaction');
  tacticsStat = () => this.derivedStats.findByName('tactics');
  fatigueStat = () => this.derivedStats.findByName('fatigue');
  pilotingStat = () => this.derivedStats.findByName('piloting');
  /**
   * @param {string} nickname
   * @param {number} age
   * @param {number} attributePoints
   * @param {IAttributes} attributes
   */
  constructor(
      nickname = Defaults.Player_Name,
      age = Defaults.Player_Age,
      attributePoints = Defaults.Starting_Attribute_Points,
  ) {
    this.nickname = nickname;
    this.age = age;
    this.attributePoints = attributePoints;
    for (const a of this.attributes){
      this.attributeChoices.push({
        key: a.decKey(),
        value: a.decKey(),
        name: a.text,
      })
    };
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
      try {
        const answer = await inquirer.prompt([
          {
            type: 'autosubmit',
            message: 'Adjust your attribute points.  Use \'q\' to quit.',
            name: 'choice',
            autoSubmit: (input) => input.length === 1,
            choices: this.attributeChoices
          },
        ]);
        lastAnswer = answer.choice;
        for (const a of this.attributes){
          if (lastAnswer == a.decKey()) {
            if (a.value > 1){
              a.value -= 1;
              this.attributePoints += 1;
            }
          }
          if (lastAnswer == a.incKey()) {
            if (this.attributePoints > 0) {
              if (a.value < 12) {
                a.value += 1;
                this.attributePoints -= 1;
              }
            }
          }
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
    for (const stat of this.derivedStats) {
      console.log(
        Color.altText(stat.name) + 
        Color.subduedLine("----------") + 
        Color.statValue(stat.value())
      );
    }
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
