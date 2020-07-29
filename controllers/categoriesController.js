const db = require('../models');
const Categories = db.categories;
const sequelize = require('sequelize');
const {Op} = require('sequelize');
const showIfErrors = require('../helpers/showIfErrors');

exports.create = async (req, res) => {

    if (!showIfErrors(req, res)) {


        let data = req.body;
        let parent = await Categories.findOne({
            where: {id: data.parent}, attributes: ['id'], include: [
                {
                    model: Categories,
                    as: 'children'
                }
            ]
        });
        if (parent && parent.dataValues) {

            data.parent = parent.dataValues.id;
            data.order = parent.dataValues.children.length;
            await Categories.create(data);
            res.json('OK');
        } else {
            data.parent = null;
            data.order = 0;
            await Categories.create(data);
            res.json('OK');
            //     res.status(500).json({msg: 'Parent is not found'});
        }
    }
};

exports.get = async (req, res) => {

    const result = await Categories.findAll({
        where: {
            parent: null
        },
        order: [
            [sequelize.col(`children.order`), 'asc'],
            [sequelize.col(`children->children.order`), 'asc'],
        ],
        include: [{
            model: Categories,
            as: 'children',
            include: [
                {
                    model: Categories,
                    as: 'children',
                    include: [
                        {
                            model: Categories,
                            as: 'children',
                        }
                    ],
                }
            ]
        }]
    });


    res.json(result);
};

exports.getCategoriesList = async (req, res) => {
    const result = await Categories.findAll({
        where: {
            parent: {
                [Op.lt]: 2
            }
        }
    });
    res.json(result);
};

exports.getById = async (req, res) => {
    const result = await Categories.findOne({
        where: {id: req.query.id}
    });
    res.json(result);
};


exports.updateOrder = async (req, res) => {
    await Categories.destroy({truncate: true, cascade: false});
    let data = req.body;
    let result = [];
    data.map(parentData => {
        updateParents(parentData, result);
        parentData.order = +Object.keys(data).find(key => data[key] === parentData);
        result.push((({children, ...o}) => o)(parentData));

    });
    console.log(result)
    await Categories.bulkCreate(result);
    // let cs = await Categories.findAll({});
    // res.json(cs)
    this.get(req, res);
};

exports.updateDetails = async (req, res) => {
    let data = req.body;
    await Categories.update(data, {where: {id: data.id}});
    res.json('OK');
};

let updateParents = (parentData, result) => {
    if (parentData.hasOwnProperty('children') && parentData.children.length > 0) {
        parentData.children.map(dt => {
            let key = +Object.keys(parentData.children).find(key => parentData.children[key] === dt);
            dt.parent = parentData.id;
            dt.order = key;
            const clone = (({children, ...o}) => o)(dt);
            result.push(clone);
            updateParents(dt, result);
        })
    }
    return parentData;
};


exports.remove = async (req, res) => {
    let data = req.query;
    await Categories.destroy({where: {id: data.id}});
    this.get(req, res);
};
