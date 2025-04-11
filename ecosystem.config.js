// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'instant-replay',
      script: './dist/index.js',
      watch: false,
      autorestart: true,
      env: {
        NODE_ENV: 'production',
      },
      post_update: ['bash ./reload-nginx.sh'],
    },
  ],
}
