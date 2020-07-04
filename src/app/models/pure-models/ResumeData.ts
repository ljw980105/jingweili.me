import {GenericFeature} from './GenericFeature';
import {TextAndImage} from './TextAndImage';

export class ResumeData {
    constructor(
        public appsWorkedOn: number,
        public commercialAppsWorkedOn: number,
        public appsPublished: number,
        public iosSkills: GenericFeature[],
        public webSkillsFrontend: TextAndImage[],
        public webSkillsBackend: TextAndImage[],
        public webSkillsGeneral: TextAndImage[],
        public graphicSkills: GenericFeature[],
    ) {
    }
}

export class WebSkill {
    constructor(
        public category: string,
        public details: TextAndImage[]) {}

}
