// ═══════════════════════════════════════════
// 🎌 CREATIVE FEATURES & FUN COMMANDS
// Add these to index.js after the existing commands
// ═══════════════════════════════════════════

// Update remaining admin commands with anonymous support - Replace existing ones

// /unban command
bot.onText(/\/unban/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        if (msg.chat.type === 'private') return;
        
        if (!await canUseAdminCommand(bot, msg)) {
            await bot.sendMessage(chatId, '❌ Only admins can use this command!');
            return;
        }
        
        if (!msg.reply_to_message) {
            await bot.sendMessage(chatId, '❌ Reply to a user to unban them!');
            return;
        }
        
        const targetUser = msg.reply_to_message.from;
        await bot.unbanChatMember(chatId, targetUser.id, { only_if_banned: true });
        
        const senderName = isAnonymousAdmin(msg) ? msg.sender_chat.title : getUserMention(msg.from);
        
        const unbanMsg = `
╔═══════════════════════════════╗
║      ✅ USER UNBANNED ✅      ║
╚═══════════════════════════════╝

👤 **User:** ${getUserMention(targetUser)}
🆔 **ID:** ${targetUser.id}
👮 **By:** ${senderName}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ User has been unbanned
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        
        await bot.sendMessage(chatId, unbanMsg, { parse_mode: 'Markdown' });
        console.log(`✅ User unbanned by anonymous admin in chat: ${chatId}`);
    } catch (error) {
        console.error('❌ Error in /unban handler:', error.message);
        await bot.sendMessage(msg.chat.id, '❌ Failed to unban user!').catch(() => {});
    }
});

// /kick command
bot.onText(/\/kick/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        if (msg.chat.type === 'private') return;
        
        if (!await canUseAdminCommand(bot, msg)) {
            await bot.sendMessage(chatId, '❌ Only admins can use this command!');
            return;
        }
        
        if (!msg.reply_to_message) {
            await bot.sendMessage(chatId, '❌ Reply to a user to kick them!');
            return;
        }
        
        const targetUser = msg.reply_to_message.from;
        
        if (await utils.isAdmin(bot, chatId, targetUser.id)) {
            await bot.sendMessage(chatId, '❌ Cannot kick an admin!');
            return;
        }
        
        await bot.banChatMember(chatId, targetUser.id);
        await bot.unbanChatMember(chatId, targetUser.id);
        
        const senderName = isAnonymousAdmin(msg) ? msg.sender_chat.title : getUserMention(msg.from);
        
        await bot.sendMessage(chatId, `
╔═══════════════════════════════╗
║       👢 USER KICKED 👢       ║
╚═══════════════════════════════╝

👤 **User:** ${getUserMention(targetUser)}
👮 **By:** ${senderName}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👢 User has been kicked
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`, { parse_mode: 'Markdown' });
    } catch (error) {
        console.error('❌ Error in /kick handler:', error.message);
    }
});

// /mute, /unmute, /promote, /demote, /pin, /unpin, /del - Update similarly with canUseAdminCommand

// ═══════════════════════════════════════════
// 🎮 FUN COMMANDS
// ═══════════════════════════════════════════

// /truth command
bot.onText(/\/truth/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        const truths = config.FUN_CONTENT.truths;
        const randomTruth = truths[Math.floor(Math.random() * truths.length)];
        
        const truthMsg = `
╔═══════════════════════════════╗
║      ❓ TRUTH QUESTION ❓     ║
╚═══════════════════════════════╝

${randomTruth}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎲 Answer honestly!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        
        await bot.sendMessage(chatId, truthMsg);
    } catch (error) {
        console.error('❌ Error in /truth handler:', error.message);
    }
});

// /dare command
bot.onText(/\/dare/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        const dares = config.FUN_CONTENT.dares;
        const randomDare = dares[Math.floor(Math.random() * dares.length)];
        
        const dareMsg = `
╔═══════════════════════════════╗
║      🎯 DARE CHALLENGE 🎯     ║
╚═══════════════════════════════╝

${randomDare}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💪 Are you brave enough?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        
        await bot.sendMessage(chatId, dareMsg);
    } catch (error) {
        console.error('❌ Error in /dare handler:', error.message);
    }
});

// /quote command
bot.onText(/\/quote/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        const quotes = config.FUN_CONTENT.quotes;
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        
        const quoteMsg = `
╔═══════════════════════════════╗
║      💭 ANIME QUOTE 💭        ║
╚═══════════════════════════════╝

${randomQuote}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ Inspirational!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        
        await bot.sendMessage(chatId, quoteMsg, { parse_mode: 'Markdown' });
    } catch (error) {
        console.error('❌ Error in /quote handler:', error.message);
    }
});

// /couple command
bot.onText(/\/couple/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        
        if (msg.chat.type === 'private') {
            await bot.sendMessage(chatId, '❌ This command only works in groups!');
            return;
        }
        
        const love = Math.floor(Math.random() * 101);
        const hearts = '❤️'.repeat(Math.floor(love / 20));
        
        const coupleMsg = `
╔═══════════════════════════════╗
║      💕 COUPLE OF THE DAY 💕  ║
╚═══════════════════════════════╝

👫 Today's couple has been chosen!

💝 **Love Percentage:** ${love}%
${hearts}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${love > 70 ? '🔥 Perfect match!' : love > 40 ? '💫 Good chemistry!' : '😅 Just friends!'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        
        await bot.sendMessage(chatId, coupleMsg);
    } catch (error) {
        console.error('❌ Error in /couple handler:', error.message);
    }
});

// /roll command
bot.onText(/\/roll/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        const total = dice1 + dice2;
        
        const rollMsg = `
╔═══════════════════════════════╗
║      🎲 DICE ROLL 🎲          ║
╚═══════════════════════════════╝

🎲 Dice 1: **${dice1}**
🎲 Dice 2: **${dice2}**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 **Total:** ${total}
${total === 12 ? '🎉 JACKPOT! Double six!' : total === 2 ? '😅 Snake eyes!' : '✨ Good roll!'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        
        await bot.sendMessage(chatId, rollMsg, { parse_mode: 'Markdown' });
    } catch (error) {
        console.error('❌ Error in /roll handler:', error.message);
    }
});

// /8ball command
bot.onText(/\/8ball(?:\s+(.+))?/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const question = match[1];
        
        if (!question) {
            await bot.sendMessage(chatId, '❌ Please ask a question!\nExample: /8ball Will I be rich?');
            return;
        }
        
        const answers = config.FUN_CONTENT.eightBallAnswers;
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
        
        const ballMsg = `
╔═══════════════════════════════╗
║      🔮 MAGIC 8-BALL 🔮       ║
╚═══════════════════════════════╝

❓ **Question:**
${question}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${randomAnswer}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        
        await bot.sendMessage(chatId, ballMsg);
    } catch (error) {
        console.error('❌ Error in /8ball handler:', error.message);
    }
});

// /ship command
bot.onText(/\/ship/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        
        if (!msg.reply_to_message) {
            await bot.sendMessage(chatId, '❌ Reply to someone to ship them!');
            return;
        }
        
        const user1 = msg.from;
        const user2 = msg.reply_to_message.from;
        
        const compatibility = Math.floor(Math.random() * 101);
        const hearts = '💖'.repeat(Math.floor(compatibility / 20));
        
        const shipMsg = `
╔═══════════════════════════════╗
║      💕 SHIP METER 💕         ║
╚═══════════════════════════════╝

👤 ${utils.getFullName(user1)}
❤️
👤 ${utils.getFullName(user2)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💝 **Compatibility:** ${compatibility}%
${hearts}

${compatibility > 80 ? '🔥 Soulmates!' : compatibility > 50 ? '💫 Great match!' : compatibility > 25 ? '😊 Could work!' : '😅 Better as friends!'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        
        await bot.sendMessage(chatId, shipMsg);
    } catch (error) {
        console.error('❌ Error in /ship handler:', error.message);
    }
});

// /info command - Group info
bot.onText(/\/info/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        
        if (msg.chat.type === 'private') {
            await bot.sendMessage(chatId, '❌ This command only works in groups!');
            return;
        }
        
        const chat = await bot.getChat(chatId);
        const adminsCount = (await bot.getChatAdministrators(chatId)).length;
        const membersCount = await bot.getChatMembersCount(chatId);
        
        const infoMsg = `
╔═══════════════════════════════╗
║      📊 GROUP INFO 📊         ║
╚═══════════════════════════════╝

📝 **Name:** ${chat.title}
🆔 **ID:** \`${chatId}\`
📱 **Type:** ${chat.type}
👥 **Members:** ${membersCount}
👑 **Admins:** ${adminsCount}

${chat.description ? `📄 **Description:**\n${chat.description}\n\n` : ''}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ Group information
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        
        if (chat.photo) {
            await bot.sendPhoto(chatId, chat.photo.big_file_id, {
                caption: infoMsg,
                parse_mode: 'Markdown'
            });
        } else {
            await bot.sendMessage(chatId, infoMsg, { parse_mode: 'Markdown' });
        }
    } catch (error) {
        console.error('❌ Error in /info handler:', error.message);
    }
});

// /userinfo command
bot.onText(/\/userinfo/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        const targetUser = msg.reply_to_message ? msg.reply_to_message.from : msg.from;
        
        const member = msg.chat.type !== 'private' ? await bot.getChatMember(chatId, targetUser.id) : null;
        
        const userinfoMsg = `
╔═══════════════════════════════╗
║      👤 USER INFO 👤          ║
╚═══════════════════════════════╝

📝 **Name:** ${utils.getFullName(targetUser)}
🆔 **ID:** \`${targetUser.id}\`
👤 **Username:** ${targetUser.username ? '@' + targetUser.username : 'None'}
🤖 **Bot:** ${targetUser.is_bot ? 'Yes' : 'No'}
${member ? `👑 **Status:** ${member.status}\n` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ User information
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        
        await bot.sendMessage(chatId, userinfoMsg, { parse_mode: 'Markdown' });
    } catch (error) {
        console.error('❌ Error in /userinfo handler:', error.message);
    }
});

// /rules command
bot.onText(/\/rules/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        
        const rulesMsg = `
╔═══════════════════════════════╗
║      📜 GROUP RULES 📜        ║
╚═══════════════════════════════╝

1️⃣ **Be Respectful**
   Treat everyone with respect

2️⃣ **No Spam**
   Don't flood the chat

3️⃣ **No NSFW Content**
   Keep it family friendly

4️⃣ **No Self Promotion**
   Ask admins first

5️⃣ **English Only**
   Use English in main chat

6️⃣ **Follow Telegram ToS**
   Respect platform rules

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ Breaking rules may result in
warnings, mutes, or bans
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        
        await bot.sendMessage(chatId, rulesMsg, { parse_mode: 'Markdown' });
    } catch (error) {
        console.error('❌ Error in /rules handler:', error.message);
    }
});

// /warn command
bot.onText(/\/warn(?:\s+(.+))?/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        
        if (msg.chat.type === 'private') return;
        
        if (!await canUseAdminCommand(bot, msg)) {
            await bot.sendMessage(chatId, '❌ Only admins can use this command!');
            return;
        }
        
        if (!msg.reply_to_message) {
            await bot.sendMessage(chatId, '❌ Reply to a user to warn them!');
            return;
        }
        
        const targetUser = msg.reply_to_message.from;
        const reason = match[1] || 'No reason specified';
        const senderName = isAnonymousAdmin(msg) ? msg.sender_chat.title : getUserMention(msg.from);
        
        const warnMsg = `
╔═══════════════════════════════╗
║      ⚠️ USER WARNED ⚠️        ║
╚═══════════════════════════════╝

👤 **User:** ${getUserMention(targetUser)}
📝 **Reason:** ${reason}
👮 **By:** ${senderName}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ Please follow the rules!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        
        await bot.sendMessage(chatId, warnMsg, { parse_mode: 'Markdown' });
    } catch (error) {
        console.error('❌ Error in /warn handler:', error.message);
    }
});

console.log('✅ Creative features loaded successfully!');
