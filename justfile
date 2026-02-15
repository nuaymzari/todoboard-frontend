build-image:
    sudo docker build -t taskboard-frontend .
run:
    deno task dev

# Build image, then pushes
push: build-image 
    sudo docker tag taskboard-frontend 10.0.0.4:15150/taskboard-frontend:latest
    sudo docker push 10.0.0.4:15150/taskboard-frontend:latest