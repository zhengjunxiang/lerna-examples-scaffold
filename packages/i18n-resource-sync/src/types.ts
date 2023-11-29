type buildType = 'web' | 'mach';
interface Options {
    type?: buildType;
    config?: string;
    clean?: boolean;
}
interface Namespace {
    name?: string;
    namespaceId: string;
    locale?: string;
    projectId: number;
    apiKey: string;
}
interface Script {
    open: boolean;
    globalName: string;
}
interface Config {
    appmock?: boolean;
    dest?: string;
    env?: string;
    filename?: string;
    namespaces: Namespace[];
    script?: Script;
}

interface Package {
    locale: string;
    version: string;
    resourceUrl: string;
}
interface NamespaceMap {
    importVar: string;
    i18nextNS: string;
}
interface CodeInfo {
    [locale: string]: NamespaceMap[];
}
export type {
    buildType,
    Namespace,
    CodeInfo,
    Config,
    Options,
    Package,
};
