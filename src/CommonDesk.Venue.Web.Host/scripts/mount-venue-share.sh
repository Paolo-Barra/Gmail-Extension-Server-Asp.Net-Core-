#/bin/bash

# IMPORTANT: If any of these values change on the Azure portal we have to update this script
storageAccount="venuestorageaccount"
accountKey="neqz9hI7T4ewCkOtK2Nar/Zg2xzuPndx4uxX5u/3t2VoG5fs9+hlZy3ZCc3sL2rk89dWLvlqTjA6qUsOQGBRBg=="
azureShareName="venuesyncservice"

# The location on the linux vm and the user which will have access
mountPoint="/mnt/venuesyncservice"

# The azure share is mounted on a temp file system, we need to create the mount point folder on every start
sudo mkdir $mountPoint

# Mount the azure share
sudo mount -t cifs //$storageAccount.file.core.windows.net/$azureShareName $mountPoint -o vers=3.0,username=$storageAccount,password=$accountKey,dir_mode=0755,file_mode=0664

