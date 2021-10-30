const mysqlConnection = require('./dbConnect');

mysqlConnection.connect((err)=>{
    if(err)
        console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));

    console.log('Connection Established Successfully');
});

mysqlConnection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASENAME}`, function (err, result) {
    if (err)
    {
        throw err;
        return;
    }
      console.log(" Database created");
    });

mysqlConnection.query(`USE ${process.env.DATABASENAME}`);

const admin = `Create TABLE IF NOT EXISTS admin(
    username VARCHAR(40) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    Fname VARCHAR(255) NOT NULL,
    Lname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (username)
)`;

const users = `Create TABLE IF NOT EXISTS users(
    username VARCHAR(40) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    Fname VARCHAR(255) NOT NULL,
    Lname VARCHAR(255) NOT NULL,
    DOB DATE NOT NULL,
    Description VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    profileImgUrl VARCHAR(255),
    coverImgUrl VARCHAR(255),
    state VARCHAR(255),
    country VARCHAR(255),
    pincode INT(16),
    admin_id VARCHAR(40),
    PRIMARY KEY (username),
    FOREIGN KEY (admin_id) REFERENCES admin(username)
)`;

const arts = `Create TABLE IF NOT EXISTS arts(
    id INT AUTO_INCREMENT,
    isPublished BOOLEAN NOT NULL,
    dateOfPublish DATETIME NOT NULL,
    timestamp DATETIME NOT NULL,
    title VARCHAR(255),
    description TEXT,
    username VARCHAR(40),
    admin_id VARCHAR(40),
    PRIMARY KEY (id),
    FOREIGN KEY (admin_id) REFERENCES admin(username),
    FOREIGN KEY (username) REFERENCES users(username)
)`;

const likes = `Create TABLE IF NOT EXISTS likes(
    timestamp DATETIME NOT NULL,
    username VARCHAR(40),
    postId int,
    PRIMARY KEY (timestamp, username, postId),
    FOREIGN KEY (postId) REFERENCES arts(id),
    FOREIGN KEY (username) REFERENCES users(username)
)`;

const comments = `Create TABLE IF NOT EXISTS comments(
    timestamp DATETIME NOT NULL,
    username VARCHAR(40),
    commentData VARCHAR(255),
    postId int,
    PRIMARY KEY (timestamp, username, postId),
    FOREIGN KEY (postId) REFERENCES arts(id),
    FOREIGN KEY (username) REFERENCES users(username)
)`;

const artImages = `Create TABLE IF NOT EXISTS artImages(
    timestamp DATETIME NOT NULL,
    imageUrl VARCHAR(255),
    postId int,
    PRIMARY KEY (timestamp, postId),
    FOREIGN KEY (postId) REFERENCES arts(id)
)`;

mysqlConnection.query(admin, (err,result) => {
    if (err) throw err;
    else console.log(" Admin Table created");
  });

mysqlConnection.query(users, (err,result) => {
    if (err) throw err;
    else console.log(" Users Table created");
});

mysqlConnection.query(arts, (err,result) => {
    if (err) throw err;
    else console.log(" Arts Table created");
});

mysqlConnection.query(likes, (err,result) => {
    if (err) throw err;
    else console.log(" Likes Table created");
});

mysqlConnection.query(comments, (err,result) => {
    if (err) throw err;
    else console.log(" Commnets Table created");
});

mysqlConnection.query(artImages, (err,result) => {
    if (err) throw err;
    else console.log(" Art Images Table created");
});