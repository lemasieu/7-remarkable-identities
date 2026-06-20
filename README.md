# 7-remarkable-identities 📝

An interactive quiz web application designed to help learn and practice the **7 Remarkable Algebraic Identities** in mathematics. The application features a minimalist, clean UI and is powered by an infinite, randomized question generator supporting both forward and backward directions.

🌐 **Live Demo:** [https://xn--msiu-goa8b.vn/github/7-remarkable-identities/](https://xn--msiu-goa8b.vn/github/7-remarkable-identities/)

---

## ✨ Key Features

- 🔀 **Dynamic Question Generation:** Automatically picks 1 out of the 7 algebraic identities and randomizes the variable placeholders (using characters from `a-z` and `0-9`) to provide fresh, non-repetitive math problems.
- 🔄 **Bi-directional Quizzing:** Supports both forward direction (expanding products/powers into polynomials) and backward direction (factoring polynomials back into simplified expressions).
- 🧩 **Smart Term Shuffling:** Polynomial terms and product factors are shuffled randomly. The system intelligently handles mathematical signs (`+` / `-`), auto-formatting the leading term cleanly (e.g., hiding an unnecessary leading `+` while preserving `-`).
- 🔢 **Standardized Notation:** Explicitly uses dot notation (`.` ) to denote multiplication between variables and grouped parentheses for clear mathematical readability.
- 📊 **Real-time Statistics:** Displays live tracker for correct answers over total questions answered, along with an accuracy percentage (`%`).
- 🎓 **Active Learning Workflow:** When an incorrect answer is selected, the correct choice is instantly highlighted in green alongside your red-marked wrong choice. The **"Next Question"** button remains active, ensuring a smooth, uninterrupted learning experience.

## 📁 Project Structure

The project is decoupled into 3 core files for better modularity, clean maintenance, and easy extensibility:
- `index.html`: Defines the layout structure (Quiz Card, scoreboard, question box, and options container).
- `style.css`: Powers the modern UI look, featuring smooth transition effects when hovering or selecting choices.
- `script.js`: Contains all algorithmic logic (Fisher-Yates shuffle), expression compilation, and scoring state management.

---

## 🚀 Installation & Local Usage

To run this project locally on your machine, no complex dependencies or package managers are required:

1. **Clone this repository:**
```bash
   git clone [https://github.com/lemasieu/7-remarkable-identities.git](https://github.com/lemasieu/7-remarkable-identities.git)
```
2. **Navigate into the project directory:**
```bash
   cd 7-remarkable-identities
```
3. **Launch the application**
Simply double-click the `index.html` file to open and run it instantly in any modern web browser.

## 🛠️ Deployment / Git Push Guide
If you want to initialize Git locally and push the source code to your GitHub repository `lemasieu/7-remarkable-identities`, execute the following commands in your terminal:
```bash
# Initialize local git repository
git init

# Stage all project files
git add .

# Create the initial commit
git commit -m "Initial commit: Complete 7 Remarkable Identities quiz app"

# Rename the default branch to main
git branch -M main

# Link to your remote GitHub repository
git remote add origin [https://github.com/lemasieu/7-remarkable-identities.git](https://github.com/lemasieu/7-remarkable-identities.git)

# Push the codebase to GitHub
git push -u origin main
```

## 📝 License
This project is licensed under the terms of the MIT License. You are completely free to use, modify, and distribute it.
Created by Gemini with my idea.
