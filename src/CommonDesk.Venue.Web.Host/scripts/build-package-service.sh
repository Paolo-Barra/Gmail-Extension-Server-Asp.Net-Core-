#!/bin/bash
if [[ $DSYNC  = "" ]]; then
   echo "variable $DSYNC not set"
   exit
fi

if [[ $(ps aux) =~  dotnet.*\-t.*email ]]; then 
   echo "dotnet -t email is running.. Kill it before building"
   exit
fi
if [[ $(ps aux) =~  dotnet.*Web.Host ]]; then 
   echo "dotnet -t email is running.. Kill it before building"
   exit
fi
echo "Blding syncservices"
cd $DSYNC

rm -r bin/Release
# clean all backend files 
dotnet clean VenueSyncService.NetCore.csproj

# build for backend in Release mode 
dotnet build VenueSyncService.NetCore.csproj -c Release

# make zip relative to base direcotry 
currdir=$PWD
pushd ./bin/Release/netcoreapp2.2/publish
_now=$(date +"%m-%d-%Y-%H-%M-%S")
_outputfile="~/releases/refindServices-$_now.zip"
zip -r $_outputfile .
#ln -s _outputfile "$currdir/releases/latest.zip"
popd 



echo
echo
echo "Build process completed. Output=$_outputfile" 
