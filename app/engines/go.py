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

#find name of the species we are searching for
files = os.listdir('/var/app/current/efs/'+folderPath)
testGenome = ''
for f in files:
	if f.endswith('.fa'):
		testGenome = f.strip('.fa')
	if f.endswith('.fna'):
		#rename
		os.system('mv /var/app/current/efs/'+path + ' /var/app/current/efs/'+path.strip('.fna')+'.fa')
		testGenome = f.strip('.fna')
if (testGenome == '') :
	print 'Couldnt find the file to look at'
	os.system('python mail.py ' +species + ' n/a '+timestamp+' '+email + ' error')
	exit()

print 'all done with the easy stuff.'
print 'About to start literally all of the analysis.'

os.system('python runner.py '+ species +' '+testGenome+' '+ timestamp+' '+email+' &')
print 'we have started the devil.'