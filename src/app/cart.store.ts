import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { CartSlice, Item } from "./models";

const INIT_STORE: CartSlice = { 
    items: [], 
    lastUpdate: 0
}

@Injectable()
export class CartStore extends ComponentStore<CartSlice> { 

    constructor() {
        // initialising the store 
        super(INIT_STORE);
    }

    // reducers/mutators --> data IN
    // returns a function: addToCart(newItem: Item)
    readonly addToCart = this.updater<Item>(
        (store: CartSlice, newItem: Item) => {
            // how to add newItem to store 
            // you must NOT update store, you must create a new copy

            // 1. method 1
            // const _newStore: CartSlice = {
            //     items: [...store.items], 
            //     lastUpdate: Date.now()
            // }
            // _newStore.items.push(newItem)
            // return _newStore

            // 2. method 2
            return {
                items: [...store.items, newItem],
                lastUpdate: Date.now()
            } as CartSlice

        }
    )

    // selectors/queries --> data OUT 
    // returns a function: countItemsInCart(): number
    readonly countItemsInCart = this.select<number> (
        (store: CartSlice) => {
            return store.items.length
        }
    )

    readonly getItems = this.select<Item[]>(
        (store: CartSlice) => {
            return store.items
        }
    )

    // deleteItem(string)
    readonly deleteItem = this.updater<string>(
        (store: CartSlice, itemToDelete: string) => {
            return {
                lastUpdate: Date.now(), 
                items: store.items.filter(i => i.item != itemToDelete)
            }
        }
    )

}