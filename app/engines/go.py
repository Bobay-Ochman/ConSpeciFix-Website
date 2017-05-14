import sys
import os
print 'hello from the engine!'
print str(sys.argv)
os.system('id')

print os.path.dirname(os.path.realpath(__file__))

#init
timestamp = sys.argv[1]
folderPath = 'uploads/'+sys.argv[1]+'/'
email = sys.argv[2]
species = sys.argv[3]

#unzip the files
files = os.listdir('/var/app/current/'+folderPath)
fd = files[0]
path = folderPath+fd
try:
	os.system('unzip '+path+ ' -d '+folderPath)
except:
	print 'could not unzip file'
os.system('mv /var/app/current/'+folderPath + ' '+ '/var/app/current/efs/'+folderPath)
os.chdir('/var/app/current/efs/ConSpeciFix/web/')

os.system('mv /var/app/current/efs/'+path + ' /var/app/current/efs/'+path+'.fa')
testGenome = str(fd)
print 'all done with the easy stuff.'

print 'About to start literally all of the analysis.'
os.system('python runner.py '+ species +' '+testGenome+' '+ timestamp+' '+email+' &')
print 'we have started the devil.'