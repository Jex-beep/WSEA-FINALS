import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Nav } from '../nav/nav';
import { Footer } from '../footer/footer';
import { CarService } from '../services/car'; // Path based on your folder image

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, Nav, Footer, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  selectedCategory: string = 'All';
  inventory: any[] = [];

  constructor(
    private titleService: Title, 
    private metaService: Meta,
    private carService: CarService 
  ) {}

  ngOnInit(): void {
    // Pull the data from the shared service
    this.inventory = this.carService.getCars();
    
    this.titleService.setTitle('Our Inventory | M&J Quality Used Cars Mabalacat');
    this.updateSEO('All');
  }

  filterCars(category: string): void {
    this.selectedCategory = category;
    this.updateSEO(category);
  }

  get availableCars() {
    if (this.selectedCategory === 'All') {
      return this.inventory.filter(car => car.isAvailable);
    }
    return this.inventory.filter(car => 
      car.isAvailable && car.type.toLowerCase() === this.selectedCategory.toLowerCase()
    );
  }

  updateSEO(category: string): void {
    const description = category === 'All' 
      ? 'Explore the best pre-owned vehicles in Pampanga. M&J Quality Used Cars offers high-quality Sedans, Pickups, and SUVs.' 
      : `Find the best deals on used ${category}s in Mabalacat City at M&J Quality Used Cars.`;
    
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'keywords', content: `used ${category} Mabalacat, second hand cars Pampanga, M&J quality cars` });
    this.metaService.updateTag({ property: 'og:title', content: `M&J Quality Used Cars - ${category} Inventory` });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
    this.metaService.updateTag({ name: 'geo.placename', content: 'Mabalacat, Pampanga' });
    this.metaService.updateTag({ name: 'author', content: 'M&J Quality Used Cars' });
  }
}