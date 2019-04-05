## PoC of clearing the cache in Chrome via webdriver

### Installation

`yarn` in the root directory to install dependencies

`docker run -d -p 4444:4444 -p 5900:5900 -v /dev/shm:/dev/shm selenium/standalone-chrome-debug:3.141.59-mercury`

`docker ps` for sanity check

visit `http://localhost:4444/wd/hub/` for sanity check

This is selenium standalone debug image so you can connect via VNC to see what's happening there.
Use `5900` port.

### Usage

`node index` - runs webdriver which clears the chrome cache
