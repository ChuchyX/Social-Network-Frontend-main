import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnInit,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/state/auth/auth.UserState';
import { selectUser } from 'src/app/state/auth/auth.selectors';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  userHome$ = this.store.select(selectUser);
  image: any;

  constructor(
    private sanitizer: DomSanitizer,
    private store: Store<UserState>
  ) {}

  ngOnInit(): void {
    this.store.select(selectUser).subscribe(r => {
      if(r?.image !== null)
      {
        this.image =
            'data:image/jpeg;base64,' +
            (
              this.sanitizer.bypassSecurityTrustResourceUrl(
                r?.image.fileContents
              ) as any
            ).changingThisBreaksApplicationSecurity;
      }
    })
  }

  public get IsAuthenticated(): boolean {
    return localStorage.getItem('authToken') !== null;
  }
}