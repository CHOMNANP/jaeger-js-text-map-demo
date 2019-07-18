//៊៊https://github.com/opentracing/opentracing-javascript/blob/master/src/test/opentracing_api.ts

const { initTracer, getTextCarrierBySpanObject } = require("./lib/tracing");
const { FORMAT_TEXT_MAP } = require('opentracing');
const { Tags, FORMAT_HTTP_HEADERS } = require('opentracing');

const { delay } = require('./lib/delay');

const Tracer = initTracer("processing-1");


async function main() {

    //-- start of Root span
    const rootSpan = Tracer.startSpan('service-1');
    await delay(100);
    rootSpan.setTag("processing document id", 25);

    rootContext = rootSpan.context();
    // console.log("Contet", rootContext)
    // const traceId = rootContext._traceId.toString('hex');
    // const spanId = rootContext._spanId.toString('hex');
    // const uberTraceId = `${traceId}:${spanId}:0:1`;
    // console.log("uberTraceId===> ", uberTraceId)

    // const textCarrier = {
    //     "uber-trace-id": uberTraceId
    // };

    //--start of Service 2 span
    const service2Span = Tracer.startSpan('service-', {
        childOf: rootSpan
    });
    await delay(20);
    service2Span.log({ event: "document verified successfully" })
    await delay(130);
    service2Span.finish();
    //--end of Service 2 span 

    //--start of Injection    
    const textCarrier = getTextCarrierBySpanObject(rootSpan);
    Tracer.inject(rootSpan.context(), FORMAT_TEXT_MAP, textCarrier)
    //--end of Injection

    setTimeout(() => {

        rootSpan.finish();

        Tracer.close(() => {
            console.log("exit")
            process.exit()
        });
    },
        1000
    )
}


main();

