package com.klef.dev.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.klef.dev.entity.Expense;
import com.klef.dev.service.ExpenseService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/expenseapi")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @GetMapping("/")
    public String expense() {
        return "EXPENSEMANAGER IS RUNNING";
    }

    @GetMapping("/all")
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    @PostMapping("/add")
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseService.addExpense(expense);
    }

    @PutMapping("/edit/{id}")
    public Expense editExpense(@PathVariable int id, @RequestBody Expense expense) {
        expense.setId(id);
        return expenseService.updateExpense(expense);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteExpense(@PathVariable int id) {
        expenseService.deleteExpense(id);
        return "Deleted";
    }

    // ✅ NEW SEARCH ENDPOINT
    @GetMapping("/search")
    public List<Expense> searchExpenses(@RequestParam("keyword") String keyword) {
        return expenseService.searchExpenses(keyword);
    }
}
