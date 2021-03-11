const { request, gql } = require("graphql-request");

const { GRAPHQL_API } = process.env;

const QUERY_WEATHER_FOR_CITY_QUERY = gql`
  query($name: String!) {
    getCityByName(name: $name) {
      name
      country
      weather {
        summary {
          title
          description
          icon
        }
      }
    }
  }
`;

async function callAPI(cityName) {
  const variables = {
    name: cityName,
  };

  const { getCityByName } = await request(
    GRAPHQL_API,
    QUERY_WEATHER_FOR_CITY_QUERY,
    variables
  );

  return getCityByName;
}

module.exports = callAPI;
