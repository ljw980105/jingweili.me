import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {rotate45Degrees, shrinkOrExpand} from '../../models/Animations';
import {WidthBreakpointObserver} from '../../models/WidthBreakpointObserver';
import {NameAndURL} from '../../models/pure-models/NameAndURL';
import {ApiService} from '../../services/api.service';
import {Observable} from 'rxjs';
import {MemoryManagerComponent} from '../../shared/memory-manager/memory-manager.component';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-footer',
    animations: [shrinkOrExpand, rotate45Degrees],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})

export class FooterComponent extends MemoryManagerComponent implements OnInit, AfterViewInit {
    @Input() showTopBorder: boolean;
    @Input() theme = 'light';
    widthBreakpoint = 700;

    year: string;
    pagesExpanded = true;
    projectsExpanded = true;
    designsExpanded = true;
    socialsExpanded = true;
    minimizedVersionShown = false;
    widthObservable: WidthBreakpointObserver;

    // color theme
    topBorderStyle: string;
    bgColor: string;
    primaryFontColor: string;
    logoUrl: string;

    simplifiedProjects: Observable<NameAndURL[]>;
    simplifiedGraphics: Observable<NameAndURL[]>;

    constructor(private elementRef: ElementRef, private apiService: ApiService) {
        super();
        this.year = `${(new Date()).getFullYear()}`;
    }

    ngOnInit(): void {
        this.topBorderStyle = this.showTopBorder ? '1px solid #888888' : 'none';
        if (this.theme === 'light') {
            this.bgColor = 'white';
            this.primaryFontColor = 'black';
            this.logoUrl = 'assets/images/footer/logo2024.svg';
        } else {
            this.bgColor = 'black';
            this.primaryFontColor = 'white';
            this.logoUrl = 'assets/images/footer/logo2024White.svg';
        }

        this.simplifiedGraphics = this.apiService.getSimplifiedGraphicsProjects();
        this.simplifiedProjects = this.apiService.getSimplifiedProjects();

        this.widthObservable = new WidthBreakpointObserver(this.widthBreakpoint);

        if (window.innerWidth < 500) {
            this.minimizedVersionShown = true;
            this.expandEverything(false);
        }

        this.widthObservable.lessThanWidth
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                this.minimizedVersionShown = true;
                this.expandEverything(false);
            });

        this.widthObservable.moreThanWidth
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                this.minimizedVersionShown = false;
                this.expandEverything(true);
            });
    }

    ngAfterViewInit() {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.bgColor;
    }

    toggle(index: number) {
        if (index === 1) {
            this.pagesExpanded = !this.pagesExpanded;
        } else if (index === 2) {
            this.projectsExpanded = !this.projectsExpanded;
        } else if (index === 3) {
            this.designsExpanded = !this.designsExpanded;
        } else if (index === 4) {
            this.socialsExpanded = !this.socialsExpanded;
        }
    }

    expandEverything(expand: boolean) {
        this.pagesExpanded = expand;
        this.projectsExpanded = expand;
        this.designsExpanded = expand;
        this.socialsExpanded = expand;
    }
}
