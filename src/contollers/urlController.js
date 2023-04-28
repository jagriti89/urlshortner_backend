const urlModel = require("../models/urlModel.js")
const shortid = require('shortid');
const axios = require("axios")

const postUrl = async function (req, res) {
    try {
        //console.log('priyanka')
        const data = req.body
        if (!data.LongUrl) return res.status(400).send({ status: false, message: "Pls provide Long Url" })

        let checkDuplicate =  await urlModel.findOne({ LongUrl: data.LongUrl })
        if (checkDuplicate) return res.status(200).send({ status: true, message: "url already exist",data: checkDuplicate })
        
        let option = {
            method: 'get',
            url: data.LongUrl
        }
        let validUrl = await axios(option)
            .then(() => data.LongUrl)
            .catch(() => null)
            
            if (!validUrl) return res.status(400).send({ status: false, message: "wrong url" })


        const url = shortid.generate()
        let baseUrl = "http://localhost:3000/"
        data.ShortUrl = baseUrl + url
        data.urlCode = url


        const createdata = await urlModel.create(data)
        return res.status(201).send({ status: true, data: createdata })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const getUrl = async function (req, res) {
    try {

        let urlCode = req.params.urlCode

        let getURL = await urlModel.findOne({urlCode})
        if (!getURL) { return res.status(404).send({ status: false, msg: "can't find any data with this urlcode" }) }

       return res.status(302).redirect(getURL.LongUrl)

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
module.exports = { postUrl, getUrl }
