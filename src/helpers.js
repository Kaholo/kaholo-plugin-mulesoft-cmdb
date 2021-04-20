const fetch = require("node-fetch");

async function sendMuleSoftReq(settings, service, params){
    if (!settings.username || !settings.password || !settings.endpoint || !settings.bodyUsername || !settings.bodyPassword){
        throw "One of the settings wasn't set";
    }
    const body = {
        accessToken: settings.bodyPassword,
        username: settings.bodyUsername,
        password: settings.bodyPassword,
        encrypted: "Y",
        service: service,
        params: params
    }
    const reqUrl = `${settings.endpoint}/usu/api/cmdb/services`;
    const responseObj = await (await fetch(reqUrl, {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(`${settings.username}:${settings.password}`).toString('base64')}`
        },
    })).json();
    if (responseObj.returnCode === "00"){
        return responseObj;
    }
    throw responseObj;
}

function textToFields(text){
    return text.split("\n").map((line) => {
        const [key, ...values] = line.trim().split("=");
        if (!values){
            throw "Bad key=value format in fields";
        }
        const val = Array.isArray(values) ? values.join("=") : values;
        return {
            name: key.trim(),
            value: val.trim()
        }
    });
}

module.exports = {
    sendMuleSoftReq,
    textToFields
}