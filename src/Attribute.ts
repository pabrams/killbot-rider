/* eslint-disable indent */
import chalk from 'chalk';

interface IAttribute{
  text: string;
  stext: string;
  value: number;
  toString: () => string;
  toAdjustmentString: () => string;
  decKey: () => string;
  incKey: () => string;
}

/** */
abstract class Attribute implements IAttribute {
  public text: string;
  public stext: string;
  public value: number;

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
  ) {
    this.text = text;
    this.stext = stext;
    this.value = value;
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
        `(${chalk.yellow(this.decKey())}|${chalk.yellow(this.incKey())})` +
        `${chalk.blue(this.text.substring(1))}` +
        `${chalk.gray('----------')}` +
        `${chalk.red(this.value)}`,
      )
    );
  }


  /**
   * @return {string} the char that decrements this attribute
  */
   decKey() {
    return this.text.substring(0, 1).toLocaleLowerCase();
  }

  /**
   * @return {string} the char that increments this attribute
  */
   incKey() {
    return this.text.substring(0, 1).toLocaleUpperCase();
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

