import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useNorthernWingsNavigationTracker from './Wingsnvgahandler.js';
import { RootStackParamList } from '../Northernconst/types.js';
import wingsnvgt from './wingsnvgt.js';

type WingItem = {
  wing: keyof RootStackParamList;
  img: any;
};

const Wingsnvgt: React.FC = () => {
    const { activeRoute, navigateTo } = useNorthernWingsNavigationTracker();

    return (
        <View>
            {
                (Array.isArray(wingsnvgt) ? wingsnvgt : []).map((wing: WingItem, idx: number) => (
                <TouchableOpacity
                    key={idx}
                    onPress={() => navigateTo(wing.wing)}
                >
                    {activeRoute === wing.wing && (
                        <LinearGradient
                            colors={['#FFFFFF', '#C69DFF']}
                        />
                    )}
                    <Image source={wing.img} resizeMode="contain" />
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default Wingsnvgt;
