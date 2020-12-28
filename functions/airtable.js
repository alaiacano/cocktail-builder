// IMPORT THE AIRTABLE.JS PACKAGE
const Airtable = require("airtable");

/** THIS IS YOUR SERVERLESS FUNCTION */
exports.handler = async (event, context, callback) => {
  //pull the required information from your environment variables, which can be set in the Netlify UI
  // const {
  //   AIRTABLE_API_URL,
  //   AIRTABLE_API_CLIENT_ID,
  //   AIRTABLE_API_KEY,
  // } = process.env;
  return {
    statusCode: 200,
    body: JSON.stringify([
      {
        bitters: ["Angostura Bitters"],
        liqueurs: ["Sweet Vermouth"],
        spirits: ["Rye"],
        name: "Manhattan",
      },
      {
        sweeteners: ["Simple Syrup"],
        juices: ["Lime"],
        liqueurs: ["Cointreau"],
        spirits: ["Blanco Tequila"],
        name: "Margarita",
      },
      {
        juices: ["Lemon"],
        book: "The Office",
        liqueurs: ["Creme de Violette", "Maraschino"],
        spirits: ["Gin"],
        name: "Aviation",
      },
      {
        other: ["Heavy Cream"],
        bitters: ["Angostura Bitters", "Orange Bitters"],
        book: "The Office",
        liqueurs: ["Creme de Cacao"],
        spirits: ["Cognac"],
        name: "Brandy Alexander",
      },
      {
        sweeteners: ["Simple Syrup"],
        other: [
          "Cinnamon Sticks",
          "Star Anise",
          "Vanilla Bean",
          "Nutmeg",
          "Rosemary",
        ],
        juices: ["Lemon", "Apple Cider", "Cranberry Juice Cocktail"],
        book: "The Aviary Winter Cocktails",
        spirits: ["Reposado Tequila"],
        name: "Cider Margarita",
      },
      {
        other: ["Lime", "Tonic"],
        spirits: ["Gin"],
        name: "Gin & Tonic",
      },
      {
        name: "Cherry Grapefruit Gin & Tonic",
        book: "The Aviary Summer Cocktails",
        other: ["Roasted Red Peppers", "Strawberries", "Ancho Chile Powder"],
        spirits: ["Gin"],
        juices: ["Lemon", "Lime"],
        liqueurs: ["Maraschino"],
        bitters: ["Celery Bitters"],
      },
    ]),
  };
  // CONFIGURE YOUR AIRTABLE BASE CONNECTION
  Airtable.configure({
    endpointUrl: AIRTABLE_API_URL,
    apiKey: AIRTABLE_API_KEY,
  });
  var base = Airtable.base(AIRTABLE_API_CLIENT_ID);

  const data = [];

  const records = await base("Recipes")
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
