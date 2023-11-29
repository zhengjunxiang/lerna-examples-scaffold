import { test, expect } from '../../utils/unit-test/index';
import { IntlMessageFormat } from 'intl-messageformat';

test('basic Interpolation', () => {
    const mf = new IntlMessageFormat(
        'My name is {FIRST} {LAST}, age {age, number}, time {time, time}, date {date, date}.',
        'en',
    );
    
    const ts = 12 * 3600 * 1e3;
    const output = mf.format({
        FIRST: 'Anthony',
        LAST: 'Pipkin',
        age: 8,
        time: ts,
        date: ts,
    });
    expect(output).toMatch(
        /My name is Anthony Pipkin, age 8, time \d{1,2}:\d{1,2}:\d{1,2} [AP]M, date \d{1,2}\/\d{1,2}\/\d{4}\./
    );

    const mf_2 = new IntlMessageFormat('hi @{there}', 'en');
    expect(
        mf_2.format({
        there: '2008',
      })
    ).toBe('hi @2008');
});

test('should not ignore zero values', () => {
    const mf = new IntlMessageFormat('I am {age} years old.');
      const output = mf.format({
        age: 0,
    });

    expect(output).toBe('I am 0 years old.');
});

test('should ignore false, null, and undefined', () => {
    const mf = new IntlMessageFormat('{a}{b}{c}');
      const output = mf.format({
        a: false,
        b: null,
        c: undefined,
    });
    expect(output).toBe('');
});

test('plurals', () => {
    const msg =
        '' +
        'I have {numPeople, plural,' +
        'zero {zero points}' +
        'one {a point}' +
        'two {two points}' +
        'few {a few points}' +
        'many {lots of points}' +
        'other {some other amount of points}}' +
        '.';

    const msgFmt = new IntlMessageFormat(msg, 'en-SG');
    const one = msgFmt.format({
        numPeople: 1,
    });
    expect(one).toBe('I have a point.');

    const other = msgFmt.format({
        numPeople: 100,
    });

    expect(other).toBe('I have some other amount of points.');
});

test('complex plurals', () => {
    const msg = '{TRAVELLERS} {TRAVELLER_COUNT, plural, ' +
        '=1 {est {GENDER, select, ' +
        'female {allée}' +
        'other {allé}}}' +
        'other {sont {GENDER, select, ' +
        'female {allées}' +
        'other {allés}}}}' +
        ' à {CITY}.';

    const maleTravelers = {
        TRAVELLERS: 'Lucas, Tony and Drew',
        TRAVELLER_COUNT: 3,
        GENDER: 'male',
        CITY: 'Paris',
    };
    
        const femaleTravelers = {
        TRAVELLERS: 'Monica',
        TRAVELLER_COUNT: 1,
        GENDER: 'female',
        CITY: 'Paris',
    };

    const msgFmt = new IntlMessageFormat(msg, 'fr-FR');
    expect(msgFmt.format(maleTravelers)).toBe(
        'Lucas, Tony and Drew sont allés à Paris.'
    );

    expect(msgFmt.format(femaleTravelers)).toBe('Monica est allée à Paris.');
});

test('selectordinal plurals', () => {
    const msg = 'This is my {year, selectordinal, one{#st} two{#nd} few{#rd} other{#th}} birthday.';
    const mf = new IntlMessageFormat(msg, 'en');
    expect(mf.format({year: 1})).toBe('This is my 1st birthday.');
    expect(mf.format({year: 2})).toBe('This is my 2nd birthday.');
    expect(mf.format({year: 3})).toBe('This is my 3rd birthday.');
    expect(mf.format({year: 4})).toBe('This is my 4th birthday.');
    expect(mf.format({year: 11})).toBe('This is my 11th birthday.');
    expect(mf.format({year: 21})).toBe('This is my 21st birthday.');
    expect(mf.format({year: 22})).toBe('This is my 22nd birthday.');
    expect(mf.format({year: 33})).toBe('This is my 33rd birthday.');
    expect(mf.format({year: 44})).toBe('This is my 44th birthday.');
    expect(mf.format({year: 1024})).toBe('This is my 1,024th birthday.');
});

test('negative number plurals', () => {
    const msg =
        '{num, plural, offset:-1 =-1{negative one} one{one} other{other}}';
    const mf = new IntlMessageFormat(msg, 'en');
    expect(mf.format({num: -1})).toBe('negative one');
    expect(mf.format({num: 0})).toBe('one');
    expect(mf.format({num: 1})).toBe('other');
});

test('should handle offset in plural #', () => {
    const msg = `{num_guests, plural, offset:1
        =0 {{host} does not give a party.}
        =1 {{host} invites {guest} to their party.}
        =2 {{host} invites {guest} and one other person to their party.}
        other {{host} invites {guest} and # other people to their party.}
    }`;
    const mf = new IntlMessageFormat(msg, 'en');
    expect(mf.format({host: 'The host', guest: 'Alice', num_guests: 0})).toBe(
        'The host does not give a party.'
    );
    expect(mf.format({host: 'The host', guest: 'Alice', num_guests: 1})).toBe(
        'The host invites Alice to their party.'
    );
    expect(mf.format({host: 'The host', guest: 'Alice', num_guests: 2})).toBe(
        'The host invites Alice and one other person to their party.'
    );
    expect(mf.format({host: 'The host', guest: 'Alice', num_guests: 3})).toBe(
        'The host invites Alice and 2 other people to their party.'
    );
});

test('regression issue #437', () => {
    const mf = new IntlMessageFormat(
      '{score, plural, one {# shopper} other {# shoppers}}',
      'en'
    );
    expect(mf.format({score: 1})).toBe('1 shopper');
    expect(mf.format({score: 2})).toBe('2 shoppers');
});

test('custom formats should work for time', () => {
    const msg = 'Today is {time, time, verbose}';
    const mf = new IntlMessageFormat(msg, 'zh-Hant-HK', {
      time: {
        verbose: {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        },
      },
    });
    expect(mf.format(new Date(1665720000000))).toBe('下午12:00:00');
});

test('custom formats should work for date', () => {
    const msg = 'Today is {time, date, verbose}';
    const mf = new IntlMessageFormat(msg, 'zh-Hant-HK', {
        date: {
            verbose: {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            },
        },
    });
    expect(mf.format(new Date(1665720000000))).toBe('14/10/2022');
});

test('date skeleton', () => {
    expect(
        new IntlMessageFormat('{d, date, ::yyyyMMMdd}', 'en-US').format({
        d: new Date(0),
    })
    ).toMatch(/[A-Z][a-z]{2}(.*?)\d{2}(.*?),(.*?)\d{4}/);
    expect(
        new IntlMessageFormat('{d, date, ::yyyyMMdd}', 'en-US').format({
          d: new Date(0),
        })
    ).toMatch(/\d{2}(.*?)\/(.*?)\d{2}(.*?)\/(.*?)\d{4}/); 
});

test('time skeleton', () => {
    expect(
        new IntlMessageFormat('{d, time, ::hhmmss}', 'en-US').format({
            d: new Date(0),
        })
    ).toMatch(/\d{2}(.*?):(.*?)\d{2}(.*?):(.*?)\d{2}(.*?)[AP]M/);

    expect(
        new IntlMessageFormat('{d, time, ::jjmmss}', 'en-US').format({
            d: new Date(0),
        })
    ).toMatch(/\d{2}(.*?):(.*?)\d{2}(.*?):(.*?)\d{2}(.*?)[AP]M$/); 
});

test('number skeleton', () => {
    expect(
        new IntlMessageFormat(
                '{amount, number, ::currency/CAD .0 group-off}',
                'en-US'
        ).format({amount: 123456.78})
    ).toMatch(/\$123456.8/);
    
    expect(
        new IntlMessageFormat(
            '{amount, number, ::currency/GBP .0#}',
            'en-US'
        ).format({amount: 123456.789})
    ).toBe('£123,456.79');
  });

test('number skeleton with scale', function () {
    expect(
        new IntlMessageFormat(
            '{amount, number, ::percent scale/0.01}',
            'en-US'
        ).format({amount: 12.3})
    ).toBe('12%');
});