/*
<img width="200px" height="200px" src="assets/images/apps/BeatslyticsIcon.png">
            <h2>BEATSLYTICS</h2>
            <p> A kick-ass iOS music analytics app that produces analytics data based on the user's listening
                habits. <br/> <strong>Currently published on the App Store.</strong></p>
            <p><strong>Frameworks: MediaPlayer & CoreData</strong></p>
            <div class="anchor-tag-alignment"><a href="Beatslytics.html">View App ></a></div>
 */

export class AppOrSkill {
    constructor(
        public imageLink: string,
        public name: string,
        public description: string,
        public useRouterLink: boolean,
        public description2?: string,
        public linkTitle?: string,
        public link?: string,
        public id: number = null) {

    }
}

