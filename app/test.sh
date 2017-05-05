#!/bin/bash
echo 'hello from test script!'
ls -l -a
id
pwd
echo 'going to the file away from here now!'
dh -f efs
cd efs
ls -l -a