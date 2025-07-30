// script.js
class WaterSaverApp {
    constructor() {
        this.dailyUsage = 0;
        this.dailyGoal = 200;
        this.waterSaved = 0;
        this.totalSaved = 0;
        this.streakDays = 0;
        this.currentTip = 0;
        this.tips = [
            { icon: '💡', text: 'Take shorter showers - save up to 150L per week!' },
            { icon: '🔧', text: 'Fix leaky faucets - a drip can waste 15L per day!' },
            { icon: '🌱', text: 'Collect rainwater for gardening and cleaning!' },
            { icon: '🚰', text: 'Turn off tap while brushing teeth - save 6L per minute!' },
            { icon: '🌊', text: 'Use a broom instead of a hose to clean driveways!' }
        ];
        
        this.init();
    }
    
    init() {
        this.loadData();
        this.updateDisplay();
        this.startTipRotation();
        this.setupEventListeners();
    }
    
    loadData() {
        const savedData = localStorage.getItem('waterSaverData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.dailyUsage = data.dailyUsage || 0;
            this.waterSaved = data.waterSaved || 0;
            this.totalSaved = data.totalSaved || 0;
            this.streakDays = data.streakDays || 0;
        }
    }
    
    saveData() {
        const data = {
            dailyUsage: this.dailyUsage,
            waterSaved: this.waterSaved,
            totalSaved: this.totalSaved,
            streakDays: this.streakDays
        };
        localStorage.setItem('waterSaverData', JSON.stringify(data));
    }
    
    updateDisplay() {
        // Update usage display
        document.getElementById('todayUsage').textContent = this.dailyUsage;
        document.getElementById('dailyGoal').textContent = this.dailyGoal;
        document.getElementById('waterSaved').textContent = this.waterSaved;
        
        // Update statistics
        document.getElementById('totalSaved').textContent = this.totalSaved;
        document.getElementById('streakDays').textContent = this.streakDays;
        
        // Calculate efficiency
        const efficiency = this.dailyGoal > 0 ? 
            Math.max(0, Math.round((1 - this.dailyUsage / this.dailyGoal) * 100)) : 0;
        document.getElementById('efficiency').textContent = efficiency + '%';
        
        // Update water level animation
        const waterLevel = Math.min(100, (this.dailyUsage / this.dailyGoal) * 100);
        document.getElementById('waterLevel').style.height = waterLevel + '%';
        
        // Change color based on usage
        const waterLevelEl = document.getElementById('waterLevel');
        if (waterLevel < 50) {
            waterLevelEl.style.background = 'linear-gradient(to top, #00cc66, #66ff99)';
        } else if (waterLevel < 80) {
            waterLevelEl.style.background = 'linear-gradient(to top, #ffcc00, #ffff66)';
        } else {
            waterLevelEl.style.background = 'linear-gradient(to top, #ff3300, #ff6666)';
        }
    }
    
    addActivity(type, amount) {
        // Add visual feedback
        const buttons = document.querySelectorAll('.activity-btn');
        buttons.forEach(btn => {
            if (btn.textContent.includes(type.charAt(0).toUpperCase() + type.slice(1))) {
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        btn.style.transform = 'scale(1)';
                    }, 150);
                }, 100);
            }
        });
        
        this.dailyUsage += amount;
        
        // Add some water saving if user is being mindful
        if (Math.random() > 0.5) {
            const saved = Math.round(amount * 0.1);
            this.waterSaved += saved;
            this.totalSaved += saved;
            
            // Show saving notification
            this.showNotification(`Great! You saved ${saved}L by being mindful!`, 'success');
        }
        
        this.updateDisplay();
        this.saveData();
        this.createWaterDrops();
    }
    
    createWaterDrops() {
        const container = document.body;
        for (let i = 0; i < 5; i++) {
            const drop = document.createElement('div');
            drop.innerHTML = '💧';
            drop.style.position = 'fixed';
            drop.style.fontSize = '20px';
            drop.style.pointerEvents = 'none';
            drop.style.zIndex = '9999';
            drop.style.left = Math.random() * window.innerWidth + 'px';
            drop.style.top = '0px';
            drop.style.transition = 'all 0.8s ease-in';
            
            container.appendChild(drop);
            
            setTimeout(() => {
                drop.style.top = window.innerHeight + 'px';
                drop.style.opacity = '0';
                drop.style.transform = 'rotate(360deg)';
            }, 100);
            
            setTimeout(() => {
                container.removeChild(drop);
            }, 900);
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: bold;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background: #10b981;' : 'background: #6366f1;'}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    startTipRotation() {
        setInterval(() => {
            this.rotateTips();
        }, 4000);
    }
    
    rotateTips() {
        const currentTipEl = document.querySelector('.tip-item.active');
        currentTipEl.classList.remove('active');
        
        this.currentTip = (this.currentTip + 1) % this.tips.length;
        const tip = this.tips[this.currentTip];
        
        setTimeout(() => {
            currentTipEl.querySelector('.tip-icon').textContent = tip.icon;
            currentTipEl.querySelector('p').textContent = tip.text;
            currentTipEl.classList.add('active');
        }, 250);
    }
    
    setupEventListeners() {
        // Reset daily usage at midnight
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const msUntilMidnight = tomorrow.getTime() - now.getTime();
        setTimeout(() => {
            this.resetDaily();
            setInterval(() => this.resetDaily(), 24 * 60 * 60 * 1000);
        }, msUntilMidnight);
    }
    
    resetDaily() {
        if (this.dailyUsage < this.dailyGoal) {
            this.streakDays++;
            this.showNotification(`Day ${this.streakDays} streak! Keep it up!`, 'success');
        } else {
            this.streakDays = 0;
        }
        
        this.dailyUsage = 0;
        this.waterSaved = 0;
        this.updateDisplay();
        this.saveData();
    }
}

// Global functions for HTML onclick handlers
function addActivity(type, amount) {
    app.addActivity(type, amount);
}

function showQuickAdd() {
    const modal = document.getElementById('quickAddModal');
    modal.classList.add('active');
}

function hideQuickAdd() {
    const modal = document.getElementById('quickAddModal');
    modal.classList.remove('active');
}

function addCustomUsage() {
    const amount = parseInt(document.getElementById('customAmount').value);
    if (amount && amount > 0) {
        app.addActivity('custom', amount);
        document.getElementById('customAmount').value = '';
        hideQuickAdd();
    }
}

// Initialize the app
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new WaterSaverApp();
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideQuickAdd();
    }
    if (e.key === 'Enter' && document.getElementById('quickAddModal').classList.contains('active')) {
        addCustomUsage();
    }
});
