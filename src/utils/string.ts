import { encode, decode } from 'base-64';

/**
 * Encode a string to base64 without padding
 */
export function tb64(text: string) {
    return encode(text).replace(/=/g, '');
}

/**
 * Decode a string from base64
 */
export function rb64(text: string) {
    return decode(text);
}

