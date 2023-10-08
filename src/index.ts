import { Client, Collection, GatewayIntentBits } from 'discord.js'
import { config } from 'dotenv'
import { readdirSync } from 'fs'
import { join } from 'path'

import { Command, SlashCommand } from './types'

config()

const { Guilds, GuildMessages, DirectMessages, MessageContent } = GatewayIntentBits
const client = new Client({
  intents:[Guilds, GuildMessages, DirectMessages, MessageContent]
})

client.slashCommands = new Collection<string, SlashCommand>()
client.commands = new Collection<string, Command>()
client.cooldowns = new Collection<string, number>()

const handlersDir = join(__dirname, './handlers')
readdirSync(handlersDir).forEach(handler => {
  if (!handler.endsWith('.js')) return
  require(`${handlersDir}/${handler}`)(client)
})

client.login(process.env.TOKEN)
