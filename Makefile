build:
	docker build -f Dockerfile src -t swisscom-blockchain/seraphid-did-driver:latest

run:
	docker run -d -p 8080:8090 swisscom-blockchain/seraphid-did-driver:latest