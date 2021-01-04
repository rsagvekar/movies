import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import NowPlaying from '../containers/NowPlaying/NowPlaying';
import TopRated from '../containers/TopRated/TopRated';
import ViewMovie from '../containers/movies/ViewMovie';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider } from 'react-redux'
import store from '../store/store/configureStore';
import Color from '../themes/Color';


const HomeStack = createStackNavigator();
const HomeStackScreen = ({ navigation }) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: Color.primary,
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
            fontSize: 18,
            fontFamily: 'Poppins-Medium',
        },
        headerShown: true,
        headerTitleAlign: 'center',
        gestureEnabled: false
    }}
    >
        <HomeStack.Screen name="Home" component={NowPlaying} options={{
            title: "Now-Playing",
        }} />
        <HomeStack.Screen name="Details" component={ViewMovie} options={{
            title: "Details",
            
        }} />
    </HomeStack.Navigator>
);

const TopRatedStack = createStackNavigator();
const TopStackScreen = ({ navigation }) => (
    <TopRatedStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: Color.primary,
        },
        headerTintColor: '#FFFFFF',
        headerTitleAlign: 'center',
        headerTitleStyle: {
            fontSize: 18,
            fontFamily: 'Poppins-Medium',
        },
        headerShown: true,
        gestureEnabled: false
    }}
    >
        <TopRatedStack.Screen name="TopRated" component={TopRated} options={{
            title: "Top Rated",
        }} />
    </TopRatedStack.Navigator>
);

const Tab = createMaterialBottomTabNavigator();
const MainTabScreen = () => (
    <Provider store={store}>
            <Tab.Navigator
                initialRouteName="Home"
                shifting={true}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeStackScreen}
                    options={{
                        tabBarLabel: 'Now Playing',
                        tabBarColor: 'red',
                        tabBarIcon: ({ color }) => (
                            <Icon name='movie-open' size={25} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="TopRated"
                    component={TopStackScreen}
                    options={{
                        tabBarLabel: 'Top Rated',
                        tabBarColor: '#f58313',
                        tabBarIcon: ({ color }) => (
                            <Icon name="star-outline" size={30} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
    </Provider>
);

export default MainTabScreen;