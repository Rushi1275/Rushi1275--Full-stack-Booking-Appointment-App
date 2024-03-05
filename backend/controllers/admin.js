const { where } = require('sequelize');
const Expense = require('../models/expense');

exports.postAddExpense = async (req, res) => {
  const { description, amount } = req.body; 
  try {
    const expense = await Expense.create({ description, amount }); 
    res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEditExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const expense = await Expense.findByPk(id);
    res.status(200).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateExpense = async(req, res) => {
  const { description, amount } = req.body; 
  try {
    const id = req.params.id;
    let expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ err: 'Expense not found' });
    }

    // Update the expense fields
    expense.description = description;
    expense.amount = amount;

    // Save the changes to the database
    await expense.save();

    // Send the updated expense in the response
    res.status(200).json(expense);
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

exports.deleteExpense = async (req, res, next) => {
  try {
    const id = req.params.id;

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ err: 'Expense not found' });
    }

    await expense.destroy();

    res.status(204).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
