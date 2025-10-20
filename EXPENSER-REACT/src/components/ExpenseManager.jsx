import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [expense, setExpense] = useState({ title: "", category: "", amount: "", date: "", notes: "" });
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const baseUrl = "http://localhost:2030/expenseapi";

  useEffect(() => {
    fetchAllExpenses();
  }, []);

  const fetchAllExpenses = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setExpenses(res.data);
      setMessage("");
    } catch (err) {
      setMessage("Failed to fetch expenses");
      console.error(err);
    }
  };

  const handleChange = (e) => setExpense({ ...expense, [e.target.name]: e.target.value });

  const addExpense = async () => {
    try {
      if (editingId) {
        await axios.put(`${baseUrl}/edit/${editingId}`, expense);
        setMessage("Expense updated successfully!");
      } else {
        await axios.post(`${baseUrl}/add`, expense);
        setMessage("Expense added successfully!");
      }
      setExpense({ title: "", category: "", amount: "", date: "", notes: "" });
      setEditingId(null);
      fetchAllExpenses();
    } catch (err) {
      console.error(err);
      setMessage("Failed to save expense");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${baseUrl}/delete/${id}`);
      fetchAllExpenses();
      setMessage("Expense deleted successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete expense");
    }
  };

  const editExpense = (exp) => {
    setExpense({ title: exp.title, category: exp.category, amount: exp.amount, date: exp.date, notes: exp.notes });
    setEditingId(exp.id);
  };

  // ✅ NEW: Search Expenses
  const handleSearch = async (e) => {
    const keyword = e.target.value;
    setSearch(keyword);

    if (keyword.trim() === "") {
      fetchAllExpenses();
      return;
    }

    try {
      const res = await axios.get(`${baseUrl}/search?keyword=${keyword}`);
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Search failed");
    }
  };

  return (
    <div className="container">
      <h1>Expense Manager</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by title, category, or notes"
        value={search}
        onChange={handleSearch}
        className="search-bar"
      />

      <div className="form">
        <input type="text" name="title" placeholder="Title" value={expense.title} onChange={handleChange} />
        <input type="text" name="category" placeholder="Category" value={expense.category} onChange={handleChange} />
        <input type="number" name="amount" placeholder="Amount" value={expense.amount} onChange={handleChange} />
        <input type="date" name="date" value={expense.date} onChange={handleChange} />
        <input type="text" name="notes" placeholder="Notes" value={expense.notes} onChange={handleChange} />
        <button onClick={addExpense}>{editingId ? "Update Expense" : "Add Expense"}</button>
      </div>

      {message && <p className="message">{message}</p>}

      <h2>All Expenses</h2>
      <ul>
        {expenses.length > 0 ? (
          expenses.map((exp) => (
            <li key={exp.id}>
              <strong>{exp.title}</strong> :  {exp.amount}/-  ({exp.category}) on {exp.date}
              <button onClick={() => editExpense(exp)}>Edit</button>
              <button onClick={() => deleteExpense(exp.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No expenses found.</p>
        )}
      </ul>
    </div>
  );
};

export default ExpenseManager;
