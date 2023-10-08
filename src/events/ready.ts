import { Client, TextChannel } from 'discord.js'
import { CronJob } from 'cron'

import { BotEvent } from '../types'
import { color } from '../functions'

const dailyMessage = (client: Client) => {
  const channelId = process.env.CHANNEL_ID
  const roleId = process.env.ROLE_ID
  if (!channelId || !roleId) return

  // daily at 4:00 PM -> 0 16 * * 1-7
  const cron = new CronJob('0 16 * * 1-7', () => {
    const channel = client.channels.cache.get(channelId)
    if (!channel) return
    const textChannel = channel as TextChannel
    textChannel.send({
      content: `<@&${roleId}>`,
      files: ['./assets/daily.png'],
    })
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
