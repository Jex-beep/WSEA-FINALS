import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Nav } from '../nav/nav';
import { Footer } from '../footer/footer';
import { CarService } from '../services/car';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, Nav, Footer, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  // Current active category
  selectedCategory: string = 'All';
  
  // Entire car database
  inventory: any[] = [];
  
  // Controls the visibility of the mobile filter overlay
  isFilterMenuOpen: boolean = false;

  constructor(
    private titleService: Title, 
    private metaService: Meta,
    private carService: CarService 
  ) {}

  ngOnInit(): void {
    // 1. Load data from the centralized CarService
    this.inventory = this.carService.getCars();
    
    // 2. Set initial Page Title for SEO
    this.titleService.setTitle('Our Inventory | M&J Quality Used Cars Mabalacat');
    
    // 3. Set initial Meta Tags
    this.updateSEO('All');
  }

  /**
   * Opens/Closes the filter modal on mobile
   */
  toggleFilterMenu(): void {
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
    
    // Optional: Prevent background scrolling when menu is open
    if (this.isFilterMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  /**
   * Filters the display list and updates SEO tags
   * @param category The category selected (e.g., 'Sedan', 'Pickup')
   */
  filterCars(category: string): void {
    this.selectedCategory = category;
    
    // Close the menu automatically after a selection is made
    this.isFilterMenuOpen = false;
    document.body.style.overflow = 'auto';
    
    // Scroll to top of grid so user sees the new results
    window.scrollTo({ top: 300, behavior: 'smooth' });
    
    this.updateSEO(category);
  }

  /**
   * Getter that returns only the cars matching the selected category
   * and ensuring they are currently marked as available.
   */
  get availableCars() {
    if (this.selectedCategory === 'All') {
      return this.inventory.filter(car => car.isAvailable);
    }
    return this.inventory.filter(car => 
      car.isAvailable && car.type.toLowerCase() === this.selectedCategory.toLowerCase()
    );
  }

  /**
   * Updates SEO Meta Tags dynamically for better search ranking
   * @param category Current filter category
   */
  updateSEO(category: string): void {
    const description = category === 'All' 
      ? 'Explore the best pre-owned vehicles in Pampanga. M&J Quality Used Cars offers high-quality Sedans, Pickups, and SUVs.' 
      : `Find the best deals on used ${category}s in Mabalacat City at M&J Quality Used Cars.`;
    
    const keywords = `used ${category} Mabalacat, second hand cars Pampanga, M&J quality cars, affordable ${category} Philippines`;

    // Standard Meta Tags
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'keywords', content: keywords });
    this.metaService.updateTag({ name: 'author', content: 'M&J Quality Used Cars' });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
    
    // Social Media (Open Graph) Meta Tags
    this.metaService.updateTag({ property: 'og:title', content: `M&J Quality Used Cars - ${category} Inventory` });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    
    // Geo Tags for local SEO in Mabalacat/Pampanga
    this.metaService.updateTag({ name: 'geo.placename', content: 'Mabalacat, Pampanga' });
    this.metaService.updateTag({ name: 'geo.region', content: 'PH-PAM' });
  }
}