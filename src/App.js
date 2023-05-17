import './App.css';

import LedGrid from './components/LedGrid';

const App = () => {
    return (
        <div className="App">
            <h1>LED Light Display</h1>
            <LedGrid width={4} height={4} />
        </div>
    );
}

export default App;
