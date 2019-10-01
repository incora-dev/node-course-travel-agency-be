module.exports = {
  apps : [
    {
      name      : 'Travel agency',
      script    : 'dist/server.js',
      exec_mode : 'cluster',
      instances : 'max',
    }
  ],
};
