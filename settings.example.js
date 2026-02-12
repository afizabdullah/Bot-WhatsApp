// ═══════════════════════════════════════════
// 🎌 ANIME WELCOME BOT - CONFIGURATION EXAMPLE
// ═══════════════════════════════════════════
// Copy this file to settings.js and customize

module.exports = {
    // ═══════════════════════════════════════════
    // 🤖 BOT CONFIGURATION
    // ═══════════════════════════════════════════
    
    // Get your bot token from @BotFather on Telegram
    // Tutorial: https://core.telegram.org/bots#6-botfather
    BOT_TOKEN: "8205624036:AAEk0QsaFtM2o6fJsDlG4nnLyOmYcdUSaEM",
    
    
    // ═══════════════════════════════════════════
    // 👨‍💻 OWNER INFORMATION
    // ═══════════════════════════════════════════
    
    OWNER: {
        username: "@Hafezbdullah",      // Your Telegram username
        name: "𝕳𝖆𝖋𝖊𝖟📳🔵𝕬𝖇𝖉𝖚𝖑𝖑𝖆𝖍",                  // Your display name
        id: 5026416358                        // Optional: Your Telegram user ID
    },
    
    
    // ═══════════════════════════════════════════
    // 🔗 LINKS CONFIGURATION
    // ═══════════════════════════════════════════
    
    LINKS: {
        channel: "https://t.me/your_channel",      // Your channel link
        group: "https://t.me/your_group",          // Your group link
        database: "https://example.com/database"    // Your website/database link
    },
    
    
    // ═══════════════════════════════════════════
    // 🖼️ IMAGE CONFIGURATION
    // ═══════════════════════════════════════════
    
    WELCOME_IMAGE: {
        // Use Imgur, Cloudinary, or any direct image URL
        url: "https://i.imgur.com/8YzaEKs.jpg",
        
        // Or use local file (place in project directory)
        // url: "./images/welcome.jpg",
        
        // Recommended anime welcome images:
        // https://i.imgur.com/8YzaEKs.jpg
        // https://i.imgur.com/xyz1234.jpg
    },
    
    LEAVE_IMAGE: {
        url: "https://i.imgur.com/RqJGAvG.jpg",
        // Or local: "./images/goodbye.jpg"
    },
    
    
    // ═══════════════════════════════════════════
    // 💬 MESSAGES CONFIGURATION
    // ═══════════════════════════════════════════
    // Available placeholders:
    // {name} - User's first name (clickable)
    // {id} - User's Telegram ID
    // {username} - User's @username
    // {fullname} - User's full name
    // {owner} - Bot owner username
    
    MESSAGES: {
        // Welcome message for new members
        welcome: `
╔═══════════════════════╗
║   🎌 WELCOME! 🎌      ║
╚═══════════════════════╝

👋 Welcome {name}!
🆔 User ID: {id}
👤 Username: {username}
📝 Full Name: {fullname}

━━━━━━━━━━━━━━━━━━━━━━
✨ Thanks for joining our group!
🌸 Enjoy your stay and have fun!
💫 Check out the buttons below!
━━━━━━━━━━━━━━━━━━━━━━
`,
        
        // Leave message for departed members
        leave: `
╔═══════════════════════╗
║   👋 GOODBYE! 👋      ║
╚═══════════════════════╝

💔 {name} has left the group
🆔 User ID: {id}

━━━━━━━━━━━━━━━━━━━━━━
👋 We'll miss you!
🌟 Feel free to come back anytime!
━━━━━━━━━━━━━━━━━━━━━━
`,
        
        // Start command message (private chat)
        start: `
╔═══════════════════════════════╗
║  🎌 ANIME WELCOME BOT 🎌      ║
╚═══════════════════════════════╝

👋 Hello {name}!

Welcome to the Anime Welcome Bot! I'll make
your Telegram group more welcoming with 
beautiful anime-themed messages!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ **Features:**
• Automatic welcome messages with images
• Beautiful styled text & emojis
• User details & tagging
• Goodbye messages for leaving members
• Quick access buttons
• Easy customization

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💫 **How to use:**
1. Add me to your group
2. Make me an administrator
3. Grant necessary permissions
4. I'll handle the rest automatically!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 **Customization:**
Edit settings.js to customize messages,
images, buttons, and behavior!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👨‍💻 Owner: {owner}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`,
        
        // Help command message
        help: `
╔═══════════════════════════════╗
║      📚 HELP MENU 📚          ║
╚═══════════════════════════════╝

🔰 **Available Commands:**

/start - Start the bot
/help - Show this help menu
/stats - Bot statistics (owner only)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ **Automatic Features:**

✅ Welcome new members with anime image
✅ Display full user details
✅ Tag users properly
✅ Send goodbye messages
✅ Interactive quick buttons
✅ Clean service messages (optional)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔧 **Setup Requirements:**

1. Bot must be administrator
2. Permissions needed:
   • Send messages
   • Send photos
   • Delete messages (optional)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 **Tips:**

• Customize messages in settings.js
• Use high-quality anime images
• Test in a small group first
• Join our support group for help

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 **Customization:**

All settings are in settings.js:
• Messages and text
• Images (welcome/goodbye)
• Button labels and links
• Bot behavior

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👨‍💻 Owner: {owner}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`
    },
    
    
    // ═══════════════════════════════════════════
    // 🔘 BUTTON CONFIGURATION
    // ═══════════════════════════════════════════
    
    BUTTONS: {
        owner: "👨‍💻 Owner",           // Button text for owner
        channel: "📢 Channel",         // Button text for channel
        group: "👥 Group",             // Button text for group
        database: "🗄️ Database",      // Button text for database
        help: "❓ Help"                // Button text for help
    },
    
    
    // ═══════════════════════════════════════════
    // ⚙️ BOT SETTINGS
    // ═══════════════════════════════════════════
    
    SETTINGS: {
        // Delete Telegram's "User joined" system message
        deleteJoinMessage: false,
        
        // Delete Telegram's "User left" system message  
        deleteLeaveMessage: false,
        
        // Delete service messages after sending welcome/leave
        deleteServiceMessage: true,
        
        // Delay before deleting service messages (in milliseconds)
        // 5000 = 5 seconds
        deleteDelay: 5000,
    }
};


// ═══════════════════════════════════════════
// 📝 NOTES & TIPS
// ═══════════════════════════════════════════

/*

1. BOT TOKEN:
   - Never share your bot token publicly
   - Get it from @BotFather
   - Keep this file secure

2. IMAGES:
   - Use direct image URLs (ending in .jpg, .png, etc.)
   - Imgur is recommended for hosting
   - Images should be high quality but not too large
   - Recommended size: 1280x720 or 1920x1080

3. MESSAGES:
   - Use Unicode characters for emojis
   - Keep formatting consistent
   - Test messages before deployment
   - Use placeholders for dynamic content

4. BUTTONS:
   - Maximum 8 buttons per message
   - Keep button text short and clear
   - Test all links before deployment

5. PERMISSIONS:
   - Bot MUST be admin to detect join/leave
   - Grant only necessary permissions
   - Test in a small group first

6. CUSTOMIZATION IDEAS:
   - Theme: Anime, Gaming, Professional, etc.
   - Different images for day/night
   - Special messages for admins
   - Multiple language support
   - Welcome quiz/challenges

7. PERFORMANCE:
   - Bot can handle multiple groups
   - No database needed for basic operation
   - Lightweight and fast
   - Low server resource usage

8. DEPLOYMENT:
   - Use PM2 for production
   - Set up auto-restart on crash
   - Monitor logs regularly
   - Keep Node.js updated

*/
