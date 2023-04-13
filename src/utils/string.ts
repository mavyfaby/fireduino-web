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

/**
 * Map a number from one range to another
 */
export function map(input: number, inMin: number, inMax: number, outMin: number, outMax: number) {
    return (input - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

/**
 * Check if a string is a valid telephone or mobile number
 */
export function isTelPhone(phone: string) {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone);
}