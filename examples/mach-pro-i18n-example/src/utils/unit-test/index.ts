/**
 * Fake Unit Test Jest style
 */

const logPrefix = '[test]:';
class Expect<T = any> {
    private _originValue?: T;

    constructor(value: T) {
        this._originValue = value;
    }

    set originValue(value: T){
        this._originValue = value;
    }
    
    toBe(value: T) {
        if (value === this._originValue) {
            console.log(`${logPrefix} ${this._originValue} toBe ${value} test passed ✅`);
            return true;
        }

        throw new Error(`${this._originValue} is NOT equal to ${value}`);
    }

    toMatch(regexp: RegExp) {
        return regexp.test(`${this._originValue}`);
    }
}

export function expect(value: any){
    const o = new Expect(value);
    return o;
} 

export function test(name: string, fn: Function, timeout: number = 0) {
    if (fn) {
        try {
            fn();
            console.log(`${logPrefix} ${name} passed ✅`);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(`${logPrefix} ${name} failed ❌ with Error: ${error.message}`);
            }
        }
        
    }
}