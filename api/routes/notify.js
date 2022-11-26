const router = require("express").Router();
const Notify = require("../models/Notify");

router.post("/", async (req, res) => {
    try {
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

router.get("/:id", async (req, res) => {
    try {
        const notify = await Notify.find({ recipients: req.params.id })
            .sort({'createdAt':-1}).populate('User', 'username profilePic')
        return res.status(200).json(notify)
    }
    catch (err) {
        return res.status(500).json("Something went wrong")
    }
})

router.delete("/:notifId/:userId", async (req, res) => {
    try {
        const deleteNotify = await Notify.findOneAndUpdate(
      { _id: req.params.notifId },
      { $pull: { recipients: req.params.userId } },
      { returnOriginal: false }
        )
        if (deleteNotify[0]?.recipients?.length == 0) {
            await deleteNotify.delete()
        }
        return res.status(200).json("Notification removed successfully")
        
    }
    catch (err) {
        return res.status(500).json("Something went wrong")
    }
})

module.exports = router;