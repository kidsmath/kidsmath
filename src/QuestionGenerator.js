const Parser = require('expr-eval').Parser;

export default class QuestionGenerator {
    static generateInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generate(count = 10, ops = ['+', '-'], min = 0, max = 20) {
        let questions = [];
        let i = 0;
        while (i < count) {
            const lhs = QuestionGenerator.generateInt(min, max);
            let rhs = QuestionGenerator.generateInt(min, max);
            const op = ops[QuestionGenerator.generateInt(0, ops.length - 1)];
            if (op === '-') {
                while (rhs > lhs) {
                    // kids may not understand `3 - 5`,
                    // need re-generate rhs to let rhs <= lhs
                    rhs = QuestionGenerator.generateInt(min, max);
                }
            }

            const expr = lhs + op + rhs;
            const result = Parser.evaluate(expr);
            console.log('expr: ' + expr + ' = ' + result);

            questions.push({
                lhs,
                op,
                rhs,
                result
            });

            i += 1;
        }

        return questions;
    }
}
