import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, ScrollView, Animated, Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapboxGL from '@rnmapbox/maps';
import { backarr, openMapBtn, pinLocation, saveBtn, savedBtn, shareSmall } from '../Northernconst/wingsassts';

const NorthernRP = ({ place }) => {
    const navigation = useNavigation();
    const [openMap, setOpenMap] = useState(false);
    const [isPlaceSaved, setIsPlaceSaved] = useState(false);

    const STORAGE_KEY = 'saved_places';

    useEffect(() => {
        checkIfSaved();
    }, []);

    const checkIfSaved = async () => {
        try {
            const saved = await AsyncStorage.getItem(STORAGE_KEY);
            const savedPlaces = saved ? JSON.parse(saved) : [];
            const exists = savedPlaces.some(p => p.title === place.title);
            setIsPlaceSaved(exists);
        } catch (err) {
            console.error('Error checking saved place:', err);
        }
    };

    const toggleSavePlace = async () => {
        try {
            const saved = await AsyncStorage.getItem(STORAGE_KEY);
            let savedPlaces = saved ? JSON.parse(saved) : [];

            if (isPlaceSaved) {
                savedPlaces = savedPlaces.filter(p => p.title !== place.title);
            } else {
                savedPlaces.push(place);
            }

            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedPlaces));
            setIsPlaceSaved(!isPlaceSaved);
        } catch (err) {
            console.error('Error toggling saved place:', err);
        }
    };

    const sharePlace = async () => {
        try {
            await Share.share({
                message: `Check out this place: ${place.title}\nCoordinates: ${place.coordinates[0]}, ${place.coordinates[1]}\nDescription: ${place.description}`,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={backarr} />
            </TouchableOpacity>

            <Text>{openMap ? `${place.title} (map)` : `${place.title}`}</Text>

            {
                openMap ? (
                    <View style={{width: '100%', height: '60%', borderRadius: 22}}>
                        <MapboxGL.MapView
                            style={{ flex: 1 }}
                            styleURL={MapboxGL.StyleURL.Dark}
                        >
                            <MapboxGL.Camera
                                zoomLevel={12}
                                centerCoordinate={place.coordinates}
                            />

                           {
                                place.coordinates && (
                                    <MapboxGL.PointAnnotation
                                        key={`marker-0`}
                                        id={`marker-0`}
                                        coordinate={place.coordinates}
                                    >
                                        <View style={{
                                            borderColor: '#E934C4',
                                            borderWidth: 7,
                                            backgroundColor: '#fff',
                                            width: 30,
                                            height: 30,
                                            borderRadius: 100
                                        }} />
                                    </MapboxGL.PointAnnotation>
                                )
                            }
                        </MapboxGL.MapView>
                    </View>
                ) : (
                        <ScrollView style={{width: '100%'}}>

                            <View>
                                <Image source={place.image} />

                                <View>
                                    <Image source={pinLocation} />
                                    <Text>{place.coordinates[0]}, {place.coordinates[1]}</Text>
                                </View>

                                <Text>DESCRIPTION</Text>
                                <Text>{place.description}</Text>

                                <View>
                                    <TouchableOpacity onPress={() => setOpenMap(true)}>
                                        <Image source={openMapBtn} />
                                    </TouchableOpacity>
                                    <View style={{width: '48%'}}>
                                        <TouchableOpacity onPress={sharePlace}>
                                            <Image source={shareSmall} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={toggleSavePlace}>
                                            <Image source={ isPlaceSaved ? savedBtn : saveBtn} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            
                            <View style={{height: 100}} />
                        </ScrollView>
                )
            }     
            
        </View>
    )

};

export default NorthernRP;