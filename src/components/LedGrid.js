import LedLight from './LedLight';

const LedGrid = ({ width, height }) => {
    const grid = Array(height)
        .fill()
        .map(() => Array(width).fill(null));

    return (
        <div>
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex' }}>
                    {row.map((_, colIndex) => (
                        <LedLight key={colIndex} isOn={(rowIndex + colIndex) % 2 === 0 ? true : false} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default LedGrid;
