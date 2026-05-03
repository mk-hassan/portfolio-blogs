---
tags:
  - docker
  - root-access
type: permanent
date: 23-05-2025
parent: 
childs: 
aliases:
  - docker
folgezettel: 
reference:
---
```bash
sudo groupadd docker
```
this command creates a new group called docker, it's intended to have permissions to interact with docker deamon `dockerd`

new systems usually creates this group by default when docker installed

```bash
sudo usermod -aG docker $USER
```
adding current user (yourself) to docker group and now you will be privileged to run docker without sudo

-aG => append Group
$USER => current user