import uuidv4 from 'uuid/v4';
import config from './config';

let ws = new WebSocket(config.wsURL);
let messages = [];
ws.onopen = (event) => {
    console.log(event);
    Object.values(open_listeners).forEach(listener => {
        listener(event);
    });
    messages.forEach(msg => ws.send(msg));
    messages = [];
};
ws.onerror = (event) => {
    console.log(event);
    Object.values(error_listeners).forEach(listener => {
        listener(event);
    });
};
ws.onmessage = (event) => {
    // console.log(event.data);
    let msg = JSON.parse(event.data);
    Object.values(listeners).forEach(listener => {
        if (listener.topic === msg.topic) {
            listener.callback(msg);
        }
    });
};

ws.onclose = (event) => {
    console.log(event);
    Object.values(close_listeners).forEach(listener => {
        listener(event);
    });
};

var open_listeners = {};
function onopen(callback) {
    let uuid = uuidv4();
    open_listeners[uuid] = callback;
    return uuid;
}

let close_listeners = {};
function onclose(callback) {
    let uuid = uuidv4();
    close_listeners[uuid] = callback;
    return uuid;
}

let error_listeners = {};
function onerror(callback) {
    let uuid = uuidv4();
    error_listeners[uuid] = callback;
    return uuid;
}

function pub(topic, payload) {
    let msg = JSON.stringify({ topic, payload });
    if (!ws || ws.readyState !== WebSocket.OPEN) {
        console.warn(ws.readyState);
        messages.push(msg);
        return;
    }
    ws.send(msg);
}

let listeners = {};
function sub(topic, callback) {
    let uuid = uuidv4();
    listeners[uuid] = {
        topic,
        callback
    };
    return uuid;
}

function unsub(uuid) {
    delete listeners[uuid];
}

export default {
    onopen,
    onclose,
    onerror,
    pub: pub,
    sub: sub,
    unsub: unsub,
};