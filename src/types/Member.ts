export interface Member {
    distance: string;
    firstName: {
        text: string;
    }
    lastName: {
        text: string;
    }
    headline: {
         text: string;
    }
    profileUrl: string;
    profilePicture: {
        artifacts: {
            fileIdentifyingUrlPathSegment: string;
            height: number;
            width: number;
        }[];
        rootUrl: string;
    }
}