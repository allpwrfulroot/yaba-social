//////////////////////////////////////////////////////////////////////
// This example adds a new column from a csv file, "broadcast", as a field
// on the User data in Graph.cool
// To use:
// - add this file, the package.json file, and the data csv to a directory
// - update graphcoolUrl, csvFilePath, and the field (column name, User schema
//   field) of the data you wish to add to users from the csv from "broadcast"
// - in the terminal, navigate to the files' directory and $ npm install
// - run the script with $ babel-node update_data.js
//////////////////////////////////////////////////////////////////////

import request from 'request'
import csv from 'csvtojson'
import { Lokka } from 'lokka'
import { Transport } from 'lokka-transport-http'

const graphcoolUrl = 'pasteYourGraphCoolSimpleEndpointHere'
const csvFilePath = './nameofCSVindirectory.csv'
const client = new Lokka({
  transport: new Transport(graphcoolUrl)
})

var newUserInfo = {}

const getIds = async() => {
  const ids = await client.query(`{
    allUsers {
      id
      email
    }
  }`)
  return ids
}

const addInfo = async(users) => {
  let updatedUsers = await Promise.all( users.map(updateUser) )
  // console.log(updatedUsers)
  return updatedUsers
}

const updateUser = async(user) => {
  if(newUserInfo[user.email] && newUserInfo[user.email].broadcast) {
    let newBroadcast = await newUserInfo[user.email].broadcast
    user.broadcast = newBroadcast
  }
  //////////////////////////////////////////////////////////////////////
  // For lists of strings, like interests: "python, disco, cats, pizza"
  //////////////////////////////////////////////////////////////////////
  // if(newUserInfo[user.email] && newUserInfo[user.email].links) {
  //   let newLinks = await newUserInfo[user.email].links.split(',').map( link => link.trim())
  //   user.links = newLinks
  // }
  return user
}

const updateDatabase = async(users) => {
  let updatedUsers = await Promise.all( users.map(uploadNewData) )
  // console.log(updatedUsers)
  return updatedUsers
}

const uploadNewData = async(user) => {
  let result = null
  // console.log('user: ', user)
  if(user.broadcast){
    result = await client.mutate(`
      ($id: ID!, $broadcast: String!){
      user: updateUser(
        id: $id
        broadcast: $broadcast
      ) {
        id
      }
    }`,{
      id: user.id,
      broadcast: user.broadcast
    })
    return result.user.id
  } else {
    return user
  }
}

csv({ noheader: false })
.fromFile(csvFilePath)
.on('json', (jsonObj) => {
  if(jsonObj.email) {
    let key = jsonObj.email
    newUserInfo[key] = jsonObj
  }
})
.on('done', () => {
  getIds()
  .then( res => addInfo(res.allUsers))
  .then( result => updateDatabase(result))
  .then( response => console.log('done!'))
  .catch( error => console.log('Error: ', error.message))
})
