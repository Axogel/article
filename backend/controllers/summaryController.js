const cheerio = require('cheerio');
const axios = require('axios');
const Summary = require('../models/summary');
const openai = require('../config/openAi');
const getResponse = require('../functions/chat')



const sendUrl = async (req, res) => {
    const {url} = req.body

    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const h1 = $('h1').first().text()
  
        const text = $('p').contents().text();
        let messages = [{ role: "user", content: `you can summarize this: ${text}` }]
        const responseIa = await getResponse(messages)

        if(!responseIa.choices[0].message.content) return res.status(400).send({message: "No content available for summary"});
        const exist = await Summary.find({title:h1 })
        if(exist.length > 0)  return res.status(400).send({message: "Title must be unique"});
        messages.push({role: "assistant", content: responseIa.choices[0].message.content })
        const summaryNew =  await Summary.create({
            title: h1,
            url,
            messages
        })

        res.status(200).send({message: responseIa.choices[0].message.content, title: h1, _id: summaryNew._id})

    } catch (error) {
        console.error('Error submitting article:', error.message);
        res.status(500).json({ error: 'Failed to submit article' });
    }
}


const newMessage = async (req, res) => {
    try {
        const { _id, message } = req.body;
        const summary = await Summary.findById(_id);
        if (!summary) return res.status(404).json({ error: "summary not found" });
        summary.messages.push({ role: "user", content: message });
        const responseIa = await getResponse(summary.messages);

        if (!responseIa.choices[0].message.content) return res.status(400).json({ error: "The response is invalid" });
     
        summary.messages.push({ role: "assistant", content: responseIa.choices[0].message.content });
        await summary.save(); 
        res.status(200).json({ message: "Mensaje agregado exitosamente" , summary : { role: "assistant", content: responseIa.choices[0].message.content }});
    } catch (error) {
        console.error("Error al procesar el nuevo mensaje:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


const deleteSummary = async (req, res) => {

    const { _id } = req.params;
    try {
        await Summary.deleteOne({ _id })
        res.status(200).json({msg: "delete sucesfully"});
    } catch (error) {
        res.status(400).send(error)
    }
}

const listSummary = async (req, res)  =>{
    try {
        const summarys = await Summary.find();
        res.status(200).json(summarys);
    } catch (error) {
        res.status(400).send(error)
    }
}

const getChat = async (req, res) => {
    const { _id } = req.params;
    try {
        const summary = await Summary.findById(_id)
        res.status(200).json(summary);
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {sendUrl, newMessage, deleteSummary, listSummary, getChat} 