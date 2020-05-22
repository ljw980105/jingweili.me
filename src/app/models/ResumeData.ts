import {GenericFeature} from './GenericFeature';
import {TextAndImage} from './TextAndImage';

export class ResumeData {
    appsWorkedOn: number;
    commercialAppsWorkedOn: number;
    appsPublished: number;
    iosSkills: GenericFeature[];
    webSkillsFrontend: TextAndImage[];
    webSkillsBackend: TextAndImage[];
    webSkillsGeneral: TextAndImage[];
}

export class WebSkill {
    constructor(
        public category: string,
        public details: TextAndImage[]) {}

}
