import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  locationCoords: any;
  time: any;
  constructor( private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy) { 
      this.locationCoords = {
        latitude: "",
        longitude: "",
        accuracy: "",
        timestamp: ""
      }
      this.time = Date.now();
    }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        //this.getLocationCoordinates()  
        this.getTimeStamp();
      },
      error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }
 
  // Methos to get device accurate coordinates using device GPS
  getLocationCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.locationCoords.latitude = resp.coords.latitude;
      this.locationCoords.longitude = resp.coords.longitude;
      this.locationCoords.accuracy = resp.coords.accuracy;
      this.locationCoords.timestamp = resp.timestamp;
      console.log("timeStamp"+this.locationCoords.timestamp)
    }).catch((error) => {
      alert('Error getting location' + error);
    });
  }

  getTimeStamp() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.locationCoords.timestamp = resp.timestamp;
      console.log("timeStamp"+this.locationCoords.timestamp)
    }).catch((error) => {
      alert('Error getting location' + error);
    });
    return this.locationCoords.timestamp
  }
}
