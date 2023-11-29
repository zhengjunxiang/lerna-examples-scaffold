import * as React from 'react';
import {
  useTranslation,
  I18n,
  withTranslation,
  i18nClient,
} from '@sailor/i18n-mach-pro';
// import SailorComponent from '@ocean/ocean-i18ncomponent';
import SailorComponent from '../../components/index';
import HeaderView from '../../components/HeaderView';
import CardView from '../../components/CardView';
import './index.css';

const localeMapCurrencyCode: any = {
  'zh-CN': 'CNY',
  zh: 'CNY',
  'zh-HK': 'HKD',
  en: 'USD',
};

interface IState {
  count: number;
}
class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0,
    };
    const displayAmountFormat = I18n.getNumberFormat({
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number('24.1'));
    console.log('==== displayAmountFormat', displayAmountFormat);
  }

  add = (n: number) => {
    this.setState({
      count: this.state.count + n,
    });
  };

  render() {
    const { count } = this.state;
    const { t, i18n } = this.props;
    const locale = I18n.getCurrentLocale();
    const deicalNum = I18n.getNumberFormat().format(1234.567);
    const currency = I18n.getCurrencyFormat(
      localeMapCurrencyCode[locale.baseName] || 'HKD',
    ).format(1234.567);
    const now = Date.now();
    const dtf = I18n.getDateTimeFormat('long', 'long').format(now);

    return (
      <view className="app">
      
        <SailorComponent></SailorComponent>
        <text
          className="text"
          content={t('demo_key_apple', { pluralCount: count })}
        ></text>
        <view
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <view className="btn" onClick={() => this.add(-1)}>
            <text>-</text>
          </view>
          <view className="btn" onClick={() => this.add(1)}>
            <text>+</text>
          </view>
        </view>
        <text
          className="text-num"
          content={`${i18nClient.getText('number_format')} ${deicalNum}`}
        />
        <text
          className="text-num"
          content={`${t('currency_format')} ${currency}`}
        />
        <text className="text-num" content={`${t('datetime_format')} ${dtf}`} />
        {/* <scroller style={{
                        flexDirection: 'column',
                        width: Mach.env.screenWidth,
                    }}>
                    <content>
                        <HeaderView />
                        <CardView />
                    </content>
                </scroller> */}
      </view>
    );
  }
}

export default withTranslation()(App) as any;
// export default App;
