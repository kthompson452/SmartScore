import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AngularFireAuth, private router: Router) {
    this.registerForm = FormGroup.prototype
   }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  createUser(){
    const {email, password} = this.registerForm.value
    this.auth.createUserWithEmailAndPassword(email, password).then(user => {
      console.log(user)
    })
  }

}
