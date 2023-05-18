import LedLight from './LedLight';

const isLightOn = (x) => parseInt(x, 16) % 2 === 0;

const LedGrid = ({ width, height, entropy }) => {
    console.log("LedGrid", width, height, entropy);

    const grid = Array(height)
        .fill()
        .map(() => Array(width).fill(null));

    return (
        <div className="LedGridContainer">
            <p>Entropy: {entropy}</p>
            {grid.map((row, rowIndex) => (
                <div
                    key={rowIndex}
                    style={{ display: 'flex' }}>
                    {row.map((_, colIndex) => {
                        const ledIndex = rowIndex * width + colIndex;
                        return (
                            <LedLight
                                key={colIndex}
                                isOn={isLightOn(entropy[ledIndex])}
                            />
                        )
                    })}
                </div>
            ))}
            <br />
            {grid.map((row, rowIndex) => (
                <div
                    className="LedGridContainerText"
                    key={rowIndex} style={{ display: 'flex' }}>
                    {row.map((_, colIndex) => {
                        const ledIndex = rowIndex * width + colIndex;
                        return entropy[ledIndex];
                    })}
                </div>
            ))}
        </div>
    );
};

export default LedGrid;
