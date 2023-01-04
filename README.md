# Blogify 

Blogify is a full stack web application for sharing the blogs for the student community.User can create their custom profile on the platform. Users can share the blogs, can attach tags to the posts, and users can categorise the posts based on the post types. Users can like the posts, and can comment on the post. The respective author will receive the post notification based on the likes, comments or their interested tags. Users can also search the blog posts based on their titles. Users will also be able to share the posts with the protected links to other social media platforms and users will also be able to copy the link to the clipboard. 

For starting the app in the development server first create an .env file inside the api folder and create the below variables, and paste the regarding credentials in the .env file and then run the script `npm start` in both the client and the api directory simultaneously to start the server and the frontend. 

`MONGODB_URL // mongodb cluster URL`   
`MONGO_USER // mongodb username`   
`MONGO_PASS // for mongodb cluster password`   

The web app comprises two interfaces communicating with the API, which are the frontend part and the backend part. In the repository you can find the frontend source in the client directory and the backend source in the api directory. 




## Client:
The frontend of the whole web application is created using the React.js library. Also for some UI components we have used the BaseUI library developed by Uber. All the UI components are residing under the directory named src. All important directories for the UI are listed below.


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
