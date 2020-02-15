

REM Cleanup previous build
del /f C:\dev\PortalPackages\VenuePortal.zip
cd wwwroot\dist
DEL /F/Q/S *.* > NUL
cd ../..

REM Build the backend
dotnet build CommonDesk.Venue.Web.Host.csproj -c Release

REM Buld and publish the frontend
dotnet publish -c Release

REM Package the website into a zip file for deployment
cd bin\Release\netcoreapp2.2\publish
zip -r C:\dev\PortalPackages\VenuePortal.zip .

REM Exit the publish folder or it will lock it and interfer with vs next time we publish the app
cd ../../../..

