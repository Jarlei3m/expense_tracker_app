import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";

function ManageExpense({ route, navigation }) {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    route?.params?.expenseId ? setIsEditing(true) : setIsEditing(false);
  }, [route?.params?.expenseId]);

  navigation.setOptions({
    title: isEditing ? "Editing Expense" : "Adding Expense",
  });

  return <Text>Manage Expense screen</Text>;
}

export default ManageExpense;

const styles = StyleSheet.create({});
