import { User } from "../model/user";
import { Product } from "../model/product";

export interface AppState {
  products: ReadonlyArray<User>;
  users: ReadonlyArray<User>;
  product: Product,
  user: User,
}
