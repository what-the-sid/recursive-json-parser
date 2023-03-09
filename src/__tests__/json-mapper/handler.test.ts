const { Handler } = require('../../json-mapper')

import validData from '../fixtures/json-mapper/valid.json';
import validNotArrayData from '../fixtures/json-mapper/valid-without-array.json';
import validMissingData from '../fixtures/json-mapper/valid-with-missing.json';
import invalidData from '../fixtures/json-mapper/invalid.json';
import successResponse from '../fixtures/json-mapper/success-response.json';

// Tests for scripts whether the erros are handled correctly
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

// Tests for scripts whether the data is parsed correctly
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

  it('SUCCESS: Parse data without reference data', async () => {
    const handler = new Handler

    const response = await handler.mapper(validMissingData);

    expect(response).toStrictEqual({
        "data": {
          "name": "subscriber",
          "valueType": "array",
          "value": [
              {
                "name": "MN",
                "valueType": "string",
                "value": "{REF_MSISDN}"
              },
              {
                "name": "IM",
                "valueType": "string",
                "value": "{REF_IMSI}"
              }
            ]
          },
          "error": false
        });
  });
})
