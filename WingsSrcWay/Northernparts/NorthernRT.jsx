import React, { useState, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, ScrollView, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addBtn, calendar, deleteBtn, movement, openBtn, shareBtn, wherearr } from '../Northernconst/wingsassts';

const NorthernRT = () => {
    const navigation = useNavigation();
    const [newRoutes, setNewRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [openSelectedRoute, setOpenSelectedRoute] = useState(false);

    useFocusEffect(
        useCallback(() => {
            loadRoutes();
        }, [])
    );

    const loadRoutes = async () => {
        try {
            const stored = await AsyncStorage.getItem(ROUTES_KEY);
            const parsed = stored ? JSON.parse(stored) : [];
            setNewRoutes(parsed);
        } catch (err) {
            console.error('Failed to load routes:', err);
        }
    };

    const handleShare = async (route) => {
        try {
            await Share.share({
                message: `Planned route:\n${route.name}\nDate: ${route.date}\nDescription: ${route.description}`,
            });
        } catch (error) {
            console.error('Share error:', error);
        }
    };

    const handleDelete = (id) => {
        Alert.alert(
            'Delete Route',
            'Are you sure you want to delete this route?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const updatedRoutes = newRoutes.filter(r => r.id !== id);
                            await AsyncStorage.setItem(ROUTES_KEY, JSON.stringify(updatedRoutes));
                            setNewRoutes(updatedRoutes);
                            if (selectedRoute === id) setSelectedRoute(null);
                        } catch (err) {
                            console.error('Failed to delete route:', err);
                        }
                    },
                },
            ]
        );
    };

    const toggleSelectedRoute = (id) => {
        setSelectedRoute(prev => (prev === id ? null : id));
    };

    return (
        <View style={{ flex: 1 }}>
            
            <View>
                <Text>ROUTES</Text>

                <TouchableOpacity onPress={() => navigation.navigate('NorthernADDRT')}>
                    <Image source={addBtn} />
                </TouchableOpacity>
            </View>

            {
                newRoutes.length > 0 ? (
                    <ScrollView style={{width: '100%'}}>
                        <Text>My routes</Text>

                        {
                            newRoutes.map((route, idx) => (
                                <View key={idx}>
                                    <View>
                                        {
                                            (openSelectedRoute && selectedRoute === route.id) && (
                                                <View>
                                                    <Text>Start date of movement:</Text>
                                                    <View>
                                                        <Image source={calendar} />
                                                        <Text>{route.dateTime}</Text>
                                                    </View>

                                                    <Text>Start of movement</Text>
                                                    <View>
                                                        <Image source={movement} />
                                                        <Text>{route.move}</Text>
                                                    </View>

                                                    <Text>Where are we going?</Text>
                                                    <View>
                                                        <Image source={wherearr} />
                                                        <Text>{route.where}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }
                                        <View>
                                            <Image source={movement} />
                                            <Text>{route.route}</Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity onPress={() => toggleSelectedRoute(route.id)}>
                                                <Image source={openBtn} />
                                            </TouchableOpacity>
                                            <Text>{route.date}</Text>
                                        </View>
                                    </View>
                                    {
                                        (openSelectedRoute && selectedRoute === route.id) && (
                                            <View>
                                                <TouchableOpacity onPress={handleShare}>
                                                    <Image source={shareBtn} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={handleDelete}>
                                                    <Image source={deleteBtn} />
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }
                                </View>
                            ))
                        }
                        
                        <View style={{height: 200}} />
                    </ScrollView>
                ) : (
                        <Text>No planned routes</Text>
                )
            }

        </View>
    )

};

export default NorthernRT;