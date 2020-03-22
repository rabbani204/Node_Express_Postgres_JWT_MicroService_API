const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_SECREAT);
        req.userdata = decoded
        // var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        // var x = fullUrl.split("api")
        // console.log(x)
        next();
    } catch (error) {
        return res.status(404).json({
            message: "Auth Failed",
            success: false,
        })
    }
}
