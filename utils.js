// ═══════════════════════════════════════════
// 🎌 ANIME WELCOME BOT - UTILITIES
// ═══════════════════════════════════════════

/**
 * Get user's full name
 * @param {Object} user - Telegram user object
 * @returns {string} Full name
 */
function getFullName(user) {
    if (!user) return 'Unknown User';
    
    const firstName = user.first_name || '';
    const lastName = user.last_name || '';
    
    return (firstName + ' ' + lastName).trim() || 'User';
}

/**
 * Calculate uptime
 * @param {Date} startTime - Bot start time
 * @returns {string} Formatted uptime
 */
function getUptime(startTime) {
    const now = new Date();
    const diff = now - startTime;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0) parts.push(`${seconds}s`);
    
    return parts.join(' ') || '0s';
}

/**
 * Format date to readable string
 * @param {Date} date - Date object
 * @returns {string} Formatted date
 */
function formatDate(date) {
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

/**
 * Escape markdown special characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeMarkdown(text) {
    if (!text) return '';
    return text.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, '\\$1');
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
function truncate(text, maxLength = 100) {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
}

/**
 * Check if user is admin in chat
 * @param {Object} bot - Bot instance
 * @param {number} chatId - Chat ID
 * @param {number} userId - User ID
 * @returns {Promise<boolean>} Is admin
 */
async function isAdmin(bot, chatId, userId) {
    try {
        const member = await bot.getChatMember(chatId, userId);
        return ['creator', 'administrator'].includes(member.status);
    } catch (error) {
        return false;
    }
}

/**
 * Get chat info
 * @param {Object} bot - Bot instance
 * @param {number} chatId - Chat ID
 * @returns {Promise<Object>} Chat info
 */
async function getChatInfo(bot, chatId) {
    try {
        return await bot.getChat(chatId);
    } catch (error) {
        console.error('Error getting chat info:', error.message);
        return null;
    }
}

/**
 * Sleep/delay function
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate random string
 * @param {number} length - String length
 * @returns {string} Random string
 */
function randomString(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Log with timestamp
 * @param {string} message - Message to log
 * @param {string} type - Log type (info, error, warn, success)
 */
function log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const icons = {
        info: 'ℹ️',
        error: '❌',
        warn: '⚠️',
        success: '✅'
    };
    
    const icon = icons[type] || icons.info;
    console.log(`[${timestamp}] ${icon} ${message}`);
}

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} Is valid URL
 */
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Get user link for mention
 * @param {Object} user - User object
 * @returns {string} User link
 */
function getUserLink(user) {
    return `tg://user?id=${user.id}`;
}

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Get file size in readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Readable file size
 */
function getReadableFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// ═══════════════════════════════════════════
// Exports
// ═══════════════════════════════════════════

module.exports = {
    getFullName,
    getUptime,
    formatDate,
    escapeMarkdown,
    truncate,
    isAdmin,
    getChatInfo,
    sleep,
    randomString,
    log,
    isValidUrl,
    getUserLink,
    formatNumber,
    getReadableFileSize
};
