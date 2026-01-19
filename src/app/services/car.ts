import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  inventory = [
    { 
      id: 1, 
      make: 'Toyota Fortuner', 
      model: 'G Variant', 
      year: 2018, 
      type: 'Suv', 
      price: '₱1,048,000', 
      image: '/Cars/fortuner2018_2.jpg', 
      gallery: [
        '/Cars/fortuner2018.jpg', 
        '/Cars/fortuner2018_2.jpg', 
        '/Cars/fortuner2018_3.jpg', 
        '/Cars/fortuner2018_4.jpg'
      ],
      isAvailable: true,
      description: 'The Toyota Fortuner 2.4G is a reliable and powerful SUV, offering a perfect balance of city comfort and off-road capability.',
      gearbox: 'Automatic',
      fuel: 'Diesel',
      engine: 1.8,
      ac: 'Yes',
      seats: 7,
      distance: '53,000 km',
      equipment: ['ABS', 'Air Bags', 'Cruise Control', 'Air Conditioner', 'Leather Seats', 'Reverse Camera']
    },
    { 
      id: 2, 
      make: 'Ford Everest', 
      model: 'Everest 2018', 
      year: 2018, 
      type: 'Suv', 
      price: '₱895,000', 
      image: '/Cars/fordeverest.jpg', 
      gallery: ['/Cars/fordeverest.jpg', '/Cars/fordeverest2.jpg','/Cars/fordeverest3.jpg', '/Cars/fordeverest4.jpg'],
      isAvailable: true,
      description: 'The Ford Everest is a robust and sophisticated family SUV, engineered to deliver exceptional off-road capability without compromising on-road comfort and safety.',
      gearbox: 'Automatic',
      fuel: 'Diesel',
      engine: 1.8,
      ac: 'Yes',
      seats: 7,
      distance: '82,000 km',
      equipment: ['ABS', 'Air Bags', 'Cruise Control', 'Air Conditioner', 'Power Windows', 'Parking Sensors']
    },
    { 
      id: 3, 
      make: 'Vespa Primavera', 
      model: '150 i-Get ABS', 
      year: 2021, 
      type: 'Motor', 
      price: '₱170,000', 
      image: '/Cars/vespa2.jpg', 
      gallery: ['/Cars/vespa.jpg', '/Cars/vespa2.jpg', '/Cars/vespa3.jpg', '/Cars/vespa4.jpg'],
      isAvailable: true,
      description: 'An icon of Italian style and elegance. This Vespa Primavera 150 offers a smooth, quiet ride with its i-Get engine, making it the perfect companion for stylish city cruising.',
      gearbox: 'CVT Automatic',
      fuel: 'Gasoline',
      engine: '150cc',
      ac: 'No',
      seats: 2,
      distance: '3,800 km',
      equipment: ['ABS Braking', 'LED Headlights', 'Electric Start', 'Underseat Storage', 'USB Charging Port', 'Anti-theft Immobilizer']
    },

    
    

  ];

  getCars() { return this.inventory; }

  getCarById(id: number) {
    return this.inventory.find(car => car.id === id);
  }
}