"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoTS = __importStar(require("crypto-ts"));
class CryptoTSController {
    constructor() {
        this.KEY = 'ñP5nd0r5123456ñ';
    }
    /// <summary>METODO QUE SE ENCARGA DE ENCRIPTAR UNA CADENA DE TEXTO
    /// <param>_texto</param> variable tipo string
    /// <return>Regresa el texto encriptado</return>
    /// </summary>   
    encryptText(_texto) {
        let encryptedMessage = CryptoTS.AES.encrypt(_texto, this.KEY).toString();
        console.log(encryptedMessage);
        return encryptedMessage;
    }
    /// <summary>METODO QUE SE ENCARGA DE DESENCRIPTAR UNA CADENA DE TEXTO
    /// <param>_texto</param> variable tipo string (texto encriptado)
    /// <return>Regresa el texto desencriptado</return>
    /// </summary> 
    decryptText(_texto) {
        const desencryptedMessage = CryptoTS.AES.decrypt(_texto, this.KEY);
        const plaintext = desencryptedMessage.toString(CryptoTS.enc.Utf8);
        console.log(plaintext);
        return plaintext;
    }
    /// <summary>METODO QUE SE ENCARGA DE ENCRIPTAR UN JSON
    /// <param>_texto</param> variable tipo json
    /// <return>Regresa el json encriptado en formato de texto</return>
    /// </summary>
    encryptJson(_json) {
        let encryptedMessage = CryptoTS.AES.encrypt(JSON.stringify(_json), this.KEY).toString();
        console.log(encryptedMessage);
        return encryptedMessage;
    }
    /// <summary>METODO QUE SE ENCARGA DE DESENCRIPTAR UN JSON
    /// <param>_texto</param> variable tipo json en formato de texto encriptado
    /// <return>Regresa el json desencriptado</return>
    /// </summary> 
    decryptJson(_json) {
        const desencryptedMessage = CryptoTS.AES.decrypt(_json, this.KEY);
        const jsonText = JSON.parse(desencryptedMessage.toString(CryptoTS.enc.Utf8));
        console.log(jsonText);
        return jsonText;
    }
}
exports.CRYPTOTS_CONTROLLER = new CryptoTSController();
//# sourceMappingURL=CryptoTSController.js.map