interface IInstance {
  init: (parmas: {
    systemRegion: string,
    systemLocale: string,
    systemTimeZone: string,
    appToken: string | number
    isDev?: boolean
  }, cb: (result: Record<string, any> | null, errorInfo?: {
    message: string,
    error: any
  }) => void) => void

  exportLocalInfo: () => Record<string, any>
  exportL10nInfo: () => Record<string, any>
};

export {
  IInstance
};