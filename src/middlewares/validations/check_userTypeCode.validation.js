const checkDefaultType = (req, res, next) => {
    const { userTypeCode } = req.body;
    if (userTypeCode === "CLIENT" || userTypeCode === "ADMIN" || userTypeCode === "SUPER_ADMIN") {
        next()
    } else {
        res.status(400).send({
            message: "USER_TYPE_CODE NOT AVAILABLE"
        })
    }
}

module.exports = {
    checkDefaultType
}