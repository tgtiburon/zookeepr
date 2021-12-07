
const path = require('path');
const router = require('express').Router();






// public/index.html because it serves a webpage.
// if it did more it would be /public/api/   
router.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, '../../public/index.html'));

});

router.get('/animals', (req, res)=>{
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

router.get('/zookeepers', (req,res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});
// order of routes is important....* should always be last
router.get('*', (req, res)=> {

    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;