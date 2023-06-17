import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";

function ManageExpense({ route, navigation }) {
  const { deleteExpense, updateExpense, addExpense } =
    useContext(ExpensesContext);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Editing Expense" : "Adding Expense",
    });

    route?.params?.expenseId ? setIsEditing(true) : setIsEditing(false);
  }, [route?.params?.expenseId]);

  const deleteExpenseHandlerFunction = () => {
    deleteExpense(route.params.expenseId);
    navigation.goBack();
  };

  const cancelHandler = () => {
    console.log("cancel button pressed");
    navigation.goBack();
  };

  const confirmHandler = () => {
    isEditing ? updateExpense() : addExpense();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button
          style={styles.button}
          buttonType="outlined"
          onPress={cancelHandler}
        >
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>

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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
