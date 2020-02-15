Rem
ECHO Starting Transfer
set awsEnvName=azure
set connectString="mbalsam@40.121.71.108"


set remote="C:\Program Files\OpenSSH-Win64"
set rsyncCmd="C:\Program Files\rsync\rsync"
set remoteSsh="C:\Program Files\OpenSSH\bin\ssh"
set remoteScp="C:\Program Files\OpenSSH\bin\scp"
set awsKey=-i C:\Users\%USERNAME%\Documents\keys\azurePrivateOpenSsh

copy Amazon\config\VenueSyncService.NetCore.dll.config.%awsEnvName% bin\Debug\netcoreapp2.1\publish\VenueSyncService.NetCore.dll.config
copy Amazon\config\NLog.config.cloudwatch.%awsEnvName% bin\Debug\netcoreapp2.1\publish\NLog.config
copy Amazon\*.bash bin\Debug\netcoreapp2.1\publish
pushd bin\Debug\netcoreapp2.1\publish

%remotessh%  %awsKey% %connectString% "killall -q dotnet"
%remoteScp% -rp %awsKey% * %connectString%:app

rem %rsyncCmd% -avz '%remoteSsh% %awsKey%'  *.*  ubuntu@rest.%awsEnvName%.commondesk.biz:app
rem aws s3 sync ./bin/Debug/staticfiles/ s3://venue-static-files/staticfiles/ --delete

rem  %remote%\ssh %awsKey% ubuntu@irest.%awsEnvName%.commondesk.biz "dos2unix app/runall.bash"
rem  %remote%\ssh %awsKey% ubuntu@irest.%awsEnvName%.commondesk.biz "chmod u+x app/runall.bash"
%remotessh%  %awsKey% %connectString% "dos2unix app/runall.bash"
%remotessh%  %awsKey% %connectString% "chmod u+x app/runall.bash"

rem  %remote%\ssh %awsKey% ubuntu@irest.%awsEnvName%.commondesk.biz "dos2unix app/runcmd.bash"
rem  %remote%\ssh %awsKey% ubuntu@irest.%awsEnvName%.commondesk.biz "chmod u+x app/runcmd.bash"
%remotessh%  %awsKey% %connectString% "dos2unix app/runcmd.bash"
%remotessh%  %awsKey% %connectString% "chmod u+x app/runcmd.bash"

rem  %remote%\ssh %awsKey% ubuntu@irest.%awsEnvName%.commondesk.biz "chmod u+x app/initEc2Host.bash"
%remotessh%  %awsKey% %connectString% "chmod u+x app/initEc2Host.bash"

popd