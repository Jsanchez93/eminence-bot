import { EmbedBuilder, Message } from 'discord.js'

import { BotEvent } from '../types'

let lastMessage: Message

const event: BotEvent = {
  name: 'messageCreate',
  once: false,
  execute: async (message: Message) => {
    if (message.author.bot) return
    if (!message.member || message.member.user.bot) return
    if (!message.guild) return
        
    // #general
    const channelId = process.env.CHANNEL_ID_STICKY
    if (message.channelId !== channelId) return

    lastMessage?.delete().catch(console.error)

    const year = new Date().getFullYear()
    const month = new Date().toLocaleString('en-US', { month: 'long' });

    const dmLogEmbed = new EmbedBuilder()
      .setColor('Blue')
      .setTitle(`How can I get verified? (New verification ${month} ${year})`)
      .setDescription(`
        ✅ Send a screenshot of your main character.
        📝 If you have alternate characters, specify their nicknames.
        💌 If you are a guest, please notify an admin.
        
        ⚠️ Remember that it must be a good quality screenshot, where you can see all the information about your character (nickname, guild, level, CP, etc)
        ⛔ The screenshot must be taken from your computer, not from a phone.
      `)
      .setTimestamp()
      .setFooter({ text: '🕓 Please wait patiently for server access.' })
    
    lastMessage = await message.channel.send({ embeds: [dmLogEmbed] })
  }
}

export default event
