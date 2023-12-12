import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertService} from "../../../../core/services/alert.service";
import {AuthService} from "../../../auth/service/auth.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {HomeService} from "../../service/home.service";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  public addCategory: FormGroup = new FormGroup({});
  id: any;
  categoryUpdate: any;


  constructor(
    private _router: Router,
    public dialog: MatDialog,
    private _alert: AlertService,
    private _auth : AuthService,
    private homeService: HomeService,
    @Inject(MAT_DIALOG_DATA) public idCategory: any,

  ) { }

  ngOnInit(): void {
    this.initFormCategory();
    if (this.idCategory !== null){
      this.id = this.idCategory
      this.homeService.getCategoryById(this.idCategory).subscribe({
        next: (data) => {
          this.categoryUpdate = data;
          this.setValueCategory(data )
        }
      })

    }
  }

  setValueCategory(data: any): void {
    this.addCategory.get('nameCategory')?.setValue(data.nameCategory);
  }

  initFormCategory(): void {
    this.addCategory = new FormGroup({
      nameCategory: new FormControl('', [Validators.required, Validators.maxLength(255)])
    });
  }

  onSubmit() {
    if (this.addCategory.valid) {
      const data: any = {
        nameCategory: this.addCategory.get('nameCategory')?.value,
      };

      this.homeService.createCategory(data).subscribe({
        next: (data) => {
          this._alert.success("Categoria creada");
          this.dialog.closeAll();

        }
      });
    }
  }

  updateCategory() {

    if (this.addCategory.valid) {

      const data: any = {
        nameCategory: this.addCategory.get('nameCategory')?.value,
      }
      this.homeService.updateCategory(this.idCategory, data).subscribe({
        next: (data) => {
          this.categoryUpdate = data
          this._alert.success("Categoria actualizado")
          this.dialog.closeAll();
        }
      })
    }else{
      this._alert.warning("Debes llenar todos los campos del formulario");

    }
  }


}
