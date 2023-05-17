const LedLight = ({ isOn }) => {
    const lightStyle = {
        width: '20px',
        height: '20px',
        backgroundColor: isOn ? 'green' : 'red',
        margin: '1px',
    };

    return (
        <div style={lightStyle}></div>
    );
};

export default LedLight;
