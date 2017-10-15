import { Component, ElementRef, NgZone, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader, AgmCoreModule } from '@agm/core';
import { ApiServiceService } from '../services/api-service.service'
import { Branches } from '../interfaces/branches';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  subsriber; //subscriber to observable
  public latitude: number;
  public longitude: number;  
  public searchControl: FormControl;
  public zoom: number;

  public supermarkets:Array<any>;  //Change Type

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor( private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private apiService: ApiServiceService) { }

  ngOnInit() {

    //Get data from api
    this.subsriber = this.apiService.getBranches();
    this.subsriber.subscribe(res => {
      this.supermarkets = res;
    });

    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  calculateDistance() {
    let current_location = new google.maps.LatLng(this.latitude, this.longitude);  
    for(var i = 0; i < this.supermarkets.length; i++) {

      this.supermarkets[i].branches.forEach(branch => {
          let branchLatitude = branch.latitude;
          let branchLongitude = branch.longitude;  
          let branchLocation = new google.maps.LatLng(branchLatitude, branchLongitude);
          let distance = google.maps.geometry.spherical.computeDistanceBetween(current_location, branchLocation);
      
          branch.distance = distance;
          console.log(`Your distance is ${branch.name} ${distance} `)
      });

    }
  }

  ngOnDestroy() {
    this.subsriber.unsubscribe();
  }
}
