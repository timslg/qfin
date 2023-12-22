import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Flowbite } from 'src/app/shared/util/flowbit-fix';
import { SelectOption } from '../../interfaces/select-option';

@Component({
  selector: 'app-table-filter-select',
  templateUrl: './table-filter-select.component.html',
  styleUrls: ['./table-filter-select.component.css']
})
@Flowbite()
export class TableFilterSelectComponent implements OnInit {

  @Input({ required: true, })
  options: SelectOption[] = [
    {name: 'Account 1', value: '65834847fb3048926ec91631', checked: true },
    {name: 'Account 2', value: '65834833fb3048926ec9162d', checked: true }
  ];

  @Input({ required: true })
  queryKey: string = 'account';

  activatedOption: {name: string, value: string} | undefined;

  constructor (private route: ActivatedRoute) {}

  ngOnInit() {
  }

}
