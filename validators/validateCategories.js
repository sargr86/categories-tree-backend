// Express Validator
const {body} = require('express-validator');
const db = require('../models');
const Categories = db.categories;

const rules = [
    body('name').not().isEmpty().withMessage('Category name is required'),
    body().custom(async (req) => {

        // Retrieving a user with request email
        let cat = await Categories.findOne({where: {name: req.name}});
        if (cat != null) throw new Error('Category name exists');
    }),


];

module.exports = {
    rules
};
