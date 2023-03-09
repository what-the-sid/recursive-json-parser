import { Errors } from '@lib/log/interfaces';

class MapperController {

  private cre:RegExp;
  private wre:RegExp;

  public constructor() {
    this.cre = /{(.*)}/;
    this.wre = /\{\w+\}/ig;
  }

  public recursiveParser(payload,ref){
    try{
      if(payload.valueType==="array"){
        for(const i of payload.value){
          if(i.valueType==="array"){
            this.recursiveParser(i,ref);
          }
          else{
            const matched = i.value.match(this.cre);
            if(matched && Object.keys(ref).indexOf(matched[1])>=0){
              i.value = i.value.replace(this.wre,ref[matched[1]]);
            }
          }
        }
      }
      else{
        const matched = payload.value.match(this.cre);
        if(matched){
          payload.value = payload.value.replace(this.wre,ref[matched[1]]);
        }
      }
      return payload
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

export default MapperController;
