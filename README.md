# hot-blog

## Description

For my 14th coding bootcamp challenge, I was required to create a tech blog application that developers can share and read up on a variety of concepts, advancements, or technologies. Before users can view/edit blogs, the user has to login/signup. Once logged in, the users have features such as viewing posted blogs by other users, commenting on blogs, creating a blog, and editting user posted blogs.

## How I Did It

Firstly, I used a Model-View-Controller architecture in order to keep a separation of concerns and keeping the code look well organized. Then, using Sequelize I was able to make models for the representation of a user, blog, and comment. Sequelize also made it easy to query through the saved data in order to gather information about a blog, user, or comment. The template of the HTML of the application was created with handlebars, a javascript library used to create reusable webpage templates, making it easy to have a dynamically generated page. Lastly, so that the user wasn't prompted to login everytime they changed routes, an express session was used to store a boolean that indicated if the user was logged in or not.

## Link to Application

https://hot-bloggin.herokuapp.com/
