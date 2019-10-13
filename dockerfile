FROM nginx

COPY ./index.html /dist/ /usr/share/nginx/html/

EXPOSE 1234