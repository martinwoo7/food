import React, { useState, Component, useEffect } from "react";
import { StyleSheet, Alert, Switch, Button, Text, View, FlatList, RefreshControlBase, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import  Ionicons  from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ManualScreen from "./ManualScreen";
import SettingsScreen from "./Settings";
import RandomScreen from "./RandomScreen";
import ModalScreen from "./ModalScreen";

const LocationScreen = ({route, navigation}) => {
  const {data} = route.params
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> You clicked on location</Text>
      <Button onPress={() => navigation.goBack()} title='Dismiss' />
    </View>
  )
}

const TestScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Test Screen</Text>
    </View>
  )
}
const DetailsScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details</Text>
    </View>
  );
}

const ModalStack = createNativeStackNavigator();
const ModalStackScreen = () => {
  return (
    <ModalStack.Navigator >
      <ModalStack.Group>
        <ModalStack.Screen name='Home' component={HomeScreen} options={{ headerShown: true }}/>
      </ModalStack.Group>
      <ModalStack.Group>
        <ModalStack.Screen name='Location' component={LocationScreen} options={{ headerShown: false }}/>
      </ModalStack.Group>
      {/* <ModalStack.Group>
        <ModalStack.Screen name='Random' component={RandomScreen} options={{ headerShown: false }}/>
      </ModalStack.Group> */}
      <ModalStack.Group options={{ headerShown: true }}>
        <ModalStack.Screen name='Manual' component={ManualScreen} options={{ animation: "slide_from_right" }}/>
        <ModalStack.Screen name='Randomizer' component={RandomScreen} options={{ animation: "slide_from_right" }} />
        <ModalStack.Screen name="MyModal" component={ModalScreen} options={{ headerShown: false, presentation: "modal"}}/>
      </ModalStack.Group>
    </ModalStack.Navigator>
  );
}

const HomeScreen = ({ navigation }) => {

  const DATA = [
    {
      id: "manual",
      title: "Manual",
    },
    {
      id: "location",
      title: "Location",
    },
    {
      id: "random",
      title: "Random",
    },
  ]

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <Pressable 
      onPress={onPress} 
      style={{ 
        // paddingVertical: 10,
        overflow: 'hidden',
        height: 100,
        backgroundColor: backgroundColor, 
        marginVertical: 20, 
        // flex: 1, 
        flexDirection: "row", 
        alignItems: 'center', 
        justifyContent: 'space-evenly',
        borderBottomLeftRadius: 50,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
      }}
    >  
    
      <Text style={{ fontSize: 40, padding: 0, margin: 0}}>{item.title}</Text>
    </Pressable>

  )

  const renderItem = ({ item }) => {
    const backgroundColor = "lightgrey" 
    const color =  'white'
    var nav = null

    return (
      <Item 
        item={item}
        onPress={() => {
          if (item.id == "manual") {
            nav = "Manual"
          } else if (item.id == "location") {
            nav = "Location"
          } else if (item.id == "random") {
            nav = "Random"
          }
          navigation.navigate(nav, {
            data: FOODDATA,
          })
        }
        }
        backgroundColor={backgroundColor}
        textColor={{ color }}
      />
    )
  }

  return (
    <View style={{  flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, marginHorizontal: 20 }} >Welcome back!</Text>
      <Text style={{ fontSize: 15, marginHorizontal: 20 }} > What would you like to eat today?</Text>

      <FlatList 
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{width: '80%', marginTop: 30}}
      />

      <Button 
        onPress={clearAsyncStorage}
        title="Clear storage"
      />
    </View>
  );
}

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return JSON.parse(jsonValue)

  } catch(e) {
    console.log("Reading error", e)
  }
}

const storeData = async ( key, value ) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    console.log("Saving error", e)
  }
}


const clearAsyncStorage = async () => {
  AsyncStorage.clear()
  console.log("Storage Cleared")
}

var FOODDATA = []
const Tab = createBottomTabNavigator();
const App = () => {
  // Save data into database first
  const food = [
    "Fast Food", "Pizza", "Bubble Tea", "Desserts", "Sushi", "Burritos", "Chinese", "Indian",
    "Sandwich", "Pasta", "Korean", "Mexican", "Fish and Chips", "Tacos", "Breakfast/Brunch",
    "Juice", "BBQ", "Salad", "Vegetarian", "Vegan", "Lebanese", "Greek", "Thai", "Japanese",
    "Mediterranean", "Taiwanese", "Arabian", "Canadian", "Cambodian"
  ]
  const descript = ["food"]

  useEffect(() => {
    const initialize = async () => {
      if (await getData("food") == null) {
        console.log("No saved food info - creating now")
        var i=0
        food.forEach((item) => {
          FOODDATA.push(
            {
              id: `${item}-${i}`,
              name: item,
              details: descript[0],
            }
          )
          i++
        })
        storeData("food", FOODDATA)
      } else {
        console.log("Saved food data found - loading now")
        FOODDATA = await getData("food")
      }
    }
    
    initialize()
  }, [])

  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="Dashboard"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Dashboard') {
              iconName = focused ? 'information-circle' : 'information-circle-outline';
            } else if (route.name === 'Details') {
              iconName = focused ? 'list' : 'menu';
            } else if (route.name === 'Test') {
              iconName = focused ? 'heart-circle-outline' : 'heart-circle';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'grey',
          headerShown: false,
        })}
        // tabBarPosition='bottom'
        // headerShown={false}
      >
        <Tab.Screen 
          name="Test"
          component={TestScreen}
          options={({navigation}) => ({
            title: 'Testing',
          })}
          
        />
        <Tab.Screen 
          name="Dashboard"
          component={ModalStackScreen}
          options={({ navigation }) => ({
            title: 'Dashboard', 
          })}
        />
        <Tab.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={({ navigation }) => ({ 
            title: 'Details',
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
export default App;


