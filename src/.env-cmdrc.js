const development = {
  "LOG": "debug",
  "DEVTOOLS": true,
}

module.exports = {
  "default": {},
  "development": {
    "NODE_ENV": "development",
    "SERVER_HOST": "127.0.0.1",
    "SERVER_PORT": 4000,
    "DREAMTRACK_HOST": "127.0.0.1:30200",
    "DOWNLOADS_API": "http://127.0.0.1:30200/downloads",
    ...development
  },
  "production": {
    "NODE_ENV": "production",
    "DREAMTRACK_HOST": "track.dreamnet.tech",
    "DOWNLOADS_API": "https://downloads.dreamnet.tech"
  },
  "test": {
    "NODE_ENV": "test",
  },
  "preview": {
    ...development
  }
}
