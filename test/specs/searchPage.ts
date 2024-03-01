import { DOCTOR_DETAIL } from "../../Y/doctor-detail-test.js"
import { strict as assert } from "assert";
import { isTimeExsistInOpeningHour } from "../../Y/helper.js"

describe("open the browser", () => {   
    
    it("should open the brower of CLOCKDOC", async()=>{

        await browser.url("https://demo.clickdoc.de/cd-de/");
    })

    it("should activate all cookies", async()=>{

        const allActivate = $("//button[@class='consent-button agree-consent--all']");
        await allActivate.waitForDisplayed({timeout:3000});
        await allActivate.click();
    })

    it("should search for doctor with name", async()=>{

        const doctorName = DOCTOR_DETAIL.name
        await  $("//input[@data-web-test = 'lp-search-input']").setValue(doctorName);
        const doctorElement = await $(`//div[@class = 'search-card-physician-name ng-star-inserted']/span/span[text() ='${doctorName}']`);  
        await doctorElement.waitForDisplayed();
        await doctorElement.click();
    })

    it("should show the detail of doctor", async()=>{
        const fullName = await $("//h1");
        const StreetAndHosueNo = await $("//div[@class='field-container width-fit-content']/div[2]/div/app-address-link-text/a/p[1]");
        const postcodeAndCity = await $("//div[@class='field-container width-fit-content']/div[2]/div/app-address-link-text/a/p[2]");

        const nameOfDoctor = DOCTOR_DETAIL.extendedName;
        await expect(fullName).toHaveText(nameOfDoctor);

        const houseNumber = DOCTOR_DETAIL.address.houseNumber;
        const houseStreet = DOCTOR_DETAIL.address.street;
        await expect(StreetAndHosueNo).toHaveText(`${houseStreet} ${houseNumber}`);

        const postalCode = DOCTOR_DETAIL.address.postalCode;
        const city = DOCTOR_DETAIL.address.city;
        await expect(postcodeAndCity).toHaveText(`${postalCode} ${city}`);

    })

    it("should show the morning opening hours of current day", async() =>{
        const day = await $("//div[@class = 'text-day__item--text current-date']").getText();
        const morningStartTime = await $("//div[@class = 'text-day-hours-container__items current-date ng-star-inserted']/div/div[1]/div[@class = 'text-day-hour__text-startTime']").getText();
        const morningEndTime = await $("//div[@class = 'text-day-hours-container__items current-date ng-star-inserted']/div/div[1]/div[@class = 'text-day-hour__text-endTime']").getText();
        const morningTime = {"day": day, "startTime": morningStartTime, "endTime": morningEndTime};
        const isMorningTimeExsistInDoctorDetailOpenningTime = isTimeExsistInOpeningHour(morningTime, DOCTOR_DETAIL.openingTimes);
      
        assert.ok(isMorningTimeExsistInDoctorDetailOpenningTime);
    })

    it("should show the afternoon opening hours of current day", async() =>{
        const day = await $("//div[@class = 'text-day__item--text current-date']").getText();
        const afternoonStart = await $("//div[@class = 'text-day-hours-container__items current-date ng-star-inserted']/div/div[2]/div[@class = 'text-day-hour__text-startTime']");
        const afternoonEnd = await $("//div[@class = 'text-day-hours-container__items current-date ng-star-inserted']/div/div[2]/div[@class = 'text-day-hour__text-endTime']");
        const isAfternoonTimeExist= await afternoonStart.isExisting() && await afternoonEnd.isExisting()

        if (isAfternoonTimeExist) {
            const afternoonStartTime = await afternoonStart.getText();
            const afternoonEndTime = await afternoonEnd.getText(); 
            const afternoonTime = {"day": day, "startTime": afternoonStartTime, "endTime": afternoonEndTime};
            const isAfternoonTimeExsistInDoctorDetailOpenningTime = isTimeExsistInOpeningHour(afternoonTime, DOCTOR_DETAIL.openingTimes);
            assert.ok(isAfternoonTimeExsistInDoctorDetailOpenningTime);

        }
        else {
            assert.ok(isAfternoonTimeExist);
        }

    })

})

