import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-restaurant-add',
  templateUrl: './restaurant-add.component.html',
  styleUrls: ['./restaurant-add.component.css']
})
export class RestaurantAddComponent {
  restaurantForm: FormGroup;
  submitted = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private restaurantService: RestaurantService, private router: Router) {
    this.restaurantForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      location: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  get f() { return this.restaurantForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.restaurantForm.valid) {
      this.restaurantService.addRestaurant(this.restaurantForm.value).subscribe(
        () => this.router.navigate(['/restaurants']),
        (error) => this.errorMessage = 'There was an error adding the restaurant'
      );
    }
  }
}
