/* eslint-disable indent */
import chalk from 'chalk';

interface IAttribute{
  text: string;
  stext: string;
  value: number;
  decKey: string;
  incKey: string;
  toString: () => string;
  toAdjustmentString: () => string;
}

/** */
abstract class Attribute implements IAttribute {
  public text: string;
  public stext: string;
  public value: number;
  public decKey: string;
  public incKey: string;

  /**
   * @param {string} text main text representation
   * @param {string} stext short text representation
   * @param {number} value numeric value of this attribute
   * @param {string} decKey input string for decreasing
   * @param {string} incKey input string for increasing
   */
  constructor(
      text: string,
      stext: string,
      value: number,
      decKey: string,
      incKey: string,
  ) {
    this.text = text;
    this.stext = stext;
    this.value = value;
    this.decKey = decKey;
    this.incKey = incKey;
  }

  /**
   * @return {string} representation of object
  */
  toString() {
    return (
      `${chalk.greenBright(this.text)}` +
      `${chalk.blueBright('----------')}` +
      `${chalk.greenBright(this.value)}`
    );
  }

  /**
   * @return {string} representation of object
  */
  toAdjustmentString() {
    return (
      chalk.cyan(
        `(${chalk.yellow(this.decKey)}|${chalk.yellow(this.incKey)})` +
        `${chalk.red(':')} ${this.text}`,
      )
    );
  }
}

/** */
export class BaseAttribute extends Attribute {}

/**
 * A collection of BaseAttribute
 */
export interface IAttributes {
  [key: number]: BaseAttribute
  [Symbol.iterator]: () => Generator<IAttribute>
  findByText: (text: string) => BaseAttribute | null
  findByStext: (text: string) => BaseAttribute | null
}

