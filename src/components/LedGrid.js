import LedLight from './LedLight';

const isLightOn = (a, b) => (a + b) % 2 === 0;

const LedGrid = ({ width, height }) => {
    const grid = Array(height)
        .fill()
        .map(() => Array(width).fill(null));

    return (
        <div>
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
        </div>
    );
};

export default LedGrid;
