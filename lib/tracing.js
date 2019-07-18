const {
    initTracer: initJaegerTracer
} = require("jaeger-client");

const _ = require('lodash');

module.exports = {
    initTracer,
    getTextCarrierBySpanObject,
    getTextCarrierBySpanIdentity
}

function initTracer(_serviceName) {
    const config = {
        serviceName: _serviceName,
        sampler: {
            type: "const",
            param: 1,
        },
        reporter: {
            collectorEndpoint: "http://localhost:14268/api/traces",
            logSpans: true,
        },
    };
    const options = {
        logger: {
            info(msg) {
                console.log("INFO ", msg);
            },
            error(msg) {
                console.log("ERROR", msg);
            },
        },
    };
    return initJaegerTracer(config, options);
};


// This is developed based on: https://www.jaegertracing.io/docs/1.13/client-libraries/#trace-span-identity
function getTextCarrierBySpanObject(_span) {

    const spanContext = _span.context();
    const traceId = spanContext._traceId.toString('hex');
    const spanId = spanContext._spanId.toString('hex');
    let parentSpanId = spanContext._parentId;
    const flag = _.get(spanContext, '_flags', 1);

    if (parentSpanId) {
        parentSpanId = parentSpanId.toString('hex');
    } else {
        parentSpanId = 0;
    }

    const uberTraceId = `${traceId}:${spanId}:${parentSpanId}:${flag}`;
    console.log("uberTraceId===> ", uberTraceId)

    let textCarrier = {
        "uber-trace-id": uberTraceId
    };

    return textCarrier
}

function getTextCarrierBySpanIdentity(_traceSpanIdentity) {

    let textCarrier = {
        "uber-trace-id": _traceSpanIdentity
    };

    return textCarrier
}