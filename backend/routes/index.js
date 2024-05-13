const Router = require("express");
const router = new Router();
const {sendUrl, newMessage, deleteSummary, listSummary,getChat } = require('../controllers/summaryController')


router.post('/sendurl', sendUrl);
router.post('/newmessage', newMessage);
router.delete('/deletesummary/:_id', deleteSummary);
router.get('/listsummary', listSummary);
router.get('/getchat/:_id', getChat);

module.exports = router;