# Build stage
FROM denoland/deno:latest AS builder
WORKDIR /app
COPY . .

RUN deno install && deno task build


# Final web server
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# sudo docker build -t taskboard-frontend .
# sudo docker run --rm -p 1234:80 taskboard-frontend
# nginx uses port 80

# sudo docker image ls
# all images sizes