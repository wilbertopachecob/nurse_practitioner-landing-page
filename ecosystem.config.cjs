module.exports = {
  apps: [
    {
      name: 'nurse-practitioner-landing',
      script: 'npx',
      args: 'serve -s dist -l 3002',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3002
      }
    }
  ]
};
