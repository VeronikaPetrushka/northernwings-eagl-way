import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { readBtn, pinLocation } from '../Northernconst/wingsassts';

const STORAGE_KEY = 'saved_places';

const NorthernSVD = () => {
    const navigation = useNavigation();
    const [savedPlaces, setSavedPlaces] = useState([]);

    useEffect(() => {
        loadSavedPlaces();
    }, []);

    const loadSavedPlaces = async () => {
        try {
            const saved = await AsyncStorage.getItem(STORAGE_KEY);
            const parsed = saved ? JSON.parse(saved) : [];
            setSavedPlaces(parsed);
        } catch (err) {
            console.error('Error loading saved places:', err);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Text>SAVED PLACES</Text>

            {savedPlaces.length > 0 ? (
                <ScrollView style={{ width: '100%' }}>
                    <Text>{'RECOMMENDED PLACES'.toUpperCase()}</Text>

                    {savedPlaces.map((place, idx) => (
                        <View key={idx}>
                            <Image source={place.image} />
                            <View>
                                <Text>{place.namer}</Text>
                                <View>
                                    <Image source={pinLocation} />
                                    <Text>{place.coordinates[0]}, {place.coordinates[1]}</Text>
                                </View>
                                <Text numberOfLines={2} ellipsizeMode='tail'>
                                    {place.description}
                                </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('NorthernRP', { place })}>
                                    <Image source={readBtn} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}

                    <View style={{ height: 200 }} />
                </ScrollView>
            ) : (
                <View style={{ padding: 20 }}>
                    <Text>No saved places</Text>
                </View>
            )}
        </View>
    );
};

export default NorthernSVD;