#!/bin/bash
node="/usr/bin/node"
jsfile="../site/bundle.js"
log="/var/log/nodejs/"
echo "Eckid blog"
[[ -d ${log} ]] || mkdir ${log}
success() {
	echo "success"
}
failure() {
	echo "failure"
}
start() {
	if [ $(pidof node &>/dev/null;echo $?) -eq 0 ]; then
	echo "Nodejs Web Service is still running..."
	failure
	else
	npm run dev:start >> $log/log 2>&1 &
	success
	echo
	fi
}
stop() {
	if [ $(pidof node &>/dev/null;echo $?) -eq 0 ]; then
	killall node &>/dev/null && success || failure
	else
	echo "Nodejs Web Service is not running..."
	failure
	echo
	fi
}
status() {
pidof node &>/dev/null && echo "Server is running..." || echo "Server is not running..."
}
case "$1" in
start)
start
;;
stop)
stop
;;
restart)
stop
start
;;
status)
status
;;
*)

echo "Usage: $0 (start|stop|restart|status)"
esac