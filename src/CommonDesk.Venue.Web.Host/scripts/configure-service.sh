#/bin/bash
VENUEHOME="/home/developer"
MACHINENAME=$(<$VENUEHOME/machineName.txt)
portalFullUrl="https://$MACHINENAME"
serviceFullUrl="https://$MACHINENAME/venue"

echo "VENUEHOME=$VENUEHOME"
echo "MACHINENAME=$MACHINENAME"
echo "PortalURL=$portalFullUrl"
echo "ServiceURL=$serviceFullUrl"

sudo systemctl stop RunVenueServices.service

cd $VENUEHOME/app

unzip -o ./VenueSyncService.zip

dos2unix $VENUEHOME/app/runall.bash
dos2unix $VENUEHOME/app/runcmd.bash
chmod u+x $VENUEHOME/app/runall.bash
chmod u+x $VENUEHOME/app/runcmd.bash

syncServiceConfigFile=$VENUEcHOME/app/VenueSyncService.NetCore.dll.config

# Update the config file with the current settings
sed -i "/.*<add name=\"ConnectionString\".*/ c\<add name=\"ConnectionString\" connectionString=\"Server=localhost;Database=venue;Uid=venue;Pwd=System5055172\" providerName=\"System.Data.SqlClient\"/>" $syncServiceConfigFile
sed -i "/.*<add key=\"SqlConnectionStringCacheTempalte\".*/ c\<add key=\"SqlConnectionStringCacheTempalte\" value=\"Server=localhost;Database={0};Uid=venue;Pwd=System5055172\" />" $syncServiceConfigFile

sed -i "/.*<add key=\"MQHost\".*/ c\<add key=\"MQHost\" value=\"$MACHINENAME\"/>" $syncServiceConfigFile
sed -i "/.*<add key=\"RefindPortalCorsOriginUrl\".*/ c\<add key=\"RefindPortalCorsOriginUrl\" value=\"https://mail.google.com,https://$MACHINENAME\"/>" $syncServiceConfigFile

# Remove all the previous log files
sudo rm -fr $VENUEHOME/app/Logs/*

#sudo cp /mnt/venuesyncservice/Config/Systemd/RunVenueServices.service /etc/systemd/system/RunVenueServices.service

# Load the new venue services
#sudo systemctl daemon-reload

sudo systemctl start RunVenueServices.service
sudo systemctl status RunVenueServices.service

sudo service nginx restart

updateTimeFile=$VENUEHOME/lastServiceUpdateTime.txt

#if [ -f "$updateTimeFile" ]
#then
#        rm $updateTimeFile
#fi
# save date when we installed and by who
sudo date > $updateTimeFile
sudo echo $SSH_CLIENT >> $updateTimeFile