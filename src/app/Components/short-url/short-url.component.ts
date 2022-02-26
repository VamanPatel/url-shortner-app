import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlShortner } from 'src/app/Modals/urlShortner.model';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.scss'],
})
export class ShortUrlComponent implements OnInit {
  url!: string;
  newUrl!: string;
  hideUrl: boolean = false;
  showSpinner: boolean = false;

  form!: FormGroup;
  name!: FormControl;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private fb: FormBuilder
  ) {
    this.name = new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
      ),
    ]);

    this.form = fb.group({
      name: this.name,
    });
  }

  ngOnInit(): void {}

  get isSave() {
    if (this.name.valid) {
      return false;
    }
    return true;
  }

  submit() {
    this.hideUrl = false;
    this.showSpinner = true;

    let req: UrlShortner = {
      url: this.url,
    };

    setTimeout(() => {
      this.api.shortUrl(req).subscribe(
        (res: any) => {
          console.log(res);
          if (res.isSuccess) {
            this.url = '';
            this.newUrl =
              window.location.protocol +
              '//' +
              window.location.hostname +
              '/' +
              res.result.shortId;

            this.hideUrl = true;
            this.showSpinner = false;
            this.name.markAsUntouched();
          }
        },
        (err) => {
          console.log(err);
          this.hideUrl = false;
        }
      );
    }, 2000);
  }

  openUrl() {
    window.open(this.newUrl);
  }

  handleEvent(e: any) {
    console.log(e);

    if (e.action === 'done') {
      this.hideUrl = false;
    }
  }
}
