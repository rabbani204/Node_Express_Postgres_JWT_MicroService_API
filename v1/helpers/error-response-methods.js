let errorMethods = {};
errorMethods.errorResponse = (req, res, responseData) => {
    res.status(403).json({
        message: "Something went worng please see logs.",
        data: responseData,
    })
}

errorMethods.unauthorizeResponse = (req, res) => {
    res.status(401).json({
        success: false,
        message: "unauthorized to access the feature",
    })
}

errorMethods.internalServerError = (req, res) =>{
    res.status(404).json({
        success: false,
        message:"Internal server error"
    })
}
module.exports = errorMethods;