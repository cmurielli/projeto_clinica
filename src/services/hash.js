const crypto = require('crypto');
const util = require('util');

const scryptAsync = util.promisify(crypto.scrypt);

class Hash {
  static async toHash(text) {
    const salt = crypto.randomBytes(8).toString('hex');
    const buf = await scryptAsync(text, salt, 64);

    return ${buf.toString('hex')}.${salt};
  }
  /*REFATORAR!!! */
  static async compare(storedString, suppliedString) {
    const [hashedString, salt] = storedString.split('.');
    const buf = await scryptAsync(suppliedString, salt, 64); //REUTILIZAR toHash

    return buf.toString('hex') === hashedString;
  }
}

module.exports = Hash;