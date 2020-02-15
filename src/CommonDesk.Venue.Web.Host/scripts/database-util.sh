#!/bin/bash 
if [ -z "$1" ] ; then
    echo "database-util.sh "
    echo "                    update    - update the database"
    echo "                    drop    - drop the database"
fi


if [[ $1  = update ]]; then
    # perform the equivelnt of dotnet ef database update without the packages 
    dotnet exec \
    --runtimeconfig ./CommonDesk.Venue.Web.Host.runtimeconfig.json \
    --depsfile ./CommonDesk.Venue.Web.Host.deps.json /usr/share/dotnet/sdk/NuGetFallbackFolder/microsoft.entityframeworkcore.tools/2.2.0/tools/netcoreapp2.0/any/ef.dll \
    --verbose database update \
    --context VenueDbContext  \
    --assembly CommonDesk.Venue.EntityFrameworkCore.dll \
    --startup-assembly CommonDesk.Venue.Web.Host.dll \
    --data-dir ./ 
    echo "database created!"

fi


if [[ $1  = drop ]]; then
    # perform the equivelnt of dotnet ef database update without the packages 
    dotnet exec \
    --runtimeconfig ./CommonDesk.Venue.Web.Host.runtimeconfig.json \
    --depsfile ./CommonDesk.Venue.Web.Host.deps.json /usr/share/dotnet/sdk/NuGetFallbackFolder/microsoft.entityframeworkcore.tools/2.2.0/tools/netcoreapp2.0/any/ef.dll \
    --verbose database drop \
    --context VenueDbContext  \
    --assembly CommonDesk.Venue.EntityFrameworkCore.dll \
    --startup-assembly CommonDesk.Venue.Web.Host.dll \
    --data-dir ./ 
    echo "database dropped!"
fi


                         

                         