---
tags:
  - grafana
  - docker
  - volumes
type: permanent
date: 18-07-2025
time: 18:38
parent: 
childs: 
aliases: 
folgezettel: 
reference:
---
In grafana docker containers, one can predefine the data sources before initializing the container so that grafana will initiate directly knowing which to connect to.

Also can store the dashboards created manually in json format locally then mount it for grafana send time the container starts. You will see the dashboards directly on grafana once opened without creating dashboards again.

```yaml
grafana:
	image: grafana/grafana:12.0.2-ubuntu
	container_name: grafana
	ports:
		- "3000:3000"
	volumes:
		- ./config/grafana_datasources.yml:/etc/grafana/provisioning/datasources/datasource.yaml:ro
		- ./config/grafana_dashboards.yml:/etc/grafana/provisioning/dashboards/dashboards.yaml:ro
		- ./dashboards:/opt/grafana/dashboards
	networks:
		- external-network
		- internal-network
	depends_on:
		postgres:
			condition: service_healthy
```

so typically you file system should have the following structure
```
config/
	grafana_datasources.yml
	grafana_dashboards.yml
dashboards/
	*.json # dashboards json files
```
