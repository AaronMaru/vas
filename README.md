# Create module with routing
ng g m components/category --routing

# Create list component for index page
ng g c components/category/category-list --module category

# Create list component for details & delete page
ng g c components/category/category-show --module category

# Create list component for create & update page
ng g c components/category/category-form --module category

# generate service
ng g service services/stock

# generate class
ng g class model/stock

# generate interface
```bash
ng g interface model/stock
```

# Genrate Auth Servce & Guard

```bash
ng generate service auth/auth
ng generate guard auth/auth
```

# Add moment
```bash
npm install moment --dev
```
```bash
npm i angular2-multiselect-dropdown
```
******** deploy step
```bash
ng build --configuration=uat
ng build --configuration=production
```

upload all file and folder in /dist/admin.../


/etc/apache2/sites-available