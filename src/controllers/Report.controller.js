const { sequelize, CountLogin, NewAccLogin } = require('../../models');
const { Op } = require('sequelize');

const getNewUserLogin = async (req, res) => {
  try {
    const data = await NewAccLogin.findAll();
    if (data) {
      return res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const searchNewListReport = async (req, res) => {
  try {
    const data = await NewAccLogin.findAll({
      where: {
        accountUser: {
          [Op.like]: `%${req.query.account}%`,
        },
      },
    });
    if (data) {
      return res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
const reportUserLogin = async (req, res) => {
  try {
    const data = await CountLogin.findAll();
    if (data) {
      return res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const searchListReport = async (req, res) => {
  try {
    const data = await CountLogin.findAll({
      where: {
        accountUser: {
          [Op.like]: `%${req.query.account}%`,
        },
      },
    });
    if (data) {
      return res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCountLoginAccountByDate = async (req, res) => {
  try {
    const query = `
    select accountUser , count(*) as countLoginDate from CountLogins where 
    CountLogins.accountUser='${req.query.account}' and CountLogins.dateLogin like '%${req.query.dateLogin}'
    `;
    const [result, metaData] = await sequelize.query(query);
    if (result[0] && result[0].accountUser === null) {
      return res.status(200).send('Data not fount');
    }
    res.status(200).send(result[0]);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getNewUserLogin,
  reportUserLogin,
  searchListReport,
  searchNewListReport,
  getCountLoginAccountByDate,
};
