# PM2 for managing clusters

## install pm2

`npm i -g pm2`

## starting server

`pm2 start index.js -i 0`

`-i 0` will create instances equal to number of logical CPUs

### list instances

`pm2 list`
will show all the instances and their status including CPU and mem usage

### monitor

`pm2 monit`

will open a dashboard with all instances listed. Selecting an isntance will show it's log.

### stopping server

`pm2 delete index`

will stop the server
