import { PermissionFlagsBits } from 'discord.js'

import { Command } from '../types'

const command : Command = {
    name: 'greet',
    execute: (message, args) => {
        const toGreet = message.mentions.members?.first()
        const toGreetTxt = toGreet ? toGreet.user.username : message.member?.user.username
        message.channel.send(`Hello there ${toGreetTxt}!`)
    },
    cooldown: 10,
    aliases: ['sayhello'],
    permissions: ['Administrator', PermissionFlagsBits.ManageEmojisAndStickers] // to test
}

export default command
