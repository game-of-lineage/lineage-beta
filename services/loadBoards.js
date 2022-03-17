const { buildResponse } = require("./utils");
const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});

const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

// TABLE
const boardTable = "lineage_boards";

const loadBoards = async (event) => {
  try{
    body = JSON.parse(event.body)
  } catch (error){
    console.log("Error parsing body",error)
  }
  const username = event.pathParameters.username
  
  const params = {
    ExpressionAttributeValues: {
      ":u": {
        S: username,
      },
    },
    KeyConditionExpression: "username = :u",
    ProjectionExpression: "board_title, board",
    TableName: boardTable,
  };
  try {
    const data = await dynamodb.query(params).promise();
    return buildResponse(200, data);
  } catch (error) {
    console.log({ error, });
  }
};

module.exports = loadBoards;
