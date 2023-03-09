import { Errors } from '@lib/log/interfaces';

export interface IDataInput {
  payload: IPayloadBody;
  referenceData: IReferenceDataBody;
}

export interface IDataResolved {
  data: IPayloadBody;
  error?: boolean;
}

export interface IPayloadBody {
  name: string;
  valueType: 'string' | 'array';
  value: string | Array<IPayloadBody>;
}
export interface IReferenceDataBody {
  [ref: string]: string;
}

export interface IErrorResponse {
  errorCode: number;
  details: string;
  error?: boolean;
  category?:Errors;
}

export interface IHandler {
  mapper(data: IDataInput): Promise<IDataResolved | IErrorResponse>;
}
