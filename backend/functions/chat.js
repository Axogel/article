const openai = require('../config/openAi')


const getResponse = async (messages) => {
    const response = await openai.chat.completions.create({
        messages,
        model: "gpt-3.5-turbo",
      });
      return response
} 

module.exports = getResponse;