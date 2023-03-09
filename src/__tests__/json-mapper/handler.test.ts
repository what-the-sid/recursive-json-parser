const { Handler } = require('../../json-mapper')

import validData from '../fixtures/json-mapper/valid.json';
import validNotArrayData from '../fixtures/json-mapper/valid-without-array.json';
import invalidData from '../fixtures/json-mapper/invalid.json';
import successResponse from '../fixtures/json-mapper/success-response.json';

describe('JSON Parser Error Handling:::', () => {
  it('ERROR:invalid payload', async () => {
    const handler = new Handler()

    const response = await handler.mapper(invalidData);

    expect(response).toStrictEqual({
        "error": true,
        "errorCode": 400,
        "details": "\"referenceData\" is required",
        "category": "INVALID-INPUT"
      });
  });
});

describe('JSON Parser Loading Data:::',() => {
  it('SUCCESS: Parse data', async () => {
    const handler = new Handler

    const response = await handler.mapper(validData);

    expect(response).toStrictEqual(successResponse);
  });

  it('SUCCESS: Parse data without array', async () => {
    const handler = new Handler

    const response = await handler.mapper(validNotArrayData);

    expect(response).toStrictEqual({
        "data": {
          "name": "testIdValue",
          "valueType": "string",
          "value": "sip:50002312344314@ims.mod-connect.com"
        },
        "error": false
      });
  });
})
