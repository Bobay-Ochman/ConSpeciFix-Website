#!/bin/bash
echo 'hello from init script!'
echo Defaults:root \!requiretty >> /etc/sudoers 

#lilypond
sudo wget http://download.linuxaudio.org/lilypond/binaries/linux-64/lilypond-2.18.2-1.linux-64.sh
export HOME=/usr/local
sudo chmod 777 lilypond-2.18.2-1.linux-64.sh
yes | sudo sh lilypond-2.18.2-1.linux-64.sh

export HOME=/home/ec2-user
#java
sudo yum install -y java-1.8.0
sudo yum remove -y java-1.7.0-openjdk