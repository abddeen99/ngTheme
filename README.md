# ngTheme
Angular/Bootstrap theme service

## Usage
In your `app.module.ts` file, follow these steps to integrate `ThemeService` into your Angular application:

 1. Import the necessary modules and services:
```typescript
import { LOAD_THEME_TOKEN, SAVE_THEME_TOKEN, ThemeService } from "(PATH_TO_THEME_SERVICE)/theme.service";
```

 2. Add the ThemeService to the providers array:
```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [
   // ...
  ],
  bootstrap: [AppComponent],
  providers: [
    // ...
    ThemeService,
    { provide: LOAD_THEME_TOKEN, useValue: () => {} }, // Provide a default implementation for loadTheme
    { provide: SAVE_THEME_TOKEN, useValue: () => {} } // Provide a default implementation for saveTheme ],
  })
```

 - Make sure to import the necessary dependencies and adjust the file path based on your project structure.

 4. Implement the `loadTheme` and `saveTheme` functions in your application:
 
 The `LOAD_THEME_TOKEN` and `SAVE_THEME_TOKEN` tokens are used to provide the implementation for loading and saving the theme. Replace the default implementations (`() => {}`) with your own functions to handle theme loading and saving logic.

For example, you can provide the implementation in your `auth.service.ts` file:
```typescript
constructor(//...
            private themeService: ThemeService) {  
  // Assign saveTheme function when initializing the AuthenticationService.  
  this.themeService.saveTheme = this.saveTheme.bind(this);  
  
  // Call loadTheme function when initializing the AuthenticationService.  
  this.loadTheme();  
  
  if (this.isTokenExpired()) {  
    this.logout();  
  }  
}

private saveTheme(enabled: boolean): void {  
  let updateMe: UserAccount = JSON.parse(localStorage.getItem('currentUser')) || this.currentUserValue;  
  
  updateMe.parameters.settings.darkMode = enabled;  
  
  this.setCurrentUser(updateMe);  
}  
  
private loadTheme() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const useDarkMode = currentUser?.parameters?.settings?.darkMode ?? (this.themeService.preferredTheme() === 'dark');

  useDarkMode ? this.themeService.enable() : this.themeService.disable();
}
```

**Note(s):**
 - With these configurations, the `ThemeService` will be available throughout your application, and you can use it to manage themes in your Angular project, hopefully ;)
 - This has been tested with "@angular/*": "^16.1.0", and "bootstrap": "^5.3.0".

## License

This project is licensed under the [GNU General Public License v3.0] - see the [LICENSE] file for details.


