import { User } from "../model/user";
import { Product } from "../model/product";

export interface AppState {
  products: ReadonlyArray<Product>;
  users: ReadonlyArray<User>;
  product: Product,
  user: User,
}
