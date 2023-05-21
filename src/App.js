import { useEffect, useState } from 'react';

import './App.css';

import LedGrid from './components/LedGrid';
import TOTP from './utils/TOTP';

const App = () => {
    const [time, setTime] = useState(Math.floor(Date.now() / 1000));
    const [totp, setTotp] = useState({
        hashInput: "",
        digest: "",
    });
    const secret = "MY_SECRET";
    const timeInterval = 5;
    const gridSize = {
        width: 16,
        height: 1,
    }

    const dataSize = gridSize.width * gridSize.height;

    const mlTrainingClassificationData = (digest) => (
        Array.from(digest.slice(0, dataSize))
            .map((hexChar) => parseInt(hexChar, 16) % 2 === 0 ? 1 : 0)
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(Math.floor(Date.now() / 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setTotp(TOTP(secret, time, timeInterval));
    }, [time]);

    return (
        <div className="App">
            <h1>LED Light Display</h1>
            <LedGrid width={gridSize.width} height={gridSize.height} entropy={totp.digest} />
            <div style={{ display: 'flex' }}>
                {mlTrainingClassificationData(totp.digest).map((e) => {
                    return (
                        <div className="LedGridContainerCharacter">
                            {e}
                        </div>
                    );
                })}
            </div>
            <p>Secret: {secret}</p>
            <p>Unix Time: {time}</p>
            <p>Unix Time // {timeInterval}: {Math.floor(time / timeInterval)}</p>
            <p>Hash Input: {totp.hashInput}</p>
            <p>Digest: {totp.digest}</p>
        </div>
    );
}

export default App;
