#!/bin/bash
echo 'hello from init script!'
echo Defaults:root \!requiretty >> /etc/sudoers 

sudo yum install -y R
#sudo umount /var/app/current/efs || echo 'whoops! cant umount the old system!'
#sudo yum install -y nfs-utils
#sudo mount -t nfs4 -o nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2 fs-6813c4c1.efs.us-west-2.amazonaws.com:/ /tmp/deployment/application/efs || echo 'whoops! failed to connect to the file system'

cd /tmp/deployment/application/efs/progs/mafft-folder/core
sudo make clean
sudo make
sudo make install
