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
- `ng add @ngrx/store@latest` hozzáadjuk és beállítjuk az NgRx-et.
- `npm i @ngrx/effects @ngrx/entity @ngrx/store @ngrx/store-devtools ngrx-data`
- `ng g m store/user/user-store --flat -m app` külön modulba a Store-t.
- `src\app\store\user\UserActions.ts` Action-ok.
- 
- 

