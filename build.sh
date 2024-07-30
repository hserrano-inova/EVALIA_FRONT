npm run build
zip -r dist.zip dist
scp dist.zip root@evalia.inovalabs.es:/opt/IA/EVALIA/
