// var moment = require('moment')
const Methods = require('../helpers/curd-methods');
const BycrptMethods = require('../helpers/bcrypt-methods');
const ErrorResMethods = require('../helpers/error-response-methods');
const request = require('request');

const usersss = require('../../primary-users')

const User = require('../models/User');
const Task = require('../models/Task');
const DetailTask = require('../models/DetailTask');

exports.getAllUser = (req, res) => {
    let condaions = {
        deleted: 0,
    };
    let attributes = ['id', 'name', 'email', 'type', 'phone', 'gender', 'main_sys_id', 'avatar', 'in_service', 'created_by']
    Methods.getAllData(User, condaions, attributes).then((userList) => {
        if (userList) {
            Methods.successResponse(req, res, userList);
        }
    }).catch(err => {
        ErrorResMethods.errorResponse(req, res, err);
    })
}

exports.getAllAco = (req, res) => {
    let acoList = [], i = 0;

    let condaions = {
        deleted: 0,
    }

    let attributes = ['id', 'name', 'email', 'type', 'phone', 'gender', 'main_sys_id', 'avatar', 'in_service', 'created_by']
    Methods.getAllData(User, condaions, attributes).then((userList) => {
        userList.map(user => {
            i = i + 1;
            if (user.dataValues.type == 'aco') {
                let condations = {
                    aquisition_member_id: user.dataValues.id,
                    deleted: 0
                }

                Methods.getDetailsFromTwoAssociateTable(condations, Task, DetailTask).then(tasks => {
                    let x = {
                        user: user,
                        tasks: tasks
                    }

                    x.user.dataValues.totalTask = tasks.length;

                    let index = 0;

                    x.user.dataValues.userTotalAssigned = 0, x.user.dataValues.userTotalCalled = 0, x.user.dataValues.userTotalConverted = 0, x.user.dataValues.userTotalRejected = 0;

                    tasks.map(v => {
                        x.tasks[index].dataValues.totalAssignedCustomer = v.dataValues.detail_tasks.length;
                        x.tasks[index].dataValues.totalCalled = 0;
                        x.tasks[index].dataValues.totalConverted = 0;
                        x.tasks[index].dataValues.totalRejected = 0;
                        v.dataValues.detail_tasks.map(detail_task => {

                            x.user.dataValues.userTotalAssigned += 1;

                            if (detail_task.dataValues.phone_call_status == 'called') {
                                x.tasks[index].dataValues.totalCalled += 1;
                                x.user.dataValues.userTotalCalled += 1;
                            }

                            else if (detail_task.dataValues.phone_call_status == 'confirmed') {
                                x.tasks[index].dataValues.totalConverted += 1;
                                x.user.dataValues.userTotalConverted += 1;
                            }

                            else {
                                x.user.dataValues.userTotalRejected += 1;
                                x.tasks[index].dataValues.totalRejected += 1;
                            }
                        })
                        index = index + 1;
                    })
                    // x.user.dataValues.totalAssigned = totalAssigned;
                    acoList.push(x)
                })
            }
        })
        return acoList;
    }).then(acoList => {
        setTimeout(() => {
            Methods.successResponse(req, res, acoList)
        }, 2000);
    }).catch((error) => {
        ErrorResMethods.errorResponse(req, res, error);
    })
}

exports.getAllBp = (req, res) => {

    let condaions = {
        deleted: 0,
        type: 'bp'
    }

    let attributes = ['id', 'name', 'email', 'type', 'phone', 'gender', 'main_sys_id', 'avatar', 'in_service', 'created_by']

    Methods.getAllData(User, condaions, attributes).then((userList) => {
        if (userList) {
            let response = { female: 0, male: 0, inservice: 0 }, x;
            response.bp_list = userList;
            userList.map(bp => {
                (bp.gender == 'female') ? response.female += 1 : response.male += 1;
                (bp.in_service == 1) ? response.inservice += 1 : x = 0;
            })
            Methods.successResponse(req, res, response);
        }
    }).catch( (error) => {
        console.log(error, 'err')
        ErrorResMethods.errorResponse(req, res, error);
    })
}

exports.getDetailsOfUser = (req, res) => {
    Methods.getDetails(req, res, User).then((user) => {
        if (user) {
            if (user[0].type == 'aco') {
                let condations = {
                    aquisition_member_id: user[0].id,
                    deleted: 0
                }
                Methods.getDetailsFromTwoAssociateTable(condations, Task, DetailTask).then(task => {
                    Methods.successResponse(req, res, { profile: user[0], task: task });
                }).catch((err) => {
                    ErrorResMethods.errorResponse(req, res, err);
                })
            }
            else {
                Methods.successResponse(req, res, user);
            }
        }
    }).catch((error) => {
        ErrorResMethods.errorResponse(req, res, error);
    })
}

exports.createUser = async (req, res) => {
    req.checkBody('name', 'username is required').trim().notEmpty();
    req.checkBody('email', 'user email is required').trim().notEmpty();
    req.checkBody('type', 'user type is required').trim().notEmpty();
    req.checkBody('phone', 'user phone is required').trim().notEmpty();
    // req.checkBody('role_id', 'Campain place is required').trim().notEmpty();
    // req.checkBody('avatar', 'Campain place is required').trim().notEmpty();
    req.checkBody('password', 'user one time password is required is required').trim().notEmpty()

    var errors = req.validationErrors();
    if (errors) {
        res.status(422).json({ success: false, error: errors });
    }

    else {
        let body = req.body

        let user = {
            ...body
        }

        user.created_by = req.userdata.id

        user.deleted = 0

        await BycrptMethods.hashPassword(user.password).then(pass => {
            user.password = pass;
        }).catch(error => {
            ErrorResMethods.errorResponse(req, res, error);
        })

        await Methods.addNewData(req, res, User, user).then(response => {
            if (response.success) {
                Methods.successResponse(req, res, response);
            }
        }).catch(error => {
            console.log(error, 'err')
            ErrorResMethods.errorResponse(req, res, error);
        })
    }
}

exports.deleteUser = (req, res) => {
    Methods.deleteData(req, res, User).then(response => {
        if (response.success) {
            Methods.successResponse(req, res, response);
        }
    }).catch(error => {
        ErrorResMethods.errorResponse(req, res, error);
    })
}

exports.loginUser = async (req, res) => {
    req.checkBody('token', 'A token is required').trim().notEmpty();
    // req.checkBody('phone', 'phone is required').trim().notEmpty();
    // req.checkBody('password', 'password is required').trim().notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        res.status(422).json({ success: false, error: errors });
    }

    else {
        var url = 'https://porichoy.shuttlengine.com/api/user';
        var headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': "Bearer " + req.body.token,
            'Accpet': 'application/json'
        };

        let loggeduser = {}

        request({ url: url, headers: headers }, (e, r, body) => {
            if (body) {
                body = JSON.parse(body)
                User.findAll({
                    where: {
                        main_sys_id: body.id
                    }
                }).then(user => {
                    loggeduser = {
                        id: user[0].id,
                        name: user[0].name,
                        email: user[0].email,
                        type: user[0].type,
                        phone: user[0].phone
                    }
                    console.log(loggeduser, 'lgu1')

                    BycrptMethods.tokenGenerate(loggeduser, res).then((response) => {
                        console.log(response, 'rspns2')
                        Methods.successResponse(req, res, response);
                    }).catch(err => {
                        Methods.errorResponse(req, res, err);
                    })

                })
            }
            else {
                ErrorResMethods.errorResponse(req, res, { success: false, message: 'Invalid Token' })
            }
        });
    }
}

exports.updateUser = async ( req, res ) => {
    await Methods.updateData( req, res, User, req.body ).then( (payload) => {
        // Methods.successResponse(req, res, payload);
    }).catch( (err) => {
        ErrorResMethods.errorResponse(req, res, err);
    })

    await Methods.getDetails( req, res, User ).then( (payload) => {
        Methods.successResponse(req, res, payload)
    })
}

// exports.insertAlluser = async (req, res) => {

//     let usr = [],faield= [], i =0;
//     usersss.map(v => {
//         i=i+1
//         let u = {}

//         if( v.id ){
//             u.main_sys_id = parseInt(v.id)
//         }
//         if( v.name ){
//             u.name = v.name
//         }
//         if( v.email ){
//             u.email = v.email
//         }
//         if( v.type ){
//             u.type = v.type
//         }
//         if( v.phone ){
//             u.phone = v.phone
//         }

//         if(v.role_id){
//             u.role_id= v.role_id
//         }

//         if(v.gender){
//             u.gender= v.gender
//         }

//         if( v.avatar ){
//             u.avatar = v.avatar
//         }

//         u.created_by = 1
//         u.deleted = 0 

//         Methods.addNewData(req, res, User, u).then(u=>{
//             usr.push(v)
//         }).catch(err=>{
//             console.log(err)
//             faield.push(v)
//         })
//     })

//     setTimeout(() => {
//         console.log(usr)
//         console.log(faield)
//         Methods.successResponse(req, res, usr)
//     }, 15000);
// }
