import { icons } from "@/constants/images";
import { Tabs } from "expo-router";
import { ImageBackground, View } from "react-native";

const TabIcon = ({ focused, icon, title }: any) => {
  if(focused) {
  return(
  <ImageBackground
    source={images.home}
    className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 justify-center items-center rounded-full overflow-hidden"
  >
    <Image source={icons.home} />
    <Text className="text-secondary text-base font-semibold ml-2">{title}</Text>
  </ImageBackground>;
  )
}
  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <Image source={icon} tintColor="#A8B5DB"/>
    </View>
  )
};

const _layout = () => {
  return (
    <View>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center"
          },
          tabBarStyle: {
            backgroundColor: "#0f0D23",
            borderRadius:50,
            marginHorizontal: 20,
            marginBottom: 36,
            height: 52,
            position: "absolute",
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "0f0d23",
          }
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.home} title="Home" />
            ),
          }}
        />
        <Tabs.Screen
          name="Search"
          options={{
            title: "Search",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.search} title="Search" />
            ),
          }}
        />
        <Tabs.Screen
          name="saved"
          options={{
            title: "Saved",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.saved} title="Saved" />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.profile} title="Profile" />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};
export default _layout;
