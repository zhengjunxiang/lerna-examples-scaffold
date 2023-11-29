interface OpenAPIResponse<T> {
  code: number;
  message: string;
  data: T;
}

interface ConfigParams {
  clientType: string;
}

interface Locale {
  locale: string;
  localizedDisplayName: string;
}
interface OutLocale {
  value: string;
  label: string;
}
interface ConfigData {
  supportRegions: {
    [key: string]: {
      supportLocales: string[];
    };
  };
  supportLocales: Locale[];
}

interface LocalInfoParams {
  systemRegion: string;
  systemLocale: string;
  systemTimeZone: string;
}

interface LocalInfoData {
  region: string;
  currency: string;
  timeZone: string;
  locales?: OutLocale[];
}

interface Params {
  clientType: string;
  env?: 'prod' | 'test';
}
export {
  OpenAPIResponse,
  ConfigParams,
  ConfigData,
  LocalInfoParams,
  LocalInfoData,
  Params,
};
