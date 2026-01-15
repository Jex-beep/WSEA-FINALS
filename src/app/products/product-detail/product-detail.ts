import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { CarService } from '../../services/car'; // Path based on your folder image
import { Nav } from '../../nav/nav';
import { Footer } from '../../footer/footer';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, Nav, Footer],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  car: any;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    // Get the ID from the URL and find the car in the service
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.car = this.carService.getCarById(id);

    if (this.car) {
      this.titleService.setTitle(`${this.car.make} - Details | M&J Quality Cars`);
      this.updateDetailSEO();
    }
  }

  updateDetailSEO(): void {
    this.metaService.updateTag({ name: 'description', content: `Check out this ${this.car.year} ${this.car.make}. ${this.car.description}` });
    this.metaService.updateTag({ name: 'keywords', content: `${this.car.make}, used cars Mabalacat, second hand ${this.car.model}` });
    this.metaService.updateTag({ property: 'og:image', content: this.car.image });
    this.metaService.updateTag({ property: 'og:title', content: `${this.car.make} for Sale` });
    this.metaService.updateTag({ name: 'author', content: 'M&J Quality Used Cars' });
    this.metaService.updateTag({ name: 'geo.region', content: 'PH-PAM' });
  }
}