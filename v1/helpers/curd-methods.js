var Customer = require('../models/Customer')
var User = require('../models/User')
var methods = {};

methods.getAllData = (modelName, caondations, attributes) => {
    return modelName.findAll({
        where: caondations,
        attributes: attributes
    }).then((payload) => {
        payload.success = true;
        return payload;
    }).catch(err => {
        err.success = false;
        throw err;
    })
}

methods.getAllDataWithRelatedTableCampaign = ( modelName, relatedModel, relatedModel2, req) => {
    return modelName.findAll({
        where: {
            deleted: 0
        },
        include: [
            {
                model: relatedModel,
                include: [
                    {
                        model: relatedModel2,
                        attributes: ['id', 'name', 'email', 'phone', 'avatar', 'type', 'main_sys_id']
                    }
                ]
            },
            {
                model: relatedModel2,
                attributes: ['id', 'name', 'email', 'phone', 'avatar', 'type', 'main_sys_id']
            }
        ]
    }).then((payload) => {
        payload.success = true;
        return payload;
    }).catch(err => {
        err.success = false;
        throw err;
    })
}

methods.getAllDataWithRelatedTable = (modelName, relatedModel, relatedModel2, req) => {
    let condations = {
        deleted: 0
    }

    if ( req.userdata.type != "manager" ){
        condations.aquisition_member_id = req.userdata.id
    }

    return modelName.findAll({
        where: condations,
        include: [
            {
                model: relatedModel,
                include: [
                    {
                        model: relatedModel2
                    }
                ]
            }
        ]
    }).then( (payload) => {
        payload.success = true;
        return payload;
    }).catch( err => {
        err.success = false;
        throw err;
    })
}

methods.getDetails = (req, res, modelName) => {
    return modelName.findAll({
        where: {
            id: req.params.id,
            deleted: 0
        }
    }).then((payload) => {
        payload.success = true;
        return payload;
    }).catch(err => {
        err.success = false;
        throw err;
    })
}

methods.getAllDetailsWithRelatedTable = (req, res, modelName, relatedModel, relatedModel2) => {
    return modelName.findAll({
        where: {
            id: req.params.id,
            deleted: 0
        },
        include: [
            {
                model: relatedModel,
                include: [relatedModel2]
            }
        ]
    }).then((payload) => {
        payload.success = true;
        return payload;
    }).catch( err => {
        err.success = false;
        throw err;
    })
}

methods.getDetailsFromTwoAssociateTable = ( condations, modelName, relatedModel ) => {
    return modelName.findAll({
        where: condations,
        include: [
            {
                model: relatedModel
            }
        ]
    }).then((payload) => {
        payload.success = true;
        return payload;
    }).catch(err => {
        err.success = false;
        throw err;
    })
}

methods.addNewData = (req, res, modelName, body) => {
    try {
        return modelName.create(body).then((payload) => {
            payload.success = true;
            return payload;
        }).catch(err => {
            err.success = false;
            throw err;
        })
    }
    catch (err) {
        console.log(err)
        return err
    }
}


methods.addNewBulk = (req, res, modelName, body) => {
    return modelName.bulkCreate(body).then((payload) => {
        payload.success = true;
        return payload;
    }).catch(err => {
        err.success = false;
        console.log(err)
        throw err;
    })
}

methods.updateData = ( req, res, modelName, data ) => {
    return modelName.update(
        data,
        {
            where: { id: req.params.id }
        }
    ).then( (payload) => {
        return payload;
    }).catch((err) => {
        throw err;
    })
}

methods.deleteData = (req, res, modelName) => {
    return modelName.destroy({
        where: {
            id: req.params.id
        }
    }).then((payload) => {
        let response = {};
        response.success = true;
        response.amountRow = payload;
        return response;
    }).catch(err => {
        err.success = false;
        throw err;
    })
}

methods.deleteRelatedData = (req, res, modelName, associate_modelName) => {
    return modelName.destroy({
        where: {
            id: req.params.id
        }, include: [{
            model: Customer
        }],
    }).then((payload) => {
        let response = {};
        response.success = true;
        response.amountRow = payload;
        return response;
    }).catch(err => {
        err.success = false;
        throw err;
    })
}

methods.successResponse = (req, res, responseData) => {
    res.status(201).json({
        message: "Action success",
        data: responseData,
    })
}

module.exports = methods;

