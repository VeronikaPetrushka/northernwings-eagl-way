import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Share } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import wingsplaces from '../Northernconst/wingsplaces';
import { saveBtn, savedBtn, shareSmall, pinLocation, readBtn, backarr } from '../Northernconst/wingsassts';

const STORAGE_KEY = 'saved_places';

const MapSight = ({ place, setReadplace }) => {
    return (
        <View>
            <Image source={place.image} />
            <View>
                <Text>{place.namer}</Text>
                <View>
                    <Image source={pinLocation} />
                    <Text>{place.coordinates[0]}, {place.coordinates[1]}</Text>
                </View>
                <Text numberOfLines={2} ellipsizeMode='tail'>{place.description}</Text>
                <TouchableOpacity onPress={() => setReadplace(true)}>
                    <Image source={readBtn} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const NorthernMP = () => {
    const [selectedMapSight, setSelectedMapSight] = useState(null);
    const [isPlaceSaved, setIsPlaceSaved] = useState(false);
    const [readPlace, setReadplace] = useState(false);

    useEffect(() => {
        if (selectedMapSight) {
            checkIfSaved(selectedMapSight);
        }
    }, [selectedMapSight]);

    const checkIfSaved = async (place) => {
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
        if (!selectedMapSight) return;
        try {
            const saved = await AsyncStorage.getItem(STORAGE_KEY);
            let savedPlaces = saved ? JSON.parse(saved) : [];

            if (isPlaceSaved) {
                savedPlaces = savedPlaces.filter(p => p.title !== selectedMapSight.title);
            } else {
                savedPlaces.push(selectedMapSight);
            }

            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedPlaces));
            setIsPlaceSaved(!isPlaceSaved);
        } catch (err) {
            console.error('Error toggling saved place:', err);
        }
    };

    const sharePlace = async () => {
        if (!selectedMapSight) return;
        try {
            await Share.share({
                message: `Check out this place: ${selectedMapSight.title}\nCoordinates: ${selectedMapSight.coordinates[0]}, ${selectedMapSight.coordinates[1]}\nDescription: ${selectedMapSight.description}`,
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Text>MAP</Text>

            {readPlace ? (
                <View style={{width: '100%'}}>
                    <TouchableOpacity onPress={() => { setReadplace(false);  setSelectedMapSight(null) }}>
                        <Image source={backarr} />
                    </TouchableOpacity>
                    
                    <ScrollView style={{ width: '100%' }}>
                        <View>
                            <Image source={selectedMapSight.image} />
                            <View>
                                <Image source={pinLocation} />
                                <Text>{selectedMapSight.coordinates[0]}, {selectedMapSight.coordinates[1]}</Text>
                            </View>
                            <Text>DESCRIPTION</Text>
                            <Text>{selectedMapSight.description}</Text>

                            <View>
                                <TouchableOpacity onPress={sharePlace}>
                                    <Image source={shareSmall} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={toggleSavePlace}>
                                    <Image source={isPlaceSaved ? savedBtn : saveBtn} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 100 }} />
                    </ScrollView>
                </View>
            ) : (
                <MapboxGL.MapView style={{ flex: 1 }} styleURL={MapboxGL.StyleURL.Dark}>
                    <MapboxGL.Camera
                        zoomLevel={4.5}
                        centerCoordinate={[-106.3468, 56.1304]} // Centered on Canada
                    />
                    {wingsplaces.map((place, index) => (
                        place.coordinates && (
                            <MapboxGL.PointAnnotation
                                key={`marker-${index}`}
                                id={`marker-${index}`}
                                coordinate={place.coordinates}
                                onSelected={() =>
                                    selectedMapSight === place ? setSelectedMapSight(null) : setSelectedMapSight(place)
                                }
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
                    ))}
                    {selectedMapSight && (
                        <MapSight place={selectedMapSight} setReadplace={setReadplace} />
                    )}
                </MapboxGL.MapView>
            )}
        </View>
    );
};

export default NorthernMP;
