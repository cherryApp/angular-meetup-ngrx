# AngularNgrxSample

## Kezdő állapot
- `git checkout step-01`

## 1. Gyakorlat
- Készítünk egy nagyon egyszerű megoldást a BehaviorSubject segítségével.
- `src\app\service\base.service.ts`
- Létrehozunk list$ néven egy BehaviorSubject-et.
- Létrehozunk current$ néven egy BehaviorSubject-et. 
- Amikor a read, readAll metódusokat meghívjuk, akkor beállítjuk a list$ vagy 
current$ értékét.
- A create, update, delete metódusok esetén beiktatunk egy pipe-ot az 
observable stream-be, ahol újra meghívjuk/frissítjuk a list$ értékét.
- `src\app\common\table\table.component.ts` elkészítjük a törlés metódusát 
és hozzákötjük a gombhoz.
- `src\app\page\users\users.component.ts` megváltoztatjuk a feliratkozást.
- `src\app\page\products\products.component.ts` megváltoztatjuk a feliratkozást.

## 2. Gyakorlat
- Megvalósítjuk a működést NgRx segítségével.
- NgRx beállítása:
- `ng add @ngrx/store@latest` hozzáadja és beállítja az NgRx-et.
- Érdemes feltenni az NgRx schema generátort is, hogy ne kelljen kézzel létrehozni a Store-okat.
- `https://ngrx.io/guide/schematics`
- `npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools`
- `npm i @ngrx/schematics -D`
- Tegyük külön modulokban a store-okat a könnyebb kezelhetőség érdekében:
- `ng generate module product-store --flat false`
- `ng generate store product-store/Product -m product-store.module.ts`

