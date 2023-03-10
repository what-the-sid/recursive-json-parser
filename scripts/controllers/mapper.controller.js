const { Errors } = require('../libs/log/errors')

const cre = /{(.*)}/;
const wre = /\{\w+\}/ig;

const recursiveParser = (payload,ref) => {
  try{
    if(payload.valueType==="array"){
      for(const i of payload.value){
        if(i.valueType==="array"){
          recursiveParser(i,ref);
        }
        else{
          // if an item in array type payload has string value, and if it has a placeholder
          //replace it
          const matched = i.value.match(cre);
          if(matched && Object.keys(ref).indexOf(matched[1])>=0){
            i.value = i.value.replace(wre,ref[matched[1]]);
          }
        }
      }
    }
    else{
      // if the payload, and if it has a placeholder
      //replace it
      const matched = payload.value.match(cre);
      if(matched){
        payload.value = payload.value.replace(wre,ref[matched[1]]);
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

module.exports = {
  recursiveParser
}
