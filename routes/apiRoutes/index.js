// We are using index.js as a central hub for all routing functions



const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalRoutes');
const zookeeperRoutes = require('../apiRoutes/zookeeperRoutes');

router.use(animalRoutes);
//router.use(require('./zookeeperRoutes'));
router.use(zookeeperRoutes);


module.exports = router;