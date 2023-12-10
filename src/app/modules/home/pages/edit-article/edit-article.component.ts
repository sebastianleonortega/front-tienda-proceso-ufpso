import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../auth/service/auth.service";
import {AlertService} from "../../../../core/services/alert.service";
import {HomeService} from "../../service/home.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  public addArticle: FormGroup = new FormGroup({});
  articleUpdate: any;
  dateOfAdmission!: Date;
  id: any;
  categories : any[] = [];



  constructor(
    private _auth : AuthService,
    private _alert: AlertService,
    public dialog: MatDialog,
    private homeService: HomeService,
    @Inject(MAT_DIALOG_DATA) public idArticle: any,

  ) { }

  ngOnInit(): void {
    this.initFormAddArticle();
    this.getAllCategories();
    if (this.idArticle !== null){
      this.id = this.idArticle
      this.homeService.getArticleById(this.idArticle).subscribe({
        next: (data) => {
          this.articleUpdate = data;
          const categoryName = data.category
          this.setValueArticle(data,categoryName )
        }
      })

    }
  }

  setValueArticle(data: any, category: any): void {
    this.addArticle.get('name')?.setValue(data.name);
    this.addArticle.get('description')?.setValue(data.description);
    this.addArticle.get('stock')?.setValue(data.stock);
    this.addArticle.get('price')?.setValue(data.price);
    this.addArticle.get('dateOfAdmission')?.setValue(data.dateOfAdmission);
    this.addArticle.get('category')?.setValue(category.categoryName);
  }


  initFormAddArticle(): void {
    this.addArticle = new FormGroup({
      name: new FormControl('', [Validators.required, ]),
      description: new FormControl('', [Validators.required, ]),
      stock: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      dateOfAdmission:new FormControl( [new Date().toISOString().split('T')[0]]),
      category: new FormControl('', ),
    });
  }

  onSubmit() {
    if (this.addArticle.valid) {
      const data: any = {
        name: this.addArticle.get('name')?.value,
        description: this.addArticle.get('description')?.value,
        stock: this.addArticle.get('stock')?.value,
        price: this.addArticle.get('price')?.value,
        dateOfAdmission: new Date(),
        category: {id: this.addArticle.get('category')?.value},
        user: {id: 1},
      }
      this.homeService.createArticle(data).subscribe({
        next: (data) =>{
          this._alert.success("Articulo registrado exitosamente");
          this.dialog.closeAll();
        }
      })
    }else{
      this._alert.warning("Debes llenar todos los campos del formulario");

    }

  }
  updateArticle() {

    if (this.addArticle.valid) {

      const data: any = {
        name: this.addArticle.get('name')?.value,
        description: this.addArticle.get('description')?.value,
        stock: this.addArticle.get('stock')?.value,
        price: this.addArticle.get('price')?.value,
        dateOfAdmission: this.addArticle.get('dateOfAdmission')?.value,
        category: {id: this.addArticle.get('category')?.value},
        user: {id: 1},
      }
      console.log(data)
      this.homeService.updateArticle(this.idArticle, data).subscribe({
        next: (data) => {
          this.articleUpdate = data
          this._alert.success("Articulo actualizado")
          this.dialog.closeAll();
        }
      })
    }else{
      this._alert.warning("Debes llenar todos los campos del formulario");

    }
  }

  getAllCategories(): void {
    this.homeService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data.map((category: {id: any; nameCategory: any})=>({
          label:category.nameCategory ,
          value: category.id,
        }));
      }
    })
  }

}
export const CATEGORY: Select[] = [
  { value: true, label: 'Activo' },
  { value: false, label: 'Inactivo' },
]

export interface Select {
  value: string | boolean,
  label: string
}
