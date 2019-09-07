const isEmptyObj = (obj) => {
    return Object.entries(obj).length === 0 && obj.constructor === Object
};

export default {
    isEmptyObj
}