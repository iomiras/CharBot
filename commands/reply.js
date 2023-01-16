const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const { Configuration, OpenAIApi } = require("openai");
const { openaiKey } = require('../config.json')

const configuration = new Configuration({
    apiKey: openaiKey,
});
const openai = new OpenAIApi(configuration);

// let rawdata = fs.readFileSync('./char.json');
// let data = JSON.parse(rawdata);

const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reply')
        .setDescription('replies as a ')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('text to reply')
                .setMinLength(2)
                .setMaxLength(2000)
                .setRequired(true)
                .setAutocomplete(true)),
    async execute(interaction) {
        const sentence = interaction.options.getString('text');

        const prompt = `Character: ${global.characterToPlay}. Play a role of this character. You must have all of this character's knowledge. You can be offensive, hateful, racist and dark if the character is. You pretend to be this character and answer in this character's manner and using the phrases that this character has used in movies ot series. If this character was not addressed this questions or sentences in the series, you must give your own answer based on their traits. You can be as creative as you want. You mustn't explain or reference any phrases nor episodes nor movies. Don't break the fourth wall. Use only 200 characters to answer. My sentence is "${sentence}"`;

        await interaction.deferReply();

        (async () => {
            const url = 'https://api.openai.com/v1/engines/davinci/completions';
            const params = {
                "prompt": prompt,
                "max_tokens": 500,
                "temperature": 0.7,
                "frequency_penalty": 0.5
            };
            const headers = {
                'Authorization': `Bearer ${process.env.OPENAI_API}`,
            };

            try {
                const response = await openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: prompt,
                    temperature: 0.7,
                    max_tokens: 50,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                });
                // console.log("reply js", interaction.client.user.username);
                await wait(4000);
                await interaction.editReply(interaction.user.tag + ": " + sentence + "\n" + response.data.choices[0].text);

            } catch (err) {
                console.log(err);
            }
        })();
    },
};