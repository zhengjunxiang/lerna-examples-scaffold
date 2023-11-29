import { PrecisionNumberOptions } from './number';

export interface PluralOptions extends PrecisionNumberOptions {
    /**
     * 数字在上下文中代表的含义的类型
     * cardinal: 默认，此时数字在上下文中仅代表数量
     * ordinal: 此时数字在上下文中代表顺序
     */
    type: 'cardinal' | 'ordinal';
}

/**
 * 单复数规则
 */
export type PluralRule = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';

/**
 * 根据当前系统locale获取当前数字在当前locale中的单复数规则
 * @param options 
 * @returns 返回该数字代表的单复数规则
 */
export function getPluralRulesOfNumber(options: PluralOptions): PluralRule {
    const Intl = Mach.requireModule('Intl'); 
    return Intl.getPluralRulesOfNumber(options);
}
