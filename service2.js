//៊៊https://github.com/opentracing/opentracing-javascript/blob/master/src/test/opentracing_api.ts

const { initTracer, getTextCarrierBySpanIdentity } = require("./lib/tracing");
const { FORMAT_TEXT_MAP } = require('opentracing');
const { delay } = require('./lib/delay');
const Tracer = initTracer("processing-3");

const textCarrier = getTextCarrierBySpanIdentity(process.argv[2])

let extracedContext = Tracer.extract(FORMAT_TEXT_MAP, textCarrier);
console.log("extracedContext======>", extracedContext)

async function main() {

    var childService = Tracer.startSpan('service-3', {
        childOf: extracedContext
    });
    await delay(5000, null)
    childService.finish();

    Tracer.close(() => {
        console.log("exit")
        process.exit()
    });

}

main();
