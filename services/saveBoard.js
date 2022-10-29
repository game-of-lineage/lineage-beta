const { buildResponse } = require("./utils");
const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});

const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

// TABLE
const boardTable = "lineage_boards";

const saveBoard = async (event) => {
  const { username, board_title, board } = JSON.parse(event.body);

  const created_at = new Date().toString();

  const params = {
    TableName: boardTable,
    Item: {
      username: { S: username },
      created_at: { S: created_at },
      board_title: { S: board_title },
      board,
    },
  };

  try {
    const response = await dynamodb.putItem(params).promise();
    return buildResponse(200, response);
  } catch (error) {
    console.log({ error, });
    return buildResponse(401, { message: "error saving board" });
  }
};
module.exports = saveBoard;
