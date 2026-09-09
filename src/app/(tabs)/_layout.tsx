import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import { View } from "react-native";

const _layout = () => {
  return (
    <View>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <>
                <ImageBackground
                  source={images.home}
                  style={{ width: 30, height: 30 }}
                />
              </>
            ),
          }}
        />
        <Tabs.Screen
          name="Search"
          options={{ title: "Search", headerShown: false }}
        />
        <Tabs.Screen
          name="saved"
          options={{ title: "Saved", headerShown: false }}
        />
        <Tabs.Screen
          name="profile"
          options={{ title: "Profile", headerShown: false }}
        />
      </Tabs>
    </View>
  );
};
export default _layout;
