import { View, Text, StyleSheet, Image, Pressable, Animated, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";

// Define types for navigation items
interface NavItem {
  icon: (color: string, size: number) => JSX.Element;
  label: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    icon: (color, size) => <AntDesign name="user" size={size} color={color} />,
    label: "My Profile",
    path: "/(drawer)/(tabs)/profile",
  },
  {
    icon: (color, size) => <AntDesign name="setting" size={size} color={color} />,
    label: "Setting",
    path: "/(drawer)/(tabs)/setting",
  },
  {
    icon: (color, size) => <Ionicons name="help" size={size} color={color} />,
    label: "Help",
    path: "/help", // This corresponds to the `app/help.tsx` screen
  },
  {
    icon: (color, size) => <MaterialIcons name="logout" size={size} color={color} />,
    label: "Logout",
    path: "/",
  },
];

// Define types for the custom drawer content props
interface CustomDrawerContentProps {
  [key: string]: any;
}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = (props) => {
  const pathname = usePathname();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.userInfoWrapper}>
          <Pressable style={styles.avatarContainer} onPress={() => router.push('/(drawer)/(tabs)/profile')}>
            <Image
              source={{
                uri: "pasted_image_url_here",
              }}
              style={styles.userImg}
            />
            <View style={styles.statusIndicator} />
          </Pressable>
          <TouchableOpacity style={styles.userDetailsWrapper} onPress={() => router.push('/(drawer)/(tabs)/profile')}>
            <Text style={styles.userName}>Preet</Text>
            <Text style={styles.userEmail}>brarpritam001@gmail.com</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {NAV_ITEMS.map((item, index) => {
          const isActive = pathname === item.path;

          const itemColor = item.label === "Logout" ? "#ef4444" : isActive ? "#fff" : "#666";

          return (
            <DrawerItem
              key={index}
              icon={({ size }) => item.icon(itemColor, size)}
              label={item.label}
              labelStyle={[styles.navItemLabel, { color: itemColor }]}
              style={[styles.navItem, { backgroundColor: isActive ? "#ccc" : "transparent" }]}
              onPress={() => router.push(item.path as any)}
            />
          );
        })}
      </Animated.View>
    </DrawerContentScrollView>
  );
};

const Layout: React.FC = () => {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#fff",
          width: 300,
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  navItem: {
    borderRadius: 12,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  navItemLabel: {
    marginLeft: 0,
    fontSize: 16,
    fontWeight: "500",
  },
  userInfoWrapper: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
  },
  userImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#2563eb",
  },
  statusIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#22c55e",
    borderWidth: 2,
    borderColor: "#fff",
  },
  userDetailsWrapper: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#6b7280",
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 12,
    marginHorizontal: 16,
  },
});

export default Layout;
