import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import {
    createBottomTabNavigator,
    BottomTabBar,
} from "@react-navigation/bottom-tabs";

import { Home, History, Analyze, Setting, NewTransaction } from "../screens";
import { COLORS, FONTS, icons } from "../constants";
import LinearGradient from "react-native-linear-gradient";

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ children, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                top: -18,
                justifyContent: "center",
                alignItems: "center",
                ...styles.shadow,
            }}
            onPress={onPress}
        >
            <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                style={{
                    width: 55,
                    height: 55,
                    borderRadius: 35,
                }}
            >
                {children}
            </LinearGradient>
        </TouchableOpacity>
    );
};

const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    backgroundColor: COLORS.white,
                    borderTopColor: "transparent",
                    height: 80,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Image
                                source={icons.home}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused
                                        ? COLORS.primary
                                        : COLORS.gray,
                                }}
                            />
                            <Text
                                style={{
                                    color: focused
                                        ? COLORS.primary
                                        : COLORS.gray,
                                    ...FONTS.body4,
                                }}
                            >
                                Home
                            </Text>
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name="History"
                component={History}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Image
                                source={icons.history}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused
                                        ? COLORS.primary
                                        : COLORS.gray,
                                }}
                            />
                            <Text
                                style={{
                                    color: focused
                                        ? COLORS.primary
                                        : COLORS.gray,
                                    ...FONTS.body4,
                                }}
                            >
                                History
                            </Text>
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name="NewTransaction"
                component={NewTransaction}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.add}
                            reizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: COLORS.white,
                            }}
                        />
                    ),
                    tabBarButton: (props) => <TabBarCustomButton {...props} />,
                }}
            />

            <Tab.Screen
                name="Analyze"
                component={Analyze}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Image
                                source={icons.pie_chart}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused
                                        ? COLORS.primary
                                        : COLORS.gray,
                                }}
                            />
                            <Text
                                style={{
                                    color: focused
                                        ? COLORS.primary
                                        : COLORS.gray,
                                    ...FONTS.body4,
                                }}
                            >
                                Analyze
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Setting"
                component={Setting}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Image
                                source={icons.setting}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused
                                        ? COLORS.primary
                                        : COLORS.gray,
                                }}
                            />
                            <Text
                                style={{
                                    color: focused
                                        ? COLORS.primary
                                        : COLORS.gray,
                                    ...FONTS.body4,
                                }}
                            >
                                Setting
                            </Text>
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    shadow: {
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
});

export default Tabs;
