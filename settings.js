// ═══════════════════════════════════════════
// 🎌 ANIME WELCOME BOT - CONFIGURATION
// ═══════════════════════════════════════════

module.exports = {
    // Bot Configuration
    BOT_TOKEN: "8224016343:AAHMQxQOO92H_8xyvIqJ0TQucp8M7aThmm4",
    
    // Owner Information
    OWNER: {
        username: "@jamespydev2",
        name: "James",
        id: 8163806202
    },
    
    // Links Configuration
    LINKS: {
        channel: "https://t.me/JamesBotzInc2",
        group: "https://t.me/+Ss0DZuqEgXEzZmZk",
        database: "https://t.me/+-d024FkX5aQyZjBk"
    },
    
    // Welcome Image Configuration
    WELCOME_IMAGE: {
        url: "https://files.catbox.moe/rtr4zd.jpg",
    },
    
    // Leave Image Configuration
    LEAVE_IMAGE: {
        url: "https://files.catbox.moe/p6bjc6.jpg",
    },
    
    // Menu Images Configuration (NEW)
    MENU_IMAGES: {
        start: "https://files.catbox.moe/rtr4zd.jpg",
        help: "https://files.catbox.moe/p6bjc6.jpg",
        rules: "https://files.catbox.moe/p6bjc6.jpg",
        admin: "https://files.catbox.moe/p6bjc6.jpg",
    },
    
    // Messages Configuration
    MESSAGES: {
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
━━━━━━━━━━━━━━━━━━━━━━
`,
        
        leave: `
╔═══════════════════════╗
║   👋 GOODBYE! 👋      ║
╚═══════════════════════╝

💔 {name} has left the group
🆔 User ID: {id}

━━━━━━━━━━━━━━━━━━━━━━
👋 We'll miss you!
━━━━━━━━━━━━━━━━━━━━━━
`,
        
        start: `
╔═══════════════════════════════╗
║  🎌 ANIME WELCOME BOT 🎌      ║
╚═══════════════════════════════╝

👋 Hello {name}!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ **Features:**
• Auto welcome with anime image
• Beautiful styled messages
• User details tagging
• Leave notifications
• Quick access buttons
• Admin commands
• Fun interactive games
• Group utilities

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👑 **Admin Commands:**
• Ban, Unban, Kick, Mute users
• Promote, Demote admins
• Pin, Delete messages
• Tag all members
• View admin list
• Anti-spam protection

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎮 **Fun Commands:**
• Truth or Dare
• Couple game
• Roll dice
• Random quotes
• ASCII art

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💫 **How to use:**
1. Add me to your group
2. Make me admin (required)
3. I'll handle everything automatically!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👨‍💻 Owner: {owner}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`,
        
        help: `
╔═══════════════════════════════╗
║      📚 HELP MENU 📚          ║
╚═══════════════════════════════╝

🔰 **Basic Commands:**
/start - Start the bot
/help - Show this help menu
/id - Get user/chat ID
/info - Group information
/rules - Show group rules

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👑 **Admin Commands:**
/tagall <message> - Tag all members
/ban - Ban user (reply)
/unban - Unban user (reply)
/kick - Kick user (reply)
/mute [minutes] - Mute user (reply)
/unmute - Unmute user (reply)
/promote - Promote to admin (reply)
/demote - Demote from admin (reply)
/pin - Pin message (reply)
/unpin - Unpin message
/del - Delete message (reply)
/admins - List all admins
/warn - Warn user (reply)
/setrules - Set group rules
/antiraid [on/off] - Toggle raid protection

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎮 **Fun Commands:**
/truth - Get truth question
/dare - Get dare challenge
/couple - Random couple pairing
/roll - Roll dice
/quote - Random anime quote
/ship @user1 @user2 - Ship calculator
/8ball <question> - Magic 8-ball
/trivia - Anime trivia
/game - Start mini game

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛠️ **Utility Commands:**
/userinfo - User information (reply)
/chatinfo - Chat information
/weather <city> - Weather info
/time <timezone> - Current time
/short <url> - Shorten URL
/carbon <code> - Create code image

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ **Auto Features:**
✅ Welcome/goodbye with images
✅ User details tagging
✅ Anti-spam protection
✅ Auto-delete service messages
✅ Flood detection
✅ Bad word filter (optional)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 **Tips:**
• Make bot admin to use commands
• Reply to messages for user actions
• Use /mute 60 for 1 hour mute
• Bot detects admin permissions
• Anonymous admin support included

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👨‍💻 Owner: {owner}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`
    },
    
    // Button Styles
    BUTTONS: {
        owner: "👨‍💻 Owner",
        channel: "📢 Channel",
        group: "👥 Group",
        database: "🗄️ Database",
        help: "❓ Help",
        rules: "📜 Rules",
        games: "🎮 Games",
        admin: "👑 Admin"
    },
    
    // Bot Settings
    SETTINGS: {
        deleteJoinMessage: false,
        deleteLeaveMessage: false,
        deleteServiceMessage: false,
        deleteDelay: 5000,
        antiSpam: true,
        spamLimit: 5,
        spamTime: 10000,
        antiRaid: false,
        maxNewUsers: 10,
        raidTime: 60000,
    },
    
    // Fun Content
    FUN_CONTENT: {
        truths: [
            "What's your most embarrassing moment in this group?",
            "Who do you have a crush on in this group?",
            "What's the biggest lie you've ever told?",
            "What's your deepest secret?",
            "If you could date anyone here, who would it be?",
            "What's the most childish thing you still do?",
            "What's your biggest fear?",
            "Have you ever cheated on a test?",
            "What's the worst thing you've ever done?",
            "Who was your first crush?"
        ],
        
        dares: [
            "Send a voice message singing a song",
            "Change your profile picture to something funny",
            "Send '❤️' to a random person",
            "Do 20 pushups and send video",
            "Share your last saved meme",
            "Text your crush 'Hey'",
            "Post an embarrassing selfie",
            "Dance for 1 minute on video",
            "Send a voice message in a funny accent",
            "Call someone random and say 'I love you'"
        ],
        
        quotes: [
            "\"Believe in yourself. Not in the you who believes in me. Not the me who believes in you. Believe in the you who believes in yourself.\" - Kamina",
            "\"The world isn't perfect. But it's there for us, doing the best it can.\" - Roy Mustang",
            "\"If you don't take risks, you can't create a future.\" - Monkey D. Luffy",
            "\"Power comes in response to a need, not a desire.\" - Goku",
            "\"Whatever you lose, you'll find it again. But what you throw away you'll never get back.\" - Kenshin",
            "\"People's lives don't end when they die. It ends when they lose faith.\" - Itachi",
            "\"The ticket to the future is always open.\" - Vash",
            "\"A lesson without pain is meaningless.\" - Edward Elric",
            "\"I'll leave tomorrow's problems to tomorrow's me.\" - Saitama",
            "\"Hard work is worthless for those that don't believe in themselves.\" - Naruto"
        ],
        
        eightBallAnswers: [
            "🔮 Yes, definitely!",
            "🔮 It is certain.",
            "🔮 Without a doubt!",
            "🔮 Most likely.",
            "🔮 Signs point to yes.",
            "🔮 Ask again later.",
            "🔮 Better not tell you now.",
            "🔮 Cannot predict now.",
            "🔮 Don't count on it.",
            "🔮 My reply is no.",
            "🔮 Outlook not so good.",
            "🔮 Very doubtful."
        ]
    }
};
