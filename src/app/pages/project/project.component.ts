import { Component, inject, OnInit } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppService } from '../../app.service';
import { ClassModel, AttributeType, Attributes } from '../../models/project';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { UppercaseFirstLetterDirective } from '../../uppercase-first-letter.directive';

@Component({
  selector: 'app-project',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    FormsModule,
    NzFormModule,
    NzModalModule,
    NzTableModule,
    NzIconModule,
    NzToolTipModule,
    NzSelectModule,
    NzCheckboxModule,
    CommonModule,
    UppercaseFirstLetterDirective,
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.less',
})
export class ProjectComponent implements OnInit {
  isVisible = false;
  isVisibleVisualise = false;
  classList: ClassModel[] = [
    {
      default: true,
      name: 'User',
      attributes: [
        {
          name: 'id',
          type: AttributeType.INTEGER,
          is_required: true,
          is_unique: true,
          is_indexed: true,
          is_auto_increment: true,
          is_primary: true,
          default: true,
        },
        {
          name: 'email',
          type: AttributeType.STRING,
          length: 256,
          is_required: true,
          is_unique: true,
          is_indexed: true,
          is_auto_increment: false,
          is_primary: false,
          default: true,
        },
        {
          name: 'hashed_password',
          type: AttributeType.STRING,
          length: 256,
          is_required: true,
          is_unique: false,
          is_indexed: false,
          is_auto_increment: false,
          is_primary: false,
          default: true,
        },
        {
          name: 'is_superuser',
          type: AttributeType.BOOLEAN,
          default: true,
        },
        {
          name: 'last_name',
          type: AttributeType.STRING,
          length: 256,
          is_required: true,
          is_unique: false,
          is_indexed: false,
          is_auto_increment: false,
          is_primary: false,
        },
      ],
    },
  ];
  isEditing = false;
  id?: any;

  writeProject: boolean = false;
  migrationMessage?: string;

  private fb = inject(NonNullableFormBuilder);
  validateForm = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    type: this.fb.control<AttributeType | undefined>(undefined, [
      Validators.required,
    ]),
    length: this.fb.control<number | null>(null),
    isPrimary: this.fb.control(false),
    isAutoIncrement: this.fb.control(false),
    isIndexed: this.fb.control(false),
    isUnique: this.fb.control(false),
    isForeign: this.fb.control(false),
    foreignKey: this.fb.control(''),
    foreignKeyClass: this.fb.control(''),
    isRequired: this.fb.control(false),
  });

  constructor(private service: AppService, private route: ActivatedRoute) {
    console.log(this.route.params);
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['project_id'];
    if (this.id)
      this.service.openProject(this.id).subscribe((data) => {
        if (data?.class_model?.length > 0) {
          this.classList = data.class_model;
        }
      });
  }

  headers: string[] = [
    'Name',
    'Type',
    'Primary',
    'Auto Increment',
    'Indexed',
    'Unique',
    'Foreign Key',
    'Required',
    'Actions',
  ];
  selectedClassIndex: number = 0;
  selectedAttributeIndex: number = 0;
  selectAttributeTypeClass: Attributes[] = [];
  classListVisualise: any[] = [];
  deleted_class: string[] = [];
  updated_class: string[] = [];

  attributeTypeList = [
    { label: 'String', value: AttributeType.STRING },
    { label: 'Integer', value: AttributeType.INTEGER },
    { label: 'Float', value: AttributeType.FLOAT },
    { label: 'Boolean', value: AttributeType.BOOLEAN },
    { label: 'Text', value: AttributeType.TEXT },
    { label: 'Date', value: AttributeType.DATE },
    { label: 'DateTime', value: AttributeType.DATE_TIME },
    { label: 'Time', value: AttributeType.TIME },
    { label: 'JSON', value: AttributeType.JSON },
  ];

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

  saveDiagram() {
    this.classListVisualise = this.classList.filter(
      (item) => item.name.length > 0
    );
    let body = {
      project_in: {
        class_model: this.classListVisualise,
      },
      updated_class: [],
      deleted_class: [],
    };
    this.service.createProject(this.id, body).subscribe((res) => {
      console.log('Project created!', res);
      this.isVisibleVisualise = false;
    });
  }

  showModal(index: number): void {
    this.selectedClassIndex = index;
    this.isVisible = true;
    this.isEditing = false;
    this.validateForm.reset();
  }

  addClass(): void {
    let item: ClassModel = {
      name: '',
      attributes: [
        {
          name: 'id',
          type: AttributeType.INTEGER,
          is_required: true,
          is_unique: true,
          is_indexed: true,
          is_auto_increment: true,
          is_primary: true,
          default: true,
        },
      ],
    };
    this.classList.push(item);
    console.log('Class added!', this.classList);
  }

  handleOk(): void {
    this.isVisible = false;
    this.addAttribute();
  }

  saveProject(): void {
    this.isVisibleVisualise = true;
    this.classListVisualise = this.classList.filter(
      (item) => item.name.length > 0
    );
  }

  handleCancelVisualise(): void {
    console.log('Button cancel clicked!');
    this.isVisibleVisualise = false;
  }

  handleCreatelVisualise(): void {
    this.classListVisualise = this.classList.filter(
      (item) => item.name.length > 0
    );
    let body = {
      project_in: {
        class_model: this.classListVisualise,
      },
      updated_class: this.updated_class,
      deleted_class: this.deleted_class,
    };
    this.service
      .createProject(this.id, body, true, this.migrationMessage)
      .subscribe((res) => {
        console.log('Project created!', res);
        this.isVisibleVisualise = false;
      });
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
    this.deleted_class.push(this.classList[index].name);
  }
  addAttribute(): void {
    let item: Attributes = {
      name: this.validateForm.value.name,
      type: this.validateForm.value.type as unknown as AttributeType,
      length: this.validateForm.value.length,
      is_required: this.validateForm.value.isRequired,
      is_unique: this.validateForm.value.isUnique,
      is_indexed: this.validateForm.value.isIndexed,
      is_auto_increment: this.validateForm.value.isAutoIncrement,
      is_primary: this.validateForm.value.isPrimary,
      is_foreign: this.validateForm.value.isForeign,
      foreign_key: this.validateForm.value.foreignKey,
      foreign_key_class: this.validateForm.value.foreignKeyClass,
    };
    if (this.isEditing) {
      this.classList[this.selectedClassIndex].attributes = [
        ...this.classList[this.selectedClassIndex].attributes,
      ];
      this.classList[this.selectedClassIndex].attributes.splice(
        this.selectedAttributeIndex,
        1,
        item
      );
      this.isEditing = false;
    } else {
      this.classList[this.selectedClassIndex].attributes = [
        ...this.classList[this.selectedClassIndex].attributes,
        item,
      ];
      console.log(
        'Attribute added!',
        this.classList[this.selectedClassIndex].attributes
      );
    }
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

  editAttribute(attributeIndex: number, classIndex: number): void {
    this.isVisible = true;
    this.isEditing = true;
    this.selectedClassIndex = classIndex;
    this.selectedAttributeIndex = attributeIndex;
    this.validateForm.patchValue({
      name: this.classList[classIndex].attributes[attributeIndex].name,
      type: this.classList[classIndex].attributes[attributeIndex].type,
      length: this.classList[classIndex].attributes[attributeIndex].length,
      isRequired:
        this.classList[classIndex].attributes[attributeIndex].is_required,
      isUnique: this.classList[classIndex].attributes[attributeIndex].is_unique,
      isIndexed:
        this.classList[classIndex].attributes[attributeIndex].is_indexed,
      isAutoIncrement:
        this.classList[classIndex].attributes[attributeIndex].is_auto_increment,
      isPrimary:
        this.classList[classIndex].attributes[attributeIndex].is_primary,
      isForeign:
        this.classList[classIndex].attributes[attributeIndex].is_foreign,
      foreignKey:
        this.classList[classIndex].attributes[attributeIndex].foreign_key,
      foreignKeyClass:
        this.classList[classIndex].attributes[attributeIndex].foreign_key_class,
    });
    let classValue = this.classList[classIndex].name;
    if (classValue) {
      this.updated_class = this.updated_class.filter((item) => {
        item.toLowerCase() !== classValue.toLocaleLowerCase();
      });
      this.updated_class.push(classValue);
    }
  }

  transformName(name: string = '') {
    return name.length > 15 ? name.substring(0, 13) + '...' : name;
  }

  onChangeClass(event: any): void {
    console.log('Class changed!', event);
    let selecteClass = this.classList.find((item) => item.name === event);
    if (selecteClass) {
      this.selectAttributeTypeClass = selecteClass.attributes.filter(
        (item) => item.is_primary === true
      );
    }
  }

  viewClassProperty(index: number) {
    const className = this.classList[index].name;
    let relations = this.classList.filter((item) =>
      item.attributes.find(
        (attribute) => attribute.foreign_key_class === className
      )
    );
    this.classList[index].relations = relations.map((item) => item.name);
    console.log(this.classList[index]);
  }
}
