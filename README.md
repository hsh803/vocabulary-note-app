# Vocabulary note app - Deploy Node.js App with MySQL on Heroku

<a href="https://vocabulary-note-app.herokuapp.com/">Open</a> app in browser.

***Requiremnet***
Heroku account (Create account in Heroku website)


### 1. Create Heroku App
1) Login to your Heroku account in browser or in terminal by using following command line: `heroku login`.
2) Go to the root dicrectory of the app and create Heroku app by using following command line: `heroku create <app name>`.
3) Create git repository: `git init`.
4) Add remote version of git repository to heroku: `heroku git:remote -a account-tracking-app`.


### 2. Configure MySQL database for Node.js on Heroku app
1) Set up ClearDB on Add-ons: `heroku addons:create cleardb:ignite`. (Add your credit card info in your account to use this add-ons for free.)
2) Run following command line to get your database URL: `heroku config | grep CLEARDB_DATABASE_URL`.
3) You get the database URL (ex. mysql://c7846000000000:2cxxxxxx@us-cdbr-eaxx-0x.cleardb.com/heroku_95eXxxxb0000ec?reconnect=true)
4) Create your config.json file for connecting to the database using the database URL. (config/voca.json)

 - username: c7846000000000
 - password: 2cxxxxxx
 - host: us-cdbr-eaxx-0x.cleardb.com
 - database: heroku_95eXxxxb0000ec

5) Add `"start": "node index.js"` (index.js file is the one server runs in.) under "scripts" in package.json. (package.json)
6) Server port should be `process.env.PORT` for Heroku to connect to random server in browser. (index.js)
7) Use `createPool` for conncecting database to MySQL (createConnection cause the connection error, like H10. (index.js)

`var db = mysql.createPool(config);`

### 3. Create a new server for Heroku database (I used MySQL workbench)
1) Fill "Hostname", "Username" and "Password" by using the Heroku database URL.
2) Add tables.

### 4. Deploy the app to Heroku (I used Heroku CLI)
1) Initiate git in root directory of the app and commit files remotely to the repository by using following command line: 
`git add .` (or `git add <file name>`)
`git commit -m "message"`
`git push heroku master`


Reference:<br/>
https://bezkoder.com/deploy-node-js-app-heroku-cleardb-mysql/#Log_in_to_Heroku <br/>
https://github.com/bezkoder/nodejs-express-mysql
