// ═══════════════════════════════════════════════════════════════
// 🎌 ANIME WELCOME BOT
// Telegram Welcome Bot with Media Support
// Owner: @jamespydev2
// ═══════════════════════════════════════════════════════════════

const TelegramBot = require('node-telegram-bot-api');
const config = require('./settings');
const utils = require('./utils');

// ═══════════════════════════════════════════
// Initialize Bot
// ═══════════════════════════════════════════

const bot = new TelegramBot(config.BOT_TOKEN, { 
    polling: true,
    filepath: false
});

// ═══════════════════════════════════════════
// Global Variables
// ═══════════════════════════════════════════

const startTime = new Date();

// ═══════════════════════════════════════════
// Utility Functions
// ═══════════════════════════════════════════

function getUserMention(user) {
    const name = user.first_name || 'User';
    return `[${name}](tg://user?id=${user.id})`;
}

// Check if message is from anonymous admin (channel/group mode)
function isAnonymousAdmin(msg) {
    return msg.sender_chat && (msg.sender_chat.id === msg.chat.id || msg.sender_chat.type === 'channel');
}

// Enhanced admin check that includes anonymous admins and owner
async function canUseAdminCommand(bot, msg) {
    const chatId = msg.chat.id;
    const user = msg.from;
    
    // Check if owner
    if (user && (user.id === config.OWNER.id || user.username === config.OWNER.username.replace('@', ''))) {
        return true;
    }
    
    // Check if anonymous admin
    if (isAnonymousAdmin(msg)) {
        return true;
    }
    
    // Regular admin check
    if (user && await utils.isAdmin(bot, chatId, user.id)) {
        return true;
    }
    
    return false;
}

function formatWelcomeMessage(user) {
    const fullName = utils.getFullName(user);
    const username = user.username ? `@${user.username}` : 'No username';
    
    return config.MESSAGES.welcome
        .replace('{name}', getUserMention(user))
        .replace('{id}', user.id)
        .replace('{username}', username)
        .replace('{fullname}', fullName);
}

function formatLeaveMessage(user) {
    const fullName = utils.getFullName(user);
    
    return config.MESSAGES.leave
        .replace('{name}', fullName)
        .replace('{id}', user.id);
}

function formatStartMessage(user) {
    return config.MESSAGES.start
        .replace('{name}', user.first_name)
        .replace('{owner}', config.OWNER.username);
}

function formatHelpMessage() {
    return config.MESSAGES.help
        .replace('{owner}', config.OWNER.username);
}

// ═══════════════════════════════════════════
// Keyboard Buttons
// ═══════════════════════════════════════════

function getWelcomeKeyboard() {
    return {
        inline_keyboard: [
            [
                { text: config.BUTTONS.owner, url: `https://t.me/${config.OWNER.username.replace('@', '')}` },
                { text: config.BUTTONS.channel, url: config.LINKS.channel }
            ],
            [
                { text: config.BUTTONS.group, url: config.LINKS.group },
                { text: config.BUTTONS.database, url: config.LINKS.database }
            ]
        ]
    };
}

function getStartKeyboard() {
    return {
        inline_keyboard: [
            [
                { text: config.BUTTONS.owner, url: `https://t.me/${config.OWNER.username.replace('@', '')}` },
                { text: config.BUTTONS.help, callback_data: 'help' }
            ],
            [
                { text: config.BUTTONS.channel, url: config.LINKS.channel },
                { text: config.BUTTONS.group, url: config.LINKS.group }
            ],
            [
                { text: config.BUTTONS.database, url: config.LINKS.database }
            ]
        ]
    };
}

function getHelpKeyboard() {
    return {
        inline_keyboard: [
            [
                { text: '🔙 Back', callback_data: 'start' },
                { text: config.BUTTONS.owner, url: `https://t.me/${config.OWNER.username.replace('@', '')}` }
            ]
        ]
    };
}

// ═══════════════════════════════════════════
// Event Handlers
// ═══════════════════════════════════════════

// Handle New Members
bot.on('new_chat_members', async (msg) => {
    try {
        const chatId = msg.chat.id;
        const newMembers = msg.new_chat_members;
        
        // Delete service message if configured
        if (config.SETTINGS.deleteServiceMessage) {
            setTimeout(() => {
                bot.deleteMessage(chatId, msg.message_id).catch(() => {});
            }, config.SETTINGS.deleteDelay);
        }
        
        // Welcome each new member
        for (const member of newMembers) {
            // Skip if bot itself joins
            if (member.is_bot && member.id === bot.options.polling.params.id) {
                continue;
            }
            
            const welcomeText = formatWelcomeMessage(member);
            const keyboard = getWelcomeKeyboard();
            
            // Send welcome message with image
            if (config.WELCOME_IMAGE.url) {
                await bot.sendPhoto(chatId, config.WELCOME_IMAGE.url, {
                    caption: welcomeText,
                    parse_mode: 'Markdown',
                    reply_markup: keyboard
                });
            } else {
                await bot.sendMessage(chatId, welcomeText, {
                    parse_mode: 'Markdown',
                    reply_markup: keyboard
                });
            }
            
            console.log(`✅ Welcomed user: ${utils.getFullName(member)} (${member.id}) in chat: ${chatId}`);
        }
    } catch (error) {
        console.error('❌ Error in new_chat_members handler:', error.message);
    }
});

// Handle Left Members
bot.on('left_chat_member', async (msg) => {
    try {
        const chatId = msg.chat.id;
        const leftMember = msg.left_chat_member;
        
        // Delete service message if configured
        if (config.SETTINGS.deleteServiceMessage) {
            setTimeout(() => {
                bot.deleteMessage(chatId, msg.message_id).catch(() => {});
            }, config.SETTINGS.deleteDelay);
        }
        
        // Skip if bot itself leaves
        if (leftMember.is_bot && leftMember.id === bot.options.polling.params.id) {
            return;
        }
        
        const leaveText = formatLeaveMessage(leftMember);
        
        // Send goodbye message with image
        if (config.LEAVE_IMAGE.url) {
            await bot.sendPhoto(chatId, config.LEAVE_IMAGE.url, {
                caption: leaveText,
                parse_mode: 'Markdown'
            });
        } else {
            await bot.sendMessage(chatId, leaveText, {
                parse_mode: 'Markdown'
            });
        }
        
        console.log(`👋 User left: ${utils.getFullName(leftMember)} (${leftMember.id}) from chat: ${chatId}`);
    } catch (error) {
        console.error('❌ Error in left_chat_member handler:', error.message);
    }
});

// ═══════════════════════════════════════════
// Command Handlers
// ═══════════════════════════════════════════

// /start command
bot.onText(/\/start/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        const user = msg.from;
        
        // Only respond in private chats or when mentioned
        if (msg.chat.type !== 'private') {
            return;
        }
        
        const startText = formatStartMessage(user);
        const keyboard = getStartKeyboard();
        
        await bot.sendMessage(chatId, startText, {
            parse_mode: 'Markdown',
            reply_markup: keyboard
        });
        
        console.log(`📱 /start command from: ${utils.getFullName(user)} (${user.id})`);
    } catch (error) {
        console.error('❌ Error in /start handler:', error.message);
    }
});

// /help command
bot.onText(/\/help/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        const user = msg.from;
        
        const helpText = formatHelpMessage();
        const keyboard = getHelpKeyboard();
        
        await bot.sendMessage(chatId, helpText, {
            parse_mode: 'Markdown',
            reply_markup: keyboard
        });
        
        console.log(`❓ /help command from: ${utils.getFullName(user)} (${user.id})`);
    } catch (error) {
        console.error('❌ Error in /help handler:', error.message);
    }
});

// /stats command (Owner only)
bot.onText(/\/stats/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        const user = msg.from;
        
        // Check if user is owner
        if (user.username !== config.OWNER.username.replace('@', '') && user.id !== config.OWNER.id) {
            return;
        }
        
        const uptime = utils.getUptime(startTime);
        const stats = `
╔═══════════════════════════════╗
║     📊 BOT STATISTICS 📊      ║
╚═══════════════════════════════╝

⏱️ **Uptime:** ${uptime}
🤖 **Bot:** @${(await bot.getMe()).username}
👨‍💻 **Owner:** ${config.OWNER.username}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ Bot is running smoothly!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        
        await bot.sendMessage(chatId, stats, {
            parse_mode: 'Markdown'
        });
    } catch (error) {
        console.error('❌ Error in /stats handler:', error.message);
    }
});

// /tagall command - Tag all members
bot.onText(/\/tagall(?:\s+(.+))?/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const user = msg.from;
        const message = match[1] || 'Attention everyone!';
        
        // Only in groups
        if (msg.chat.type === 'private') {
            return;
        }
        
        // Check if user can use admin commands (includes anonymous admin)
        if (!await canUseAdminCommand(bot, msg)) {
            await bot.sendMessage(chatId, '❌ Only admins can use this command!');
            return;
        }
        
        // Get chat members count
        const chatInfo = await bot.getChat(chatId);
        const membersCount = chatInfo.member_count || await bot.getChatMembersCount(chatId);
        
        const senderName = isAnonymousAdmin(msg) ? msg.sender_chat.title : utils.getFullName(user);
        
        let tags = `╔═══════════════════════════════╗\n`;
        tags += `║       📢 TAG ALL 📢           ║\n`;
        tags += `╚═══════════════════════════════╝\n\n`;
        tags += `💬 **Message:** ${message}\n\n`;
        tags += `👥 **Tagged:** ${membersCount} members\n`;
        tags += `👤 **By:** ${senderName}\n\n`;
        tags += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        
        await bot.sendMessage(chatId, tags, { parse_mode: 'Markdown' });
        
        console.log(`📢 Tagall used by: ${senderName} in chat: ${chatId}`);
    } catch (error) {
        console.error('❌ Error in /tagall handler:', error.message);
    }
});

// /ban command - Ban user
bot.onText(/\/ban/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        const user = msg.from;
        
        // Only in groups
        if (msg.chat.type === 'private') {
            return;
        }
        
        // Check if user can use admin commands
        if (!await canUseAdminCommand(bot, msg)) {
            await bot.sendMessage(chatId, '❌ Only admins can use this command!');
            return;
        }
        
        // Check if reply to message
        if (!msg.reply_to_message) {
            await bot.sendMessage(chatId, '❌ Reply to a user to ban them!');
            return;
        }
        
        const targetUser = msg.reply_to_message.from;
        
        // Check if target is admin
        if (await utils.isAdmin(bot, chatId, targetUser.id)) {
            await bot.sendMessage(chatId, '❌ Cannot ban an admin!');
            return;
        }
        
        // Ban the user
        await bot.banChatMember(chatId, targetUser.id);
        
        const senderName = isAnonymousAdmin(msg) ? msg.sender_chat.title : getUserMention(user);
        
        const banMsg = `
╔═══════════════════════════════╗
║       🔨 USER BANNED 🔨       ║
╚═══════════════════════════════╝

👤 **User:** ${getUserMention(targetUser)}
🆔 **ID:** ${targetUser.id}
👮 **By:** ${senderName}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⛔ User has been banned from group
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        
        await bot.sendMessage(chatId, banMsg, { parse_mode: 'Markdown' });
        
        console.log(`🔨 User banned: ${utils.getFullName(targetUser)} by ${isAnonymousAdmin(msg) ? msg.sender_chat.title : utils.getFullName(user)}`);
    } catch (error) {
        console.error('❌ Error in /ban handler:', error.message);
        await bot.sendMessage(msg.chat.id, '❌ Failed to ban user. Make sure I have admin rights!').catch(() => {});
    }
});

// /unban command - Unban user
bot.onText(/\/unban/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        const user = msg.from;
        
        // Only in groups
        if (msg.chat.type === 'private') {
            return;
        }
        
        // Check if user is admin
        if (!await utils.isAdmin(bot, chatId, user.id)) {
            await bot.sendMessage(chatId, '❌ Only admins can use this command!');
            return;
        }
        
        // Check if reply to message
        if (!msg.reply_to_message) {
            await bot.sendMessage(chatId, '❌ Reply to a user to unban them!');
            return;
        }
        
        const targetUser = msg.reply_to_message.from;
        
        // Unban the user
        await bot.unbanChatMember(chatId, targetUser.id, { only_if_banned: true });
        
        const unbanMsg = `
╔═══════════════════════════════╗
║      ✅ USER UNBANNED ✅      ║
╚═══════════════════════════════╝

👤 **User:** ${getUserMention(targetUser)}
🆔 **ID:** ${targetUser.id}
👮 **By:** ${getUserMention(user)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ User has been unbanned
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        
        await bot.sendMessage(chatId, unbanMsg, { parse_mode: 'Markdown' });
        
        console.log(`✅ User unbanned: ${utils.getFullName(targetUser)} by ${utils.getFullName(user)}`);
    } catch (error) {
        console.error('❌ Error in /unban handler:', error.message);
        await bot.sendMessage(msg.chat.id, '❌ Failed to unban user. Make sure I have admin rights!').catch(() => {});
    }
});

// /mute command - Mute user
bot.onText(/\/mute(?:\s+(\d+))?/, async (msg, match) => {
    try {
        const chatId = msg.chat.id;
        const duration = match[1] ? parseInt(match[1]) : 0;
        
        if (msg.chat.type === 'private') return;
        
        if (!await canUseAdminCommand(bot, msg)) {
            await bot.sendMessage(chatId, '❌ Only admins can use this command!');
            return;
        }
        
        if (!msg.reply_to_message) {
            await bot.sendMessage(chatId, '❌ Reply to a user to mute them!\nUsage: /mute or /mute <minutes>');
            return;
        }
        
        const targetUser = msg.reply_to_message.from;
        
        if (await utils.isAdmin(bot, chatId, targetUser.id)) {
            await bot.sendMessage(chatId, '❌ Cannot mute an admin!');
            return;
        }
        
        let untilDate = 0;
        let durationText = 'Permanently';
        if (duration > 0) {
            untilDate = Math.floor(Date.now() / 1000) + (duration * 60);
            durationText = `${duration} minute${duration > 1 ? 's' : ''}`;
        }
        
        await bot.restrictChatMember(chatId, targetUser.id, {
            can_send_messages: false,
            can_send_media_messages: false,
            can_send_polls: false,
            can_send_other_messages: false,
            can_add_web_page_previews: false,
            can_change_info: false,
            can_invite_users: false,
            can_pin_messages: false,
            until_date: untilDate
        });
        
        const senderName = isAnonymousAdmin(msg) ? msg.sender_chat.title : getUserMention(msg.from);
        
        const muteMsg = `
╔═══════════════════════════════╗
║       🔇 USER MUTED 🔇        ║
╚═══════════════════════════════╝

👤 **User:** ${getUserMention(targetUser)}
🆔 **ID:** ${targetUser.id}
⏱️ **Duration:** ${durationText}
👮 **By:** ${senderName}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔇 User cannot send messages
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        
        await bot.sendMessage(chatId, muteMsg, { parse_mode: 'Markdown' });
        console.log(`🔇 User muted for ${durationText}`);
    } catch (error) {
        console.error('❌ Error in /mute handler:', error.message);
        await bot.sendMessage(msg.chat.id, '❌ Failed to mute user!').catch(() => {});
    }
});

// /unmute command - Unmute user
bot.onText(/\/unmute/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        
        if (msg.chat.type === 'private') return;
        
        if (!await canUseAdminCommand(bot, msg)) {
            await bot.sendMessage(chatId, '❌ Only admins can use this command!');
            return;
        }
        
        if (!msg.reply_to_message) {
            await bot.sendMessage(chatId, '❌ Reply to a user to unmute them!');
            return;
        }
        
        const targetUser = msg.reply_to_message.from;
        
        await bot.restrictChatMember(chatId, targetUser.id, {
            can_send_messages: true,
            can_send_media_messages: true,
            can_send_polls: true,
            can_send_other_messages: true,
            can_add_web_page_previews: true,
            can_change_info: false,
            can_invite_users: true,
            can_pin_messages: false
        });
        
        const senderName = isAnonymousAdmin(msg) ? msg.sender_chat.title : getUserMention(msg.from);
        
        const unmuteMsg = `
╔═══════════════════════════════╗
║      🔊 USER UNMUTED 🔊       ║
╚═══════════════════════════════╝

👤 **User:** ${getUserMention(targetUser)}
👮 **By:** ${senderName}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔊 User can now send messages
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        
        await bot.sendMessage(chatId, unmuteMsg, { parse_mode: 'Markdown' });
        console.log(`🔊 User unmuted`);
    } catch (error) {
        console.error('❌ Error in /unmute handler:', error.message);
    }
});

// /promote command - Promote user to admin
bot.onText(/\/promote/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        
        if (msg.chat.type === 'private') return;
        
        if (!await canUseAdminCommand(bot, msg)) {
            await bot.sendMessage(chatId, '❌ Only admins can use this command!');
            return;
        }
        
        if (!msg.reply_to_message) {
            await bot.sendMessage(chatId, '❌ Reply to a user to promote them!');
            return;
        }
        
        const targetUser = msg.reply_to_message.from;
        
        if (await utils.isAdmin(bot, chatId, targetUser.id)) {
            await bot.sendMessage(chatId, '❌ User is already an admin!');
            return;
        }
        
        await bot.promoteChatMember(chatId, targetUser.id, {
            can_manage_chat: true,
            can_delete_messages: true,
            can_manage_video_chats: true,
            can_restrict_members: true,
            can_promote_members: false,
            can_change_info: true,
            can_invite_users: true,
            can_pin_messages: true,
            is_anonymous: false
        });
        
        const senderName = isAnonymousAdmin(msg) ? msg.sender_chat.title : getUserMention(msg.from);
        
        const promoteMsg = `
╔═══════════════════════════════╗
║      ⭐ USER PROMOTED ⭐      ║
╚═══════════════════════════════╝

👤 **User:** ${getUserMention(targetUser)}
👮 **By:** ${senderName}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⭐ User is now an administrator
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        
        await bot.sendMessage(chatId, promoteMsg, { parse_mode: 'Markdown' });
        console.log(`⭐ User promoted`);
    } catch (error) {
        console.error('❌ Error in /promote handler:', error.message);
        await bot.sendMessage(msg.chat.id, '❌ Failed to promote user!').catch(() => {});
    }
});

// /demote command - Demote user from admin
bot.onText(/\/demote/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        
        if (msg.chat.type === 'private') return;
        
        if (!await canUseAdminCommand(bot, msg)) {
            await bot.sendMessage(chatId, '❌ Only admins can use this command!');
            return;
        }
        
        if (!msg.reply_to_message) {
            await bot.sendMessage(chatId, '❌ Reply to a user to demote them!');
            return;
        }
        
        const targetUser = msg.reply_to_message.from;
        
        const targetMember = await bot.getChatMember(chatId, targetUser.id);
        if (targetMember.status === 'creator') {
            await bot.sendMessage(chatId, '❌ Cannot demote the group creator!');
            return;
        }
        
        if (!['administrator'].includes(targetMember.status)) {
            await bot.sendMessage(chatId, '❌ User is not an admin!');
            return;
        }
        
        await bot.promoteChatMember(chatId, targetUser.id, {
            can_manage_chat: false,
            can_delete_messages: false,
            can_manage_video_chats: false,
            can_restrict_members: false,
            can_promote_members: false,
            can_change_info: false,
            can_invite_users: false,
            can_pin_messages: false,
            is_anonymous: false
        });
        
        const senderName = isAnonymousAdmin(msg) ? msg.sender_chat.title : getUserMention(msg.from);
        
        const demoteMsg = `
╔═══════════════════════════════╗
║      📉 USER DEMOTED 📉       ║
╚═══════════════════════════════╝

👤 **User:** ${getUserMention(targetUser)}
👮 **By:** ${senderName}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📉 User is no longer an admin
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
        
        await bot.sendMessage(chatId, demoteMsg, { parse_mode: 'Markdown' });
        console.log(`📉 User demoted`);
    } catch (error) {
        console.error('❌ Error in /demote handler:', error.message);
        await bot.sendMessage(msg.chat.id, '❌ Failed to demote user!').catch(() => {});
    }
});

// /pin command - Pin message
bot.onText(/\/pin/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        
        if (msg.chat.type === 'private') return;
        
        if (!await canUseAdminCommand(bot, msg)) {
            await bot.sendMessage(chatId, '❌ Only admins can use this command!');
            return;
        }
        
        if (!msg.reply_to_message) {
            await bot.sendMessage(chatId, '❌ Reply to a message to pin it!');
            return;
        }
        
        await bot.pinChatMessage(chatId, msg.reply_to_message.message_id);
        await bot.sendMessage(chatId, '📌 Message pinned successfully!');
        console.log(`📌 Message pinned`);
    } catch (error) {
        console.error('❌ Error in /pin handler:', error.message);
        await bot.sendMessage(msg.chat.id, '❌ Failed to pin message!').catch(() => {});
    }
});

// /unpin command - Unpin message
bot.onText(/\/unpin/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        
        if (msg.chat.type === 'private') return;
        
        if (!await canUseAdminCommand(bot, msg)) {
            await bot.sendMessage(chatId, '❌ Only admins can use this command!');
            return;
        }
        
        await bot.unpinChatMessage(chatId);
        await bot.sendMessage(chatId, '📌 Message unpinned successfully!');
        console.log(`📌 Message unpinned`);
    } catch (error) {
        console.error('❌ Error in /unpin handler:', error.message);
        await bot.sendMessage(msg.chat.id, '❌ Failed to unpin message!').catch(() => {});
    }
});

// /del command - Delete message
bot.onText(/\/del/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        
        if (msg.chat.type === 'private') return;
        
        if (!await canUseAdminCommand(bot, msg)) {
            await bot.sendMessage(chatId, '❌ Only admins can use this command!');
            return;
        }
        
        if (!msg.reply_to_message) {
            await bot.sendMessage(chatId, '❌ Reply to a message to delete it!');
            return;
        }
        
        await bot.deleteMessage(chatId, msg.reply_to_message.message_id);
        await bot.deleteMessage(chatId, msg.message_id);
        console.log(`🗑️ Message deleted`);
    } catch (error) {
        console.error('❌ Error in /del handler:', error.message);
    }
});

// /admins command - List all admins
bot.onText(/\/admins/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        
        if (msg.chat.type === 'private') return;
        
        const admins = await bot.getChatAdministrators(chatId);
        
        let adminsList = `╔═══════════════════════════════╗\n`;
        adminsList += `║      👑 ADMIN LIST 👑         ║\n`;
        adminsList += `╚═══════════════════════════════╝\n\n`;
        
        admins.forEach((admin) => {
            const status = admin.status === 'creator' ? '👑' : '⭐';
            const name = utils.getFullName(admin.user);
            const username = admin.user.username ? `@${admin.user.username}` : 'No username';
            adminsList += `${status} **${name}**\n`;
            adminsList += `   └ ${username} (${admin.user.id})\n\n`;
        });
        
        adminsList += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        adminsList += `📊 **Total Admins:** ${admins.length}`;
        
        await bot.sendMessage(chatId, adminsList, { parse_mode: 'Markdown' });
    } catch (error) {
        console.error('❌ Error in /admins handler:', error.message);
    }
});

// /id command - Get user/chat ID
bot.onText(/\/id/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        const user = msg.from;
        
        let idMsg = `╔═══════════════════════════════╗\n`;
        idMsg += `║         🆔 ID INFO 🆔         ║\n`;
        idMsg += `╚═══════════════════════════════╝\n\n`;
        
        if (msg.reply_to_message) {
            const targetUser = msg.reply_to_message.from;
            idMsg += `👤 **User:** ${utils.getFullName(targetUser)}\n`;
            idMsg += `🆔 **User ID:** \`${targetUser.id}\`\n`;
            if (targetUser.username) {
                idMsg += `👤 **Username:** @${targetUser.username}\n`;
            }
        } else {
            idMsg += `👤 **Your Name:** ${utils.getFullName(user)}\n`;
            idMsg += `🆔 **Your ID:** \`${user.id}\`\n`;
            if (user.username) {
                idMsg += `👤 **Username:** @${user.username}\n`;
            }
        }
        
        idMsg += `\n💬 **Chat ID:** \`${chatId}\`\n`;
        idMsg += `📱 **Chat Type:** ${msg.chat.type}\n`;
        
        await bot.sendMessage(chatId, idMsg, { parse_mode: 'Markdown' });
    } catch (error) {
        console.error('❌ Error in /id handler:', error.message);
    }
});

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
        
        await bot.sendMessage(chatId, `
╔═══════════════════════════════╗
║      💭 ANIME QUOTE 💭        ║
╚═══════════════════════════════╝

${randomQuote}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ Inspirational!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`, { parse_mode: 'Markdown' });
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
        
        await bot.sendMessage(chatId, `
╔═══════════════════════════════╗
║      💕 COUPLE OF THE DAY 💕  ║
╚═══════════════════════════════╝

👫 Today's couple has been chosen!

💝 **Love Percentage:** ${love}%
${hearts}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${love > 70 ? '🔥 Perfect match!' : love > 40 ? '💫 Good chemistry!' : '😅 Just friends!'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
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
        
        await bot.sendMessage(chatId, `
╔═══════════════════════════════╗
║      🎲 DICE ROLL 🎲          ║
╚═══════════════════════════════╝

🎲 Dice 1: **${dice1}**
🎲 Dice 2: **${dice2}**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 **Total:** ${total}
${total === 12 ? '🎉 JACKPOT! Double six!' : total === 2 ? '😅 Snake eyes!' : '✨ Good roll!'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`, { parse_mode: 'Markdown' });
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
        
        await bot.sendMessage(chatId, `
╔═══════════════════════════════╗
║      🔮 MAGIC 8-BALL 🔮       ║
╚═══════════════════════════════╝

❓ **Question:**
${question}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${randomAnswer}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
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
        
        await bot.sendMessage(chatId, `
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
`);
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
        
        await bot.sendMessage(chatId, `
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
`, { parse_mode: 'Markdown' });
    } catch (error) {
        console.error('❌ Error in /userinfo handler:', error.message);
    }
});

// /rules command
bot.onText(/\/rules/, async (msg) => {
    try {
        const chatId = msg.chat.id;
        
        await bot.sendMessage(chatId, `
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
`, { parse_mode: 'Markdown' });
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
        
        await bot.sendMessage(chatId, `
╔═══════════════════════════════╗
║      ⚠️ USER WARNED ⚠️        ║
╚═══════════════════════════════╝

👤 **User:** ${getUserMention(targetUser)}
📝 **Reason:** ${reason}
👮 **By:** ${senderName}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ Please follow the rules!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`, { parse_mode: 'Markdown' });
    } catch (error) {
        console.error('❌ Error in /warn handler:', error.message);
    }
});

// ═══════════════════════════════════════════
// Callback Query Handlers
// ═══════════════════════════════════════════

bot.on('callback_query', async (query) => {
    try {
        const chatId = query.message.chat.id;
        const messageId = query.message.message_id;
        const data = query.data;
        const user = query.from;
        
        // Answer callback to remove loading state
        await bot.answerCallbackQuery(query.id);
        
        if (data === 'help') {
            const helpText = formatHelpMessage();
            const keyboard = getHelpKeyboard();
            
            await bot.editMessageText(helpText, {
                chat_id: chatId,
                message_id: messageId,
                parse_mode: 'Markdown',
                reply_markup: keyboard
            });
        } else if (data === 'start') {
            const startText = formatStartMessage(user);
            const keyboard = getStartKeyboard();
            
            await bot.editMessageText(startText, {
                chat_id: chatId,
                message_id: messageId,
                parse_mode: 'Markdown',
                reply_markup: keyboard
            });
        }
    } catch (error) {
        console.error('❌ Error in callback_query handler:', error.message);
    }
});

// ═══════════════════════════════════════════
// Error Handling
// ═══════════════════════════════════════════

bot.on('polling_error', (error) => {
    console.error('❌ Polling error:', error.message);
});

bot.on('error', (error) => {
    console.error('❌ Bot error:', error.message);
});

// ═══════════════════════════════════════════
// Startup
// ═══════════════════════════════════════════

async function startBot() {
    try {
        const botInfo = await bot.getMe();
        console.log('\n' + '═'.repeat(50));
        console.log('🎌 ANIME WELCOME BOT STARTED 🎌');
        console.log('═'.repeat(50));
        console.log(`🤖 Bot Username: @${botInfo.username}`);
        console.log(`🆔 Bot ID: ${botInfo.id}`);
        console.log(`👨‍💻 Owner: ${config.OWNER.username}`);
        console.log(`⏰ Started at: ${startTime.toLocaleString()}`);
        console.log('═'.repeat(50));
        console.log('✅ Bot is running! Waiting for events...\n');
    } catch (error) {
        console.error('❌ Failed to start bot:', error.message);
        process.exit(1);
    }
}

// Start the bot
startBot();

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n🛑 Bot stopped by user');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Bot stopped');
    process.exit(0);
});
