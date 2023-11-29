import * as React from 'react';
import { withTranslation } from '@sailor/i18n-web';
import i18nClient from './i18n.config';
import './index.css';

// const localeMapCurrencyCode: any = {
//     'zh-CN': 'CNY',
//     'zh': 'CNY',
//     'zh-HK': 'HKD',
//     'en': 'USD',
// };

interface IState {
    count: number;
    language: string;
}

class App extends React.Component<any, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            count: 0,
            language: 'zh-CN',
        };
    }

    componentDidMount(): void {
        const { i18n } = this.props;
        this.setState({
            language: i18n.language,
        });
    }

    add = (n: number) => {
        this.setState({
            count: this.state.count + n
        });
    };

    onLanguageChange = (e: React.BaseSyntheticEvent) => {
        console.log(e.target.value);
        i18nClient.changeLanguage(e.target.value, (err, t) => {
            console.log('err = ', err);
            this.setState({
                language: e.target.value,
            });
        });
    };

    render() {
        const { count, language } = this.state;
        const { t } = this.props;

        return (
            <div className='app'>
                <p className='text'>{t('demo_currency')}</p>
                <div onChange={this.onLanguageChange}>
                    <label htmlFor="html">
                        <input 
                            checked={language === 'zh-CN'}
                            type="radio" 
                            name="fav_language" 
                            value="zh-CN" 
                        />简体中文
                    </label><br />
                     <label htmlFor="css">
                        <input 
                            checked={language === 'en-US'}
                            type="radio" 
                            name="fav_language" 
                            value="en-US" 
                        />English
                    </label><br />
                    <label htmlFor="css">
                        <input 
                            checked={language === 'zh-HK'}
                            type="radio" 
                            name="fav_language" 
                            value="zh-HK" 
                        />中文（繁体）（香港）
                    </label><br />
                </div>
                <p className='text'>{t('demo_key_request_server')}</p>
                <p className='text'>{`${t('demo_key_I_have')} ${t('demo_key_apple', { pluralCount: count })}`}</p>
                <div className='section-add'>
                    <div className="btn" onClick={() => this.add(-1)}><p>-</p></div>
                    <div className="btn" onClick={() => this.add(1)}><p>+</p></div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(App);