Rem
ECHO Starting Transfer
set awsEnvName=%1
set remote="C:\Program Files\OpenSSH\bin\scp.exe"
set rsyncCmd="C:\Program Files\rsync\rsync"
set remoteSsh="C:\Program Files\OpenSSH\bin\ssh.exe"


set awsKey=-i C:\Users\%USERNAME%\Documents\keys\ebkeys.pem

copy Amazon\config\VenueSyncService.NetCore.dll.config.%awsEnvName% bin\Debug\netcoreapp2.2\publish\VenueSyncService.NetCore.dll.config
copy Amazon\config\NLog.config.cloudwatch.%awsEnvName% bin\Debug\netcoreapp2.2\publish\NLog.config
copy Amazon\*.bash bin\Debug\netcoreapp2.2\publish
pushd bin\Debug\netcoreapp2.2\publish

%remoteSsh% %awsKey% ubuntu@irest.%awsEnvName%.commondesk.biz "killall -q dotnet"
%remote% -rp %awsKey% * ubuntu@irest.%awsEnvName%.commondesk.biz:app
rem %rsyncCmd% -avz '%remoteSsh% %awsKey%'  *.*  ubuntu@rest.%awsEnvName%.commondesk.biz:app
aws s3 sync ./bin/Debug/staticfiles/ s3://venue-static-files/staticfiles/ --delete

%remoteSsh% %awsKey% ubuntu@irest.%awsEnvName%.commondesk.biz "dos2unix app/runall.bash"
%remoteSsh% %awsKey% ubuntu@irest.%awsEnvName%.commondesk.biz "chmod u+x app/runall.bash"

%remoteSsh% %awsKey% ubuntu@irest.%awsEnvName%.commondesk.biz "dos2unix app/runcmd.bash"
%remoteSsh% %awsKey% ubuntu@irest.%awsEnvName%.commondesk.biz "chmod u+x app/runcmd.bash"

%remoteSsh% %awsKey% ubuntu@irest.%awsEnvName%.commondesk.biz "chmod u+x app/initEc2Host.bash"
popd