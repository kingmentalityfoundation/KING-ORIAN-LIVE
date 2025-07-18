/**
 * KING ORIAN UTILITIES
 * Helper functions and global utilities
 */

'use strict';

/**
 * Global utility functions for UI actions
 */
function clearCurrentChat() {
    if (confirm('Clear current conversation? This action cannot be undone.')) {
        const chatContainer = document.getElementById('chatContainer');
        if (chatContainer) {
            chatContainer.innerHTML = '';
        }
        
        // Generate new conversation ID
        if (window.kingOrianPro) {
            window.kingOrianPro.conversationId = window.kingOrianPro.generateConversationId();
            
            // Update chat container state after clearing
            window.kingOrianPro.updateChatContainerState();
            
            // Reset hero state when chat is cleared
            setTimeout(() => {
                window.kingOrianPro.resetHeroState();
            }, 300);
        }
        
        console.log('💥 Chat cleared by royal decree!');
    }
}

function newConversation() {
    if (confirm('Start a new conversation? Current chat will be cleared.')) {
        location.reload();
    }
}

function exportCurrentConversation() {
    const messages = document.querySelectorAll('.message');
    if (messages.length === 0) {
        alert('No conversation to export');
        return;
    }
    
    let content = 'King Orian Conversation Export\n';
    content += '='.repeat(50) + '\n\n';
    content += `Exported: ${new Date().toLocaleString()}\n`;
    content += `Conversation ID: ${window.kingOrianPro?.conversationId || 'unknown'}\n\n`;
    
    messages.forEach(msg => {
        const speaker = msg.querySelector('.speaker')?.textContent?.trim() || 'Unknown';
        const text = msg.querySelector('.message-content')?.textContent || '';
        const timestamp = msg.querySelector('.timestamp')?.textContent || '';
        content += `${speaker} (${timestamp}):\n${text}\n\n`;
    });
    
    content += '\n--- End of Conversation ---';
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `king-orian-conversation-${new Date().toISOString().split('T')[0]}.txt`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function clearAllConversations() {
    if (confirm('Clear all conversations? This will refresh the page.')) {
        // Clear any stored conversation data
        try {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('king-orian-conversation')) {
                    localStorage.removeItem(key);
                }
            });
        } catch (error) {
            console.warn('Could not clear stored conversations:', error);
        }
        
        location.reload();
    }
}

function exportConversations() {
    exportCurrentConversation();
}

function retryConnection() {
    if (window.kingOrianPro) {
        window.kingOrianPro.testRealConnection();
    }
}

/**
 * Performance Utilities
 */
const PerformanceUtils = {
    /**
     * Debounce function to limit rapid calls
     */
    debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    /**
     * Throttle function to limit execution frequency
     */
    throttle(func, limit) {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Sleep utility for async delays
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Check if device is mobile
     */
    isMobile() {
        return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
};

/**
 * Security Utilities
 */
const SecurityUtils = {
    /**
     * Generate secure client ID
     */
    generateSecureClientId() {
        const timestamp = Date.now().toString(36);
        const randomBytes = new Uint8Array(16);
        crypto.getRandomValues(randomBytes);
        const randomString = Array.from(randomBytes, byte => byte.toString(36)).join('');
        return `client_${timestamp}_${randomString}`;
    },

    /**
     * Generate conversation ID
     */
    generateConversationId() {
        return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },

    /**
     * Enhanced input validation
     */
    validateInput(input) {
        if (!input || typeof input !== 'string') return false;
        if (input.length > 3000) return false;
        if (input.trim().length === 0) return false;
        
        // Check for suspicious patterns
        const suspiciousPatterns = [
            /<script/i,
            /javascript:/i,
            /data:text\/html/i,
            /vbscript:/i
        ];
        
        return !suspiciousPatterns.some(pattern => pattern.test(input));
    },

    /**
     * Sanitize user input
     */
    sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        
        return input
            .trim()
            .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Remove control characters
            .slice(0, 3000); // Limit length
    },

    /**
     * Sanitize HTML content
     */
    sanitizeHtml(html) {
        const tempDiv = document.createElement('div');
        tempDiv.textContent = html;
        return tempDiv.innerHTML.replace(/\n/g, '<br>');
    },

    /**
     * Escape HTML entities
     */
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, (m) => map[m]);
    }
};

/**
 * DOM Utilities
 */
const DOMUtils = {
    /**
     * Announce to screen readers
     */
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    },

    /**
     * Auto-resize textarea
     */
    autoResizeTextarea(textarea, maxHeight = 140) {
        if (!textarea) return;
        
        textarea.style.height = 'auto';
        const isMobile = PerformanceUtils.isMobile();
        const maxH = isMobile ? 200 : maxHeight;
        const newHeight = Math.min(textarea.scrollHeight, maxH);
        textarea.style.height = newHeight + 'px';
        
        // Ensure text is visible on mobile
        if (isMobile) {
            textarea.scrollTop = textarea.scrollHeight;
        }
    },

    /**
     * Smooth scroll to bottom
     */
    scrollToBottom() {
        requestAnimationFrame(() => {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        });
    },

    /**
     * Focus element safely
     */
    focusElement(element) {
        if (element) {
            requestAnimationFrame(() => {
                element.focus();
            });
        }
    }
};

/**
 * Theme Utilities
 */
const ThemeUtils = {
    /**
     * Get current theme
     */
    getCurrentTheme() {
        return localStorage.getItem('king-orian-theme') || 'dark';
    },

    /**
     * Set theme
     */
    setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        try {
            localStorage.setItem('king-orian-theme', theme);
        } catch (error) {
            console.warn('Could not save theme preference:', error);
        }
    },

    /**
     * Toggle theme
     */
    toggleTheme() {
        const currentTheme = this.getCurrentTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        return newTheme;
    }
};

/**
 * Initialize application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize King Orian Pro
        window.kingOrianPro = new KingOrianPro();
        console.log('👑⚡ KING ORIAN PRO - MOBILE-FIRST EDITION ACTIVATED! ⚡👑');
        console.log('🚀 Real AI integration, enhanced security, and premium mobile performance!');
        console.log('✨ Enterprise-grade accessibility and mobile optimization complete!');
    } catch (error) {
        console.error('Failed to initialize King Orian Pro:', error);
        
        // Fallback error display
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            background: #dc143c; color: white; padding: 20px; border-radius: 10px;
            font-family: Arial, sans-serif; text-align: center; z-index: 100000;
        `;
        errorDiv.innerHTML = `
            <h3>Initialization Error</h3>
            <p>King Orian's realm is temporarily unavailable.</p>
            <button onclick="location.reload()" style="
                background: white; color: #dc143c; border: none; padding: 10px 20px;
                border-radius: 5px; cursor: pointer; margin-top: 10px;
            ">Retry</button>
        `;
        document.body.appendChild(errorDiv);
    }
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Register service worker for offline functionality
        // Implementation would go here for full PWA support
    });
}