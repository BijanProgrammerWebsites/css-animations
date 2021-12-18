import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GithubComponent} from './github/github.component';

@NgModule({
    declarations: [GithubComponent],
    imports: [CommonModule],
    exports: [GithubComponent],
})
export class LogosModule {}
