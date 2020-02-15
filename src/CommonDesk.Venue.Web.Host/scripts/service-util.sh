#/bin/bash

suser=developer

fpath="/tmp/create-service-def/$2"
fservice="run-$2"
fname="run-$2.service"
servicepath=/etc/systemd/system/

script_usage()  {
	        echo "Usage: service-util";
			echo " 					  create  service-name path bashfile" ;
			echo " 					  destroy service-name";
			echo " 					  stop    service-name";
            exit;
}

if [ $# -lt 1 ]; then
	script_usage;
fi			

if [ $1  = create ]; then
	if [ $# -lt 3 ]; then
			script_usage;
	fi			
	echo "create service $2"

cat > $servicepath/$2.service <<EOF
[Unit]
Description=Run $2 service

[Service]
User=$suser

WorkingDirectory=$3
ExecStart=$3/$4 
Type=oneshot
Restart=on-failure
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF
exit
fi

if [ $1  = stop ]; then
	if [ $# -lt 2 ]; then
			script_usage;
	fi			
 	echo "stop service $2"
	systemctl stop "$2.service"
	exit
fi


if [ $1  = destroy ]; then
	if [ $# -lt 2 ]; then
			script_usage;
	fi			
	echo "destroy service $2"
	read -r -p "Are you sure? [y/N] " response
	if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]] then
		systemctl stop "$2.service"
	    rm -R $servicepath/$2.service
		echo "destroyed $servicepath/$2.service"
	fi
	exit
fi
