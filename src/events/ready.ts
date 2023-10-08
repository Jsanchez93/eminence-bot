import { Client, TextChannel } from 'discord.js'
import { CronJob } from 'cron'

import { BotEvent } from '../types'
import { color } from '../functions'

const dailyMessage = (client: Client) => {
  const channelId = process.env.CHANNEL_ID_DAILY
  const roleId = process.env.ROLE_ID
  const cronConfig = process.env.CRON_CONFIG
  if (!channelId || !roleId || !cronConfig) return

  const cron = new CronJob(cronConfig, () => {
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
