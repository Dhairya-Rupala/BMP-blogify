const router = require("express").Router();
const Notify = require("../models/Notify");

router.post("/", async (req, res) => {
    try {
        console.log("called",req.body.data)
        const { id, recipients, url, text } = req.body.data.msg
        const notify = new Notify({
            id, recipients, url, text,user:req.body.data.user._id
        })
        await notify.save()
        return res.status(200).json({notify})
    }
    catch (err) {
        return res.status(500).json("Something went wrong")
    }
})

module.exports = router;