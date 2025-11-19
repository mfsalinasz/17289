#!/bin/bash

docker login && docker run -it --rm -v "$(pwd)":/app -v /Users/mfsalinasz/.m2:/root/.m2 -p 8080:8080 spring-boot
