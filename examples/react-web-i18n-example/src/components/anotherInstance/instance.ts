import { createInstance } from '@sailor/i18n-web';
import resources from '../../assets/newLocales/resources';
const i18nNew = createInstance();

i18nNew.init({
  defaultNS: 'waimai_home',
  ns: ['waimai_home'],
  resources,
});

export default i18nNew;
