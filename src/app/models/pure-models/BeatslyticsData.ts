import {GenericFeature} from './GenericFeature';

export class BeatslyticsData {
    constructor(
        public metaAppStoreName: string,
        public metaAppStoreContent: string,
        public headline: string,
        public intro: string,
        public appStore: string,
        public features: GenericFeature[],
        public support: string,
        public license_agreement_url: string,
        public privacy_policy_url: string,
        public credits: GenericFeature,
        public id?: string
    ) {

    }
}

