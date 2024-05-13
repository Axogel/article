const Router = require("express");
const router = new Router();

router.get('/', (req, res)=> {
    res.status(200).send("Article Summarize");
});
router.get('/sendurl', (req, res)=> {
    const body = { mensaje: 'Función de ejemplo ejecutada correctamente' };
    res.status(200).send(body);
});

module.exports = router;