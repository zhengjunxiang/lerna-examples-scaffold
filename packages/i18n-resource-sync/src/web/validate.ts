import { Namespace } from '../types';

function validateNamespace(namespaces: Namespace[]) {
    let names = [];
    for (const namespace of namespaces) {
        const name = namespace.name || 'translation';
        if (names.includes(name)) {
            throw new Error('配置文件错误：namespaces中多个空间name不能重复');
        }
        names.push(name);
    }
}

export { validateNamespace };
