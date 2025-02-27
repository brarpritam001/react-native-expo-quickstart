import { View, Text, Button } from 'react-native'
import React from 'react'
import { Tabs, router } from 'expo-router'
import { Feather, AntDesign } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function _layout() {
  return (
    <Tabs screenOptions={{ headerLeft: () => <DrawerToggleButton tintColor='#000' /> }}>
      <Tabs.Screen name='feed' options={{
        tabBarIcon: ({ color }) => (
          <Feather name="home" size={24} color={color} />
        ),
        tabBarLabel: 'Home',
        headerTitle: 'Home',
        // headerRight: () => <Button onPress={() => router.push('routerName' as any)} title='Add Post' /> show custome button/Logo
      }} />

      <Tabs.Screen name='setting' options={{
        tabBarIcon: ({ color }) => (
          <AntDesign name="setting" size={24} color={color} />
        ),
        tabBarLabel: 'Setting',
        headerTitle: 'Setting'
      }} />
      <Tabs.Screen name='profile' options={{
        tabBarIcon: ({ color }) => (
          <AntDesign name="user" size={24} color={color} />
        ),
        tabBarLabel: 'Profile',
        headerTitle: 'Profile'
      }} />
    </Tabs>
  )
}