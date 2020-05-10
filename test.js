let o = {
  format: "urls"
};

let bodyString = JSON.stringify(o);
let https = require("https");
let options = {
  host: "global.xirsys.net",
  path: "/_turn/headbandz",
  method: "PUT",
  headers: {
      "Authorization": "Basic " + Buffer.from("jlangy:5cca2fee-92e1-11ea-80e2-0242ac150003").toString("base64"),
      "Content-Type": "application/json",
      "Content-Length": bodyString.length
  }
};
let httpreq = https.request(options, function(httpres) {
  let str = "";
  httpres.on("data", function(data){ str += data; });
  httpres.on("error", function(e){ console.log("error: ",e); });
  httpres.on("end", function(){ 
      console.log("ICE List: ", str);
  });
});
httpreq.on("error", function(e){ console.log("request error: ",e); });
httpreq.end();
console.log('ran!')