index.html (Structure)
This is the main page of the app. It contains:

🔹 Header
html
Copy code
<h1>💧 Water Saver</h1>
<p>Track, Save, and Conserve Water</p>
Shows the app title and a subtitle.

🔹 Daily Water Usage Section
html
Copy code
<p>Today's Usage: <span id="todayUsage">0</span> L</p>
<p>Goal: <span id="dailyGoal">200</span> L</p>
<p>Saved: <span id="waterSaved">0</span> L</p>
Shows how much water you used today, your goal, and how much you saved.

🔹 Activity Logging Buttons
html
Copy code
<button onclick="addActivity('shower', 50)">🚿 Shower</button>
<button onclick="addActivity('bath', 80)">🛁 Bath</button>
Each button adds water usage (e.g. shower = 50L).

🔹 Water Saving Tips
Displays tips like:

"Take shorter showers - save up to 150L per week!"

Tips rotate every few seconds.

🔹 Statistics
Shows your:

Total Liters Saved

Streak Days

Efficiency Percentage

🔹 Quick Add Modal
You can click the + button to open a popup and manually enter a custom water amount.

🟩 2. style.css (Design)
This file controls the look and feel of the app:

🌈 Gradient background

📱 Responsive layout (mobile friendly)

💦 Water tank animation that fills up as you use water

🧼 Animated buttons for activities

🔔 Modal popup styling

📊 Nice-looking cards and stats

It uses animations like:

css
Copy code
@keyframes fadeInDown { ... }
@keyframes wave { ... }
These make elements appear smoothly and the water wave move.

🟨 3. script.js (Functionality)
This file adds interactive behavior using JavaScript.

🔹 Key Features:
➤ WaterSaverApp class
Manages everything: usage, saving, streaks, and tips.

➤ addActivity(type, amount)
Triggered when you click a water-use button. It:

Increases today's usage

Randomly adds some "saved water"

Shows a notification (like: “You saved 5L!”)

Adds 💧 water drop animation

➤ createWaterDrops()
Visually shows water drops falling from the top of the screen.

➤ showNotification()
Creates a temporary message popup for user feedback.

➤ rotateTips()
Changes water-saving tips every 4 seconds automatically.

➤ resetDaily()
At midnight:

If you stayed under your goal, your streak increases.

Usage resets to 0 for the next day.

➤ Event Listeners:
Opens/closes the modal

Adds custom input from modal

Keyboard shortcuts (Esc to close, Enter to add)

🧠 Summary
Your Water Saver Web App:

Looks good (CSS)

Works well (JavaScript)

Helps users track and reduce water usage

Includes motivational tips and fun animations
