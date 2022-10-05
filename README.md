# hot-blog

## Description

For my 14th coding bootcamp challenge, I was required to create a tech blog application that developers can share and read up on a variety of concepts, advancements, or technologies. Before users can view/edit blogs, the user has to login/signup. Once logged in, the users have features such as viewing posted blogs by other users, commenting on blogs, creating a blog, and editing user posted blogs.

## How I Did It

Firstly, I used a Model-View-Controller architecture in order to keep a separation of concerns and keeping the code look well organized. Then, using Sequelize I was able to make models for the representation of a user, blog, and comment. Sequelize also made it easy to query through the saved data in order to gather information about a blog, user, or comment. The template of the HTML of the application was created with handlebars, a javascript library used to create reusable webpage templates, making it easy to have a dynamically generated page. Lastly, so that the user wasn't prompted to login everytime they changed routes, an express session was used to store a boolean that indicated if the user was logged in or not.

## Link to Application

https://hot-bloggin.herokuapp.com/

## Screenshots

### Login
![Login-page](https://user-images.githubusercontent.com/106782112/193959379-beabc9d5-ab07-4897-b61e-d96ca71de60c.png)

### Homepage
![homepage](https://user-images.githubusercontent.com/106782112/193959402-04602e91-961e-4bef-9821-8d961c23190a.png)

### Viewing a Blog
![viewing-blog](https://user-images.githubusercontent.com/106782112/193959441-a2ba08b8-47cd-44d7-a489-d12ee4d9702c.png)

### Dashboard
![dashboard](https://user-images.githubusercontent.com/106782112/193959468-de2267e3-dd76-47f7-8a04-8779369c9006.png)

### Editing Blog
![edit-blog](https://user-images.githubusercontent.com/106782112/193959568-82fbb44e-6f70-4597-878a-61596a8ebae4.png)
