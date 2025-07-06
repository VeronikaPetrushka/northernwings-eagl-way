import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, ScrollView, Animated } from 'react-native';
import wingsboard from '../Northernconst/wingsboard';
import { man, manEagle, manHi, manGood, eagles } from '../Northernconst/wingsassts';

const NorthernBRD = () => {
    const navigation = useNavigation();
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <View style={{ flex: 1 }}>
            
            {
                currentStep === 0 && (
                    <View>

                        <View>
                            <Image source={manEagle} />
                            <Image source={manHi} />
                        </View>

                    </View>
                )
            }

            {
                currentStep === 1 && (
                    <View>

                        <View>
                            <Image source={man} />
                        </View>

                    </View>
                )
            }

            {
                currentStep === 2 && (
                    <View>

                        <View>
                            <Image source={eagles} />
                            <Image source={manGood} />
                        </View>

                    </View>
                )
            }

            <View>
                <Text>{wingsboard[currentStep].title}</Text>
                <Text>{wingsboard[currentStep].text}</Text>

                <TouchableOpacity
                    onPress={() =>
                        currentStep < wingsboard.length - 1 ?
                            setCurrentStep(currentStep + 1)
                            : navigation.navigate('NorthernHM')
                    }
                >
                    <Text>{wingsboard[currentStep].btn}</Text>
                </TouchableOpacity>
            </View>


        </View>
    )

};

export default NorthernBRD;