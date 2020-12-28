// IMPORT THE AIRTABLE.JS PACKAGE
const Airtable = require("airtable");

/** THIS IS YOUR SERVERLESS FUNCTION */
exports.handler = async (event, context, callback) => {
  //pull the required information from your environment variables, which can be set in the Netlify UI
  const {
    AIRTABLE_API_URL,
    AIRTABLE_API_CLIENT_ID,
    AIRTABLE_API_KEY,
  } = process.env;

  // CONFIGURE YOUR AIRTABLE BASE CONNECTION
  Airtable.configure({
    endpointUrl: AIRTABLE_API_URL,
    apiKey: AIRTABLE_API_KEY,
  });
  var base = Airtable.base(AIRTABLE_API_CLIENT_ID);

  const data = [];

  const records = await base("Inventory")
    .select({
      maxRecords: 1000,
      view: "Grid view",
    })
    .all();

  records.forEach(function (record) {
    data.push(record.fields);
  });

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
