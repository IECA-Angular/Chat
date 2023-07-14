import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './services/user.service';
import { IUser } from './interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chat';
  user?: IUser | null = null;

  constructor(private userService: UserService) {
    this.user = this.userService.getUser();
  }

  formUser: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    profileImage: new FormControl('', [Validators.required])
  });

  saveProfile() {
      this.formUser.markAsDirty();
      if (this.formUser.valid) {
        this.userService.saveUser(this.formUser.getRawValue());
        this.user = this.userService.getUser();
      }
  }

}
