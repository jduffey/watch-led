import './App.css';

import LedLight from './components/LedLight';

const App = () => {
    return (
        <div className="App">
            <h1>LED Light Display</h1>
            <div>
                <LedLight isOn={true} />
                <LedLight isOn={false} />
            </div>
        </div>
    );
}

export default App;
