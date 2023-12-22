import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _loading: boolean = false;

  constructor() { }

  get loading() {
    return this._loading;
  }

  public startLoading() {
    this._loading = true;
  }

  public finishLoading() {
    this._loading = false;
  }
}
