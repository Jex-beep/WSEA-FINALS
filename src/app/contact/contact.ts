import { Component, OnInit } from '@angular/core';
import { Nav } from '../nav/nav';
import { Footer } from '../footer/footer';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import emailjs from '@emailjs/browser';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [Nav, Footer, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
  form: ContactForm = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  constructor(private title: Title, private meta: Meta) {}

  ngOnInit() {
    // CRITICAL: Initialize globally. 
    // This is often why the "send" method fails silently.
    emailjs.init('fdKiUJiJkms7lnJ1D');
    this.updateContactSEO();
  }

  updateContactSEO() {
    this.title.setTitle('Contact M&J Quality Used Cars | Mabalacat City');
    this.meta.updateTag({ name: 'description', content: 'Contact JM Punsalan at M&J Quality Used Cars Mabalacat. Get the best secondhand car deals in Pampanga.' });
    this.meta.updateTag({ name: 'keywords', content: 'Mabalacat car dealer, contact M&J, buy used cars Pampanga' });
  }

  send() {
    if (!this.form.email || !this.form.name) {
      alert("Please fill in your name and email.");
      return;
    }

    // Using the 'template_params' object explicitly to match EmailJS dashboard
    const templateParams = {
      name: this.form.name,
      email: this.form.email,
      phone: this.form.phone,
      message: this.form.message,
      to_name: 'M&J Admin' // Useful if your template has a {{to_name}} tag
    };

    emailjs.send(
      'service_h64pn57', 
      'template_gdfdmqa', 
      templateParams
    ).then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert('Message Sent Successfully!');
      this.resetForm();
    }, (err) => {
      console.error('FAILED...', err);
      // Check if err.status is 401 (Wrong Public Key) or 400 (Wrong Service ID)
      alert(`Failed to send. Error: ${err.text || 'Check console'}`);
    });
  }

  resetForm() {
    this.form = { name: '', email: '', phone: '', message: '' };
  }
}