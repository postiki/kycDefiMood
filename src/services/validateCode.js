export default function validateCode(code) {
    return /^[0-9]{1,9}$/.test(code) || code === '';
}
