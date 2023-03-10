const Joi = require('joi');

const { Errors } = require('./libs/log/errors')
const { recursiveParser } = require('./controllers/mapper.controller');


class Handler {

  constructor() {
    this.schema = Joi.object({
      payload: Joi.object().required(),
      referenceData: Joi.object().required()
    });
  }

  async mapper(event){
    try{
      const validation = this.schema.validate(event);

      if (validation.error) {
        return {
          error: true,
          errorCode: 400,
          details: validation.error.message,
          category: Errors.INVALID_INPUT,
        };
      }

      const response = recursiveParser(
                            event.payload,event.referenceData)

      return {
        data:response,
        error:false
      };
    }
    catch(error){
      return {
        error: true,
        errorCode: 500,
        details: "Internal Server Error",
        category: Errors.SERVER_ERROR,
      }
    }

  }
}

module.exports = {
  Handler
}
