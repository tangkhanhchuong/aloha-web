deploy-dev:
	# rm -rf build/
	# yarn build
	# aws s3 cp ./build/ s3://konoha-dev/konoha-web/$(shell date +%Y-%m-%d)/ --recursive
	# ssh konoha.web.dev "aws s3 sync s3://konoha-dev/konoha-web/$(shell date +%Y-%m-%d)/ ./konoha-web/$(shell date +%Y-%m-%d)/"
	# pm2 delete konoha-web && pm2 serve -s ./konoha-web/$(shell date +%Y-%m-%d)/ --name 'konoha-web' --port 3001