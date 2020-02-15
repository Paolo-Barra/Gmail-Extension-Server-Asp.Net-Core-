#!/bin/bash
if [[ $DPORTAL  = "" ]]; then
   echo "variable $DPORTAL not set"
   exit
fi

if [[ $(ps aux) =~  dotnet.*\-t.*email ]]; then 
   echo "dotnet -t email is running.. Kill it before building"
   exit
fi
if [[ $(ps aux) =~  dotnet.*Web.Host ]]; then 
   echo "dotnet CommonDesk.Venue.Web.Host is running.. Kill it before building"
   exit
fi
echo "Bulding script portal package "
cd $DPORTAL

rm -r bin/Release
# clean all backend files 
dotnet clean CommonDesk.Venue.Web.Host.csproj

# clean all frontend files from past Angular build 
rm -R wwwroot/dist

# build for backend in Release mode 
dotnet build CommonDesk.Venue.Web.Host.csproj -c Release

# publish the backend and frontend for Release 
dotnet publish -c Release

# make zip relative to base direcotry 
currdir=$PWD
pushd ./bin/Release/netcoreapp2.2/publish
_now=$(date +"%m-%d-%Y-%H-%M-%S")
_outputfile="~/releases/refindPortal-$_now.zip"
zip -r $_outputfile .
popd 



echo
echo
echo "Build process completed. Output=$_outputfile" 
