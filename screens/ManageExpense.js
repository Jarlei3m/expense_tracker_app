import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense.js/ExpenseForm";
import { storeExpense } from "../utils/http";

function ManageExpense({ route, navigation }) {
  const { deleteExpense, updateExpense, addExpense, expenses } =
    useContext(ExpensesContext);

  const [isEditing, setIsEditing] = useState(false);

  const selectedExpense = expenses.find(
    (expense) => expense.id === route?.params?.expenseId
  );

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
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    if (isEditing) {
      updateExpense(expenseData);
    } else {
      const id = await storeExpense(expenseData);
      addExpense({ ...expenseData, id: id });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />

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
