export default function validateCode(code) {
    return /^[0-9]{1,6}$/.test(code) || code === '';
}
