import { FirebaseDate } from "../../types/firebase-date";

export class DateHelpers {
    public static fbDateToDate(fbDate: FirebaseDate): Date {
        // get offset to be used in with seconds. * 60 becuase it's in minutes by default and we need it in seconds
        const offset: number = new Date().getTimezoneOffset();
        const date: Date = new Date(1970, 0, 1);
        date.setSeconds(fbDate.seconds - offset * 60);
        return date;
    }
}