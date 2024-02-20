deploy-dev:
	yarn build
	aws s3 cp ./build/ s3://konoha-dev/konoha-web/$(shell date +%Y-%m-%d)/ --recursive

  # aws s3 sync s3://konoha-dev/konoha-web/2024-02-20/ ./konoha-web/2024-02-20/ && pm2 serve -s ./konoha-web/2024-02-20/ --name "konoha-web" --port 3001