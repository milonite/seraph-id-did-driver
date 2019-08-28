build:
	docker build -f Dockerfile src -t swisscomblockchainag/seraph-id-did-driver

run:
	docker run -d -p 8080:8080 swisscomblockchainag/seraph-id-did-driver:latest

publish:
	docker push swisscomblockchainag/seraph-id-did-driver:latest
