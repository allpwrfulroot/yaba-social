# yaba-social
Yet Another Boilerplate App created with [Expo v23](https://expo.io), [react-navigation](https://reactnavigation.org), [Apollo 2.0](https://www.apollographql.com/docs/react/)+[GraphQL](http://graphql.org), and ~~a smidge of Redux for demo purposes~~ absolutely zero Redux, the global state is also getting managed by the Apollo Client.

View for yourself [on Expo](https://exp.host/@allpwrfulroot/yaba-social)

## About this demo  
Send questions, requests, etc. as Issues

### Custom Search + Filters, managing state thru Apollo  
Building a common UI that's been challenging with `react-navigation`. No backend required, this data is entirely managed in global state by Apoll Client!   
Un-comment the additional code in `apollo.js` to hook up your GraphQL server of choice; check out [Graph.cool](http://graph.cool) for a quick and easy setup.  
![Custom Search People Tab](https://github.com/allpwrfulroot/yaba-social/blob/update/documentation/CustomSearch_People.png)
![Custom Search Places Tab](https://github.com/allpwrfulroot/yaba-social/blob/update/documentation/CustomSearch_Places.png)
![Custom Search Filter Modal](https://github.com/allpwrfulroot/yaba-social/blob/update/documentation/CustomSearch_Filter.png)

### Modals  
Stack trickery: Nest stacks and tabs in interesting ways  
![Events Tab](https://github.com/allpwrfulroot/yaba-social/blob/update/documentation/EventsTab.png)
![Events Tab Hi Modal](https://github.com/allpwrfulroot/yaba-social/blob/update/documentation/EventsTab_HiModal.png)
![Events Tab Lo Modal](https://github.com/allpwrfulroot/yaba-social/blob/update/documentation/EventsTab_LoModal.png)  

### Custom Drawer  
A common Drawer design: logo, scrolling list of options, and logout option floating at the bottom. Added the navigation state so you can quickly view the overall drawer and how it changes as you move through the app.  
![Drawer](https://github.com/allpwrfulroot/yaba-social/blob/update/documentation/Drawer.png)  

### Stack  
Generic chat stack: navigates from a list of chats to either a Profile or Chat page. Chat page also shows passing of parameters through the navigation prop.
![Chats List](https://github.com/allpwrfulroot/yaba-social/blob/update/documentation/ChatsTab.png)
![Profile](https://github.com/allpwrfulroot/yaba-social/blob/update/documentation/Profile.png)
![Chat](https://github.com/allpwrfulroot/yaba-social/blob/update/documentation/Chat.png)

### Login + Signup  
Generic login page + that can handle a keyboard during text input. Scaffolding for a new user signup sequence. Both reset the stack when navigating to the main App.  
![Login](https://github.com/allpwrfulroot/yaba-social/blob/update/documentation/Login.png)
![Login With Keyboard](https://github.com/allpwrfulroot/yaba-social/blob/update/documentation/LoginWithKeyboard.png)
![Signup page one](https://github.com/allpwrfulroot/yaba-social/blob/update/documentation/SignupPage1.png)
![Signup page two](https://github.com/allpwrfulroot/yaba-social/blob/update/documentation/SignupPage2.png)
