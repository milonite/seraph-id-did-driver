build:
	docker build -f Dockerfile src -t swisscom-blockchain/seraph-id-did-driver

run:
	docker run -d -p 8080:8080 swisscom-blockchain/seraph-id-did-driver:latest

publish:
	docker push swisscomblockchainag/seraph-id-did-driver:latest