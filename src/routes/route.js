const express=require("express")
const router=express.Router()

const { postUrl, getUrl } = require("../contollers/urlController.js")

router.post("/postUrl", postUrl)
router.get("/:urlCode", getUrl)


module.exports = router