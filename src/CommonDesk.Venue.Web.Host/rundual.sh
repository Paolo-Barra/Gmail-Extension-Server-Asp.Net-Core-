#!/bin/bash 
$dportal/bigng.sh serve --host 0.0.0.0 --port 4200 --configuration=linuxdev --prod --aot | $dportal/bigng.sh serve --host 0.0.0.0 --port 4300 --project refind-light --configuration=mitchmobile
