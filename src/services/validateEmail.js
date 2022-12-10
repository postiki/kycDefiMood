export default function validateEmail(addr) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(addr) || addr === '';
}
