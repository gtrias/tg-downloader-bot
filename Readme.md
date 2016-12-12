# tg-downloader-bot

This bot will download all media messages that will receive.
If the file received is a `.torrent` one will add it to transmission.

## Installation

Using native node.js:

```bash
npm install
```

Using docker:

```bash
docker run -e NODE_CONFIG='{}' -ti gtrias/tg-downloader-bot
```

## Configuration

Check out `config/default.json` file to see all configurable fields
