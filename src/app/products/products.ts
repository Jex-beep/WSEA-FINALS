import { Component, OnInit } from '@angular/core'; // 1. Added OnInit import
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser'; // 2. Added for SEO
import { Nav } from '../nav/nav';
import { Footer } from '../footer/footer';

interface Car {
  id: number;
  make: string;
  model: string;
  type: string;
  price: string;
  image: string;
  isAvailable: boolean;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, Nav, Footer],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit { // 3. Added 'implements OnInit'

  inventory: Car[] = [
    { id: 1, make: 'Mercedes', model: 'Sedan', type: 'Sedan', price: '₱1,250,000', image: 'assets/cars/mercedes.png', isAvailable: true },
    { id: 2, make: 'Toyota', model: 'Hilux', type: 'Pickup', price: '₱980,000', image: 'assets/cars/hilux.png', isAvailable: true },
    // insert more cars if needed
  ];

  // 4. Inject Title and Meta services in the constructor
  constructor(private titleService: Title, private metaService: Meta) {}

  // 5. This is where ngOnInit goes!

ngOnInit(): void {
  this.titleService.setTitle('Our Inventory | M&J Quality Used Cars Mabalacat');
  
  // SEO Meta Tags
  this.metaService.updateTag({ name: 'description', content: 'Explore the best pre-owned vehicles in Pampanga. M&J Quality Used Cars offers high-quality Sedans, Pickups, and SUVs in Mabalacat City.' });
  this.metaService.updateTag({ name: 'keywords', content: 'used cars Mabalacat, second hand cars Pampanga, M&J Quality Cars, affordable cars Philippines, pre-owned vehicles PH' });
  this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
  
  // Local SEO for Mabalacat City
  this.metaService.updateTag({ name: 'geo.region', content: 'PH-PAM' });
  this.metaService.updateTag({ name: 'geo.placename', content: 'Mabalacat, Pampanga' });

  // Open Graph Social Tags
  this.metaService.updateTag({ property: 'og:title', content: 'M&J Quality Used Cars - Vehicle Inventory' });
  this.metaService.updateTag({ property: 'og:image', content: 'https://www.mjqualitycars.com/MJlogo.png' });
}

  get availableCars() {
    return this.inventory.filter(car => car.isAvailable);
  }
}