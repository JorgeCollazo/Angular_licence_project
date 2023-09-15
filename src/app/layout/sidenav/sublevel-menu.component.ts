import { Component, Input } from '@angular/core';
import { INavbarData } from './inavbar.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-sublevel-menu',
  template: `
    <ul *ngIf="collapsed && data.items && data.items.length > 0" class="sublevel-nav"
      [@submenu]="expanded
        ? {value: 'visible',
            params: {transitionParams: '400ms cubic-bezier(0.86, 0, 0.7, 1)', height: '*'}}
        : {value: 'hidden',
            params: {transitionParams: '400ms cubic-bezier(0.86, 0, 0.7, 1)', height: '0'}}"
      >
      <li *ngFor="let item of data.items" class="sublevel-nav-item">
        <a mat-list-item class="sublevel-nav-link" *ngIf="item.items && item.items.length > 0" (click)="handleClick(item)">
          <mat-icon matSuffix>{{item.icon}}</mat-icon>
          <span class="sublevel-link-text" *ngIf="collapsed">{{item.label}}</span>
          <mat-icon matSuffix>{{item.icon}}</mat-icon>
        </a>
        <a mat-list-item class="sublevel-nav-link"
          *ngIf="!item.items || (item.items && item.items.length === 0)"
          [routerLink]="[item.routeLink]"
          routerLinkActive="active-sublevel"
          [routerLinkActiveOptions]="{exact: true}"
          >
          <mat-icon matSuffix>{{item.icon}}</mat-icon>
          <span class="sublevel-link-text" *ngIf="collapsed">{{item.label}}</span>
        </a>
        <div *ngIf="item.items && item.items.length > 0">
          <app-sublevel-menu
            [collapsed]="collapsed">
            [multiple]="multiple"
            [expanded]="item.expanded"
          </app-sublevel-menu>
        </div>
      </li>
    </ul>
  `,
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('submenu', [
      state('hidden', style({
        height: '0',
        overflow: 'hidden',
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible <=> hidden', [
        animate('{{transitionParams}}')]),
      transition('void => *', animate(0))
    ])
  ]
})

export class SublevelMenuComponent {

  @Input() data: INavbarData = {
    routeLink: '',
    icon: '',
    label: '',
    items: [],
  }
  @Input() collapsed = false;
  @Input() animated: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;

  constructor() {}

  ngOninit(): void {}

  handleClick(item: any): void {
    if(!this.multiple) {
      if(this.data.items && this.data.items.length > 0) {
        for(let modelItem of this.data.items) {
          if(item !== modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }
      }
    }
    item.expanded = !item.expanded;
  }
}
