//៊៊https://github.com/opentracing/opentracing-javascript/blob/master/src/test/opentracing_api.ts

const { initTracer } = require("./lib/tracing");
const { FORMAT_TEXT_MAP } = require('opentracing');

const Tracer = initTracer("processing-2");



const textCarrier = {
    "uber-trace-id": process.argv[2]
};

let extracedContext = Tracer.extract(FORMAT_TEXT_MAP, textCarrier);
console.log("extracedContext======>", extracedContext)

var childService = Tracer.startSpan('service-3', {
    childOf: extracedContext
});
childService.finish();

Tracer.close(() => {
    console.log("exit")
    process.exit()
});
