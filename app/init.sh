#!/bin/bash
echo 'hello from init script!'
echo Defaults:root \!requiretty >> /etc/sudoers 
id
#sudo yum install -y R
#sudo umount /var/app/current/efs || echo 'whoops! cant umount the old system!'
#sudo yum install -y nfs-utils
#sudo mount -t nfs4 -o nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2 fs-6813c4c1.efs.us-west-2.amazonaws.com:/ /tmp/deployment/application/efs || echo 'whoops! failed to connect to the file system'

#make sure we've got the most fresh copy of the scripts
sudo git clone "https://github.com/Bobay-Ochman/ConSpeciFix.git" /tmp/deployment/application/efs/ConSpeciFix

#make sure everyone can use the use the scritps.
sudo chmod -R 755 /tmp/deployment/application/efs/*

#give us MAFFT :D
cd /tmp/deployment/application/efs/progs/mafft-folder/core
sudo make clean
sudo make
sudo make install
