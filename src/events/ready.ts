import { Client, EmbedBuilder, TextChannel } from 'discord.js'
import { CronJob } from 'cron'

import { BotEvent } from '../types'
import { color } from '../functions'

const dailyMessage = (client: Client) => {
  const channelId = process.env.CHANNEL_ID
  const message = new EmbedBuilder()
    .setColor('Blue')
    .setTitle('Daily message')
    .setDescription(`
      ✅ Send a screenshot of your main character.
      📝 If you have alternate characters, specify their nicknames.
      💌 If you are a guest, please notify an admin.
    `)
    .setTimestamp()

  // daily at 4:00 PM -> 0 16 * * 1-7
  const cron = new CronJob('*/10 * * * * *', () => {
    const channel = client.channels.cache.get(channelId)
    if (!channel) return
    const textChannel = channel as TextChannel
    textChannel.send({ embeds: [message] })
  })
  
  cron.start()
}

const event : BotEvent = {
  name: 'ready',
  once: true,
  execute: (client : Client) => {
    dailyMessage(client)
    console.log(
      color('text', `💪 Logged in as ${color('variable', client.user?.tag)}`)
    )
  }
}

export default event
