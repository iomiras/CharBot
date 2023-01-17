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


        const botMember = await interaction.client.guilds.cache.first().members.fetch(interaction.client.user);
        try {
            await botMember.setNickname(global.characterToPlay);
            console.log(`Changed nickname to ${botMember.nickname}`);
        } catch (error) {
            console.log(error);
        }
    },
};