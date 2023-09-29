import { auth } from "./firebase";
import { getData } from "./helper";

export async function filterCategory(keyword, week = false) {
  try {
    const user = auth?.currentUser;

    if (!user) {
      throw new Error("User is not authenticated");
    }

    const data = await getData("expense", user.uid);

    const filteredItems = data.filter(
      (item) => item.category.toLowerCase() === keyword.toLowerCase()
    );
    let totalAmount;

    if (!week) {
      totalAmount = filteredItems.reduce((acc, expense) => {
        return acc + parseInt(expense.amount);
      }, 0);
    } else {
      const today = new Date()
      const lastWeek = today.getDate() - 7
      const oneWeekExpense = filteredItems.filter((item) => {
        const itemData = new Date(item.date)
        const itemDate = itemData.getDate()
        return (
          itemDate >= lastWeek
        )
      })
      totalAmount = oneWeekExpense.reduce((acc, expense) => {
        return acc + parseInt(expense.amount);
      }, 0);

    }

    return totalAmount;
    
  } catch (error) {
    console.error("Error in filterCategory:", error);
    return 0; // Return 0 in case of an error
  }
}

