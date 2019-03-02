const firebase = require('firebase');
const SerialPort = require('serialport');
const fs = require('fs');

const obj = JSON.parse(fs.readFileSync('firebase_api.json', 'utf8'));

// Initialize Firebase
const config = {
  apiKey: obj.apiKey,
  authDomain: obj.authDomain,
  databaseURL: obj.databaseURL,
  projectId: obj.projectId,
  storageBucket: obj.storageBucket,
  messagingSenderId: obj.messagingSenderId,
};
firebase.initializeApp(config);

const { Readline } = SerialPort.parsers;

let arduinoResponse = 0;
firebase.database().ref().child('/truck_status').set(arduinoResponse);

const serialPort = new SerialPort('COM4', {
  baudRate: 9600,
});

const parser = new Readline();
serialPort.pipe(parser);
parser.on('data', (data) => {
  arduinoResponse = 1;
  firebase.database().ref().child('/truck_status').set(arduinoResponse);
  console.log(data);
});

serialPort.on('open', () => {
  console.log('Communication is on!');
});

/*
while (true) {
  checkArduino();
  if (arduinoResponse === 1) {
    firebase.database().ref().child('/truck_status').set(arduinoResponse);
  }
}
*/
