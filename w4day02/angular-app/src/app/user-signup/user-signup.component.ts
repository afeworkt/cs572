import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserDataService } from '../user-data.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  isEditing:boolean=false;
  message:string='';
  signupForm!: FormGroup;
  user!: User;
  submitted:boolean=false;

  constructor(private userDataService:UserDataService,
    public router: Router, private _formBuilder: FormBuilder) { 
    }

  ngOnInit(): void {
    this.signupForm = this._formBuilder.group({
      username: ['',Validators.required],
      name: ['',Validators.required],
      password: ['',Validators.required],
      retypepassword: ['',Validators.required],
    });
  }
  signup():void{
    this.submitted = true;
    if (this.signupForm.invalid) {
        this.message='please fill all inputs';
        return;
    }
    console.log(this.signupForm.value);
    let u=new User();
    u.name=this.signupForm.value.name;
    u.password=this.signupForm.value.password;
    u.username=this.signupForm.value.username;
    this.userDataService.addUser(u).then((response)=>{
      this.message='successfully registered';
      this.router.navigate(['']);
    }).catch((error)=>this.message='Unable to create account!');
  }
  get f() { return this.signupForm.controls; }

}