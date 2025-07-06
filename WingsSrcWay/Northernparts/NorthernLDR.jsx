import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import loaderHTML from '../Northernconst/wingsloader';

const NorthernLDR = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timeout = setTimeout(() => {
        navigation.navigate('NorthernBRD');
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <View style={{flex: 1}}>

            <WebView
                originWhitelist={['*']}
                source={{ html: loaderHTML }}
                style={{flex: 1}}
            />

        </View>
    );
};

export default NorthernLDR;