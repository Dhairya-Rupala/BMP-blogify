# Blogify 

Blogify is a full stack web application for sharing the blogs for the student community.User can create their custom profile on the platform. Users can share the blogs, can attach tags to the posts, and users can categorise the posts based on the post types. Users can like the posts, and can comment on the post. The respective author will receive the post notification based on the likes, comments or their interested tags. Users can also search the blog posts based on their titles. Users will also be able to share the posts with the protected links to other social media platforms and users will also be able to copy the link to the clipboard. 

For starting the app in the development server first create an .env file inside the api folder and create the below variables, and paste the regarding credentials in the .env file and then you have to install all the packages listed inside the package.json file using the `npm i` or `npm install` in both the api and client dir and then run the script `npm start` in both the client and the api directory simultaneously to start the server and the frontend. 

`MONGODB_URL // mongodb cluster URL`   
`MONGO_USER // mongodb username`   
`MONGO_PASS // for mongodb cluster password`   

The web app comprises two interfaces communicating with the API, which are the frontend part and the backend part. In the repository you can find the frontend source in the client directory and the backend source in the api directory. 




## Client:
The frontend of the whole web application is created using the React.js library. Also for some UI components we have used the BaseUI library developed by Uber. All the UI components are residing under the directory named src. All important directories for the UI are listed below.  

### src/app.js     
This file consists of the main component which will be rendered inside the root div of the web application as per the react notation. This page comprises of all the routes which are there in the web app and their mapping to respective components.   



### src/pages 
This directory comprises all the pages or the routes components.

1. Home -For displaying the home page.   
2. Login - Login Page for the existing Users   
3. Register - Registration page for the new users   
4. Write - Write component for writing the blog post  
5. Single - Route for displaying the single blog post  
6. Profile - For displaying and updating the user profile  
7. NoMatch - For catching the non existing routes   


### src/context 
This directory comprises all the contexts, reducers and dispatch actions we can create which we can pass deeply in the component. Here we have stored the current user in the context. 






### src/hooks
1. usePostActions - This custom hook is for the state management of the notifications for the users, tags, categories and the search query for finding the particular blog post.



### src/components 
This directory consists of the helpful components which the App pages will use to build the whole UI. 

1. comment - This directory contains the components and styles used for the comment section in the UI.

2. debouncedInput - This directory contains the components and the styles for an input field which is wrapped by debouncing to avoid frequent requests to the database.

3. notifications - This directory contains the components and the styles for displaying and performing actions on the user respective notifications.

4. pagination - Consists of the components and the styles for the pagination bar which is helpful when there are too many posts in the database. 

5. post - It contains the component and the styles for the post card shown in the home page of the UI. 

6. posts - This directory contains the parent component of the post card, and it is used for rendering the list of the posts. 

7. quillEditor - For the rich text editor we have made use of the React Quill package, this directory contains the styles and components used to render the rich text editor.

8. searchBar - It contains the styles and the components for the search bar, where the user can search different different posts based on their title.

9. sidebar - It contains the components and the styles for showing the side part of the UI, where the post categories and search bar will be displayed.

10. singlePost - It contains the components and styles used to render the single blog post, which will be displayed when the user clicks on any particular blog post. 

11. tags - Contains the components and the styles for rendering the select bar for selecting the tags for the blog post or interested tags in the profile. 

12. topBar - This directory contains the components and the styles used for building the UI of the header part or the Top part of the web app.

13. userModal - This directory contains the component and the styles for the modal, which is rendered when the user will click on any other user’s profile.  



# API:

The API folder consists of all the files and directories related to the application's backend. Server Initialization, Database handling, URL calls, CRUD operations, information fetching, etc., are all implemented in this. It contained,

### Index.js  
The fundamental file to initiate the backend server, the routes, and the MongoDB database. The Multer module is used for image storage and retrieval.  

### Models  
Models contain an implementation of a schematic diagram of various databases. Basic definitions of the items/data are implemented in a .js file. Each of the files is written in a standard mongoose syntax and defines the fields and prototype of the data. Users can easily modify the structure according to their needs. This contains various types of databases which are listed below.  

1. Category.js - used to define the category of posts (i.e, whether it’s a query, blog, or interview experience)  

2. Notify.js - defines the structure of notification.   

3. Post.js - defines the structure of individual posts that are going to be created by a particular user.  

4. Tags.js - defines the schema for an individual tag. Tag helps match the post with the user's interest so that the user can get notified when any new posts are posted with similar tags.  

5. User.js - defines the structure and fields of the user. One can easily include other fields related to a user in the database using this file.  

### Routes  
This folder contains all the files related to handling the API request that is coming from the webpage to access databases and retrieve information. We made separate files for each of the different types of data available in the database. We used the express.js framework with node JS so that it’d be easier to build RESTful APIs. This folder contains the following files:  

1. Auth.js - Handles the API request and routing at the time of log-in and register.  

2. Categories.js -  Handles the API request related to the category associated with a particular post.  

3. Notify.js - notifications handling and fetching are done through this file.   

4. Posts.js - Operations like the Insertion of the post by a particular and fetching all the posts are done through this file. CRUD operations related to any post are done through this.  

5. Search.js - Searching a particular post using a title is done through this. We have made a MongoDB search index as ‘title_search’ and searching is done by applying appropriate query on the MongoDB database.   

6. Tags.js - fetching all the tags associated with particular posts and the user’s favorite tags are achieved through this.  

7. Users.js - Routing related to users is done through this file. Also, the updation of the user profile(i.e., changing password, phone number, profile photo, tags, etc.) is handled.  
