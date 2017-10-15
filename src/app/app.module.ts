import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { ApiServiceService } from './services/api-service.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    GoogleMapComponent,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAosliCTEo5UIs2aQgO-FlSR3a8120Wg6U",
      libraries: ["places","geometry"]
    }),
    ReactiveFormsModule
  ],
  providers: [ApiServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
