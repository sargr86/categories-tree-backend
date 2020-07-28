const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

router.get('/get', categoriesController.get);
router.get('/get-list', categoriesController.getCategoriesList);
router.get('/get-by-id', categoriesController.getById);
router.post('/create', categoriesController.create);
router.put('/update-details', categoriesController.updateDetails);
router.put('/update-order', categoriesController.updateOrder);
router.delete('/remove', categoriesController.remove);


module.exports = router;
