const { Handler } = require('./scripts/json-mapper')
// import handler from './scripts/json-mapper.js'

let payload = {
  "payload": {
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
      },
      {
        "name": "NT",
        "valueType": "string",
        "value": "G"
      },
      {
        "name": "privateUser",
        "valueType": "array",
        "value": [
          {
            "name": "privateUserId",
            "valueType": "string",
            "value": "{REF_IMSI}@ims.mnc001.mcc505.3gppnetwork.org"
          },
          {
            "name": "roamingAllowed",
            "valueType": "string",
            "value": "false"
          },
          {
            "name": "publicUser",
            "valueType": "array",
            "value": [
              {
                "name": "publicIdValue",
                "valueType": "string",
                "value": "sip:{REF_IMSI}@ims.mnc001.mcc505.3gppnetwork.org"
              },
              {
                "name": "implicitRegSet",
                "valueType": "string",
                "value": "1"
              },
              {
                "name": "serviceProfileId",
                "valueType": "string",
                "value": "{REF_SERVPROFID}"
              },
              {
                "name": "testUser",
                "valueType": "array",
                "value": [
                  {
                    "name": "testIdValue",
                    "valueType": "string",
                    "value": "sip:{REF_IMSI}@ims.mod-connect.com"
                  },
                  {
                    "name": "implicitRegSet",
                    "valueType": "string",
                    "value": "2"
                  }
                ]
              }
            ]
          },
          {
            "name": "userImsi",
            "valueType": "string",
            "value": "{REF_IMSI}"
          }
        ]
      },
      {
        "name": "PO",
        "valueType": "string",
        "value": "0"
      }
    ]
  },
  "referenceData": {
    "REF_MSISDN": "0406679321",
    "REF_IMSI": "50002312344314",
    "REF_SERVPROFID": "2"
  }
}
//
// let re = /{(.*)}/;
// const recursiveParsing = (payload,ref) =>{
//   if(payload.valueType==="array"){
//     for(let i of payload.value){
//       if(i.valueType==="array"){
//         recursiveParsing(i,ref)
//       }
//       else{
//         matched = i.value.match(re)
//         if(matched){
//           i.value = i.value.replace(/\{\w+\}/ig,ref[matched[1]])
//         }
//       }
//     }
//   }
//   else{
//     matched = payload.value.match(re)
//     if(matched){
//       payload.value = payload.value.replace(/\{\w+\}/ig,ref[matched[1]])
//     }
//   }
// }

const run = async () => {
  let handler = new Handler()

  let result = await handler.mapper(payload)

  console.log(JSON.stringify(result))
}
run()
