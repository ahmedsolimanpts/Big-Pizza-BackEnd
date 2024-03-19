#!/bin/bash
sudo docker container rm $(sudo docker container ls -aq)

sudo docker run --name mongodb-replica-set -d -p 27017:27017 mongo --replSet MyReplica


sudo docker exec -it mongodb-replica-set mongosh

echo "Start Creating Replica"

rs.status()

rs.initiate()

rs.conf()


cfg = rs.conf()


cfg.members[0].host = "127.0.0.1:27017"


rs.reconfig(cfg, {force: true})
