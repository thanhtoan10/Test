class LuxuryConfig {
    constructor() {
        this.initialized = false;
        this.settings = {
            configEnabled: false,
            luxEnabled: false,
            mode: 'muot-ma',
            dpi: '1.0',
            isActive: false
        };
        this.init();
    }

    init() {
        this.initializeElements();
        this.attachEventListeners();
        this.initializeAnimations();
        this.loadSettings();
        this.initialized = true;
        console.log('Luxury Config initialized successfully');
    }

    initializeElements() {
        this.configToggle = document.getElementById('config-toggle');
        this.luxToggle = document.getElementById('lux-toggle');
        this.modeSelect = document.getElementById('mode-select');
        this.dpiSelect = document.getElementById('dpi-select');
        this.activateBtn = document.getElementById('activate-btn');
        this.sections = document.querySelectorAll('.section');
        this.functionItems = document.querySelectorAll('.function-item');
        this.sensiItems = document.querySelectorAll('.sensi-item');
    }

    attachEventListeners() {
        this.configToggle.addEventListener('change', (e) => {
            this.handleToggleChange('config', e.target.checked);
        });

        this.luxToggle.addEventListener('change', (e) => {
            this.handleToggleChange('lux', e.target.checked);
        });
        this.modeSelect.addEventListener('change', (e) => {
            this.handleModeChange(e.target.value);
        });

        this.dpiSelect.addEventListener('change', (e) => {
            this.handleDpiChange(e.target.value);
        });
        this.activateBtn.addEventListener('click', () => {
            this.handleActivate();
        });
        this.addHoverEffects();
    }

    handleToggleChange(type, enabled) {
        if (type === 'config') {
            this.settings.configEnabled = enabled;
            this.animateToggle(this.configToggle, enabled);
        } else if (type === 'lux') {
            this.settings.luxEnabled = enabled;
            this.animateToggle(this.luxToggle, enabled);
        }

        this.saveSettings();
        this.updateUI();
        this.showNotification(`${type.toUpperCase()} ${enabled ? 'enabled' : 'disabled'}`);
    }

    handleModeChange(mode) {
        this.settings.mode = mode;
        this.saveSettings();
        this.animateDropdown(this.modeSelect);
        this.showNotification(`Mode changed to ${mode}`);
    }

    handleDpiChange(dpi) {
        this.settings.dpi = dpi;
        this.saveSettings();
        this.animateDropdown(this.dpiSelect);
        this.showNotification(`DPI changed to ${dpi}x`);
    }

    handleActivate() {
        this.settings.isActive = !this.settings.isActive;
        this.saveSettings();
        this.animateActivateButton();
        this.updateUI();

        const status = this.settings.isActive ? 'activated' : 'deactivated';
        this.showNotification(`LUX SENSI ${status}`);
    }

    animateToggle(toggleElement, enabled) {
        const toggleSwitch = toggleElement.closest('.toggle-switch');
        toggleSwitch.style.transform = 'scale(1.1)';

        setTimeout(() => {
            toggleSwitch.style.transform = 'scale(1)';
        }, 150);
        this.createRippleEffect(toggleSwitch);
    }

    animateDropdown(selectElement) {
        const dropdown = selectElement.closest('.dropdown');
        dropdown.style.transform = 'scale(1.05)';

        setTimeout(() => {
            dropdown.style.transform = 'scale(1)';
        }, 200);
    }

    animateActivateButton() {
        this.activateBtn.style.transform = 'scale(0.95)';

        setTimeout(() => {
            this.activateBtn.style.transform = 'scale(1)';
            if (this.settings.isActive) {
                this.activateBtn.classList.add('activated');
            } else {
                this.activateBtn.classList.remove('activated');
            }
        }, 150);
        this.createPulseEffect(this.activateBtn);
    }

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(0, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width - size) / 2 + 'px';
        ripple.style.top = (rect.height - size) / 2 + 'px';

        element.style.position = 'relative';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    createPulseEffect(element) {
        const pulse = document.createElement('div');
        pulse.className = 'pulse-effect';
        pulse.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 12px;
            background: rgba(0, 255, 255, 0.2);
            animation: pulse-expand 0.8s ease-out;
            pointer-events: none;
        `;

        element.style.position = 'relative';
        element.appendChild(pulse);

        setTimeout(() => {
            pulse.remove();
        }, 800);
    }

    addHoverEffects() {
        this.functionItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.animateHover(item, true);
            });

            item.addEventListener('mouseleave', () => {
                this.animateHover(item, false);
            });
        });
        this.sensiItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.animateHover(item, true);
            });

            item.addEventListener('mouseleave', () => {
                this.animateHover(item, false);
            });
        });
    }

    animateHover(element, isHover) {
        const icon = element.querySelector('.function-icon, .sensi-icon');

        if (isHover) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            element.style.borderColor = '#00ffff';
        } else {
            icon.style.transform = 'scale(1) rotate(0deg)';
            element.style.borderColor = 'rgba(0, 255, 255, 0.2)';
        }
    }

    initializeAnimations() {
        this.sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';

            setTimeout(() => {
                section.style.transition = 'all 0.5s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200);
        });

        this.addCSSAnimations();
    }

    addCSSAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes pulse-expand {
                0% {
                    transform: scale(1);
                    opacity: 0.3;
                }
                100% {
                    transform: scale(1.05);
                    opacity: 0;
                }
            }
            
            .ripple-effect {
                z-index: 100;
            }
            
            .pulse-effect {
                z-index: 100;
            }
        `;
        document.head.appendChild(style);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #00ffff, #0099ff);
            color: #1a1a1a;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
        `;

        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    updateUI() {
        if (this.settings.isActive) {
            this.activateBtn.innerHTML = '<i class="fas fa-check"></i>LUX SENSI ACTIVE';
            this.activateBtn.classList.add('activated');
        } else {
            this.activateBtn.innerHTML = '<i class="fas fa-power-off"></i>LUX SENSI ACTIVE';
            this.activateBtn.classList.remove('activated');
        }
    }

    saveSettings() {
        localStorage.setItem('luxuryConfigSettings', JSON.stringify(this.settings));
    }

    loadSettings() {
        const savedSettings = localStorage.getItem('luxuryConfigSettings');
        if (savedSettings) {
            this.settings = {...this.settings, ...JSON.parse(savedSettings) };
            this.applySettings();
        }
    }

    applySettings() {
        this.configToggle.checked = this.settings.configEnabled;
        this.luxToggle.checked = this.settings.luxEnabled;
        this.modeSelect.value = this.settings.mode;
        this.dpiSelect.value = this.settings.dpi;
        this.updateUI();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new LuxuryConfig();
    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

window.LuxuryConfig = LuxuryConfig;