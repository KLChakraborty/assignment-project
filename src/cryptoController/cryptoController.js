const axios = require('axios')
const cryptoModel = require('../cryptoModel/cryptoModel')

const getCrypto = async function(req, res){
  
   
    try {
        
        const options = {
            method: "get",
            url: `https://api.coincap.io/v2/assets`,
            headers: {
                Authorization: "Bearer c25420fe-9a2c-4f3f-935e-1316c700c4e0"
            }
        }
        const result = await axios(options)
        let { data } = result
let getData = data.data
getData = getData.sort((currency1, currency2) => {
            return (currency1.changePercent24H - currency2.changePercent24Hr)
        }).map((element) => { const { symbol, name, marketCapUsd, priceUsd, changePercent24Hr } = element
        return { symbol, name, marketCapUsd, priceUsd, changePercent24Hr }
         });
await cryptoModel.deleteMany()
await cryptoModel.create(getData)
let finalData2 = await cryptoModel.find()
return res.status(201).send({status: true, data: finalData2}) }
catch (error) {
       return res.status(500).send({status: false, message: error.message })
    }
}


module.exports = {getCrypto}