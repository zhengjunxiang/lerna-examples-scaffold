import { test, expect } from '../../utils/unit-test/index';
const Intl = Mach.requireModule('Intl');

type RoundingModeType = 'ceil' | 'floor' | 'expand' | 'trunc' | 'halfCeil' | 'halfFloor' | 'halfExpand' | 'halfTrunc' | 'halfEven';

interface RoundingModeCase {
    roundingMode: RoundingModeType;
    expectValue: string;
}

// const originNums = () => {
//   const begin = -2.0;

//   const index = [...Array(40).keys()];
//   const result = index.map((item, index) => {
//     return (begin + index / 10).toFixed(1);
//   });

//   return result;
// };

// const roundingModeTest = () => {
//     const nums = originNums();
//     const roundingModes = ['ceil', 'expand', 'floor', 'halfCeil', 'halfEven', 'halfFloor', 'halfTrunc', 'trunc'];
//     const result = nums.reduce((prev, cur) => {
//         const valOfModes = roundingModes.map((item) => {
//             return {
//                 roundingMode: item,
//                 expectValue: new Intl.NumberFormat('zh-HK', { roundingMode: item, maximumSignificantDigits: 1 }).format(cur)
//             };
//         });
//         return {
//             ...prev,
//             [cur]: valOfModes
//         };
//     }, {});
//     console.log('result = ', JSON.stringify(result));
// };

/**
 * 下面的结果是通过上面的测试代码在Chrome上跑出的，说明一下关于roundingMode在js中的值与ICU中的对应关系:
 * expand 等价于 UP
 * trunc 等价于 DOWN
 * halfExpand 等价于 HALFUP
 * halfTrunc 等价于 HALFDOWN
 */
const roundingModeExpect: any = {
  '-2.0': [
    { roundingMode: 'ceil', expectValue: '-2' },
    { roundingMode: 'expand', expectValue: '-2' },
    { roundingMode: 'floor', expectValue: '-2' },
    { roundingMode: 'halfCeil', expectValue: '-2' },
    { roundingMode: 'halfEven', expectValue: '-2' },
    { roundingMode: 'halfFloor', expectValue: '-2' },
    { roundingMode: 'halfTrunc', expectValue: '-2' },
    { roundingMode: 'trunc', expectValue: '-2' }
  ],
  '-1.9': [
    { roundingMode: 'ceil', expectValue: '-1' },
    { roundingMode: 'expand', expectValue: '-2' },
    { roundingMode: 'floor', expectValue: '-2' },
    { roundingMode: 'halfCeil', expectValue: '-2' },
    { roundingMode: 'halfEven', expectValue: '-2' },
    { roundingMode: 'halfFloor', expectValue: '-2' },
    { roundingMode: 'halfTrunc', expectValue: '-2' },
    { roundingMode: 'trunc', expectValue: '-1' }
  ],
  '-1.8': [
    { roundingMode: 'ceil', expectValue: '-1' },
    { roundingMode: 'expand', expectValue: '-2' },
    { roundingMode: 'floor', expectValue: '-2' },
    { roundingMode: 'halfCeil', expectValue: '-2' },
    { roundingMode: 'halfEven', expectValue: '-2' },
    { roundingMode: 'halfFloor', expectValue: '-2' },
    { roundingMode: 'halfTrunc', expectValue: '-2' },
    { roundingMode: 'trunc', expectValue: '-1' }
  ],
  '-1.7': [
    { roundingMode: 'ceil', expectValue: '-1' },
    { roundingMode: 'expand', expectValue: '-2' },
    { roundingMode: 'floor', expectValue: '-2' },
    { roundingMode: 'halfCeil', expectValue: '-2' },
    { roundingMode: 'halfEven', expectValue: '-2' },
    { roundingMode: 'halfFloor', expectValue: '-2' },
    { roundingMode: 'halfTrunc', expectValue: '-2' },
    { roundingMode: 'trunc', expectValue: '-1' }
  ],
  '-1.6': [
    { roundingMode: 'ceil', expectValue: '-1' },
    { roundingMode: 'expand', expectValue: '-2' },
    { roundingMode: 'floor', expectValue: '-2' },
    { roundingMode: 'halfCeil', expectValue: '-2' },
    { roundingMode: 'halfEven', expectValue: '-2' },
    { roundingMode: 'halfFloor', expectValue: '-2' },
    { roundingMode: 'halfTrunc', expectValue: '-2' },
    { roundingMode: 'trunc', expectValue: '-1' }
  ],
  '-1.5': [
    { roundingMode: 'ceil', expectValue: '-1' },
    { roundingMode: 'expand', expectValue: '-2' },
    { roundingMode: 'floor', expectValue: '-2' },
    { roundingMode: 'halfCeil', expectValue: '-1' },
    { roundingMode: 'halfEven', expectValue: '-2' },
    { roundingMode: 'halfFloor', expectValue: '-2' },
    { roundingMode: 'halfTrunc', expectValue: '-1' },
    { roundingMode: 'trunc', expectValue: '-1' }
  ],
  '-1.4': [
    { roundingMode: 'ceil', expectValue: '-1' },
    { roundingMode: 'expand', expectValue: '-2' },
    { roundingMode: 'floor', expectValue: '-2' },
    { roundingMode: 'halfCeil', expectValue: '-1' },
    { roundingMode: 'halfEven', expectValue: '-1' },
    { roundingMode: 'halfFloor', expectValue: '-1' },
    { roundingMode: 'halfTrunc', expectValue: '-1' },
    { roundingMode: 'trunc', expectValue: '-1' }
  ],
  '-1.3': [
    { roundingMode: 'ceil', expectValue: '-1' },
    { roundingMode: 'expand', expectValue: '-2' },
    { roundingMode: 'floor', expectValue: '-2' },
    { roundingMode: 'halfCeil', expectValue: '-1' },
    { roundingMode: 'halfEven', expectValue: '-1' },
    { roundingMode: 'halfFloor', expectValue: '-1' },
    { roundingMode: 'halfTrunc', expectValue: '-1' },
    { roundingMode: 'trunc', expectValue: '-1' }
  ],
  '-1.2': [
    { roundingMode: 'ceil', expectValue: '-1' },
    { roundingMode: 'expand', expectValue: '-2' },
    { roundingMode: 'floor', expectValue: '-2' },
    { roundingMode: 'halfCeil', expectValue: '-1' },
    { roundingMode: 'halfEven', expectValue: '-1' },
    { roundingMode: 'halfFloor', expectValue: '-1' },
    { roundingMode: 'halfTrunc', expectValue: '-1' },
    { roundingMode: 'trunc', expectValue: '-1' }
  ],
  '-1.1': [
    { roundingMode: 'ceil', expectValue: '-1' },
    { roundingMode: 'expand', expectValue: '-2' },
    { roundingMode: 'floor', expectValue: '-2' },
    { roundingMode: 'halfCeil', expectValue: '-1' },
    { roundingMode: 'halfEven', expectValue: '-1' },
    { roundingMode: 'halfFloor', expectValue: '-1' },
    { roundingMode: 'halfTrunc', expectValue: '-1' },
    { roundingMode: 'trunc', expectValue: '-1' }
  ],
  '-1.0': [
    { roundingMode: 'ceil', expectValue: '-1' },
    { roundingMode: 'expand', expectValue: '-1' },
    { roundingMode: 'floor', expectValue: '-1' },
    { roundingMode: 'halfCeil', expectValue: '-1' },
    { roundingMode: 'halfEven', expectValue: '-1' },
    { roundingMode: 'halfFloor', expectValue: '-1' },
    { roundingMode: 'halfTrunc', expectValue: '-1' },
    { roundingMode: 'trunc', expectValue: '-1' }
  ],
  '-0.9': [
    { roundingMode: 'ceil', expectValue: '-0.9' },
    { roundingMode: 'expand', expectValue: '-0.9' },
    { roundingMode: 'floor', expectValue: '-0.9' },
    { roundingMode: 'halfCeil', expectValue: '-0.9' },
    { roundingMode: 'halfEven', expectValue: '-0.9' },
    { roundingMode: 'halfFloor', expectValue: '-0.9' },
    { roundingMode: 'halfTrunc', expectValue: '-0.9' },
    { roundingMode: 'trunc', expectValue: '-0.9' }
  ],
  '-0.8': [
    { roundingMode: 'ceil', expectValue: '-0.8' },
    { roundingMode: 'expand', expectValue: '-0.8' },
    { roundingMode: 'floor', expectValue: '-0.8' },
    { roundingMode: 'halfCeil', expectValue: '-0.8' },
    { roundingMode: 'halfEven', expectValue: '-0.8' },
    { roundingMode: 'halfFloor', expectValue: '-0.8' },
    { roundingMode: 'halfTrunc', expectValue: '-0.8' },
    { roundingMode: 'trunc', expectValue: '-0.8' }
  ],
  '-0.7': [
    { roundingMode: 'ceil', expectValue: '-0.7' },
    { roundingMode: 'expand', expectValue: '-0.7' },
    { roundingMode: 'floor', expectValue: '-0.7' },
    { roundingMode: 'halfCeil', expectValue: '-0.7' },
    { roundingMode: 'halfEven', expectValue: '-0.7' },
    { roundingMode: 'halfFloor', expectValue: '-0.7' },
    { roundingMode: 'halfTrunc', expectValue: '-0.7' },
    { roundingMode: 'trunc', expectValue: '-0.7' }
  ],
  '-0.6': [
    { roundingMode: 'ceil', expectValue: '-0.6' },
    { roundingMode: 'expand', expectValue: '-0.6' },
    { roundingMode: 'floor', expectValue: '-0.6' },
    { roundingMode: 'halfCeil', expectValue: '-0.6' },
    { roundingMode: 'halfEven', expectValue: '-0.6' },
    { roundingMode: 'halfFloor', expectValue: '-0.6' },
    { roundingMode: 'halfTrunc', expectValue: '-0.6' },
    { roundingMode: 'trunc', expectValue: '-0.6' }
  ],
  '-0.5': [
    { roundingMode: 'ceil', expectValue: '-0.5' },
    { roundingMode: 'expand', expectValue: '-0.5' },
    { roundingMode: 'floor', expectValue: '-0.5' },
    { roundingMode: 'halfCeil', expectValue: '-0.5' },
    { roundingMode: 'halfEven', expectValue: '-0.5' },
    { roundingMode: 'halfFloor', expectValue: '-0.5' },
    { roundingMode: 'halfTrunc', expectValue: '-0.5' },
    { roundingMode: 'trunc', expectValue: '-0.5' }
  ],
  '-0.4': [
    { roundingMode: 'ceil', expectValue: '-0.4' },
    { roundingMode: 'expand', expectValue: '-0.4' },
    { roundingMode: 'floor', expectValue: '-0.4' },
    { roundingMode: 'halfCeil', expectValue: '-0.4' },
    { roundingMode: 'halfEven', expectValue: '-0.4' },
    { roundingMode: 'halfFloor', expectValue: '-0.4' },
    { roundingMode: 'halfTrunc', expectValue: '-0.4' },
    { roundingMode: 'trunc', expectValue: '-0.4' }
  ],
  '-0.3': [
    { roundingMode: 'ceil', expectValue: '-0.3' },
    { roundingMode: 'expand', expectValue: '-0.3' },
    { roundingMode: 'floor', expectValue: '-0.3' },
    { roundingMode: 'halfCeil', expectValue: '-0.3' },
    { roundingMode: 'halfEven', expectValue: '-0.3' },
    { roundingMode: 'halfFloor', expectValue: '-0.3' },
    { roundingMode: 'halfTrunc', expectValue: '-0.3' },
    { roundingMode: 'trunc', expectValue: '-0.3' }
  ],
  '-0.2': [
    { roundingMode: 'ceil', expectValue: '-0.2' },
    { roundingMode: 'expand', expectValue: '-0.2' },
    { roundingMode: 'floor', expectValue: '-0.2' },
    { roundingMode: 'halfCeil', expectValue: '-0.2' },
    { roundingMode: 'halfEven', expectValue: '-0.2' },
    { roundingMode: 'halfFloor', expectValue: '-0.2' },
    { roundingMode: 'halfTrunc', expectValue: '-0.2' },
    { roundingMode: 'trunc', expectValue: '-0.2' }
  ],
  '-0.1': [
    { roundingMode: 'ceil', expectValue: '-0.1' },
    { roundingMode: 'expand', expectValue: '-0.1' },
    { roundingMode: 'floor', expectValue: '-0.1' },
    { roundingMode: 'halfCeil', expectValue: '-0.1' },
    { roundingMode: 'halfEven', expectValue: '-0.1' },
    { roundingMode: 'halfFloor', expectValue: '-0.1' },
    { roundingMode: 'halfTrunc', expectValue: '-0.1' },
    { roundingMode: 'trunc', expectValue: '-0.1' }
  ],
  '0.0': [
    { roundingMode: 'ceil', expectValue: '0' },
    { roundingMode: 'expand', expectValue: '0' },
    { roundingMode: 'floor', expectValue: '0' },
    { roundingMode: 'halfCeil', expectValue: '0' },
    { roundingMode: 'halfEven', expectValue: '0' },
    { roundingMode: 'halfFloor', expectValue: '0' },
    { roundingMode: 'halfTrunc', expectValue: '0' },
    { roundingMode: 'trunc', expectValue: '0' }
  ],
  '0.1': [
    { roundingMode: 'ceil', expectValue: '0.1' },
    { roundingMode: 'expand', expectValue: '0.1' },
    { roundingMode: 'floor', expectValue: '0.1' },
    { roundingMode: 'halfCeil', expectValue: '0.1' },
    { roundingMode: 'halfEven', expectValue: '0.1' },
    { roundingMode: 'halfFloor', expectValue: '0.1' },
    { roundingMode: 'halfTrunc', expectValue: '0.1' },
    { roundingMode: 'trunc', expectValue: '0.1' }
  ],
  '0.2': [
    { roundingMode: 'ceil', expectValue: '0.2' },
    { roundingMode: 'expand', expectValue: '0.2' },
    { roundingMode: 'floor', expectValue: '0.2' },
    { roundingMode: 'halfCeil', expectValue: '0.2' },
    { roundingMode: 'halfEven', expectValue: '0.2' },
    { roundingMode: 'halfFloor', expectValue: '0.2' },
    { roundingMode: 'halfTrunc', expectValue: '0.2' },
    { roundingMode: 'trunc', expectValue: '0.2' }
  ],
  '0.3': [
    { roundingMode: 'ceil', expectValue: '0.3' },
    { roundingMode: 'expand', expectValue: '0.3' },
    { roundingMode: 'floor', expectValue: '0.3' },
    { roundingMode: 'halfCeil', expectValue: '0.3' },
    { roundingMode: 'halfEven', expectValue: '0.3' },
    { roundingMode: 'halfFloor', expectValue: '0.3' },
    { roundingMode: 'halfTrunc', expectValue: '0.3' },
    { roundingMode: 'trunc', expectValue: '0.3' }
  ],
  '0.4': [
    { roundingMode: 'ceil', expectValue: '0.4' },
    { roundingMode: 'expand', expectValue: '0.4' },
    { roundingMode: 'floor', expectValue: '0.4' },
    { roundingMode: 'halfCeil', expectValue: '0.4' },
    { roundingMode: 'halfEven', expectValue: '0.4' },
    { roundingMode: 'halfFloor', expectValue: '0.4' },
    { roundingMode: 'halfTrunc', expectValue: '0.4' },
    { roundingMode: 'trunc', expectValue: '0.4' }
  ],
  '0.5': [
    { roundingMode: 'ceil', expectValue: '0.5' },
    { roundingMode: 'expand', expectValue: '0.5' },
    { roundingMode: 'floor', expectValue: '0.5' },
    { roundingMode: 'halfCeil', expectValue: '0.5' },
    { roundingMode: 'halfEven', expectValue: '0.5' },
    { roundingMode: 'halfFloor', expectValue: '0.5' },
    { roundingMode: 'halfTrunc', expectValue: '0.5' },
    { roundingMode: 'trunc', expectValue: '0.5' }
  ],
  '0.6': [
    { roundingMode: 'ceil', expectValue: '0.6' },
    { roundingMode: 'expand', expectValue: '0.6' },
    { roundingMode: 'floor', expectValue: '0.6' },
    { roundingMode: 'halfCeil', expectValue: '0.6' },
    { roundingMode: 'halfEven', expectValue: '0.6' },
    { roundingMode: 'halfFloor', expectValue: '0.6' },
    { roundingMode: 'halfTrunc', expectValue: '0.6' },
    { roundingMode: 'trunc', expectValue: '0.6' }
  ],
  '0.7': [
    { roundingMode: 'ceil', expectValue: '0.7' },
    { roundingMode: 'expand', expectValue: '0.7' },
    { roundingMode: 'floor', expectValue: '0.7' },
    { roundingMode: 'halfCeil', expectValue: '0.7' },
    { roundingMode: 'halfEven', expectValue: '0.7' },
    { roundingMode: 'halfFloor', expectValue: '0.7' },
    { roundingMode: 'halfTrunc', expectValue: '0.7' },
    { roundingMode: 'trunc', expectValue: '0.7' }
  ],
  '0.8': [
    { roundingMode: 'ceil', expectValue: '0.8' },
    { roundingMode: 'expand', expectValue: '0.8' },
    { roundingMode: 'floor', expectValue: '0.8' },
    { roundingMode: 'halfCeil', expectValue: '0.8' },
    { roundingMode: 'halfEven', expectValue: '0.8' },
    { roundingMode: 'halfFloor', expectValue: '0.8' },
    { roundingMode: 'halfTrunc', expectValue: '0.8' },
    { roundingMode: 'trunc', expectValue: '0.8' }
  ],
  '0.9': [
    { roundingMode: 'ceil', expectValue: '0.9' },
    { roundingMode: 'expand', expectValue: '0.9' },
    { roundingMode: 'floor', expectValue: '0.9' },
    { roundingMode: 'halfCeil', expectValue: '0.9' },
    { roundingMode: 'halfEven', expectValue: '0.9' },
    { roundingMode: 'halfFloor', expectValue: '0.9' },
    { roundingMode: 'halfTrunc', expectValue: '0.9' },
    { roundingMode: 'trunc', expectValue: '0.9' }
  ],
  '1.0': [
    { roundingMode: 'ceil', expectValue: '1' },
    { roundingMode: 'expand', expectValue: '1' },
    { roundingMode: 'floor', expectValue: '1' },
    { roundingMode: 'halfCeil', expectValue: '1' },
    { roundingMode: 'halfEven', expectValue: '1' },
    { roundingMode: 'halfFloor', expectValue: '1' },
    { roundingMode: 'halfTrunc', expectValue: '1' },
    { roundingMode: 'trunc', expectValue: '1' }
  ],
  '1.1': [
    { roundingMode: 'ceil', expectValue: '2' },
    { roundingMode: 'expand', expectValue: '2' },
    { roundingMode: 'floor', expectValue: '1' },
    { roundingMode: 'halfCeil', expectValue: '1' },
    { roundingMode: 'halfEven', expectValue: '1' },
    { roundingMode: 'halfFloor', expectValue: '1' },
    { roundingMode: 'halfTrunc', expectValue: '1' },
    { roundingMode: 'trunc', expectValue: '1' }
  ],
  '1.2': [
    { roundingMode: 'ceil', expectValue: '2' },
    { roundingMode: 'expand', expectValue: '2' },
    { roundingMode: 'floor', expectValue: '1' },
    { roundingMode: 'halfCeil', expectValue: '1' },
    { roundingMode: 'halfEven', expectValue: '1' },
    { roundingMode: 'halfFloor', expectValue: '1' },
    { roundingMode: 'halfTrunc', expectValue: '1' },
    { roundingMode: 'trunc', expectValue: '1' }
  ],
  '1.3': [
    { roundingMode: 'ceil', expectValue: '2' },
    { roundingMode: 'expand', expectValue: '2' },
    { roundingMode: 'floor', expectValue: '1' },
    { roundingMode: 'halfCeil', expectValue: '1' },
    { roundingMode: 'halfEven', expectValue: '1' },
    { roundingMode: 'halfFloor', expectValue: '1' },
    { roundingMode: 'halfTrunc', expectValue: '1' },
    { roundingMode: 'trunc', expectValue: '1' }
  ],
  '1.4': [
    { roundingMode: 'ceil', expectValue: '2' },
    { roundingMode: 'expand', expectValue: '2' },
    { roundingMode: 'floor', expectValue: '1' },
    { roundingMode: 'halfCeil', expectValue: '1' },
    { roundingMode: 'halfEven', expectValue: '1' },
    { roundingMode: 'halfFloor', expectValue: '1' },
    { roundingMode: 'halfTrunc', expectValue: '1' },
    { roundingMode: 'trunc', expectValue: '1' }
  ],
  '1.5': [
    { roundingMode: 'ceil', expectValue: '2' },
    { roundingMode: 'expand', expectValue: '2' },
    { roundingMode: 'floor', expectValue: '1' },
    { roundingMode: 'halfCeil', expectValue: '2' },
    { roundingMode: 'halfEven', expectValue: '2' },
    { roundingMode: 'halfFloor', expectValue: '1' },
    { roundingMode: 'halfTrunc', expectValue: '1' },
    { roundingMode: 'trunc', expectValue: '1' }
  ],
  '1.6': [
    { roundingMode: 'ceil', expectValue: '2' },
    { roundingMode: 'expand', expectValue: '2' },
    { roundingMode: 'floor', expectValue: '1' },
    { roundingMode: 'halfCeil', expectValue: '2' },
    { roundingMode: 'halfEven', expectValue: '2' },
    { roundingMode: 'halfFloor', expectValue: '2' },
    { roundingMode: 'halfTrunc', expectValue: '2' },
    { roundingMode: 'trunc', expectValue: '1' }
  ],
  '1.7': [
    { roundingMode: 'ceil', expectValue: '2' },
    { roundingMode: 'expand', expectValue: '2' },
    { roundingMode: 'floor', expectValue: '1' },
    { roundingMode: 'halfCeil', expectValue: '2' },
    { roundingMode: 'halfEven', expectValue: '2' },
    { roundingMode: 'halfFloor', expectValue: '2' },
    { roundingMode: 'halfTrunc', expectValue: '2' },
    { roundingMode: 'trunc', expectValue: '1' }
  ],
  '1.8': [
    { roundingMode: 'ceil', expectValue: '2' },
    { roundingMode: 'expand', expectValue: '2' },
    { roundingMode: 'floor', expectValue: '1' },
    { roundingMode: 'halfCeil', expectValue: '2' },
    { roundingMode: 'halfEven', expectValue: '2' },
    { roundingMode: 'halfFloor', expectValue: '2' },
    { roundingMode: 'halfTrunc', expectValue: '2' },
    { roundingMode: 'trunc', expectValue: '1' }
  ],
  '1.9': [
    { roundingMode: 'ceil', expectValue: '2' },
    { roundingMode: 'expand', expectValue: '2' },
    { roundingMode: 'floor', expectValue: '1' },
    { roundingMode: 'halfCeil', expectValue: '2' },
    { roundingMode: 'halfEven', expectValue: '2' },
    { roundingMode: 'halfFloor', expectValue: '2' },
    { roundingMode: 'halfTrunc', expectValue: '2' },
    { roundingMode: 'trunc', expectValue: '1' }
  ]
};

export default function () {
    test('formatNumber with roundingMode', () => {
        Object.keys(roundingModeExpect).map((key: string) => {
            const value: RoundingModeCase[] = roundingModeExpect[key];
            value.forEach((item: RoundingModeCase) => {
            const result = Intl.formatNumber({
                number: key,
                style: 'decimal',
                roundingMode: item.roundingMode,
                // 必须限制 maximumSignificantDigits，否则体现不出来差异
                maximumSignificantDigits: 1
            });
            expect(result).toBe(item.expectValue);
            });
        });
    });

    test('formatNumber with specific digits', () => {
        const min_integer_fraction = Intl.formatNumber({
            number: 4.33,
            style: 'decimal',
            minimumIntegerDigits: 3,
            minimumFractionDigits: 4,
        });

        expect(min_integer_fraction).toBe('004.3300');

        const max_fraction = Intl.formatNumber({
            number: 4.33145,
            style: 'decimal',
            maximumFractionDigits: 2,
        });

        expect(max_fraction).toBe('4.33');

        const min_sign_digits = Intl.formatNumber({
            number: 54.33145,
            style: 'decimal',
            minimumSignificantDigits: 10,
        });

        expect(min_sign_digits).toBe('54.33145000');

        const expects: string[]= ['54', '50'];
        [1, 2].forEach((item: number, index: number) => {
            const result = Intl.formatNumber({
                number: 54.33145,
                style: 'decimal',
                maximumSignificantDigits: item,
            });
            expect(result).toBe(expects[index]);
        });

        const max_sign_digits_5 = Intl.formatNumber({
            number: 54.33145,
            style: 'decimal',
            maximumSignificantDigits: 5,
        });
        expect(max_sign_digits_5).toBe('54.331');
    });

    test('formatNumber style currency', () => {
        const expects: string[] = ['HK$123,321,000.00', '$123,321,000.00', 'HKD 123,321,000.00', '123,321,000.00 港元'];
        [ 'symbol', 'narrowSymbol', 'code', 'name' ].forEach((currencyStyle: string, index: number) => {
            const result = Intl.formatNumber({
                number: 123321000,
                style: 'currency',
                currencyStyle,
                currencyCode: 'HKD'
            });
            expect(result).toBe(expects[index]);
        });
    });

    test('formatNumber currency with accounting style', () => {
        const result = Intl.formatNumber({
            number: -123321000,
            style: 'currency',
            accounting: true,
        });
        expect(result).toBe('(HK$123,321,000.00)');
    });

    test('formatNumber style unit', () => {
        /**
         * 下面是目前js支持的单位和在Chrome上跑出来的结果
         */
        const unitCodes: string[] = [
            'acre', 
            'bit', 
            'byte', 
            'celsius', 
            'centimeter', 
            'day', 
            'degree', 
            'fahrenheit', 
            'fluid-ounce', 
            'foot', 
            'gallon', 
            'gigabit', 
            'gigabyte', 
            'gram', 
            'hectare', 
            'hour', 
            'inch', 
            'kilobit', 
            'kilobyte', 
            'kilogram', 
            'kilometer', 
            'liter', 
            'megabit', 
            'megabyte', 
            'meter', 
            'mile', 
            'mile-scandinavian', 
            'milliliter', 
            'millimeter', 
            'millisecond', 
            'minute', 
            'month', 
            'ounce', 
            'percent', 
            'petabyte', 
            'pound', 
            'second', 
            'stone', 
            'terabit', 
            'terabyte', 
            'week', 
            'yard', 
            'year'
        ];

        const shortExpects: string[] = [
            '123,321,000 英畝', 
            '123,321,000 bit', 
            '123,321,000 byte', 
            '123,321,000°C', 
            '123,321,000 厘米', 
            '123,321,000 日', 
            '123,321,000 度', 
            '123,321,000°F', 
            '123,321,000 液安士', 
            '123,321,000 呎', 
            '123,321,000 加侖', 
            '123,321,000 Gb', 
            '123,321,000 GB', 
            '123,321,000 克', 
            '123,321,000 公頃', 
            '123,321,000 小時', 
            '123,321,000 吋', 
            '123,321,000 kb', 
            '123,321,000 kB', 
            '123,321,000 公斤', 
            '123,321,000 公里', 
            '123,321,000 升', 
            '123,321,000 Mb', 
            '123,321,000 MB', 
            '123,321,000 米', 
            '123,321,000 哩', 
            '123,321,000 斯堪地那維亞英里', 
            '123,321,000 毫升', 
            '123,321,000 毫米', 
            '123,321,000 毫秒', 
            '123,321,000 分鐘', 
            '123,321,000 個月', 
            '123,321,000 安士', 
            '123,321,000%', 
            '123,321,000 PB', 
            '123,321,000 磅', 
            '123,321,000 秒', 
            '123,321,000 英石', 
            '123,321,000 Tb', 
            '123,321,000 TB', 
            '123,321,000 星期', 
            '123,321,000 碼', 
            '123,321,000 年'
        ];

        const longExpects: string[] = [
            '123,321,000 英畝', 
            '123,321,000 個位元', 
            '123,321,000 位元組', 
            '攝氏 123,321,000 度', 
            '123,321,000 厘米', 
            '123,321,000 日', 
            '123,321,000 度', 
            '華氏 123,321,000 度', 
            '123,321,000 液安士', 
            '123,321,000 呎', 
            '123,321,000 加侖', 
            '123,321,000 Gb', 
            '123,321,000 GB', 
            '123,321,000 克', 
            '123,321,000 公頃', 
            '123,321,000 小時', 
            '123,321,000 吋', 
            '123,321,000 kb', 
            '123,321,000 kB', 
            '123,321,000 公斤', 
            '123,321,000 公里', 
            '123,321,000 公升', 
            '123,321,000 Mb', 
            '123,321,000 MB', 
            '123,321,000 米', 
            '123,321,000 英里', 
            '123,321,000 斯堪地那維亞英里',
            '123,321,000 毫升', 
            '123,321,000 毫米', 
            '123,321,000 毫秒', 
            '123,321,000 分鐘', 
            '123,321,000 個月', 
            '123,321,000 安士', 
            '123,321,000%', 
            '123,321,000 PB', 
            '123,321,000 磅', 
            '123,321,000 秒', 
            '123,321,000 英石', 
            '123,321,000 Tb', 
            '123,321,000 TB', 
            '123,321,000 星期', 
            '123,321,000 碼', 
            '123,321,000 年'
        ];

        const narrowExpects: string[] = [
            '123,321,000英畝', 
            '123,321,000bit', 
            '123,321,000byte', 
            '123,321,000°C', 
            '123,321,000厘米', 
            '123,321,000日', 
            '123,321,000度', 
            '123,321,000°F', 
            '123,321,000fl-oz', 
            '123,321,000呎', 
            '123,321,000gal', 
            '123,321,000Gb', 
            '123,321,000GB', 
            '123,321,000克', 
            '123,321,000公頃', 
            '123,321,000小時', 
            '123,321,000吋', 
            '123,321,000kb', 
            '123,321,000kB', 
            '123,321,000 公斤', 
            '123,321,000公里', 
            '123,321,000升', 
            '123,321,000Mb', 
            '123,321,000MB', 
            '123,321,000米', 
            '123,321,000哩', 
            '123,321,000smi', 
            '123,321,000mL', 
            '123,321,000毫米', 
            '123,321,000毫秒', 
            '123,321,000分', 
            '123,321,000個月', 
            '123,321,000 安士', 
            '123,321,000%', 
            '123,321,000PB', 
            '123,321,000磅', 
            '123,321,000秒', 
            '123,321,000st', 
            '123,321,000Tb', 
            '123,321,000TB', 
            '123,321,000週', 
            '123,321,000碼', 
            '123,321,000年'
        ];

        unitCodes.map(item => {
            const uf = new Intl.NumberFormat('zh-HK', { style: 'unit', unit: item });
            return uf.format(123321000);
        });
        
        unitCodes.forEach((unitCode: string, index: number) => {
            const short = Intl.formatNumber({
                number: 123321000,
                style: 'unit',
                unitCode,
                unitStyle: 'short'
            });
            expect(short).toBe(shortExpects[index]);

            const long = Intl.formatNumber({
                number: 123321000,
                style: 'unit',
                unitCode,
                unitStyle: 'long'
            });
            expect(long).toBe(longExpects[index]);

            const narrow = Intl.formatNumber({
                number: 123321000,
                style: 'unit',
                unitCode,
                unitStyle: 'narrow'
            });
            expect(narrow).toBe(narrowExpects[index]);
        });
    });

    test('formatNumber style percent', () => {
        const result = Intl.formatNumber({
            number: 123321000,
            style: 'percent'
        });
        expect(result).toBe('12,332,100,000%');
    });
}
