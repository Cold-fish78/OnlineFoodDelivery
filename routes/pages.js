const express = require('express');
const router = express.Router();
const passport = require('passport');
const pagesController = require('../controllers/pages_controller');



router.get('/secondPage',pagesController.secondPage);
router.get('/vegeterian',pagesController.vegeterian);
router.get('/nonveg',pagesController.nonveg);
router.get('/snacks',pagesController.snacks);
router.get('/sweets',pagesController.sweets);
router.get('/IceCream',pagesController.IceCream);
router.get('/shakes',pagesController.shakes);
router.get('/IndianChaat',pagesController.IndianChaat);








module.exports = router;