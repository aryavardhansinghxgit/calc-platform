"use client";

import React, { useState } from "react";
import { Search, Utensils, Activity, PieChart, Sparkles, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";

export function CalorieTables() {
  const [foodSearch, setFoodSearch] = useState("");
  const [foodCategory, setFoodCategory] = useState("all");

  const foodsList = [
    // Fruits
    { category: "Fruit", name: "Apple", serving: "1 (4 oz.)", cals: 59, kj: 247 },
    { category: "Fruit", name: "Banana", serving: "1 (6 oz.)", cals: 151, kj: 632 },
    { category: "Fruit", name: "Grapes", serving: "1 cup", cals: 100, kj: 419 },
    { category: "Fruit", name: "Orange", serving: "1 (4 oz.)", cals: 53, kj: 222 },
    { category: "Fruit", name: "Pear", serving: "1 (5 oz.)", cals: 82, kj: 343 },
    { category: "Fruit", name: "Peach", serving: "1 (6 oz.)", cals: 67, kj: 281 },
    { category: "Fruit", name: "Pineapple", serving: "1 cup", cals: 82, kj: 343 },
    { category: "Fruit", name: "Strawberry", serving: "1 cup", cals: 53, kj: 222 },
    { category: "Fruit", name: "Watermelon", serving: "1 cup", cals: 50, kj: 209 },

    // Vegetables
    { category: "Vegetables", name: "Asparagus", serving: "1 cup", cals: 27, kj: 113 },
    { category: "Vegetables", name: "Broccoli", serving: "1 cup", cals: 45, kj: 188 },
    { category: "Vegetables", name: "Carrots", serving: "1 cup", cals: 50, kj: 209 },
    { category: "Vegetables", name: "Cucumber", serving: "4 oz.", cals: 17, kj: 71 },
    { category: "Vegetables", name: "Eggplant", serving: "1 cup", cals: 35, kj: 147 },
    { category: "Vegetables", name: "Lettuce", serving: "1 cup", cals: 5, kj: 21 },
    { category: "Vegetables", name: "Tomato", serving: "1 cup", cals: 22, kj: 92 },

    // Proteins
    { category: "Proteins", name: "Beef (regular, cooked)", serving: "2 oz.", cals: 142, kj: 595 },
    { category: "Proteins", name: "Chicken (cooked)", serving: "2 oz.", cals: 136, kj: 569 },
    { category: "Proteins", name: "Tofu", serving: "4 oz.", cals: 86, kj: 360 },
    { category: "Proteins", name: "Egg", serving: "1 large", cals: 78, kj: 327 },
    { category: "Proteins", name: "Fish / Catfish (cooked)", serving: "2 oz.", cals: 136, kj: 569 },
    { category: "Proteins", name: "Pork (cooked)", serving: "2 oz.", cals: 137, kj: 574 },
    { category: "Proteins", name: "Shrimp (cooked)", serving: "2 oz.", cals: 56, kj: 234 },

    // Common Meals & Snacks
    { category: "Snacks / Meals", name: "White Bread", serving: "1 slice (1 oz.)", cals: 75, kj: 314 },
    { category: "Snacks / Meals", name: "Butter", serving: "1 tablespoon", cals: 102, kj: 427 },
    { category: "Snacks / Meals", name: "Caesar Salad", serving: "3 cups", cals: 481, kj: 2014 },
    { category: "Snacks / Meals", name: "Cheeseburger", serving: "1 sandwich", cals: 285, kj: 1193 },
    { category: "Snacks / Meals", name: "Hamburger", serving: "1 sandwich", cals: 250, kj: 1047 },
    { category: "Snacks / Meals", name: "Dark Chocolate", serving: "1 oz.", cals: 155, kj: 649 },
    { category: "Snacks / Meals", name: "Pizza (cheese 14\")", serving: "1 slice", cals: 285, kj: 1193 },
    { category: "Snacks / Meals", name: "White Rice (cooked)", serving: "1 cup", cals: 206, kj: 862 },

    // Beverages & Dairy
    { category: "Beverages / Dairy", name: "Milk (Whole)", serving: "1 cup", cals: 146, kj: 611 },
    { category: "Beverages / Dairy", name: "Milk (2%)", serving: "1 cup", cals: 122, kj: 511 },
    { category: "Beverages / Dairy", name: "Milk (1%)", serving: "1 cup", cals: 102, kj: 427 },
    { category: "Beverages / Dairy", name: "Yogurt (low-fat)", serving: "1 cup", cals: 154, kj: 645 },
    { category: "Beverages / Dairy", name: "Orange Juice", serving: "1 cup", cals: 111, kj: 465 },
    { category: "Beverages / Dairy", name: "Coca-Cola Classic", serving: "1 can (12 oz)", cals: 150, kj: 628 },
    { category: "Beverages / Dairy", name: "Diet Coke", serving: "1 can (12 oz)", cals: 0, kj: 0 },
  ];

  const filteredFoods = foodsList.filter((f) => {
    const matchCat = foodCategory === "all" || f.category === foodCategory;
    const matchSearch = f.name.toLowerCase().includes(foodSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  const exerciseList = [
    { name: "Golf (using cart)", cals125: 198, cals155: 246, cals185: 294 },
    { name: "Walking (3.5 mph)", cals125: 215, cals155: 267, cals185: 319 },
    { name: "Kayaking", cals125: 283, cals155: 352, cals185: 420 },
    { name: "Softball / Baseball", cals125: 289, cals155: 359, cals185: 428 },
    { name: "Swimming (freestyle, moderate)", cals125: 397, cals155: 492, cals185: 587 },
    { name: "Tennis (general)", cals125: 397, cals155: 492, cals185: 587 },
    { name: "Running (9 minute mile)", cals125: 624, cals155: 773, cals185: 923 },
    { name: "Bicycling (12-14 mph, moderate)", cals125: 454, cals155: 562, cals185: 671 },
    { name: "Football (general)", cals125: 399, cals155: 494, cals185: 588 },
    { name: "Basketball (general)", cals125: 340, cals155: 422, cals185: 503 },
    { name: "Soccer (general)", cals125: 397, cals155: 492, cals185: 587 },
  ];

  const foodComponents = [
    { component: "Fat", kjPerGram: 37, kcalPerGram: 8.8, kjPerOz: 1049, kcalPerOz: 249 },
    { component: "Proteins", kjPerGram: 17, kcalPerGram: 4.1, kjPerOz: 482, kcalPerOz: 116 },
    { component: "Carbohydrates", kjPerGram: 17, kcalPerGram: 4.1, kjPerOz: 482, kcalPerOz: 116 },
    { component: "Fiber", kjPerGram: 8, kcalPerGram: 1.9, kjPerOz: 227, kcalPerOz: 54 },
    { component: "Ethanol (drinking alcohol)", kjPerGram: 29, kcalPerGram: 6.9, kjPerOz: 822, kcalPerOz: 196 },
    { component: "Organic acids", kjPerGram: 13, kcalPerGram: 3.1, kjPerOz: 369, kcalPerOz: 88 },
    { component: "Polyols (sugar alcohols, sweeteners)", kjPerGram: 10, kcalPerGram: 2.4, kjPerOz: 283, kcalPerOz: 68 },
  ];

  return (
    <div className="space-y-8 mt-8">
      {/* 1. Food Calorie Directory */}
      <section className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
            <Utensils className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3>Calories in Common Foods Directory</h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-48">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <Input
                type="text"
                placeholder="Search food..."
                value={foodSearch}
                onChange={(e) => setFoodSearch(e.target.value)}
                className="pl-8 bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-xs h-8"
              />
            </div>
            <select
              value={foodCategory}
              onChange={(e) => setFoodCategory(e.target.value)}
              className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs rounded-lg px-2 py-1.5 font-semibold text-zinc-700 dark:text-zinc-300"
            >
              <option value="all">All Categories</option>
              <option value="Fruit">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Proteins">Proteins</option>
              <option value="Snacks / Meals">Snacks &amp; Meals</option>
              <option value="Beverages / Dairy">Beverages &amp; Dairy</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800 max-h-64 overflow-y-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 uppercase font-bold sticky top-0 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">Food Item</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Serving Size</th>
                <th className="py-2.5 px-3 font-mono text-emerald-600 dark:text-emerald-400">Calories (kcal)</th>
                <th className="py-2.5 px-3 font-mono text-sky-600 dark:text-sky-400">Kilojoules (kJ)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {filteredFoods.map((f, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="py-2 px-3 font-semibold text-zinc-900 dark:text-zinc-100">{f.name}</td>
                  <td className="py-2 px-3 text-zinc-500">{f.category}</td>
                  <td className="py-2 px-3 text-zinc-600 dark:text-zinc-400">{f.serving}</td>
                  <td className="py-2 px-3 font-mono font-bold text-emerald-700 dark:text-emerald-400">{f.cals} kcal</td>
                  <td className="py-2 px-3 font-mono text-sky-700 dark:text-sky-400">{f.kj} kJ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Sample Meal Plans */}
      <section className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3>Sample Daily Meal Plans (1200, 1500, 2000 Calories)</h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-3 px-3">Meal Slot</th>
                <th className="py-3 px-3">1200 Calorie Plan</th>
                <th className="py-3 px-3">1500 Calorie Plan</th>
                <th className="py-3 px-3">2000 Calorie Plan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              <tr>
                <td className="py-2.5 px-3 font-bold text-zinc-900 dark:text-zinc-100">Breakfast</td>
                <td className="py-2.5 px-3">All-bran cereal (125) + Skim milk (50) + Banana (90) = <strong>265 kcal</strong></td>
                <td className="py-2.5 px-3">Granola (120) + Greek yogurt (120) + Blueberries (40) = <strong>280 kcal</strong></td>
                <td className="py-2.5 px-3">Buttered toast (150) + 2 Eggs (160) + Almonds (170) = <strong>490 kcal</strong></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-zinc-900 dark:text-zinc-100">Morning Snack</td>
                <td className="py-2.5 px-3">Cucumber (30) + Avocado dip (50) = <strong>80 kcal</strong></td>
                <td className="py-2.5 px-3">Orange (70) = <strong>70 kcal</strong></td>
                <td className="py-2.5 px-3">Greek yogurt (120) + Blueberries (40) = <strong>160 kcal</strong></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-zinc-900 dark:text-zinc-100">Lunch</td>
                <td className="py-2.5 px-3">Grilled cheese w/ tomato (300) + Salad (50) = <strong>350 kcal</strong></td>
                <td className="py-2.5 px-3">Chicken &amp; vegetable soup (300) + Bread (100) = <strong>400 kcal</strong></td>
                <td className="py-2.5 px-3">Grilled chicken breast (225) + Grilled veggies (125) + Pasta (185) = <strong>535 kcal</strong></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-zinc-900 dark:text-zinc-100">Afternoon Snack</td>
                <td className="py-2.5 px-3">Walnuts (100) = <strong>100 kcal</strong></td>
                <td className="py-2.5 px-3">Apple (75) + Peanut butter (75) = <strong>150 kcal</strong></td>
                <td className="py-2.5 px-3">Hummus (50) + Baby carrots (35) + Crackers (65) = <strong>150 kcal</strong></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-zinc-900 dark:text-zinc-100">Dinner</td>
                <td className="py-2.5 px-3">Grilled chicken (200) + Brussels sprouts (100) + Quinoa (105) = <strong>405 kcal</strong></td>
                <td className="py-2.5 px-3">Steak (375) + Mashed potatoes (150) + Asparagus (75) = <strong>600 kcal</strong></td>
                <td className="py-2.5 px-3">Grilled salmon (225) + Brown rice (175) + Green beans (100) + Walnuts (165) = <strong>665 kcal</strong></td>
              </tr>
              <tr className="bg-zinc-100 dark:bg-zinc-950 font-bold">
                <td className="py-2.5 px-3 text-zinc-900 dark:text-zinc-100">Total Daily Energy</td>
                <td className="py-2.5 px-3 text-emerald-700 dark:text-emerald-400 font-mono">1,200 Calories</td>
                <td className="py-2.5 px-3 text-emerald-700 dark:text-emerald-400 font-mono">1,500 Calories</td>
                <td className="py-2.5 px-3 text-emerald-700 dark:text-emerald-400 font-mono">2,000 Calories</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Calories Burned from Common Exercises Table */}
      <section className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <Activity className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3>Calories Burned per Hour by Exercise &amp; Body Weight</h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-3 px-3">Exercise Activity (1 Hour)</th>
                <th className="py-3 px-3 font-mono text-sky-700 dark:text-sky-400">125 lb Person (57 kg)</th>
                <th className="py-3 px-3 font-mono text-emerald-700 dark:text-emerald-400">155 lb Person (70 kg)</th>
                <th className="py-3 px-3 font-mono text-purple-700 dark:text-purple-400">185 lb Person (84 kg)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {exerciseList.map((ex, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="py-2 px-3 font-semibold text-zinc-900 dark:text-zinc-100">{ex.name}</td>
                  <td className="py-2 px-3 font-mono text-sky-700 dark:text-sky-400">{ex.cals125} kcal</td>
                  <td className="py-2 px-3 font-mono font-bold text-emerald-700 dark:text-emerald-400">{ex.cals155} kcal</td>
                  <td className="py-2 px-3 font-mono text-purple-700 dark:text-purple-400">{ex.cals185} kcal</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Food Components Energy Table */}
      <section className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-base">
          <PieChart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h3>Caloric Density by Food Component</h3>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">Macronutrient / Component</th>
                <th className="py-2.5 px-3 font-mono text-emerald-700 dark:text-emerald-400">Calories (kcal per gram)</th>
                <th className="py-2.5 px-3 font-mono text-sky-700 dark:text-sky-400">Kilojoules (kJ per gram)</th>
                <th className="py-2.5 px-3 font-mono text-purple-700 dark:text-purple-400">Calories (kcal per oz)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              {foodComponents.map((c, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                  <td className="py-2 px-3 font-semibold text-zinc-900 dark:text-zinc-100">{c.component}</td>
                  <td className="py-2 px-3 font-mono font-bold text-emerald-700 dark:text-emerald-400">{c.kcalPerGram} kcal/g</td>
                  <td className="py-2 px-3 font-mono text-sky-700 dark:text-sky-400">{c.kjPerGram} kJ/g</td>
                  <td className="py-2 px-3 font-mono text-purple-700 dark:text-purple-400">{c.kcalPerOz} kcal/oz</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
