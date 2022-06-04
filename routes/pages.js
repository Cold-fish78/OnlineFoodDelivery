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
router.get('/tandoori-paranthe',pagesController.tandooriParathe);
router.get('/daalSpecial',pagesController.tandooriParathe);
router.get('/vegetables',pagesController.vegetables);
router.get('/seasonalVeg',pagesController.seasonalVeg);
router.get('/southindian',pagesController.southindian);
router.get('/homeimages',pagesController.homeimages);
router.get('/about-us',pagesController.aboutus);
router.get('/contact-us',pagesController.contactus);


module.exports = router;