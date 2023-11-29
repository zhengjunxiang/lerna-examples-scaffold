import * as React from 'react';
import { FlatList } from '@wmfe/mach-pro-components-react';
import './index.css';

interface IState {
    count: number;
}

class App extends React.Component<any, IState> {
    listRef?: FlatList;

    constructor(props: any) {
        super(props);
        this.state = {
            count: 0,
        };
    }

    render() {
        const { count } = this.state;

        return (
            <view className="app">
                <text content={`xxxxxxxxxx ${this.state.count}`} />
                {/* <image 
                    style={{
                        width: 300,
                        height: 800,
                    }}
                    src='https://s3plus.meituan.net/v1/mss_28af88a282204bf6a754a48cbfabcb15/waimai-ad-fe-react/prod/weight/bg-n_p_w_d_2.png'/> */}
            </view>
        );
    }
}

export default App;