import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    Input,
    QueryList,
    ViewChildren,
} from '@angular/core';
import {AnimationDirective} from '../../../directives/animation.directive';
import {CssAnimation} from '../../../models/css-animation';

@Component({
    selector: 'app-animations-wrapper',
    templateUrl: './animations-wrapper.component.html',
    styleUrls: ['./animations-wrapper.component.scss'],
})
export class AnimationsWrapperComponent implements AfterViewInit {
    @Input() public title!: string;
    @Input() public animations!: CssAnimation[];

    @ViewChildren(AnimationDirective) private hosts!: QueryList<AnimationDirective>;

    public constructor(private resolver: ComponentFactoryResolver, private changeDetectorRef: ChangeDetectorRef) {}

    public ngAfterViewInit(): void {
        this.generateAnimations();
        this.hosts.changes.subscribe(() => {
            this.generateAnimations();
        });
    }

    public generateAnimations(): void {
        if (!this?.hosts) return;

        this.animations.forEach((animation, index) => {
            const viewContainerRef = this.hosts.get(index)?.viewContainerRef;
            if (!viewContainerRef) return;

            viewContainerRef.clear();

            const factory = this.resolver.resolveComponentFactory(animation.component);
            viewContainerRef.createComponent(factory);
        });

        this.changeDetectorRef.detectChanges();
    }
}
