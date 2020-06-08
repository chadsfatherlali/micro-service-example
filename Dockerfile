FROM node:12-alpine
RUN mkdir -p /var/www
COPY service-init.sh /usr/local/bin/
EXPOSE 8080
CMD sh /usr/local/bin/service-init.sh