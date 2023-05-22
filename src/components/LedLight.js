const ledColor = {
    on: 'orange',
    off: '#EEE',
};

const LedLight = ({ isOn }) => {
    const lightStyle = {
        backgroundColor: isOn
            ? ledColor.on
            : ledColor.off,
    };

    return (
        <div className="LedLightComponent" style={lightStyle}></div>
    );
};

export default LedLight;
