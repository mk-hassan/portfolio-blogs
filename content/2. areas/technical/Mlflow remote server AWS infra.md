---
tags:
  - mlops-zoocamp
  - mlflow
  - module2
type: permanent
date: 23-06-2025
parent: 
childs: 
aliases:
  - mlops
folgezettel: 
reference: https://w ww.youtube.com/watch?v=1ykg4YmbFVA&list=PL3MmuxUbc_hIUISrluw_A7wDSmfOhErJK&index=13
---
## Setting the system up
### 1. Components
EC2 instance => to run mlflow server
S3 bucket => artifacts store
RDS Postgres database => backend store

Used Ubuntu as the OS of the EC2 instance, which comes with 3.13 python version

### 2. Security groups
For the EC2 instance define an inbound rule
	protocol: http
	port: 5000
	source: 0.0.0.0/0 that any one can access the instance

### 3. SSH key
Don't forget to save the **Generated key** that's used in establishing ssh connection

### 4. Bucket naming
For S3 bucket you will need to choose a name that's globally unique

### 5. RDS security rule
For the RDS instance you will need to add a security rule to allow connection from the EC2 instance

### 6. Database notes
- Don't forget to specify the initial database name in the Addition Configuration section
- Don't forget to save the Password if it's auto generated

Find example on [[AWS credentials]]
## problems

### 1. Boto3 doesn't support python 3.7
At first I was running EC2 instance with AWS Linux distro
it was preconfigured with python 3.7. The problem is that boto3 does support python starting from V3.9 that makes the artifacts to not be stored properly. Unfortunately I'd taken lots of time to discover it.

### 2. Configuring AWS user on local machine
Even there is a remote server, mlflow still needs to communicate with the S3 bucket. this required to configure some credentials to use in ~/.aws/credentials
```YAML
[default]
aws_access_key_id =  User access key id
aws_secret_access_key = User secret access key 
bucket_name = s3 bucket
region = region where the bucket exists
```

### 3. Creating user
IAM -> users -> create user 
don't forget to add access privileges on s3 buckets

## Running server

```bash
mlflow server -h 0.0.0.0 -p 5000 --backend-store-uri postgresql://mlflow:Hdmacoven34@mlflow-database.c9i44oaasup2.eu-north-1.rds.amazonaws.com:5432/mlflow_db --default-artifact-root s3://mlflow-store-rem
```