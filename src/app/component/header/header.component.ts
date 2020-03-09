import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  Router
} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input('titleHeader') titleHeader;
  @Input('isMenuOrBackButton') isMenuOrBackButton;


  constructor(private router: Router) {}

  ngOnInit() {}

  goBack(titleHeader) {
    if (titleHeader == "DTS- HIV Viral Load"||titleHeader == "DTS - HIV Serology"||titleHeader=="DBS - Early Infant Diagnosis") {
      this.router.navigate(['/all-pt-schemes']);
    }
  }

}