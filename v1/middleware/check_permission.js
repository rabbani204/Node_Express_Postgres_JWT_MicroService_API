const ErrorResMethods = require('../helpers/error-response-methods')
let checkPermission = {}
checkPermission.checkPermission = (role)=>{
    return function(req, res, next) {
      if (role !== req.userdata.type) {
        ErrorResMethods.unauthorizeResponse(req, res)   
      }
      else next();
    }
}

module.exports = checkPermission;

