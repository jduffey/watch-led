import './App.css';

import LedGrid from './components/LedGrid';

const App = () => {
    const grid = [
        [true, false, true, false],
        [false, true, false, true],
        [true, false, true, false],
        [false, true, false, true],
    ];

    return (
        <div className="App">
            <h1>LED Light Display</h1>
            <LedGrid grid={grid} />
        </div>
    );
}

export default App;
