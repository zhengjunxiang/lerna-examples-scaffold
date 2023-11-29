import { MachProI18N } from '@sailor/i18n-mach-pro-native';
import { Detector } from '../interface';

const MachProNative: Detector = {
    name: 'MachProNative',

    lookup(options: any): string | string[] | undefined {
        return MachProI18N.getCurrentLocaleInfo()?.locale;
    }
};

export default MachProNative;