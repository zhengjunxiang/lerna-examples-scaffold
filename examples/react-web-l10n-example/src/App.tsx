import * as React from 'react';
import './index.css';

class App extends React.Component {

    constructor(props: any) {
        super(props);
    }

    componentDidMount(): void {
    }

    render() {

        return (
            <div className='app'>
                <p className='text'>test</p>
            </div>
        );
    }
}

export default App;