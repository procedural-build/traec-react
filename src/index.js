import * as utils from './utils';
import * as auth from './auth';


export default {
    utils,
    auth,
}

exports.printMsg = function() {
    console.log("This is a message from the demo package");
  }