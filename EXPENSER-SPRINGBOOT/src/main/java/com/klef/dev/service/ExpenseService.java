package com.klef.dev.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.klef.dev.entity.Expense;
import com.klef.dev.repository.ExpenseRepository;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Expense addExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public Expense updateExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public void deleteExpense(int id) {
        expenseRepository.deleteById(id);
    }

    public List<Expense> searchExpenses(String keyword) {
        return expenseRepository.searchExpenses(keyword);
    }
}
