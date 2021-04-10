
## **JWT User Authentication in Next.js Web Application(implemented with JSON Web Tokens) by using cookies**


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) boilerplate startup.

### **Getting Started**

You can run this app in the development server by using next commands:


```
npm run dev
# or
yarn dev
```


Before using this app, you must first create database with users:

  ``` CREATE DATABASE IF NOT EXISTS Users; ```

After that, create a table users:
  
``` 
  ...
  CREATE TABLE users (
	id INT AUTO_INCREMENT,
    user_name VARCHAR(20) NOT NULL UNIQ NOT NULL UNIQUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    password TEXT NOT NULL,
    PRIMARY KEY(id)
  ); 
  ...
```
  
  Now, insert some data into adatabase:
  
```...
    INSERT INTO users (user_name, email, password) VALUES ('Daniel', 'daniel@mail.com', your_password);
    ...
```
  
  Inside your root folder, create environment file (.env.local) with the following content:

```
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_DATABASE=Users
MYSQL_PASSWORD=***

JWT_KEY=26b*****-****-****-****-*****0bed42b
```
  Here, all four ***MYSQL_*** environment variables are intialized according your MySQL RDBMS configuration on your mashine. 
  So, change all these values with corresponding values on your local mashine. 
  ***JWT_KEY*** is a just secret key which you can create by your own. You can create one by [Online GUID / UUID Generator](https://www.guidgenerator.com/).
  

- *Open your local server host [http://localhost:3000](http://localhost:3000) inside your browser to see the welcome page.*


You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
