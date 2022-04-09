// Code goes here!
import axios from 'axios';
import {GOOGLE_API_KEY} from "../secrets";
const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

type GoogleGeocodingResponse = {
  results: {geometry: {location: {lat: number, lng: number}}}[];
  status: 'OK' | 'ZERO_RESULTS';
}

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;
  axios.get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`
    )
    .then(response => {
      if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
      }
      const lat = response.data.results[0].geometry.location.lat;
      const lng = response.data.results[0].geometry.location.lng;
      console.log(lat, lng);
    })
    .catch(err => {
      if (err) {
        alert(err);
      }
    });
}

form.addEventListener('submit', searchAddressHandler);
