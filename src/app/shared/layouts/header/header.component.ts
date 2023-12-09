import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {AlertService} from "../../../core/services/alert.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {



  constructor(
    private route: Router,
    private _dialog: MatDialog,
    private _router: Router,
    private _alert: AlertService,
  ) {
  }

  ngOnInit(): void {


  }



}
