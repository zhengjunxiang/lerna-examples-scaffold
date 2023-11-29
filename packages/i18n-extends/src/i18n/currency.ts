import { NumberFormat } from './number-format';

export interface CurrencySymbolOptions {
  locale?: string;
  currency: string;
  currencyDisplay?: 'narrowSymbol' | 'symbol' | 'code' | 'name';
}

export const SUPPORT_CURRENCY = {
  HKD: {
    shortSymbol: 'HK$', // 简短货币符号
    englishName: 'Hong Kong Dollar', // 货币英文名
    chineseName: '港元', // 货币中文名称
    ratio: 100, // 进制比率
    fractionPlaces: 2, // 计算和展示原始保留位数
  },
  USD: {
    shortSymbol: 'US$', // 简短货币符号
    englishName: 'US Dollar', // 货币英文名
    chineseName: '美元', // 货币中文名称
    ratio: 100, // 进制比率
    fractionPlaces: 2, // 计算和展示原始保留位数
  },
  CNY: {
    shortSymbol: '¥', // 简短货币符号
    englishName: 'Chinese Yuan', // 货币英文名
    chineseName: '人民币', // 货币中文名称
    ratio: 100, // 进制比率
    fractionPlaces: 2, // 计算和展示原始保留位数
  },
};

/**
 * 校验展示金额是否超过币种的精度要求
 * @param amount 货币数量
 * @param currencyCode 要校验的货币
 * @returns
 */
function checkAmountFraction(
  amount: number,
  currencyCode: keyof typeof SUPPORT_CURRENCY,
) {
  const currency = SUPPORT_CURRENCY[currencyCode];
  if (typeof amount !== 'number' || typeof currency === 'undefined') {
    return false;
  }
  const fractionPlaces = currency.fractionPlaces;
  const ratio = Math.pow(10, fractionPlaces);
  const formatVal = Math.round(amount * ratio) / ratio;
  return formatVal - amount === 0;
}

function getCurrencySymbol(options: CurrencySymbolOptions) {
  let { locale, currency, currencyDisplay = 'narrowSymbol' } = options;
  if (process.env.BUILD_TYPE === 'mach-pro') {
    if (!currency) {
      throw 'getCurrencySymbol error: currency is required';
    }
    // @ts-ignore
    const MachProIntl = Mach.requireModule('Intl');
    const formatZero = MachProIntl.formatNumber({
      number: 0,
      style: 'currency',
      currencyCode: currency,
      currencyStyle: currencyDisplay,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return `${formatZero}`.replace(/\d|\./g, '').trim();
  } else {
    if (!locale || !currency) {
      throw 'getCurrencySymbol error: locale and currency is required';
    }
    const nf = NumberFormat.getCurrencyFormat({
      currency,
      currencyDisplay,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return nf.format(0).replace(/\d|\./g, '').trim();
  }
}

export { checkAmountFraction, getCurrencySymbol };
