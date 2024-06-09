import { Routes, ExtraOptions } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'shop', component: ShopPageComponent},
    {path: 'product/:id', component: ProductPageComponent},
    {path: 'about', component: AboutPageComponent},
    {path: 'checkout', component: CheckoutPageComponent}
];
