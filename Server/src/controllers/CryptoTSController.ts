import * as CryptoTS from 'crypto-ts';

class CryptoTSController{

   KEY = 'ñP5nd0r5123456ñ'     

    /// <summary>METODO QUE SE ENCARGA DE ENCRIPTAR UNA CADENA DE TEXTO
    /// <param>_texto</param> variable tipo string
    /// <return>Regresa el texto encriptado</return>
    /// </summary>   
    public encryptText(_texto: string){

        let encryptedMessage = CryptoTS.AES.encrypt(_texto, this.KEY).toString();
        console.log(encryptedMessage); 
        return encryptedMessage;
    }

    /// <summary>METODO QUE SE ENCARGA DE DESENCRIPTAR UNA CADENA DE TEXTO
    /// <param>_texto</param> variable tipo string (texto encriptado)
    /// <return>Regresa el texto desencriptado</return>
    /// </summary> 
    public decryptText(_texto: string){

        const desencryptedMessage = CryptoTS.AES.decrypt(_texto, this.KEY);
        const plaintext = desencryptedMessage.toString(CryptoTS.enc.Utf8);
        console.log(plaintext); 
        return plaintext;
    }

    /// <summary>METODO QUE SE ENCARGA DE ENCRIPTAR UN JSON
    /// <param>_texto</param> variable tipo json
    /// <return>Regresa el json encriptado en formato de texto</return>
    /// </summary>
    public encryptJson(_json: any){

        let encryptedMessage = CryptoTS.AES.encrypt(JSON.stringify(_json), this.KEY).toString();
        console.log(encryptedMessage); 
        return encryptedMessage;
    }

    /// <summary>METODO QUE SE ENCARGA DE DESENCRIPTAR UN JSON
    /// <param>_texto</param> variable tipo json en formato de texto encriptado
    /// <return>Regresa el json desencriptado</return>
    /// </summary> 
    public decryptJson(_json: string){

        const desencryptedMessage = CryptoTS.AES.decrypt(_json, this.KEY);
        const jsonText = JSON.parse(desencryptedMessage.toString(CryptoTS.enc.Utf8));
        console.log(jsonText); 
        return jsonText;
    }
}

export const CRYPTOTS_CONTROLLER = new CryptoTSController();
