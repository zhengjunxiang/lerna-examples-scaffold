import childProcess from 'child_process';

const talosEnv = process.env;

// 支持talos子项目类型
const enterProject = () => {
    try {
        if (!!talosEnv.projectRoot) {
            if (!!talosEnv.TALOS_SUBAPP_FLAG) {
                process.chdir(`${talosEnv.projectRoot}`);
                console.error('进入子项目 projectRoot 目录成功！');
            } else {
                process.chdir(`./${talosEnv.projectRoot}`);
                console.error('进入 projectRoot 目录成功！');
            }
        }
    } catch (err) {
        // console.error(`进入 projectRoot 目录失败！`);
    }
};

const runPlugin = async (pluginRunner) => {
    try {
        enterProject();
        await pluginRunner() || {};
    } catch (error) {
        console.log(error);
        console.log('【runPlugin】: ❌插件执行失败');
        process.exit(1);
    }
};

runPlugin(async () => {
    try {
        console.log('========= 开始拉取语言包 =========\n');
        const scripts = !!talosEnv.syncScript ? talosEnv.syncScript : 'sync';
        const i18nEnv = !!talosEnv.i18nEnv ? talosEnv.i18nEnv : 'prod';
        childProcess.execSync(`yarn run ${scripts} --env ${i18nEnv}`);
    } catch (error) {
        console.log('Error: 语言包拉取失败');
        console.log(error);
    }
});