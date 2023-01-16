const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');

// let data = JSON.parse(fs.readFileSync('./char.json'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('char')
        .setDescription('Change the character')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Which character should I play?')
                .setMinLength(2)
                .setMaxLength(2000)
                .setRequired(true)
                .setAutocomplete(true)),
    async execute(interaction) {
        global.characterToPlay = interaction.options.getString('name')

        await interaction.reply(`changed to ${global.characterToPlay}`);


        try {
            await interaction.client.user.setUsername(global.characterToPlay);
            console.log(`Changed username to ${interaction.client.user.username}`);
        } catch (error) {
            console.log(error);
        }
    },
};