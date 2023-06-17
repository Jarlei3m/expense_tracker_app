import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";

function ManageExpense({ route, navigation }) {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    route?.params?.expenseId ? setIsEditing(true) : setIsEditing(false);
  }, [route?.params?.expenseId]);

  navigation.setOptions({
    title: isEditing ? "Editing Expense" : "Adding Expense",
  });
  const deleteExpenseHandlerFunction = () => {
    console.log("delete button pressed");
  };

  return (
    <View style={styles.container}>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandlerFunction}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
