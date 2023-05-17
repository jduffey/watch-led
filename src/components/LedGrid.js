import LedLight from './LedLight';

const LedGrid = ({ grid }) => {
    return (
        <div>
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex' }}>
                    {row.map((isOn, lightIndex) => (
                        <LedLight key={lightIndex} isOn={isOn} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default LedGrid;
