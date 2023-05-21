import { forwardRef } from 'react';

import LedLight from './LedLight';

const isLightOn = (x) => parseInt(x, 16) % 2 === 0;

const LedGrid = forwardRef(({ width, height, entropy }, ref) => {
    const grid = Array(height)
        .fill()
        .map(() => Array(width).fill(null));

    return (
        <div className="LedGridContainer" ref={ref}>
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
        </div>
    );
});

export default LedGrid;
