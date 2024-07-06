import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RestaurantEditComponent } from '../restaurant-edit/restaurant-edit.component';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  location: string;
}

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = []; 
  errorMessage: string = '';
  modalRef?: BsModalRef;

  constructor(private restaurantService: RestaurantService, private modalService: BsModalService) {}

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe(
      (data) => this.restaurants = data,
      (error) => this.errorMessage = 'There was an error fetching the restaurant list'
    );
  }

  deleteRestaurant(id: string) { 
    this.restaurantService.deleteRestaurant(id).subscribe(
      () => this.restaurants = this.restaurants.filter(restaurant => restaurant.id !== id),
      (error) => this.errorMessage = 'There was an error deleting the restaurant'
    );
  }

  openEditModal(restaurant: Restaurant) {
    const initialState = {
      restaurant
    };
    this.modalRef = this.modalService.show(RestaurantEditComponent, { initialState });
    this.modalRef.content.restaurantUpdated.subscribe((updatedRestaurant: Restaurant) => { 
      const index = this.restaurants.findIndex(r => r.id === updatedRestaurant.id);
      if (index !== -1) {
        this.restaurants[index] = updatedRestaurant; 
      }
    });
  }
}
