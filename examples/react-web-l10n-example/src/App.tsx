import * as React from 'react';
import l10n from '@sailor/l10n-web';
import './index.css';

class App extends React.Component {

    constructor(props: any) {
        super(props);
    }

    componentDidMount(): void {
        console.log('l10n', l10n);
    }

    render() {

        return (
            <div className='app'>
                <p className='text'>test121</p>
            </div>
        );
    }
}

export default App;