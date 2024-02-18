deploy-dev:
	yarn build
	aws s3 cp ./build/ s3://konoha-dev/konoha-web/$(shell date +%Y-%m-%d)/ --recursive

  # aws s3 sync s3://konoha-dev/konoha-web/$(date +%Y-%m-%d)/ ./konoha-web/$(date +%Y-%m-%d)/ && pm2 serve -s ./konoha-web/$(date +%Y-%m-%d)/ --name "konoha-web" --port 3001