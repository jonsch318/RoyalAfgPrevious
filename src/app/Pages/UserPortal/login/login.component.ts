import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {Title} from "@angular/platform-browser";
import {FormControl, FormGroup, Validators} from "@angular/forms";

/*@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger("usernameBox", [
      transition(":enter", [
        style({transform: "translateX(-75vw)"}),
        animate("350ms 100ms ease"),
      ]),
      transition(":leave", [
        animate("350ms ease", style({transform: "translateX(-100vw)"})),
      ]),
    ]),
    trigger("passwordBox", [
      transition(":enter", [
        style({transform: "translateX(750vw)"}),
        animate("350ms 100ms ease"),
      ]),
      transition(":leave", [
        animate("350ms ease", style({transform: "translateX(100vw)"})),
      ]),
    ]),
  ]
})
export class LoginComponent implements OnInit {

  state = "username";
  name = '';
  faback = faArrowRight;

  constructor(private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle("Royal Afg | Login")
  }

  changeState() {
    this.state = this.state === "username" ? "password" : "username";
    this.faback = this.state === "username" ? faArrowRight : faArrowLeft;
  }
}*/

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit{
  formGroup: FormGroup;

  constructor(private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle("Royal Afg - Login");

    this.formInit();
  }

  private formInit(){
    this.formGroup = new FormGroup({
      "username": new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      "password": new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    })
  }

}
