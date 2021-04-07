# Illuminate Designer

Illuminate Designer is a tool to create lighting sequences for the Randy Pausch Bridge. This is the official tool that we used for Illuminate 2021.

## Configuration
To setup the environment, run the following command:
```
cp .env.template .env
```

This will create an empty `.env` file. Populate the environment variables accordingly.

|Variable|Description|
|---|---|
|REACT_APP_BACKEND_URL|URL where the [backend](https://github.com/ScottyLabs/pausch-ui-backend) for uploading designs to the bridge is hosted.|
|REACT_APP_LOGIN_API|URL where the [Login API](https://github.com/ScottyLabs/login-api) that handles CMU authentication is hosted|
|REACT_APP_JWT_SECRET|JWT secret for the Login API|
|REACT_APP_GALLERY_LINK|URL for the gallery of submitted designs. Used as hyperlink in the navbar|

### Deployment
After configuring the environment, run
```
npm install
npm start
```
