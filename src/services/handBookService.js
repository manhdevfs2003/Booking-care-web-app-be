const { add } = require("lodash");
const db = require("../models");
let createHandBook = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.descriptionHTML || !data.descriptionMarkdown) {
        resolve({
          errCode: -1,
          errMessage: "Missing required fields",
        });
      } else {
        await db.Handbook.create({
          name: data.name,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });
        resolve({
          errCode: 0,
          message: "Create new handbook successfully",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllHandBook = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Handbook.findAll({});
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errMessage: "Get all handbook successfully",
        errCode: 0,
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getDetailHandBookById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: -1,
          errMessage: "Missing required fields",
        });
      } else {
        let data = await db.Handbook.findOne({
          where: { id: id },
        });
        if (data) {
          data.image = new Buffer.from(data.image, "base64").toString("binary");
        }
        resolve({
          errCode: 0,
          errMessage: "Get detail handbook successfully",
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createHandBook: createHandBook,
  getAllHandBook: getAllHandBook,
  getDetailHandBookById: getDetailHandBookById,
};
