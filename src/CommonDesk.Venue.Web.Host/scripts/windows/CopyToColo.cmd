rem https://ss64.com/nt/robocopy.html
rem 
robocopy "bin\debug" "\\10.4.1.110\VenueSync\Debug" /MIR /Z /XF VenueSyncService.exe.config /XF *.pdb /XF *.manifest /XF *.log /XF *.txt
robocopy "..\..\staticfiles" "\\10.4.1.110\VenueSync\staticfiles" /MIR /Z /XO 
