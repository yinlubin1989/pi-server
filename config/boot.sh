#!/bin/sh
pm2 start /home/pi/www/pi-server/manage/bin/www

pm2 start /home/pi/Util/webcam/websocket-relay.js -- 0

ffmpeg -f v4l2  -framerate 25 -video_size 640x480 -i /dev/video0 -f mpegts -codec:v mpeg1video -s 640x480 -b:v 1000k -bf 0 http://localhost:8081/0