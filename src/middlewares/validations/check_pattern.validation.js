const checkEmpty = (req, res, next) => {
  const { account, passWord, fullName, birthDay, phone } = req.body;
  if (
    account !== '' &&
    passWord !== '' &&
    fullName !== '' &&
    birthDay !== '' &&
    phone !== ''
  ) {
    next();
  } else {
    res.status(400).send({
      message: 'DATA NOT FOUND',
    });
  }
};

const checkEmail = (req, res, next) => {
  const { email } = req.body;
  const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(pattern)) {
    next();
  } else {
    res.status(400).send({
      message: 'EMAIL NOT ILLEGAL',
    });
  }
};

const checkNumber = (req, res, next) => {
  const { phone } = req.body;
  const pattern = /^[0-9]+$/;
  if (phone.match(pattern)) {
    next();
  } else {
    res.status(400).send({
      message: 'ONLY NUMBER',
    });
  }
};

module.exports = {
  checkEmpty,
  checkEmail,
  checkNumber,
};
