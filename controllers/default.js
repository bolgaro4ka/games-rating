const staticFile = require("../appModules/http-utils/static-file");
const mimeTypes = require('./../appModules/http-utils/mime-types.js')
const path = require('path')
async function defaultRouteController(res, publicUrl) {
    const extname = String(path.extname(publicUrl)).toLowerCase();
    if (extname in mimeTypes) {
        res.statusCode = 200;
        staticFile(res, publicUrl, extname);
      } else {
        res.statusCode = 404;
        res.end("Not Found");
      }
    
    
    
  }
  module.exports = defaultRouteController;