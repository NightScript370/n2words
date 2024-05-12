import { N2WordsRU } from './ru.js';

class N2WordsHE extends N2WordsRU {
  and;

  ones = { 1: 'אֶחָד', 2: 'שְׁנַיִם', 3: 'שְׁלֹשָׁה', 4: 'אַרְבָּעָה', 5: 'חֲמִשָּׁה', 6: 'שִׁשָּׁה', 7: 'שִׁבְעָה', 8: 'שְׁמוֹנָה', 9: 'תִּשְׁעָה' };
  tens = {
    0: 'עֲשָׂרָה', 2: 'שְׁנֵים עָשָׂר'
  };

  two = "שְׁנֵי";
  ten = "עָשָׂר";

  twenties = {
    2: 'עֶשְׂרִים',
    3: 'שְׁלֹשִׁים',
    4: 'אַרְבָּעִים',
    5: 'חמישים',
    6: 'ששים',
    7: 'שבעים',
    8: 'שמונים',
    9: 'תשעים'
  };

  hundreds = {
    1: 'מאה',
    2: 'מאתיים',
    3: 'מאות'
  };

  thousands = {
    1: 'אלף',
    2: 'אלפיים',
    3: 'שלשת אלפים',
    4: 'ארבעת אלפים',
    5: 'חמשת אלפים',
    6: 'ששת אלפים',
    7: 'שבעת אלפים',
    8: 'שמונת אלפים',
    9: 'תשעת אלפים'
  };

  constructor(options) {
    // TODO Confirm `negativeWord`
    // TODO Set `separatorWord`
    options = Object.assign({
      negativeWord: 'מינוס',
      //separatorWord: ,
      zero: 'אפס',
      and: 'וְ',
      altAnd: 'וּ'
    }, options);

    super(options);

    this.and = options.and;
  }

  toCardinal(number) {
    switch (number) {
      case 0:
        return this.zero;
      case 2:
        return this.two;
    }

    const words = [];
    const chunks = this.splitByX(number.toString(), 3);
    let index = chunks.length;
    for (const x of chunks) {
      index = index - 1;
      if (x == 0) {
        continue;
      }

      const [n1, n2, n3] = this.getDigits(x);

      if (index > 0) {
        words.push(this.thousands[n1]);
        continue;
      }


      if (n3 > 0) {
        if (n3 <= 2) {
          words.push(this.hundreds[n3]);
        } else {
          words.push(this.ones[n3] + ' ' + this.hundreds[3]);
        }
      }

      if (n2 == 1) {
        words.push(n1 in this.tens ? this.tens[n1] : this.ones[n1] + " " + this.ten);
      } else if (n1 > 0) {
        words.push(this.ones[n1]);
      }

      if (n2 > 1) {
        words.push(this.twenties[n2]);
      }
    }

    if (words.length > 1) {
      words[words.length - 1] = (words[words.length - 1] == this.twenties[3] ? this.altAnd : this.and) + words[words.length - 1];
    }

    return words.join(' ');
  }
}

/**
 * Converts a value to cardinal (written) form.
 * @param {number|string|bigint} value Number to be convert.
 * @param {object} [options] Options for class.
 * @returns {string} Value in cardinal (written) format.
 * @throws {Error} Value cannot be invalid.
 */
export default function floatToCardinal (value, options = {}) {
  return new N2WordsHE(options).floatToCardinal(value);
}
