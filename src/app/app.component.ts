import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Item } from './models';
import { CartStore } from './cart.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  private fb = inject(FormBuilder); 
  private cartStore = inject(CartStore);

  protected form!: FormGroup; 
  protected itemCount$!: Observable<number>
  protected items$!: Observable<Item[]>

  ngOnInit(): void {
    this.form = this.createForm();
    this.itemCount$ = this.cartStore.countItemsInCart;
    this.items$ = this.cartStore.getItems
  }
  
  private createForm(): FormGroup {
    return this.fb.group({
      item: this.fb.control<string>(''), 
      price: this.fb.control<number>(1)
    })
  }

  processForm() {
    // const values = this.form.value
    const values: Item = this.form.value;
    console.log(">>>Values:", values);
    this.cartStore.addToCart(values)
    this.form = this.createForm();
  }

  deleteItemFromCart() { 
    this.cartStore.deleteItem('apple')
  }

}
