---
nav:
  title: Docker
  description: 'Docker Usage'
  order: 4
  category: 'Documentation'
---

<!-- markdownlint-disable MD025 -->
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD030 -->

# Docker

[Docker](https://docs.docker.com/) and the [discord-bot](/)

- [Source](https://github.com/mxttwoods/woodsm-bot)

Container development commands:

<code-block label="Bash" active>

```bash
# Docker Build
docker build -t mtwoods/discord-bot:latest .
  # build with tag latest

# List Images
docker images # list all images

# Docker Run
docker run -p <sys port>:<app port> -d mtwoods/discord-bot
  # run container with tag ...

# List Container ID
docker ps # echo <container id>

# Container Logs
docker logs <container id> # echo logs

# Container Access
docker exec -it <container id> /bin/bash
  # open bash in container

# Test Request
curl -i localhost:<sys port> # GET request to the <sys port>
```

</code-block>

## Resources

- [Nodejs-Docker-Tutorial](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [Official Node.js Docker Image](https://hub.docker.com/_/node/)
- [Node.js Docker Best Practices Guide](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md)
- [Docker Docs](https://docs.docker.com/)
- [Official Docker documentation](https://docs.docker.com/get-started/nodejs/build-images/)
- [Docker Tag on Stack Overflow](https://stackoverflow.com/questions/tagged/docker)
- [Docker Subreddit](https://reddit.com/r/docker)
