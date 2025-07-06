import { useNavigation } from "@react-navigation/native";
import { useState, useCallback, useEffect } from "react";
import type { NavigationProp, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../Northernconst/types";

const useNorthernWingsNavigationTracker = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [activeRoute, setActiveRoute] = useState<keyof RootStackParamList>('NorthernHM');

    const navigateTo = useCallback(
        (routeName: keyof RootStackParamList) => {
        navigation.navigate(routeName);
        },
        [navigation]
    );

    useEffect(() => {
        const updateActiveRoute = () => {
        const state = navigation.getState();

        if (state && 'routes' in state && typeof state.index === 'number') {
            const currentRoute = state.routes[state.index] as RouteProp<RootStackParamList>;
            if (currentRoute?.name) {
            setActiveRoute(currentRoute.name);
            }
        }
        };

        updateActiveRoute();

        const unsubscribe = navigation.addListener('state', updateActiveRoute);
        return unsubscribe;
    }, [navigation]);

    return {
        activeRoute,
        navigateTo,
    };
};

export default useNorthernWingsNavigationTracker;
