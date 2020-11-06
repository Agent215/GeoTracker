import React from 'react';
import Toast from 'react-native-easy-toast';

import Colors from '../constants/Colors';

const CustomToast = React.forwardRef((props, ref) => {
    return (
        <Toast
        ref={ref}
        style={{ backgroundColor: "white", borderRadius: 5 ,zIndex: 1000, width: 200 }}
        position='top'
        positionValue={300}
        fadeInDuration={750}
        fadeOutDuration={1000}
        textStyle={{color:'black'}}
        
    />
    )
})

export default CustomToast;