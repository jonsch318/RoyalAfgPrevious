import { Component, OnInit } from '@angular/core';
import { faArrowDown} from "@fortawesome/free-solid-svg-icons";
import { Store } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { map } from 'rxjs/operators';
import { GetUser, SetUser } from '../../store/actions/user.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  signedIn = false;
  state = "";
  stateLocked = false;
  temp = "";
  dropDown = faArrowDown;
  user$ = this._store.pipe(map((val) => val.user));

  constructor(
    private readonly _store: Store<IAppState>
  ) { }

  ngOnInit(): void {
  }

  toggleState(name: string){
    if(this.stateLocked && this.state == name){
      this.state = "";
      this.stateLocked = false;
    }else{
      this.state = name;
      this.stateLocked = true;
      document.addEventListener("mousedown", this.obj);
    }
  }

  obj = (event: MouseEvent) => {
    if(!this.parentHasClass(event.target, this.state)){
      this.toggleState(this.state);
      //remove Event Listener for performance and memory.
      document.removeEventListener("mousedown", this.obj, false);
    }
  };

  showPop(name:string){
    if(!this.stateLocked)
      this.state = name;
  }

  hidePop(event: MouseEvent, name: string){
    if(!this.stateLocked && !this.parentHasClass(event.relatedTarget, name + "-act"))
        this.state="";
  }

  parentHasClass(element, classname){
    if(element.className && element.className.includes(classname))
      return true;
    return element.parentNode && this.parentHasClass(element.parentNode, classname);
  }

  updateUser(){
    this._store.dispatch(new SetUser({
      username: "ASsd",
      fullname: "asdasd",
      id: "asdasdas",
      birthdate: new Date(),
    }));
  }

}
