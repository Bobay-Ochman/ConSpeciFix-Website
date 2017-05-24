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
explore = sys.argv[3]
if(explore=='false'):
	species = sys.argv[4]

#unzip the files
files = os.listdir('/var/app/current/'+folderPath)
fd = files[0]
path = folderPath+fd
try:
	os.system('unzip '+path+ ' -d '+folderPath)
except:
	print 'could not unzip file'
os.system('mv /var/app/current/'+folderPath + ' '+ '/var/app/current/efs/'+folderPath)

if(explore=='false'):
	os.chdir('/var/app/current/efs/ConSpeciFix/web/')
	print 'About to start literally all of the analysis.'
	os.system('python runner.py '+ species +' '+str(fd)+' '+ timestamp+' '+email+' &')
else:
	os.chdir('/var/app/current/efs/ExploratoryPhase/scripts/')
	print 'About to start literally all of the analysis.'
	os.system('python runner.py ' + timestamp+ ' ' + str(fd)+' '+email+' &')


print 'we have started the devil.'

