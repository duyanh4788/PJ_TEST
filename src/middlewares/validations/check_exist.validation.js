const checkExist = (Model) => async (req, res, next) => {
    const { id } = req.params;
    const dataId = await Model.findByPk(id)
    if (dataId) {
        next()
    } else {
        res.status(400).send({
            message: "ID ALREADY EXIST"
        })
    }
}

const checkAccountExist = (Model) => async (req, res, next) => {
    const { account } = req.body;
    const data = await Model.findOne({
        where: {
            account
        }
    })
    if (!data) {
        next()
    } else {
        res.status(400).send({
            message: "ACCOUNT ALREADY EXIST"
        })
    }
}

const checkPhoneExist = (Model) => async (req, res, next) => {
    const { phone } = req.body;
    const data = await Model.findOne({
        where: {
            phone
        }
    })
    if (!data) {
        next()
    } else {
        res.status(400).send({
            message: "PHONE ALREADY EXIST"
        })
    }
}

const checkEmailExist = (Model) => async (req, res, next) => {
    const { email } = req.body;
    const data = await Model.findOne({
        where: {
            email
        }
    })
    if (!data) {
        next()
    } else {
        res.status(400).send({
            message: "EMAIL ALREADY EXIST"
        })
    }
}

module.exports = {
    checkExist,
    checkAccountExist,
    checkPhoneExist,
    checkEmailExist
}