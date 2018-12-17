import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'header-view',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn = false;
  
  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  public logOut(): void {
    this.authService.logOut()
      .pipe(
        take(1)
      ).subscribe(() => {
        this.router.navigate(['/login'])});
  }

}
