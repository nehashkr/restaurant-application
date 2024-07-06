import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.component.html',
  styleUrls: ['./restaurant-edit.component.css']
})
export class RestaurantEditComponent implements OnInit {
  @Input() restaurant: any;
  @Output() restaurantUpdated = new EventEmitter<any>(); 

  restaurantForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    public bsModalRef: BsModalRef
  ) {
    this.restaurantForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      location: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  ngOnInit(): void {
    if (this.restaurant) {
      this.restaurantForm.patchValue({
        name: this.restaurant.name,
        description: this.restaurant.description,
        location: this.restaurant.location,
      });
    }
  }

  get f() {
    return this.restaurantForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.restaurantForm.valid) {
      this.isLoading = true;
      this.restaurantService.updateRestaurant(this.restaurant.id, this.restaurantForm.value).subscribe(
        (updatedRestaurant) => {
          this.isLoading = false;
          this.bsModalRef.hide();
          this.restaurantUpdated.emit(updatedRestaurant); 
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = 'Failed to update restaurant.';
          console.error('Update error:', error);
        }
      );
    }
  }
  
}
