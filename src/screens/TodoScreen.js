import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { THEME } from "../theme";

export const TodoScreen = ({ goBack, todo }) => {
  return (
    <View>
      <Text>{todo.title}</Text>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="Back" onPress={goBack} color={THEME.GREY_COLOR} />
        </View>
        <View style={styles.button}>
          <Button
            title="Delete"
            color={THEME.DANGER_COLO}
            onPress={() => console.log("To remove")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: "40%",
  },
});
