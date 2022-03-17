const bcrypt = require("bcryptjs");
const { buildResponse } = require("./utils");
const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});

const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

// TABLE
const userTable = "lineage_users";

const hashPassword = (password) =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
const comparePassword = (password, storedPassword) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(password, storedPassword, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });

const login = async (event) => {
  const { username, password } = JSON.parse(event.body);
  if (!username || !password) {
    return buildResponse(401, { message: "username or password missing" });
  }
  const loginParams = {
    TableName: userTable,
    Key: {
      username: { S: username },
    },
    ProjectionExpression: "username, password",
  };
  try {
    const { Item } = await dynamodb.getItem(loginParams).promise();
    if (Item) {
      const result = await comparePassword(password, Item.password.S);
      if (result) return buildResponse(200, Item);
      return buildResponse(401, { message: "password incorrect" });
    } else {
      return await signup(username, password);
    }
  } catch (error) {
    return buildResponse(401, { message: "error logging in" });
  }
};

const signup = async (username, password) => {
  const newPassword = await hashPassword(password);
  const signUpParams = {
    TableName: userTable,
    Item: {
      username: { S: username },
      password: { S: newPassword },
    },
  };
  try {
    const data = await dynamodb.putItem(signUpParams).promise();
    return buildResponse(200, signUpParams.Item);
  } catch (error) {
    console.log({ error, });
    return buildResponse(401, { message: "error creating new user" });
  }
};

module.exports = login;
