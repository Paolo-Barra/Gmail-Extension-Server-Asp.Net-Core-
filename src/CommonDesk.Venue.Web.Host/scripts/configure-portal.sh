#/bin/bash
# $1 = ZIPFILE -- /path/binary.zip
# $2 = VENUEHOME -- /home/developer  
# $3 = MACHINENAME -- refinddev.commondesk.info

# 
# https://linuxize.com/post/bash-check-if-file-exists/ 
# -z if not empty 
#

if [ -z "$1" ] && [ -z "$2"] && [ -z "$3"]; then
	echo "Error: three arguments requred"
	echo "Usage: configure-portal binaryfile.zip /path/where/to/install hostanme"
 	exit 1;
fi

if [ ! -f "$1" ]; then
	echo "Error: archive $1 is not present"
 	exit 1;
fi

VENUEARCHIVE="$1"
VENUEHOME="$2"
VENUEPORTAL="$VENUEHOME/portal"

#VENUEHOME="/home/developer"
#MACHINENAME=$(<$VENUEHOME/machineName.txt)
MACHINENAME="$3"

portalFullUrl="https://$MACHINENAME"
serviceFullUrl="https://$MACHINENAME/venue"
portalBackendConfigFile=$VENUEHOME/appsettings.Production.json
portalFrontdConfigFile=$VENUEHOME/wwwroot/dist/assets/appconfig.production.json

echo "VENUEHOME=$VENUEHOME"
echo "VENUEPORTAL=$VENUEPORTAL"
echo "VENUEARCHIVE=$VENUEARCHIVE"
echo "MACHINENAME=$MACHINENAME"
echo "PortalURL=$portalFullUrl"
echo "ServiceURL=$serviceFullUrl"
echo "portalBackendConfigFile=$portalBackendConfigFile"
echo "portalFrontdConfigFile=$portalFrontdConfigFile"


sudo systemctl stop RunVenuePortal.service

#rm -R $VENUEHOME
mkdir -p $VENUEHOME

#cp /mnt/venuesyncservice/app/VenuePortal.zip .
# unzip the portal binary 
echo "unzip=$VENUEARCHIVE -d $VENUEHOME"
unzip -q $VENUEARCHIVE -d $VENUEHOME
mv ./wwwroot/dist/*./wwwroot
#yarn 

# Configure the web app
#mv $VENUEPORTAL/wwwroot/dist $VENUEPORTAL/wwwroot
#portalConfigFile=$VENUEHOME/appsettings.json
#portalStageConfigFile=$VENUEHOME/appsettings.Staging.json
#echo "portalConfigFile=$portalConfigFile"
#echo "portalStageConfigFile=$portalStageConfigFile"

# # debug file
# sudo sed -i "/.*\"RefindCreateOAuthRedirectUrl\":.*/ c\ \"RefindCreateOAuthRedirectUrl\": \"$portalFullUrl/app/refind/postCreateOauthLandingPage\"," $portalConfigFile
# sudo sed -i "/.*\"RefindLoginOAuthRedirectUrlMobile\":.*/ c\ \"RefindLoginOAuthRedirectUrlMobile\": \"$portalFullUrl/app/refind/postLoginOauthLandingPageMobile\"," $portalConfigFile
# sudo sed -i "/.*\"RefindLoginOAuthRedirectUrl\":.*/ c\ \"RefindLoginOAuthRedirectUrl\": \"$portalFullUrl/app/refind/postLoginOauthLandingPage\"," $portalConfigFile
# sudo sed -i "/.*\"VenueServiceB seURL\":.*/ c\ \"VenueServiceBaseURL\": \"$serviceFullUrl\"," $portalConfigFile
# sudo sed -i "/.*\"LogoutUrl\":.*/ c\ \"LogoutUrl\": \"$portalFullUrl/account/login\"," $portalConfigFile

# sudo sed -i "/.*\"Default\".*/ c\ \"Default\": \"Database=portalDb; Server=localhost; Uid=venue; Pwd=System5055172\"" $portalConfigFile
# sudo sed -i "/.*\"ServerRootAddress\":.*/ c\ \"ServerRootAddress\": \"$portalFullUrl\"," $portalConfigFile
# sudo sed -i "/.*\"ClientRootAddress\":.*/ c\ \"ClientRootAddress\": \"$portalFullUrl\"," $portalConfigFile
# sudo sed -i "/.*\"CorsOrigins\":.*/ c\ \"CorsOrigins\": \"$portalFullUrl,https://mail.google.com\"," $portalConfigFile

# # staging file
# sudo sed -i "/.*\"Default\".*/ c\ \"Default\": \"Database=portalDb; Server=localhost; Uid=venue; Pwd=System5055172\"" $portalStageConfigFile
# sudo sed -i "/.*\"ServerRootAddress\":.*/ c\ \"ServerRootAddress\": \"$portalFullUrl\"," $portalStageConfigFile
# sudo sed -i "/.*\"ClientRootAddress\":.*/ c\ \"ClientRootAddress\": \"$portalFullUrl\"," $portalStageConfigFile
# sudo sed -i "/.*\"CorsOrigins\":.*/ c\ \"CorsOrigins\": \"$portalFullUrl,https://mail.google.com\"," $portalStageConfigFile

# debug file


sudo sed -i "/.*\"RefindCreateOAuthRedirectUrl\":.*/ c\ \"RefindCreateOAuthRedirectUrl\": \"$portalFullUrl/app/refind/postCreateOauthLandingPage\"," $portalBackendConfigFile
sudo sed -i "/.*\"RefindLoginOAuthRedirectUrlMobile\":.*/ c\ \"RefindLoginOAuthRedirectUrlMobile\": \"$portalFullUrl/app/refind/postLoginOauthLandingPageMobile\"," $portalBackendConfigFile
sudo sed -i "/.*\"RefindLoginOAuthRedirectUrlGmail\":.*/ c\ \"RefindLoginOAuthRedirectUrlGmail\": \"$portalFullUrl/app/refind/postLoginOauthLandingPageGmail\"," $portalBackendConfigFile
sudo sed -i "/.*\"RefindLoginOAuthRedirectUrl\":.*/ c\ \"RefindLoginOAuthRedirectUrl\": \"$portalFullUrl/app/refind/postLoginOauthLandingPage\"," $portalBackendConfigFile
sudo sed -i "/.*\"VenueServiceB seURL\":.*/ c\ \"VenueServiceBaseURL\": \"$serviceFullUrl\"," $portalBackendConfigFile
sudo sed -i "/.*\"LogoutUrl\":.*/ c\ \"LogoutUrl\": \"$portalFullUrl/account/login\"," $portalBackendConfigFile
sudo sed -i "/.*\"Default\".*/ c\ \"Default\": \"Database=portalDb; Server=localhost; Uid=venue; Pwd=System5055172\"" $portalBackendConfigFile
sudo sed -i "/.*\"ServerRootAddress\":.*/ c\ \"ServerRootAddress\": \"$portalFullUrl\"," $portalBackendConfigFile
sudo sed -i "/.*\"ClientRootAddress\":.*/ c\ \"ClientRootAddress\": \"$portalFullUrl\"," $portalBackendConfigFile
sudo sed -i "/.*\"CorsOrigins\":.*/ c\ \"CorsOrigins\": \"$portalFullUrl,https://mail.google.com\"," $portalBackendConfigFile

# sudo sed -i "/.*\"remoteServiceBaseUrl\":.*/ c\ \"remoteServiceBaseUrl\": \"$portalFullUrl\"," $VENUEHOME/src/assets/appconfig.json
# sudo sed -i "/.*\"appBaseUrl\":.*/ c\ \"appBaseUrl\": \"$portalFullUrl\"," $VENUEHOME/src/assets/appconfig.json

sudo sed -i "/.*\"remoteServiceBaseUrl\":.*/ c\ \"remoteServiceBaseUrl\": \"$portalFullUrl\"," $portalFrontdConfigFile
sudo sed -i "/.*\"appBaseUrl\":.*/ c\ \"appBaseUrl\": \"$portalFullUrl\"," $portalFrontdConfigFile

# sudo sed -i "/.*\"remoteServiceBaseUrl\":.*/ c\ \"remoteServiceBaseUrl\": \"$portalFullUrl\"," $VENUEHOME/wwwroot/assets/appconfig.json
# sudo sed -i "/.*\"appBaseUrl\":.*/ c\ \"appBaseUrl\": \"$portalFullUrl\"," $VENUEHOME/wwwroot/assets/appconfig.json

#sudo sed -i "/.*\"remoteServiceBaseUrl\":.*/ c\ \"remoteServiceBaseUrl\": \"$portalFullUrl\"," $VENUEHOME/wwwroot/assets/appconfig.production.json
#sudo sed -i "/.*\"appBaseUrl\":.*/ c\ \"appBaseUrl\": \"$portalFullUrl\"," $VENUEHOME/wwwroot/assets/appconfig.production.json

#sudo sed -i "/.*this._baseUrl =.*/ c\this._baseUrl = \"$serviceFullUrl\";" $VENUEHOME/portal/wwwroot/main.js
#sudo sed -i "/.*baseUrl.*/ c\baseUrl: '$serviceFullUrl'," $VENUEHOME/portal/protractor.conf.js

echo "#/bin/bash" > $VENUEHOME/runportal.bash
echo "/usr/bin/dotnet $VENUEHOME/CommonDesk.Venue.Web.Host.dll &> /dev/null &" >> $VENUEHOME/runportal.bash

sudo dos2unix $VENUEHOME/runportal.bash
sudo chmod a+x $VENUEHOME/runportal.bash

sudo systemctl start RunVenuePortal.service
sudo systemctl status RunVenuePortal.service

sudo service nginx restart

# save who and when upload occured 
updateTimeFile=$VENUEHOME/lastPortalUpdateTime.txt
sudo date > $updateTimeFile
sudo echo $SSH_CLIENT >> $updateTimeFile
