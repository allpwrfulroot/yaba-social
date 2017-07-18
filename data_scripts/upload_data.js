// To upload Events:
// $ npm install
// $ npm start

// To upload new Users:
// the mutation will have to be modified!
// For example, there's an authentication part
// Consider it a challenge problem
// (the answer is in the Graph.cool docs ;) 

import csv from 'csvtojson'
import {Lokka} from 'lokka'
import {Transport} from 'lokka-transport-http'

const graphcoolUrl = ''
const csvFilePath = './YABA_events_data.csv'
const client = new Lokka({
  transport: new Transport(graphcoolUrl)
})

var eventsList = []

const createEvent = async(event) => {
  const result = await client.mutate(`{
    user: createEvent(
      title: "${event.title}"
      location: "${event.location}"
      time: "${event.time}"
      icon: "${event.icon}"
    ) {
      id
    }
  }`)
  return result.user.id
}

const uploadEventsList = async(users) => {
  let ids = await Promise.all(users.map(createEvent))
  return ids
  // console.log(users)
}

csv({ noheader: false })
.fromFile(csvFilePath)
.on('json', (jsonObj) => {
  eventsList.push(jsonObj)
})
.on('done', (error) => {
  if(error){
    console.log('end, error:', error)
  } else {
    console.log('end, no errors')
    uploadEventsList(eventsList)
    .then( response => console.log(response) )
    .catch( error => console.log('Error in uploadEventsList: ', error))
  }
})
