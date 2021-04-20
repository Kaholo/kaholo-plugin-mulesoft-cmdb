const fetch = require("node-fetch");

async function sendMuleSoftReq(settings, service, params){
    if (!settings.username || !settings.password || !settings.endpoint){
        throw "One of the settings wasn't set";
    }
    const body = {
        accessToken: settings.password,
        username: settings.username,
        password: settings.password,
        encrypted: "Y",
        service: service,
        params: params
    }
    const reqUrl = `${settings.endpoint}/usu/api/cmdb/services`;
    const response = await fetch(reqUrl, {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(`${settings.username}:${settings.password}`)}`
        },
    })
    return (await response.json());
}

async function textToFields(text){
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