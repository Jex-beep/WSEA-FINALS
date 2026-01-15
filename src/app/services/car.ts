import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  inventory = [
    { 
      id: 1, 
      make: 'Ford Everest Titanium', 
      model: 'Everest', 
      year: 2021, 
      type: 'Pickup', 
      price: '₱1,250,000', 
      image: '/everesttitanium.jpg', 
      isAvailable: true,
      description: 'The Ford Everest Titanium is a premium pickup designed for both comfort and rugged performance.'
    },
    { 
      id: 2, 
      make: 'Toyota Innova E', 
      model: 'Innova', 
      year: 2019, 
      type: 'Suv', 
      price: '₱980,000', 
      image: '/innovae.jpg', 
      isAvailable: true,
      description: 'A reliable family SUV known for its durability and spacious interior.'
    },
    { 
      id: 3, 
      make: 'Toyota Land Cruiser Prado', 
      model: 'Prado', 
      year: 2011, 
      type: 'Suv', 
      price: '₱2,100,000', 
      image: '/landcruiser.jpg', 
      isAvailable: true,
      description: 'Luxury meets off-road capability in this iconic Toyota Land Cruiser Prado.'
    }
    
  ];

  getCars() {
    return this.inventory;
  }

  getCarById(id: number) {
    return this.inventory.find(car => car.id === id);
  }
}