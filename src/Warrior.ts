/* eslint-disable require-jsdoc */
/* eslint-disable indent */
import inquirer from 'inquirer';
let Table = require('cli-table');
import { Color } from './Colors';
import * as Defaults from './Defaults';
import { IAttributes, BaseAttribute } from './WarriorAttribute';

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
  attributePoints = 0;
  combatExperience = 10;
  pilotingExperience = 10;
  barterExperience = 10;
  repairExperience = 10;
  attributes = {
    0: new BaseAttribute(
      'eyesight',
      'eye',
      10,
    ),
    1: new BaseAttribute(
      'dexterity',
      'dex',
      6,
    ),
    2: new BaseAttribute(
      'reflexes',
      'rfx',
      6
    ),
    3: new BaseAttribute(
      'intellect',
      'int',
      6,
    ),
    4: new BaseAttribute(
      'fortitude',
      'frt',
      6,
    ),
    5: new BaseAttribute(
      'charisma',
      'cha',
      6,
    ),
    [Symbol.iterator]: function* () {
      yield this[0];
      yield this[1];
      yield this[2];
      yield this[3];
      yield this[4];
      yield this[5];
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
  charisma = () => this.attributes.findByText('charisma');
  attributeChoices = [];
  derivedStats = {
    0: {
      name: "aim",
      value: () => (
        5 * this.eyesight().value + 
        4 * this.dexterity().value +
        1 * this.intellect().value
      ) * this.combatExperience / 10
    },
    1: {
      name: "reaction",
      value: () => 10 * this.reflexes().value
    },
    2: {
      name: "tactics", 
      value: () => (
        9 * this.intellect().value +
        1 * this.eyesight().value
      ) * this.combatExperience / 10
    },
    3: {
      name: "fatigueRate", 
      value: () => 10 * this.fortitude().value
    },
    4: {
      name: "piloting", 
      value: () =>
      (
        2 * this.eyesight().value +
        2 * this.dexterity().value +
        2 * this.fortitude().value +
        2 * this.intellect().value +
        2 * this.reflexes().value
      ) * this.pilotingExperience / 10
    },
    5: {
      name: "bravery", 
      value: () => 10 * this.fortitude().value
    },
    6: {
      name: "leadership", 
      value: () => (
        1 * this.intellect().value +
        1 * this.fortitude().value +
        8 * this.charisma().value
      ) * this.combatExperience / 10
    },
    7: {
      name: "barter", 
      value: () => 
      (
        4 * this.intellect().value +
        6 * this.charisma().value
      ) * this.barterExperience / 10
    },
    8: {
      name: "repair", 
      value: () => 
        10 * this.intellect().value * this.repairExperience / 10
    },
    [Symbol.iterator]: function* () {
      yield this[0];
      yield this[1];
      yield this[2];
      yield this[3];
      yield this[4];
      yield this[5];
      yield this[6];
      yield this[7];
      yield this[8];
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
    let statDisplay = new Table({
      chars: { 
        'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
        , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
        , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
        , 'right': '║' , 'right-mid': '╢' , 'middle': '│' 
      }
    });
    for (const stat of this.derivedStats) {
      statDisplay.push(
        [Color.altText(stat.name), Color.statValue(stat.value())]
      );
    }
    console.log(statDisplay.toString());
    console.log("");
  };
  /**
   *
   */
  showAdjustmentMessages() {
    let attributeAdjustDisplay = new Table({
      chars: { 
        'top': '═' , 'top-mid': '' , 'top-left': '╔' , 'top-right': '╗'
        , 'bottom': '═' , 'bottom-mid': '' , 'bottom-left': '╚' , 'bottom-right': '╝'
        , 'left': '║' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
        , 'right': '║' , 'right-mid': '' , 'middle': '' 
      }
    });
    for (const attribute of this.attributes) {
      attributeAdjustDisplay.push(
        [attribute.adjustmentText(), attribute.adjustmentSeparation(), attribute.adjustmentValue()]
      )
    }
    console.log(attributeAdjustDisplay.toString())
    console.log("");
  };
};
