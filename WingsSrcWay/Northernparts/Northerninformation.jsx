import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { backarr, logo } from '../Northernconst/wingsassts';

const Northerninformation = () => {
    const navigation = useNavigation();

    return (
        <View style={{flex: 1}}>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={backarr} />
            </TouchableOpacity>

            <Text>INFORMATION</Text>

            <Image source={logo} />

            <ScrollView style={{width: '100%'}}>

                <Text>NorthernWINGS is your personal travel guide to Canada. Discover unique places with accurate coordinates, detailed descriptions and photos. Save your favorite locations, create your own routes.</Text>
                <Text>The application works as an offline guide, so you will always have access to information - even without the Internet. We do not collect your personal data: everything you add is stored only on your device.</Text>

                <View style={{height: 200}} />
            </ScrollView>

        </View>
    )

};

export default Northerninformation;