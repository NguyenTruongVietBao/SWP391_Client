echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r build/* root@159.223.39.71:/var/www/html
echo "Done!"