import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './services/user.service';
import { IUser } from './interfaces/user.interface';
import { Firestore, collection, addDoc, DocumentReference, query, collectionData  } from '@angular/fire/firestore';
import { orderBy } from 'firebase/firestore';
import { tap } from 'rxjs/operators';
import { IMessage } from './interfaces/message.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chat';
  user?: IUser | null = null;

  private firestore: Firestore = inject(Firestore);
  private messageCollection = collection(this.firestore, 'messages');
  chatMessages$: Observable<IMessage[]>;
  message: string = '';


  constructor(private userService: UserService) {
    this.user = this.userService.getUser();

    this.chatMessages$ =
    collectionData(query(this.messageCollection, orderBy('date') )).pipe(tap((messages: any) => {
      setTimeout(() => {});
    })) as Observable<IMessage[]>;

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

  sendMessage() {
    if (!this.message || !this.user) {
      return;
    }
    const newMessage: IMessage = {
      userId: this.user.id,
      userName: this.user.name,
      message: this.message,
      profileImage: this.user.profileImage,
      date: new Date()
    };
    this.message = '';
    addDoc(this.messageCollection, newMessage)
    .then((DocumentReference: DocumentReference) => {})
    .catch((error) => {})
  }

}
