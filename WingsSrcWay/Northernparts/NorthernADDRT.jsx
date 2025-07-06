import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { backarr, calendar, createPlaceBtn, movement, savePlaceBtn, wherearr } from '../Northernconst/wingsassts';

const ROUTES_KEY = 'northern_routes';

const NorthernADDRT = () => {
    const navigation = useNavigation();
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(true);
    const [startMove, setStartMove] = useState('');
    const [whereGoing, setWhereGoing] = useState('');

    const formatDateTime = () => {
        const date = startDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

        const hours = startTime.getHours();
        const minutes = startTime.getMinutes();
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${date}, ${formattedHours}.${formattedMinutes} ${ampm}`;
    };

        const formatDate = () => {
            const date = startDate.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });

            return date;
        };


    const addNewPlannedPlace = async () => {
        const newRoute = {
            id: Date.now(),
            route: `${startMove} → ${whereGoing}`,
            move: startMove,
            where: whereGoing,
            date: formatDate(),
            dateTime: formatDateTime(),
        };

        try {
            const stored = await AsyncStorage.getItem(ROUTES_KEY);
            const existingRoutes = stored ? JSON.parse(stored) : [];
            const updatedRoutes = [...existingRoutes, newRoute];
            await AsyncStorage.setItem(ROUTES_KEY, JSON.stringify(updatedRoutes));
            navigation.goBack();
        } catch (err) {
            console.error('Failed to save route:', err);
        }
    };

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={backarr} />
            </TouchableOpacity>

            {showCalendar ? (
                <View>
                    <Text style={{ fontSize: 18, marginBottom: 12 }}>Select a start date</Text>

                    <Calendar
                        onDayPress={(day) => {
                            const selected = new Date(day.year, day.month - 1, day.day);
                            setStartDate(selected);
                        }}
                        markedDates={{
                            [startDate.toISOString().split('T')[0]]: {
                                selected: true,
                                selectedColor: '#00adf5',
                            },
                        }}
                    />

                    <View style={{ marginVertical: 20 }}>
                        <Text style={{ fontSize: 18, marginBottom: 8 }}>Select a start time</Text>
                        <DateTimePicker
                            value={startTime}
                            mode="time"
                            display="default"
                            onChange={(event, selectedTime) => {
                                if (selectedTime) setStartTime(selectedTime);
                            }}
                        />
                    </View>

                    <TouchableOpacity onPress={() => setShowCalendar(false)}>
                        <Image source={savePlaceBtn} />
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView style={{ width: '100%' }}>
                    <Text style={{ fontSize: 20, marginBottom: 16 }}>{showCalendar ? 'Start date of movement:' : 'CREATE ROUTE'}</Text>

                    <TouchableOpacity onPress={() => setShowCalendar(true)} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                        <Image source={calendar} />
                        <Text style={{ marginLeft: 8 }}>{formatDateTime()}</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                        <Image source={movement} />
                        <TextInput
                            value={startMove}
                            onChangeText={setStartMove}
                            placeholder="Start of movement"
                            placeholderTextColor="#666"
                            style={{ marginLeft: 8, flex: 1, borderBottomWidth: 1 }}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                        <Image source={wherearr} />
                        <TextInput
                            value={whereGoing}
                            onChangeText={setWhereGoing}
                            placeholder="Where are we going?"
                            placeholderTextColor="#666"
                            style={{ marginLeft: 8, flex: 1, borderBottomWidth: 1 }}
                        />
                    </View>

                    {(startMove && whereGoing) && (
                        <TouchableOpacity onPress={addNewPlannedPlace}>
                            <Image source={createPlaceBtn} />
                        </TouchableOpacity>
                    )}
                </ScrollView>
            )}
        </View>
    );
};

export default NorthernADDRT;