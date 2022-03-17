const { buildResponse } = require("./utils");
const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});

const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

// TABLE
const boardTable = "lineage_boards";

const saveBoard = async (event) => {
  console.log({ eventbody: event.body });

  const { username, board_title, board } = JSON.parse(event.body);

  console.log(username, board_title, board);

  const created_at = new Date().toDateString();

  console.log(created_at);

  const params = {
    TableName: boardTable,
    Item: {
      username: { S: username },
      created_at: { S: created_at },
      board_title: { S: board_title },
      board,
    },
  };

  console.log(params);
  try {
    const response = await dynamodb.putItem(params).promise();
    console.log(response);
    return buildResponse(200, response);
  } catch (error) {
    console.log("ERROR:", error);
    return buildResponse(401, { message: "error saving board" });
  }
};
module.exports = saveBoard;
