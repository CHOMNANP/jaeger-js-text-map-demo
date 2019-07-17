
Run command bellow to install Jaegertracing
````
docker run -d --name jaeger \
  -e COLLECTOR_ZIPKIN_HTTP_PORT=9411 \
  -p 5775:5775/udp \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 14268:14268 \
  -p 9411:9411 \
  jaegertracing/all-in-one:1.13
  ```

1. git clone 
2. run command bellow to start service 1
````
node service1.js
````
3. run command bellow to start service 2
````
node service2.js
````

Expected result Go to http://localhost:16686 to search for the trace. Expected output should be 1 trace with 3 span