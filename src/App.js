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
            <LedGrid width={4} height={4} entropy={totp.digest} />
            <p>Secret: {secret}</p>
            <p>Unix Time: {time}</p>
            <p>Unix Time // {timeInterval}: {Math.floor(time / timeInterval)}</p>
            <p>Hash Input: {totp.hashInput}</p>
            <p>Digest: {totp.digest}</p>
        </div>
    );
}

export default App;
