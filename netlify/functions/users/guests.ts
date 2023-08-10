// netlify/functions/getGuests.ts
import { Handler } from '@netlify/functions';
import axios from 'axios';

const handler: Handler = async (event, context) => {
  try {

    const { queryStringParameters } = event;

    // Extract offset and limit query parameters from the request
    const offset = parseInt(queryStringParameters?.offset || '0', 10);
    const limit = parseInt(queryStringParameters?.limit || '10', 10);


    // Make axios GET request with offset and limit query parameters
    const response = await axios.get('https://concierge-ai-app.onrender.com/guests', {
      params: {
        offset,
        limit,
      },
    });

    const responseData = response.data;

    return {
      statusCode: 200,
      body: JSON.stringify(responseData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred while fetching data.' }),
    };
  }
};

export { handler };