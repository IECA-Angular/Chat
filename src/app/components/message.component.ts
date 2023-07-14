import { Component, Input } from "@angular/core";

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  standalone: true
})
export class MessageComponent {

  @Input() messagePosition: 'left' | 'right' = 'right';
  @Input() message: string = '';
  @Input() profileImage?: string;

  private _messageDate!: Date;

}
