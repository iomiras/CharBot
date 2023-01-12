const { SlashCommandBuilder } = require('discord.js');

const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides information about the user.'),
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        await interaction.reply(`Hello`);
        const followUp = await interaction.followUp(`${interaction.user}, you are fing moron.`);
        await wait(5000);
        followUp.delete();
        // await interaction.editReply('Pong');
        // await interaction.deferReply();
        // await wait(4000);
        // await interaction.editReply('Pong again');
        // await interaction.followUp('Pong again!');
    },
};