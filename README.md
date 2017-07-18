# yaba-social
Yet Another Boilerplate App created with [Expo](https://expo.io), [react-navigation](https://reactnavigation.org), [Apollo](http://dev.apollodata.com/react/)+[GraphQL](http://graphql.org), and a smidge of Redux for demo purposes.

View for yourself [on Expo](https://exp.host/@allpwrfulroot/yaba-social)

- [x] react-navigation (Drawer, Tab, Stack, combos, stack resets, and a modal for good measure)
- [x] Load mock data into Graph.cool; add CSV's and Node scripts to repo
- [x] Add Apollo config
- [ ] Wire up Chats and Events pages with GraphQL
- [ ] Redux and search
- [ ] My Profile page

![Demo GIF](https://github.com/allpwrfulroot/yaba-social/blob/master/yaba-init2.gif)

## About this demo  
This project is built up over several parts:  
- **reactnavigation:** Navigation setup and general app components like ListView, SwipeableListView (!), etc. with static dummy data
- **apollo-graphql:** Apollo Client to connect a GraphQL backend (Graph.cool in this example) to the app components
- **redux-search:** Redux to save global variables (in this case, a search term) to the global Store (Apollo)
- **editprofile:** Update your profile photo and information using react-apollo

## About the mock data
The mock data for this project has relied on the [randomuser.me](randomuser.me) API, [lorem ipsum generators](https://loremipsumgenerator.com), some Node scripts saved in the data_scripts directory, and just making stuff up.

## Other resources used
Some [open source fonts](https://fontlibrary.org), lots of built-in [icon libraries](https://expo.github.io/vector-icons/), and docs. Lots of docs.
