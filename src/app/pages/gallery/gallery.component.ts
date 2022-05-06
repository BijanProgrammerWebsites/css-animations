import {Component} from '@angular/core';
import {Category} from '../../models/category';
import {NavigationEnd, Router} from '@angular/router';
import {ConcentricCirclesComponent} from '../../animations/loading/concentric-circles/concentric-circles.component';
import {PlayfulRopeComponent} from '../../animations/loading/playful-rope/playful-rope.component';
import {ExpandComponent} from '../../animations/hover/expand/expand.component';
import {FillComponent} from '../../animations/hover/fill/fill.component';
import {FillFromOneSideComponent} from '../../animations/hover/fill-from-one-side/fill-from-one-side.component';
import {FillFromOppositeSideComponent} from '../../animations/hover/fill-from-opposite-side/fill-from-opposite-side.component';
import {NuclearFusionComponent} from '../../animations/hover/nuclear-fusion/nuclear-fusion.component';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
    public readonly CATEGORIES: Category[] = [
        {
            title: 'hover',
            animations: [
                ExpandComponent,
                FillComponent,
                FillFromOneSideComponent,
                FillFromOppositeSideComponent,
                NuclearFusionComponent,
            ],
        },
        {
            title: 'loading',
            animations: [ConcentricCirclesComponent, PlayfulRopeComponent],
        },
    ];

    public currentRoute!: string[];

    public constructor(private router: Router) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) this.currentRoute = event.urlAfterRedirects.split('/').filter(Boolean);
        });
    }
}
