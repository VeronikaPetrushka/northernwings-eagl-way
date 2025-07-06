import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { info, logo, manHi, openAllBtn, pinLocation, readBtn } from '../Northernconst/wingsassts';
import wingsplaces from '../Northernconst/wingsplaces';

const NorthernHM = () => {
    const navigation = useNavigation();
    const [openAll, setOpenAll] = useState(false);

    return (
        <View style={{ flex: 1 }}>
            
            {
                openAll ? (
                    <ScrollView style={{ width: '100%' }}>

                        <Text>{'RECOMMENDED PLACES'.toUpperCase()}</Text>

                        {
                            wingsplaces.map((place, idx) => (
                                <View
                                    key={idx}
                                >
                                    <Image source={place.image} />
                                    <View>
                                        <Text>{place.namer}</Text>
                                        <View>
                                            <Image source={pinLocation} />
                                            <Text>{place.coordinates[0]}, {place.coordinates[1]}</Text>
                                        </View>
                                        <Text
                                            numberOfLines={2}
                                            ellipsizeMode='tail'
                                        >
                                            {place.description}
                                        </Text>
                                        <TouchableOpacity onPress={() => navigation.navigate('NorthernRP', {place})}>
                                            <Image source={readBtn} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        }

                    </ScrollView>
                ) : (
                        <ScrollView style={{ width: '100%' }}>

                            <View>
                                <Image source={logo} />

                                <TouchableOpacity onPress={() => navigation.navigate('Northerninformation')}>
                                    <Image source={info} />
                                </TouchableOpacity>
                            </View>

                            <View>
                                <Image source={manHi} />
                                <View>
                                    <Text>Hello! Ready to get started?</Text>
                                    <Text>Browse the recommended places below and learn about the highlights, for an evening stroll or a trip</Text>
                                </View>
                            </View>

                            <Text>{'RECOMMENDED PLACES'.toUpperCase()}</Text>

                            <View>
                                <Image source={wingsplaces[0].image} />
                                <View>
                                    <Text>{wingsplaces[0].namer}</Text>
                                    <View>
                                        <Image source={pinLocation} />
                                        <Text>{wingsplaces[0].coordinates[0]}, {wingsplaces[0].coordinates[1]}</Text>
                                    </View>
                                    <Text
                                        numberOfLines={2}
                                        ellipsizeMode='tail'
                                    >
                                        {wingsplaces[0].description}
                                    </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('NorthernRP', {place})}>
                                        <Image source={readBtn} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity onPress={() => setOpenAll(true)}>
                                <Image source={openAllBtn} />
                            </TouchableOpacity>
                            
                            <View style={{height: 200}} />
                        </ScrollView>
                )
            }

        </View>
    )

};

export default NorthernHM;