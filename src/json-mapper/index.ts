import Joi from 'joi';
import { Errors } from '@lib/log/interfaces';
import { IDataInput, IDataResolved, IHandler, IErrorResponse } from './interfaces/handler.interface';

import MapperController from './controllers/mapper.controller';


export class Handler implements IHandler{

  private schema: Joi.AnySchema<IDataInput>;

  public constructor() {
    this.schema = Joi.object({
      payload: Joi.object().required(),
      referenceData: Joi.object().required()
    });
  }

  public async mapper(event: IDataInput): Promise<IDataResolved | IErrorResponse> {
    try{
      const validation: Joi.ValidationResult<IDataInput> = this.schema.validate(event);

      if (validation.error) {
        return {
          error: true,
          errorCode: 400,
          details: validation.error.message,
          category: Errors.INVALID_INPUT,
        };
      }

      const mapperController = new MapperController()

      const response = (mapperController
                          .recursiveParser(
                            event.payload,event.referenceData))

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
