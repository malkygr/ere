import { RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { ChoosenComponent } from './components/choosen/choosen.component';
import { GameComponent } from './components/game/game.component';
import { PartnerComponent } from './components/partner/partner.component';
var appRoutes = [
    {
        path: '', component: RegisterComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'choosing', component: ChoosenComponent
    },
    {
        path: 'partner', component: PartnerComponent
    },
    {
        path: 'game', component: GameComponent
    }
];
export var routing = RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map