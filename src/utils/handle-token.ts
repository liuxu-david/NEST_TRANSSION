import {encode, decode} from "js-base64"
import JSEncrypt from 'jsencrypt-ext';

export class JSEncryptUtil {
  static encrypt(publicKey,txt) {
    const encryptor = new JSEncrypt()
    encryptor.setPublicKey(publicKey)
    return encryptor.encrypt(txt)
  }
  static decrypt(publicKey,txt) {
    const encryptor = new JSEncrypt()
    encryptor.setPublicKey(publicKey)
    return encryptor.decrypt(txt)
  }
};

export class JSBASE64 {
  static encode(txt) {
    return encode(txt)
  }
  static decode(txt) {
    return decode(txt)
  }
}