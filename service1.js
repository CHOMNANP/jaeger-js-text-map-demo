//៊៊https://github.com/opentracing/opentracing-javascript/blob/master/src/test/opentracing_api.ts

const { initTracer } = require("./lib/tracing");
const { FORMAT_TEXT_MAP } = require('opentracing');
const { delay } = require('./lib/delay');

const Tracer = initTracer("processing-1");

const textCarrier = {
    id: 123
};

async function main() {


    //-- start of Root span
    const rootSpan = Tracer.startSpan('service-1');
    await delay(100);
    rootSpan.setTag("processing document id", 25);

    //--start of Service 2 span
    const service2Span = Tracer.startSpan('service-2', {
        childOf: rootSpan
    });
    await delay(20);
    service2Span.log({ event: "document verified successfully" })
    await delay(130);
    service2Span.finish();
    //--end of Service 2 span 

    //--start of Injection    
    Tracer.inject(rootSpan.context(), FORMAT_TEXT_MAP, textCarrier)
    //--end of Injection

    //// ---- You can uncommend this to try if the text mapping is working within one node
    // //Exract Tracer
    // let extractedContext = Tracer.extract(FORMAT_TEXT_MAP, textCarrier);
    // console.log("=========>extractedContext", extractedContext)
    // var childSpance = Tracer.startSpan('', {
    //     childOf: extractedContext
    // });

    // child.finish();
    // ///


    setTimeout(() => {

        rootSpan.finish();

        Tracer.close(() => {
            console.log("exit")
            process.exit()
        });
    },
        10000
    )
}


main();

