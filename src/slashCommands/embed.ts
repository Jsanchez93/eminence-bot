import { SlashCommandBuilder, TextChannel, EmbedBuilder, ColorResolvable } from 'discord.js'

import { SlashCommand } from '../types'

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('embed')
    .addStringOption(option => {
      return option
        .setName('title')
        .setDescription('Title of the embed message')
        .setRequired(true)
    })
    .addStringOption(option => {
      return option
        .setName('description')
        .setDescription('Description of the embed message.')
        .setRequired(true)
    })
    .addChannelOption(option => {
      return option
        .setName('channel')
        .setDescription('Text channel where the embed message will be sent.')
        .setRequired(true)
    })
    .addStringOption(option => {
      return option
        .setName('color')
        .setDescription('Select an option or type an hex color, for example: #000000')
        .setRequired(true)
        .setAutocomplete(true)
    })
    .addStringOption(option => {
      return option
        .setName('url')
        .setDescription('URL of the embed message.')
        .setRequired(false)
    })
    .addAttachmentOption(option => {
      return option
        .setName('image')
        .setDescription('Image of the embed message.')
        .setRequired(false)
    })
    .addAttachmentOption(option => {
      return option
        .setName('thumbnail')
        .setDescription('Thumbnail of the embed message.')
        .setRequired(false)
    })
    .addStringOption(option => {
      return option
        .setName('footer')
        .setDescription('Footer of the embed message.')
        .setRequired(false)
    })
    .setDescription('Create a new embed message.'),
  autocomplete: async interaction => {
    try {
      const focusedValue = interaction.options.getFocused()
      const choices = [
        { name: 'White', value: 'White' },
        { name: 'Aqua', value: 'Aqua' },
        { name: 'Green', value: 'Green' },
        { name: 'Blue', value: 'Blue' },
        { name: 'Yellow', value: 'Yellow' },
        { name: 'Purple', value: 'Purple' },
        { name: 'LuminousVividPink', value: 'LuminousVividPink' },
        { name: 'Fuchsia', value: 'Fuchsia' },
        { name: 'Gold', value: 'Gold' },
        { name: 'Orange', value: 'Orange' },
        { name: 'Red', value: 'Red' },
        { name: 'Grey', value: 'Grey' },
        { name: 'Navy', value: 'Navy' },
        { name: 'DarkAqua', value: 'DarkAqua' },
        { name: 'DarkGreen', value: 'DarkGreen' },
        { name: 'DarkBlue', value: 'DarkBlue' },
        { name: 'DarkPurple', value: 'DarkPurple' },
        { name: 'DarkVividPink', value: 'DarkVividPink' },
        { name: 'DarkGold', value: 'DarkGold' },
        { name: 'DarkOrange', value: 'DarkOrange' },
        { name: 'DarkRed', value: 'DarkRed' },
        { name: 'DarkGrey', value: 'DarkGrey' },
        { name: 'DarkerGrey', value: 'DarkerGrey' },
        { name: 'LightGrey', value: 'LightGrey' },
        { name: 'DarkNavy', value: 'DarkNavy' }
      ]
      const filtered = choices.filter(choice => choice.name.includes(focusedValue))
      await interaction.respond(filtered)
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  },
  execute: async (interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true })
      if (!interaction.options) return interaction.editReply({ content: 'Something went wrong...' })

      const options = interaction.options?.data.reduce((acc, element) => {
        if (element.name && element.value) {
          acc[element.name] = element.value
        }
        return acc
      }, {} as Record<string, string | number | boolean>)

      const image = interaction.options.getAttachment("image")
      const thumbnail = interaction.options.getAttachment("thumbnail")

      const embed = new EmbedBuilder()
        .setColor(options.color.toString() as ColorResolvable)
        .setTitle(options.title.toString())
        .setURL(options.url ? options.url.toString() : null)
        .setDescription(options.description.toString())
        .setAuthor({ name: interaction.client.user?.username || 'Default Name', iconURL: interaction.client.user?.avatarURL() ?? undefined })
        .setThumbnail(thumbnail?.url ?? null)
        .setImage(image?.url ?? null)
        .setTimestamp()
        .setFooter({ text: options.footer ? options.footer.toString() : ' ', iconURL: interaction.client.user?.avatarURL() ?? undefined })
      const selectedTextChannel = interaction.channel?.client.channels.cache.get(options.channel.toString()) as TextChannel
      await selectedTextChannel.send({ embeds: [embed] })
      return interaction.editReply({ content: 'Embed message successfully sent.' })
    } catch (error) {
      console.log(`Error: ${error.message}`);
      return interaction.editReply({ content: 'Something went wrong...' })
    }
  },
  cooldown: 10
}

export default command
