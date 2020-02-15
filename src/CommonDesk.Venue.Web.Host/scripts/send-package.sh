#!/bin/bash
if [ -z "$1" ] && [ -z "$2"]  && [ -z "$3"] ; then
	echo "Error: three arguments requred"
	echo "Usage: send-package.sh binaryfile.zip /installPath hostanme"
 	exit 1;
fi

if [ ! -f "$1" ]; then
	echo "Error: Cant find the release titled: $1"
 	exit 1;
fi


ARCHIVE="$1";
RLOCATION="$2";
RHOSTNAME="$3";

PKEY="-i ~/keys/refind.prik"
RHOST="developer@$3"

# make the remote directory 
ssh $PKEY $RHOST "mkdir $RLOCATION"

# copy the archive to the remote host  
scp $PKEY $ARCHIVE $RHOST:$RLOCATION

# copy the configuration script to the remote host 
scp $PKEY ./scripts/configure-portal.sh $RHOST:$RLOCATION
scp $PKEY ./scripts/fix-ef-database.sh  $RHOST:$RLOCATION

# verify everything is there
ssh $PKEY $RHOST "ls -la $RLOCATION"

# run the confconfigure-portal script 
ssh $PKEY $RHOST "$RLOCATION/configure-portal.sh $RLOCATION/$(basename $ARCHIVE) $RLOCATION $RHOSTNAME"

# replace database 
ssh $PKEY $RHOST "$RLOCATION/fix-ef-database.sh"
