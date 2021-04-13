const helpers = require("./helpers");

async function getObjects(action, settings) {
    const type = action.params.type;
    const condition = (action.params.condition || "").trim();
    const fieldsStr = (action.params.fieldsKeys || "").trim();
    const useDisplayValues = action.params.useDisplayValues || false;
    
    return {
        type, condition, fieldsStr, useDisplayValues
    };

    if (!type || !fieldsStr){
        throw "One of the required fields was not given";
    }
    const fields = fieldsStr.split("\n").map((field) => {
        if (field.endsWith("Id"))
            return {name: field.trim(), useDisplayValue:useDisplayValues};
        return {name: field.trim()};
    });
    params = { types: [{
        type: type,
        fields: fields,
        condition: {
            prepared: condition
        }
    }]};
    return helpers.sendMuleSoftReq(settings, "GetObjects", params);
}

async function createObject(action,settings) {
    const type = action.params.type;
    const fields = helpers.textToFields(action.params.fields);
    
    if (!type || !fields){
        throw "One of the required fields was not given";
    }
    params = { types: [{
        type: type,
        fields: fields
    }]};
    return helpers.sendMuleSoftReq(settings, "CreateObject", params);
}

async function changeObject(action, settings){
    const id = (action.params.id || "").trim();
    const fields = helpers.textToFields(action.params.fields);
    
    if (!id || !fields){
        throw "One of the required fields was not given";
    }
    params = { types: [{
        id: id,
        fields: fields
    }]};
    return helpers.sendMuleSoftReq(settings, "ChangeObject", params);
}

module.exports = {
    getObjects,
    createObject,
    changeObject
};