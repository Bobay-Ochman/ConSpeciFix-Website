 #!/bin/bash 
timestamp=$(date +%s)
zip -r -X app.zip * > /dev/null
mv app.zip ../dist/$timestamp.zip 
echo $timestamp
