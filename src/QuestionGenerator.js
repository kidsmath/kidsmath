const Parser = require('expr-eval').Parser;

const opMap = {
  '+': '+',
  '-': '-',
  '*': 'x',
  '/': '÷'
};

export default class QuestionGenerator {
  /**
   * Generate integer in range [min, max]
   *
   * @param min
   * @param max
   * @returns {int}   integer in range [min, max]
   */
  static generateInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generate(count = 10, ops = ['+', '-'], min = 0, max = 20) {
    let questions = [];
    let i = 0;
    while (i < count) {
      let lhs = QuestionGenerator.generateInt(min, max);
      let rhs = QuestionGenerator.generateInt(min, max);
      const op = ops[QuestionGenerator.generateInt(0, ops.length - 1)];
      if (op === '-') {
        while (lhs === 0) {
          // prevent 0 - 0
          lhs = QuestionGenerator.generateInt(min, max);
        }

        while (rhs > lhs) {
          // kids may not understand `3 - 5`,
          // need re-generate rhs to let rhs <= lhs
          rhs = QuestionGenerator.generateInt(min, max);
        }
      } else if (op === '/') {
        lhs = lhs * rhs;
      }

      const expr = lhs + op + rhs;
      const result = Parser.evaluate(expr);
      // console.log('expr: ' + expr + ' = ' + result);

      if (result === 0) {
        // skip simple question. e.g. 3 - 3 = 0
        continue;
      }

      questions.push({
        lhs,
        op: opMap[op],
        rhs,
        result
      });

      i += 1;
    }

    return questions;
  }
}
