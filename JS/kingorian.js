/**
 * KING ORIAN CHAT INTERFACE - Production Optimized
 * Enhanced for performance, security, accessibility, and real API integration
 */

'use strict';

class KingOrianPro {
    constructor() {
        // Core DOM elements with null checks
        this.chatContainer = document.getElementById('chatContainer');
        this.messageInput = document.getElementById('messageInput');
        this.submitBtn = document.getElementById('submitBtn');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.errorMessage = document.getElementById('errorMessage');
        this.statusIndicator = document.getElementById('statusIndicator');
        this.statusText = document.getElementById('statusText');
        this.sidebar = document.getElementById('sidebar');
        this.themeToggle = document.getElementById('themeToggle');
        
        // State management
        this.isProcessing = false;
        this.clientId = SecurityUtils.generateSecureClientId();
        this.conversationId = SecurityUtils.generateConversationId();
        this.currentTheme = ThemeUtils.getCurrentTheme();
        this.retryCount = 0;
        this.maxRetries = 3;
        
        // Performance optimization
        this.messageQueue = [];
        this.isOnline = navigator.onLine;
        
        // Hero section state management
        this.heroSection = document.querySelector('.centered-hero-section');
        this.isHeroVisible = true;
        this.hasUserTyped = false;
        
        // Initialize application
        this.init();
    }

    /**
     * Initialize application with comprehensive setup
     */
    async init() {
        try {
            this.setupEventListeners();
            this.setupAccessibility();
            this.setupMobileOptimizations();
            this.setupTheme();
            this.setupPerformanceOptimizations();
            await this.testRealConnection();
            DOMUtils.focusElement(this.messageInput);
            
            console.log('👑 King Orian Pro initialized successfully');
        } catch (error) {
            console.error('Initialization error:', error);
            this.handleError(error);
        }
    }

    /**
     * Setup comprehensive event listeners with proper cleanup
     */
    setupEventListeners() {
        // Message submission with debouncing
        if (this.submitBtn) {
            this.submitBtn.addEventListener('click', PerformanceUtils.debounce(() => this.handleSubmit(), 300));
        }
        
        if (this.messageInput) {
            // Enhanced keyboard handling
            this.messageInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleSubmit();
                }
            });
            
            // Auto-resize with performance optimization
            this.messageInput.addEventListener('input', PerformanceUtils.throttle(() => {
                DOMUtils.autoResizeTextarea(this.messageInput);
                // HERO FADE: Trigger fade-out on first character typed
                this.handleHeroFadeOnTyping();
            }, 100));
            
            // Accessibility enhancements
            this.messageInput.addEventListener('focus', () => {
                DOMUtils.announceToScreenReader('Message input focused');
                // HERO FADE: Start fade process on focus if user starts typing
                this.prepareHeroFade();
            });
        }

        // Enhanced theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTheme();
            });
            
            // Mobile touch handling
            if (PerformanceUtils.isMobile()) {
                this.themeToggle.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    this.toggleTheme();
                }, { passive: false });
            }
        }

        // Menu functionality with proper event delegation
        this.setupMenuEventListeners();
        
        // Network status monitoring
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.updateConnectionStatus('connected', 'Reconnected to Orian\'s realm');
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.updateConnectionStatus('disconnected', 'Connection lost');
        });

        // Cleanup on page unload
        window.addEventListener('beforeunload', () => this.cleanup());
    }

    /**
     * Setup enhanced menu functionality
     */
    setupMenuEventListeners() {
        const emergencyMenu = document.getElementById('emergencyMenu');
        const closeSidebar = document.getElementById('closeSidebar');
        
        if (emergencyMenu && this.sidebar) {
            const toggleMenu = (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const isOpen = this.sidebar.classList.contains('open');
                
                if (isOpen) {
                    this.closeSidebarPanel();
                } else {
                    this.openSidebarPanel();
                }
            };
            
            emergencyMenu.addEventListener('click', toggleMenu);
            
            if (PerformanceUtils.isMobile()) {
                emergencyMenu.addEventListener('touchstart', toggleMenu, { passive: false });
            }
        }
        
        if (closeSidebar) {
            closeSidebar.addEventListener('click', () => this.closeSidebarPanel());
        }
        
        // Close sidebar on outside click
        document.addEventListener('click', (e) => {
            if (this.sidebar?.classList.contains('open') && 
                !this.sidebar.contains(e.target) && 
                !document.getElementById('emergencyMenu')?.contains(e.target)) {
                this.closeSidebarPanel();
            }
        });
    }

    /**
     * Setup accessibility enhancements
     */
    setupAccessibility() {
        // Announce app loaded to screen readers
        DOMUtils.announceToScreenReader('King Orian chat interface loaded');
        
        // Setup skip links
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                DOMUtils.focusElement(this.chatContainer);
            });
        }
        
        // Enhanced focus management
        this.setupFocusManagement();
    }

    /**
     * Setup mobile-specific optimizations
     */
    setupMobileOptimizations() {
        if (!PerformanceUtils.isMobile()) return;
        
        // Enhanced keyboard handling for mobile
        if (this.messageInput) {
            this.messageInput.addEventListener('focus', () => {
                setTimeout(() => {
                    this.messageInput.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, 300);
            });
        }

        // Handle viewport changes
        window.addEventListener('resize', PerformanceUtils.debounce(() => {
            if (document.activeElement === this.messageInput) {
                setTimeout(() => {
                    this.messageInput.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, 100);
            }
        }, 150));

        // Enhanced touch handling
        this.setupTouchOptimizations();
    }

    /**
     * Setup theme with persistence
     */
    setupTheme() {
        ThemeUtils.setTheme(this.currentTheme);
        
        if (this.themeToggle) {
            const icon = this.themeToggle.querySelector('i');
            if (icon) {
                icon.className = this.currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    }

    /**
     * Setup performance optimizations
     */
    setupPerformanceOptimizations() {
        // Intersection Observer for message visibility
        this.setupMessageObserver();
        
        // Preload critical resources
        this.preloadResources();
        
        // Setup efficient scrolling
        this.setupSmoothScrolling();
    }

    /**
     * Test real connection to API endpoint
     */
    async testRealConnection() {
        try {
            this.updateConnectionStatus('connecting', 'Establishing connection to Orian\'s realm...');
            
            const response = await this.makeAPIRequest('connection_test', {
                timeout: 5000
            });
            
            if (response && response.status === 'connected') {
                this.updateConnectionStatus('connected', 'Connected to Orian\'s realm');
                this.retryCount = 0;
            } else {
                throw new Error('Invalid response from server');
            }
            
        } catch (error) {
            console.error('Connection test failed:', error);
            this.updateConnectionStatus('disconnected', 'Connection failed - using offline mode');
            this.handleConnectionError(error);
        }
    }

    /**
     * Make API request with enhanced error handling and security
     */
    async makeAPIRequest(message, options = {}) {
        const {
            timeout = 30000,
            retries = this.maxRetries
        } = options;

        if (!this.isOnline) {
            throw new Error('No internet connection');
        }

        // Input sanitization
        const sanitizedMessage = SecurityUtils.sanitizeInput(message);
        
        const requestData = {
            message: sanitizedMessage,
            clientId: this.clientId,
            conversationId: this.conversationId,
            preferences: this.getUserPreferences(),
            timestamp: new Date().toISOString()
        };

        // Enhanced fetch with timeout and retries
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), timeout);

                const response = await fetch('/.netlify/functions/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify(requestData),
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                
                // Validate response data
                if (!data || typeof data.content !== 'string') {
                    throw new Error('Invalid response format');
                }

                return data;

            } catch (error) {
                if (attempt === retries) {
                    throw error;
                }
                
                // Exponential backoff for retries
                const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
                await PerformanceUtils.sleep(delay);
            }
        }
    }

    /**
     * Enhanced message submission with real API integration
     */
    async handleSubmit() {
        const message = this.messageInput?.value?.trim();
        
        if (!message || this.isProcessing) return;
        
        // Security validation
        if (!SecurityUtils.validateInput(message)) {
            this.showError('Please enter a valid message.');
            return;
        }

        // HERO FADE: Ensure hero fades out when submitting message
        if (this.isHeroVisible) {
            this.fadeOutHero();
            this.hasUserTyped = true;
        }

        this.isProcessing = true;
        this.toggleSubmitState(false);
        this.hideError();

        try {
            // Add user message immediately
            this.addMessage(message, 'user');
            this.clearInput();
            
            // Show typing indicator
            this.showTyping();
            
            // Make real API request
            const response = await this.makeAPIRequest(message);
            
            // Hide typing and add AI response
            this.hideTyping();
            
            if (response && response.content) {
                this.addMessage(response.content, 'ai', 'King Orian');
                
                // Handle follow-up questions if present
                if (response.followUpQuestions && response.followUpQuestions.length > 0) {
                    this.displayFollowUpQuestions(response.followUpQuestions);
                }
                
                this.retryCount = 0;
            } else {
                throw new Error('Empty response from King Orian');
            }

        } catch (error) {
            this.hideTyping();
            this.handleError(error, message);
        } finally {
            this.isProcessing = false;
            this.toggleSubmitState(true);
            this.focusInput();
        }
    }

    /**
     * Add message with enhanced accessibility and performance
     */
    addMessage(content, type, speaker = null) {
        if (!content || !this.chatContainer) return;

        const messageEl = document.createElement('article');
        messageEl.className = `message ${type}`;
        messageEl.setAttribute('role', 'article');
        messageEl.setAttribute('aria-label', `${speaker || (type === 'user' ? 'You' : 'King Orian')} message`);
        
        const timestamp = new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false
        });

        const sanitizedContent = SecurityUtils.sanitizeHtml(content);
        const messageId = `message-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        messageEl.innerHTML = `
            <div class="message-header">
                <span class="speaker">
                    <i class="fas fa-${type === 'user' ? 'user-circle' : 'crown'}" aria-hidden="true"></i>
                    ${SecurityUtils.escapeHtml(speaker || (type === 'user' ? 'You' : 'King Orian'))}
                </span>
                <time class="timestamp" datetime="${new Date().toISOString()}">${timestamp}</time>
            </div>
            <div class="message-content" id="${messageId}">${sanitizedContent}</div>
        `;

        // Add message with smooth animation
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateY(20px)';
        
        this.chatContainer.appendChild(messageEl);
        
        // Update chat container state - has messages now
        this.updateChatContainerState();
        
        // Animate in
        requestAnimationFrame(() => {
            messageEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            messageEl.style.opacity = '1';
            messageEl.style.transform = 'translateY(0)';
        });

        // Announce to screen readers
        DOMUtils.announceToScreenReader(`New message from ${speaker || (type === 'user' ? 'you' : 'King Orian')}`);
        
        // Smooth scroll to new message
        DOMUtils.scrollToBottom();
    }

    /**
     * Display follow-up questions
     */
    displayFollowUpQuestions(questions) {
        if (!questions || questions.length === 0) return;

        const questionsEl = document.createElement('div');
        questionsEl.className = 'follow-up-questions';
        questionsEl.setAttribute('role', 'region');
        questionsEl.setAttribute('aria-label', 'Follow-up questions');
        
        const questionsHtml = questions.map((question, index) => 
            `<button class="follow-up-btn" onclick="kingOrianPro.useFollowUpQuestion('${SecurityUtils.escapeHtml(question)}')" aria-label="Use follow-up question ${index + 1}">
                ${SecurityUtils.escapeHtml(question)}
            </button>`
        ).join('');
        
        questionsEl.innerHTML = `
            <div class="follow-up-header">
                <i class="fas fa-lightbulb" aria-hidden="true"></i>
                <span>Suggested follow-ups:</span>
            </div>
            <div class="follow-up-list">
                ${questionsHtml}
            </div>
        `;
        
        this.chatContainer.appendChild(questionsEl);
        
        // Enhanced scroll to ensure ALL follow-ups are visible
        setTimeout(() => {
            this.scrollToShowFollowUps(questionsEl);
        }, 100);
        
        // Announce the number of suggestions to screen readers
        DOMUtils.announceToScreenReader(`${questions.length} follow-up suggestions available`);
    }

    /**
     * Use follow-up question
     */
    useFollowUpQuestion(question) {
        if (this.messageInput) {
            this.messageInput.value = question;
            DOMUtils.autoResizeTextarea(this.messageInput);
            DOMUtils.focusElement(this.messageInput);
        }
    }

    /**
     * Enhanced error handling
     */
    handleError(error, originalMessage = null) {
        console.error('Application error:', error);
        
        let errorText = 'The realm experiences turbulence. ';
        let isRetryable = true;
        
        if (error.name === 'AbortError' || error.message.includes('timeout')) {
            errorText += 'Connection timed out. Please try again.';
        } else if (error.message.includes('429')) {
            errorText += 'Too many requests. Please wait before seeking counsel again.';
            isRetryable = false;
        } else if (error.message.includes('500') || error.message.includes('503')) {
            errorText += 'King Orian is temporarily unavailable.';
        } else if (error.message.includes('Failed to fetch') || !this.isOnline) {
            errorText += 'Connection lost. Check your internet connection.';
            this.updateConnectionStatus('disconnected', 'Connection interrupted');
        } else {
            errorText += 'Please try again, warrior.';
        }
        
        this.showError(errorText, isRetryable ? originalMessage : null);
        
        // Update retry count
        if (originalMessage) {
            this.retryCount++;
        }
    }

    /**
     * Show error message with enhanced UX
     */
    showError(message, originalMessage = null) {
        if (!this.errorMessage) return;
        
        const retryButton = originalMessage && this.retryCount < this.maxRetries ? 
            `<button class="retry-btn" onclick="kingOrianPro.retryMessage('${SecurityUtils.escapeHtml(originalMessage)}')" aria-label="Retry sending message">Retry</button>` : '';
        
        this.errorMessage.innerHTML = `
            <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
            <span>${SecurityUtils.escapeHtml(message)}</span>
            ${retryButton}
        `;
        
        this.errorMessage.style.display = 'flex';
        DOMUtils.announceToScreenReader(`Error: ${message}`);
        
        // Auto-hide after 10 seconds
        setTimeout(() => this.hideError(), 10000);
    }

    /**
     * Hide error message
     */
    hideError() {
        if (this.errorMessage) {
            this.errorMessage.style.display = 'none';
        }
    }

    /**
     * Retry failed message
     */
    retryMessage(message) {
        if (this.messageInput) {
            this.messageInput.value = message;
            DOMUtils.autoResizeTextarea(this.messageInput);
        }
        this.hideError();
        this.handleSubmit();
    }

    /**
     * Enhanced connection status updates
     */
    updateConnectionStatus(status, text) {
        if (this.statusIndicator && this.statusText) {
            this.statusIndicator.className = `status-indicator ${status}`;
            this.statusText.textContent = text;
            
            // Announce important status changes
            if (status === 'connected' || status === 'disconnected') {
                DOMUtils.announceToScreenReader(text);
            }
        }
    }

    /**
     * Enhanced theme toggle with animation and persistence
     */
    toggleTheme() {
        const isMobile = PerformanceUtils.isMobile();
        
        if (isMobile && this.themeToggle) {
            this.themeToggle.classList.add('mobile-tap');
            setTimeout(() => {
                this.themeToggle?.classList.remove('mobile-tap');
            }, 800);
        }
        
        this.currentTheme = ThemeUtils.toggleTheme();
        
        // Update icon
        if (this.themeToggle) {
            const icon = this.themeToggle.querySelector('i');
            if (icon) {
                icon.className = this.currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
        
        DOMUtils.announceToScreenReader(`Theme switched to ${this.currentTheme} mode`);
    }

    /**
     * Sidebar panel management
     */
    openSidebarPanel() {
        if (this.sidebar) {
            this.sidebar.classList.add('open');
            this.sidebar.setAttribute('aria-hidden', 'false');
            
            // Focus management
            const closeBtn = document.getElementById('closeSidebar');
            if (closeBtn) {
                DOMUtils.focusElement(closeBtn);
            }
        }
    }

    closeSidebarPanel() {
        if (this.sidebar) {
            this.sidebar.classList.remove('open');
            this.sidebar.setAttribute('aria-hidden', 'true');
            
            // Return focus to menu button
            const menuBtn = document.getElementById('emergencyMenu');
            if (menuBtn) {
                DOMUtils.focusElement(menuBtn);
            }
        }
    }

    /**
     * Clear input field
     */
    clearInput() {
        if (this.messageInput) {
            this.messageInput.value = '';
            DOMUtils.autoResizeTextarea(this.messageInput);
            
            // HERO FADE: Check if we should restore hero when input is cleared
            setTimeout(() => {
                this.handleHeroFadeOnTyping();
            }, 100);
        }
    }

    /**
     * Focus input field
     */
    focusInput() {
        DOMUtils.focusElement(this.messageInput);
    }

    /**
     * Toggle submit button state
     */
    toggleSubmitState(enabled) {
        if (!this.submitBtn) return;
        
        this.submitBtn.disabled = !enabled;
        const icon = this.submitBtn.querySelector('i');
        
        if (icon) {
            icon.className = enabled ? 'fas fa-arrow-up' : 'fas fa-crown';
        }
        
        this.submitBtn.setAttribute('aria-label', enabled ? 'Send message' : 'Processing...');
    }

    /**
     * Show typing indicator
     */
    showTyping() {
        if (this.typingIndicator) {
            this.typingIndicator.style.display = 'flex';
            DOMUtils.announceToScreenReader('King Orian is typing');
            
            console.log('👑 Typing indicator now visible directly above input box');
        }
    }

    /**
     * Hide typing indicator
     */
    hideTyping() {
        if (this.typingIndicator) {
            this.typingIndicator.style.display = 'none';
        }
    }

    /**
     * Enhanced scroll to show ALL follow-up questions
     */
    scrollToShowFollowUps(followUpElement) {
        if (!followUpElement) return;
        
        requestAnimationFrame(() => {
            // Get the position of the follow-up element
            const elementRect = followUpElement.getBoundingClientRect();
            const elementTop = elementRect.top + window.pageYOffset;
            const elementHeight = elementRect.height;
            
            // Calculate how much space we need for the input area
            const inputSection = document.querySelector('.royal-input-section');
            const inputHeight = inputSection ? inputSection.offsetHeight : 160;
            
            // Calculate perfect position - follow-ups as bottom boundary
            const viewportHeight = window.innerHeight;
            const safetyMargin = 20; // Small buffer
            
            // Position so bottom of follow-ups is visible with small margin above input
            const targetScrollTop = (elementTop + elementHeight) - (viewportHeight - inputHeight - safetyMargin);
            
            // Ensure we don't scroll past the natural document end
            const documentHeight = document.documentElement.scrollHeight;
            const maxNaturalScroll = documentHeight - viewportHeight;
            
            // Don't scroll past the follow-ups - they ARE the bottom limit
            const finalScrollTop = Math.max(0, Math.min(targetScrollTop, maxNaturalScroll));
            
            console.log('📱 Positioning to show all follow-ups without over-scroll...');
            
            window.scrollTo({
                top: finalScrollTop,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Update chat container state based on messages
     */
    updateChatContainerState() {
        if (!this.chatContainer) return;
        
        const messages = this.chatContainer.querySelectorAll('.message');
        const hasMessages = messages.length > 0;
        
        if (hasMessages) {
            this.chatContainer.classList.add('has-messages');
            console.log('💬 Chat container: Active state (has messages)');
        } else {
            this.chatContainer.classList.remove('has-messages');
            console.log('💬 Chat container: Empty state (no messages)');
        }
    }

    /**
     * Get user preferences
     */
    getUserPreferences() {
        return {
            responseStyle: 'strategic',
            responseLength: 'detailed',
            followUpQuestions: 'always',
            autoSave: 'enabled',
            exportFormat: 'txt'
        };
    }

    /**
     * HERO SECTION FADE MANAGEMENT
     */
    
    /**
     * Prepare hero for potential fade-out (on input focus)
     */
    prepareHeroFade() {
        if (!this.heroSection || !this.isHeroVisible) return;
        
        // Add a subtle preparation state (optional visual cue)
        this.heroSection.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    /**
     * Handle hero fade when user starts typing
     */
    handleHeroFadeOnTyping() {
        if (!this.messageInput || !this.heroSection || !this.isHeroVisible) return;
        
        const inputValue = this.messageInput.value.trim();
        
        // Trigger fade-out on first character typed
        if (inputValue.length > 0 && !this.hasUserTyped) {
            this.fadeOutHero();
            this.hasUserTyped = true;
        }
        
        // Handle fade-in if input becomes empty and no messages exist
        if (inputValue.length === 0 && this.hasUserTyped && !this.hasActiveConversation()) {
            this.fadeInHero();
            this.hasUserTyped = false;
        }
    }

    /**
     * Fade out the hero section smoothly
     */
    fadeOutHero() {
        if (!this.heroSection || !this.isHeroVisible) return;
        
        console.log('👑 Hero fading out gracefully...');
        
        // Remove any existing classes
        this.heroSection.classList.remove('fade-in', 'completely-hidden');
        
        // Add fade-out class
        this.heroSection.classList.add('fade-out');
        
        // Update state
        this.isHeroVisible = false;
        
        // Announce to screen readers
        DOMUtils.announceToScreenReader('Interface focused on conversation');
        
        // COMPLETE HIDING: After fade animation, completely remove from layout
        setTimeout(() => {
            if (!this.isHeroVisible && this.heroSection) {
                this.heroSection.classList.add('completely-hidden');
                console.log('👑 Hero completely hidden - no scroll area remains');
            }
        }, 800); // Match CSS transition duration
    }

    /**
     * Fade in the hero section smoothly
     */
    fadeInHero() {
        if (!this.heroSection || this.isHeroVisible) return;
        
        console.log('👑 Hero returning majestically...');
        
        // FIRST: Remove complete hiding to restore layout
        this.heroSection.classList.remove('completely-hidden');
        
        // Small delay to ensure display is restored before animation
        setTimeout(() => {
            // Remove fade-out class
            this.heroSection.classList.remove('fade-out');
            
            // Add fade-in class
            this.heroSection.classList.add('fade-in');
            
            // Update state
            this.isHeroVisible = true;
            
            // Announce to screen readers
            DOMUtils.announceToScreenReader('King Orian interface restored');
        }, 50);
        
        // Remove fade-in class after animation completes
        setTimeout(() => {
            this.heroSection?.classList.remove('fade-in');
            console.log('👑 Hero fully restored - scroll area active');
        }, 850); // Slightly longer than CSS transition
    }

    /**
     * Check if there's an active conversation
     */
    hasActiveConversation() {
        if (!this.chatContainer) return false;
        
        const messages = this.chatContainer.querySelectorAll('.message');
        return messages.length > 0;
    }

    /**
     * Reset hero state (used when clearing chat)
     */
    resetHeroState() {
        this.hasUserTyped = false;
        
        // If no active conversation and input is empty, show hero
        if (!this.hasActiveConversation() && (!this.messageInput?.value.trim())) {
            this.fadeInHero();
        }
    }

    /**
     * Setup focus management
     */
    setupFocusManagement() {
        // Implement focus trap for sidebar
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.sidebar?.classList.contains('open')) {
                this.closeSidebarPanel();
            }
        });
    }

    /**
     * Setup touch optimizations
     */
    setupTouchOptimizations() {
        // Prevent zoom on double tap for input elements
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = new Date().getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }

    /**
     * Setup message observer
     */
    setupMessageObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            });

            // Observe new messages
            const observeMessages = () => {
                document.querySelectorAll('.message:not(.observed)').forEach(message => {
                    observer.observe(message);
                    message.classList.add('observed');
                });
            };

            // Initial observation
            observeMessages();

            // Observe new messages
            const originalAddMessage = this.addMessage.bind(this);
            this.addMessage = function(...args) {
                originalAddMessage(...args);
                setTimeout(observeMessages, 100);
            };
        }
    }

    /**
     * Preload resources
     */
    preloadResources() {
        // Preload critical CSS and fonts
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'style';
        preloadLink.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&display=swap';
        document.head.appendChild(preloadLink);
    }

    /**
     * Setup smooth scrolling
     */
    setupSmoothScrolling() {
        // Smooth scrolling with reduced motion respect
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            DOMUtils.scrollToBottom = () => {
                window.scrollTo(0, document.documentElement.scrollHeight);
            };
        }
    }

    /**
     * Handle connection error
     */
    handleConnectionError(error) {
        // Implement offline functionality
        if (!this.isOnline) {
            this.showError('You are offline. Messages will be queued until connection is restored.');
        }
    }

    /**
     * Cleanup function
     */
    cleanup() {
        // Clean up event listeners and resources
        if (this.messageObserver) {
            this.messageObserver.disconnect();
        }
        
        // Clear any pending timeouts
        // Implementation would depend on tracked timeouts
    }

    // Expose essential methods for backward compatibility
    generateConversationId() {
        return SecurityUtils.generateConversationId();
    }
}