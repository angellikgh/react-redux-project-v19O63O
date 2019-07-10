export function isAvailibleEmail (email) {
    let regx = /^(([^()<>[\]\\\s.,:;@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)))/
    return regx.test(email)
}