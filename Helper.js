
export const API_ENDPOINT = 'http://api.sancusprojects.com:3000/api';

// converts to mm dd yy TO dd/mm/yy
export function convertJSToUserDate(date) {
    let JSDate = new Date(date);
    return  JSDate.getDate() + "/" + (JSDate.getMonth()+1) + "/" + JSDate.getFullYear();
}

export function capitaliseString(string) {
    return  (string.charAt(0).toUpperCase() + string.slice(1));
}