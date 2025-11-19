FROM alpine
EXPOSE 80
RUN apk add nginx
COPY ./ordinario-ftw/ /var/lib/nginx/html/
COPY ./daniel.conf /etc/nginx/httpd.d/default.conf
CMD ["nginx", "-g", "daemon off;"]


