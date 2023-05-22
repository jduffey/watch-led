import { useEffect, useState, useRef } from 'react';

import './App.css';

import LedGrid from './components/LedGrid';
import TOTP from './utils/TOTP';

import html2canvas from 'html2canvas';

const currentUnixSecond = () => Math.floor(Date.now() / 1000);

const App = () => {
    const [time, setTime] = useState(currentUnixSecond());
    const [totp, setTotp] = useState({
        hashInput: "",
        digest: "",
    });

    const gridRef = useRef();

    const secret = "MY_SECRET";
    const timeIntervalSeconds = 5;
    const gridSize = {
        width: 4,
        height: 4,
    }

    const dataSize = gridSize.width * gridSize.height;

    const generateImage = async () => {
        const canvas = await html2canvas(gridRef.current, { useCORS: true });
        const image = canvas.toDataURL().replace(/^data:image\/\w+;base64,/, "");
        const unixTimestamp = currentUnixSecond();

        // Send the image data to the server
        fetch('http://localhost:3001/save-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image, unixTimestamp })
        })
            .then(response => response.text())
            .then(data => console.log(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const mlTrainingClassificationData = (digest) => (
        Array.from(digest.slice(0, dataSize))
            .map((hexChar) => parseInt(hexChar, 16) % 2 === 0 ? 1 : 0)
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(currentUnixSecond());
        }, timeIntervalSeconds * 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setTotp(TOTP(secret, time, timeIntervalSeconds));
    }, [time]);

    useEffect(() => {
        if (gridRef.current && totp.digest) {
            generateImage();
        }
    }, [gridRef, totp.digest]);

    return (
        <div className="App">
            <h1>LED Light Display</h1>
            <LedGrid ref={gridRef} width={gridSize.width} height={gridSize.height} entropy={totp.digest} />
            <div style={{ display: 'flex' }}>
                {mlTrainingClassificationData(totp.digest).map((e, i) => {
                    return (
                        <div key={i} className="LedGridContainerCharacter">
                            {e}
                        </div>
                    );
                })}
            </div>
            <p>Secret: {secret}</p>
            <p>Unix Time: {time}</p>
            <p>Unix Time // {timeIntervalSeconds}: {Math.floor(time / timeIntervalSeconds)}</p>
            <p>Hash Input: {totp.hashInput}</p>
            <p>Digest: {totp.digest}</p>
        </div>
    );
}

export default App;
