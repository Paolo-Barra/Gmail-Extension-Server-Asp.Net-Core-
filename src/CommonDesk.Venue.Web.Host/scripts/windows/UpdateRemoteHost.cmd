rem
SC \\johnwin08 stop  VenueEmailListener
SC \\johnwin08 stop  VenueRulesListener
SC \\johnwin08 stop  VenueHistoryListener
xcopy ..\bin\Debug\*.dll \\johnwin08\venueSyncService\bin /Y
xcopy ..\bin\Debug\*.pdb \\johnwin08\venueSyncService\bin /Y
xcopy ..\bin\Debug\*.cmd \\johnwin08\venueSyncService\bin /Y
rem xcopy ..\bin\Debug\*.xml \\johnwin08\venueSyncService\bin /Y
xcopy ..\bin\Debug\*.exe \\johnwin08\venueSyncService\bin /Y
xcopy *.cmd \\johnwin08\venueSyncService\bin\Scripts /Y

rem SC \\johnwin08 start  VenueEmailListener
rem SC \\johnwin08 start  VenueRulesListener
rem SC \\johnwin08 start  VenueHistoryListener