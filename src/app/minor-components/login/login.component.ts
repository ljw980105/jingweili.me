import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    passcode: string;
    errorDescription = null;

    constructor(private apiService: ApiService, private router: Router) {
    }

    ngOnInit(): void {
    }

    login() {
        this.apiService.loginWithPassword(this.passcode)
            .pipe(take(1))
            .subscribe(() => {
                this.router.navigateByUrl('/admin');
            }, (error: Error) => {
                this.errorDescription = error.message;
            });
    }

}
