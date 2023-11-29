import * as React from 'react';
import { useTranslation, createInstance, I18nextProvider } from '@sailor/i18n-mach-pro';

const i18nClient = createInstance();
const resources = {
	en: {
		translation: {
			key_1: 'en npm包key_1',
		},
	},
	zh: {
		translation: {
			key_1: 'zh npm包key_1中文',
		},
	},
	'zh-HK': {
		translation: {
			key_1: 'zh-HK npm包key_1中文繁体',
		},
	},
};

i18nClient.init({
	fallbackLng: 'zh',
	resources,
	react: {
		useSuspense: false,
	},
});
const InnerComponent = () => {
	const { t } = useTranslation();
	return (
		<view>
			<text content="测试多实例问题"></text>
			<view>
				{/* @ts-ignore */}
				<text content={t('key_1', '默认值')}></text>
			</view>
		</view>
	);
};

const SailorComponent = () => (
	<I18nextProvider i18n={i18nClient}>
		<InnerComponent></InnerComponent>
	</I18nextProvider>
);

export default SailorComponent;
