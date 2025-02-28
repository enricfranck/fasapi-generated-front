import { Component, inject } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';

export enum AttributeType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  DATE = 'date',
  OBJECT = 'object',
  DATE_TIME = 'datetime',
  ARRAY = 'array',
  JSON = 'json',
}

export class Attributes {
  name?: string;
  type?: AttributeType;
  length?: number;
  isRequired?: boolean;
  isUnique?: boolean;
  isIndexed?: boolean;
  isAutoIncrement?: boolean;
  isPrimary?: boolean;
  isForeign?: boolean;
  foreignKey?: string;
}

export class ClassModel {
  name?: string;
  attributes: Attributes[] = [];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    FormsModule,
    NzFormModule,
    NzModalModule,
    NzTableModule,
    NzIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  isVisible = false;
  classList: ClassModel[] = [];
  private fb = inject(NonNullableFormBuilder);
  validateForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
    remember: this.fb.control(true),
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  showModal(): void {
    this.isVisible = true;
  }

  addClass(): void {
    let item: ClassModel = {
      name: '',
      attributes: [
        {
          name: 'id',
          type: AttributeType.NUMBER,
          isRequired: true,
          isUnique: true,
          isIndexed: true,
          isAutoIncrement: true,
          isPrimary: true,
        },
      ],
    };
    this.classList.push(item);
    console.log('Class added!', this.classList);
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  changeInputName(name: any, index: number): void {
    this.classList[index].name = name;
  }
  removeClass(index: number): void {
    this.classList.splice(index, 1);
  }
  addAttribute(index: number): void {
    let item: Attributes = {
      name: '',
      type: AttributeType.STRING,
      isRequired: false,
      isUnique: false,
      isIndexed: false,
      isAutoIncrement: false,
      isPrimary: false,
      isForeign: false,
      foreignKey: '',
    };
    this.classList[index].attributes = [
      ...this.classList[index].attributes,
      item,
    ];
    console.log('Attribute added!', this.classList[index].attributes);
  }

  deleteAttribute(attributeIndex: number, classIndex: number): void {
    // Remove the attribute at the specified index
    this.classList[classIndex].attributes.splice(attributeIndex, 1);

    // Create a new array reference to trigger change detection
    this.classList[classIndex].attributes = [
      ...this.classList[classIndex].attributes,
    ];

    console.log('Attribute deleted!', this.classList[classIndex].attributes);
  }
}
