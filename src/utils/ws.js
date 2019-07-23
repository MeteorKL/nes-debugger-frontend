import uuidv4 from 'uuid/v4';
import config from './config';

let ws = new WebSocket(config.wsURL);
ws.onopen = (event) => {
    console.log(event);
};
ws.onerror = (event) => {
    console.log(event);
};
ws.onmessage = (event) => {
    console.log(event.data);
    let msg = JSON.parse(event.data);
    Object.values(listeners).forEach(listener => {
        if (listener.topic === msg.topic) {
            listener.callback(msg);
        }
    });
};

ws.onclose = (event) => {
    console.log(event);
};

function pub(topic, payload) {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
        console.error(ws.readyState);
        return;
    }
    ws.send(JSON.stringify({topic, payload}));
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
    pub: pub,
    sub: sub,
    unsub: unsub
};