FROM nginx:1.29.8

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY static /usr/share/nginx/static

EXPOSE 80

CMD ["nginx-debug", "-g", "daemon off;"]