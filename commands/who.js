const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');

// let data = JSON.parse(fs.readFileSync('./char.json'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('who')
        .setDescription('Who am I playing?'),
    async execute(interaction) {

        await interaction.reply(`playing ${global.characterToPlay}`);
    },
};