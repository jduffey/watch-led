import LedLight from './LedLight';

const isLightOn = (a, b) => (a + b) % 2 === 0;

const LedGrid = ({ width, height, entropy }) => {
    const grid = Array(height)
        .fill()
        .map(() => Array(width).fill(null));

    return (
        <div>
            <p>Entropy: {entropy}</p>
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex' }}>
                    {row.map((_, colIndex) => (
                        <LedLight
                            key={colIndex}
                            isOn={isLightOn(rowIndex, colIndex)}
                        />
                    ))}
                </div>
            ))}
            <br />
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex' }}>
                    {row.map((_, colIndex) => {
                        const ledIndex = rowIndex * width + colIndex;
                        return "TODO";
                        return `<${ledIndex}>`;
                    })}
                </div>
            ))}
        </div>
    );
};

export default LedGrid;
