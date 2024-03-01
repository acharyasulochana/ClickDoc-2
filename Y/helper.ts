import { OpeningTime } from "../Interface/doctor.interface"

export const isTimeExsistInOpeningHour = (time: OpeningTime, openingTimes: OpeningTime[]) => {
  console.log("here I am ")
    return openingTimes.find(obj =>
        obj.day === time.day &&
        obj.startTime === time.startTime &&
        obj.endTime === time.endTime
      );
}