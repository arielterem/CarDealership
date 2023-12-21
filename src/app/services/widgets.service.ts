import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, Subject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TemplatesService } from './templates.service';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {

  private dataUrl = 'assets/data.json';
  private localStorageUpdate = new Subject<void>();
  private landingPageCounter = 'landingPageCounter';
  private clientsCounter = 'clientsCounter';

  constructor(
    private http: HttpClient,
    private templatesService: TemplatesService
  ) { }

  notifyLocalStorageUpdate() {
    this.localStorageUpdate.next();
  }

  onLocalStorageUpdate(): Observable<void> {
    return this.localStorageUpdate.asObservable();
  }

  motorTypeByGender_data(): Observable<any> {
    return from(this.http.get<any>(this.dataUrl).toPromise()).pipe(
      map(dataTemplate => {
        const storedDataKeys = Object.keys(localStorage).filter(key => key.startsWith('formResult_'));
        const storedData = storedDataKeys.map(key => JSON.parse(localStorage.getItem(key)!));

        // Initialize the result structure
        const result = dataTemplate.gender.map((gender: { title: any; }) => ({
          name: gender.title,
          data: Array(dataTemplate.motorTypes.length).fill(0) // Initialize an array with zeros
        }));

        // Iterate through stored data and update counts
        storedData.forEach(item => {
          const genderIndex = dataTemplate.gender.findIndex((g: { id: any; }) => g.id === item.gender);
          if (genderIndex !== -1) {
            item.motorType.forEach((typeId: any) => {
              const typeIndex = dataTemplate.motorTypes.findIndex((type: { id: any; }) => type.id === typeId);
              if (typeIndex !== -1) {
                result[genderIndex].data[typeIndex]++;
              }
            });
          }
        });

        return result;
      }),
      catchError(error => {
        console.error('Error fetching data:', error);
        return [];
      })
    );
  }

  ageByHobby(): Observable<any> {
    let amountOfHobbies = 0;

    return this.http.get<any>(this.dataUrl).pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return of(null); // Return an observable with a null value in case of an error
      }),
      map(data => {
        if (data && data.hobbies && Array.isArray(data.hobbies)) {
          amountOfHobbies = data.hobbies.length;
          if (amountOfHobbies === 0) {
            return null; // Return an observable with a null value if there are no hobbies
          }
        }

        const ageGroups = [
          {
            name: '0-22',
            data: Array(amountOfHobbies).fill(0),
          },
          {
            name: '23-50',
            data: Array(amountOfHobbies).fill(0),
          },
          {
            name: '51+',
            data: Array(amountOfHobbies).fill(0),
          },
        ];

        for (const key in localStorage) {
          if (localStorage.hasOwnProperty(key) && key.startsWith('formResult_')) {
            try {
              const value = JSON.parse(localStorage.getItem(key)!);
              const ageGroup = this.calculateAgeGroup(value.birthdate);
              if (ageGroup != '') {
                value.hobbies.forEach((index: number) => {
                  for (const ageData of ageGroups) {
                    if (ageData.name == ageGroup) {
                      ageData.data[index - 1]++;
                      break
                    }
                  }

                });
              }
            } catch (error) {
              console.error('Error fetching key data:', key);
            }
          }
        }

        return ageGroups

      })
    );
  }

  private calculateAgeGroup(birthdate: Date): string {
    const today = new Date();
    const birthDate = new Date(birthdate);
    if (!birthDate)
      return ''
    let age = today.getFullYear() - birthDate.getFullYear();

    // Check if the birthday has occurred this year
    const hasBirthdayOccurred = (
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())
    );

    // If the birthday has not occurred yet, subtract 1 from the age
    if (!hasBirthdayOccurred) {
      age--;
    }

    if (age <= 22) {
      return '0-22';
    } else if (age <= 50) {
      return '23-50';
    } else {
      return '51+';
    }
  }

  genderAnalysis(): Observable<any> {
    return this.http.get<any>(this.dataUrl).pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return of(null); // Return an observable with a null value in case of an error
      }),
      map((template) => {
        if (template && template.gender && Array.isArray(template.gender)) {
          const genderArray = template.gender.map((item: { title: any; }) => {
            return {
              name: item.title,
              y: 0,
              z: 1.0,
            };
          });

          for (const key in localStorage) {
            if (localStorage.hasOwnProperty(key) && key.startsWith('formResult_')) {
              try {
                const value = JSON.parse(localStorage.getItem(key)!);
                genderArray[value.gender - 1].y++
              } catch (error) {
                console.error('Error fetching key data:', key);
              }
            }
          }

          for (const genderData of genderArray) {
            if (genderData.y > 0) {
              genderData.z = genderData.y / 3
            }
          }

          return genderArray;
        } else {
          return null; // Return null if the original data or 'gender' is missing
        }
      })
    );
  }

  last24hours(): Observable<any> {
    const currentTime = new Date().getTime();
    const before24hours = currentTime - 24 * 60 * 60 * 1000;
    const before48hours = currentTime - 24 * 60 * 60 * 1000 * 2;

    const allKeys = Object.keys(localStorage);
    const last24hoursData: any = [];
    let last24hoursCount = 0;
    let previous24hoursCount = 0;

    allKeys.forEach((key) => {
      if (key.startsWith('formResult_')) {
        // if (key.startsWith('formResult_5')) debugger;
        const storedData = JSON.parse(localStorage.getItem(key)!);
        const timestamp_temp = storedData?.timeStamp;

        if (timestamp_temp) {
          const timestamp = new Date(timestamp_temp).getTime();

          if (timestamp >= before24hours) {
            last24hoursCount++;
          }

          if (timestamp >= before48hours && timestamp < before24hours) {
            previous24hoursCount++;
          }

          last24hoursData.push({
            timestamp: timestamp,
            key,
          });
        }
      }
    });

    // Calculate count in 6-hour intervals for the last 24 hours
    const intervals = 4; // 24 hours divided into 4 intervals (6 hours each)
    const intervalCounts = Array.from({ length: intervals }, (_, index) => {
      const intervalStart = before24hours + index * 6 * 60 * 60 * 1000;
      const intervalEnd = before24hours + (index + 1) * 6 * 60 * 60 * 1000;

      const count = last24hoursData.filter((entry: { timestamp: number }) => entry.timestamp >= intervalStart && entry.timestamp < intervalEnd).length;

      return count;
    });
    // Reverse the array
    // intervalCounts.reverse();


    const result = {
      last24hours: last24hoursCount,
      previous24hours: previous24hoursCount,
      graphArray: intervalCounts,
    };

    return of(result);
  }


  last7days(): Observable<any> {
    const currentDateTime = new Date();
    currentDateTime.setHours(0, 0, 0, 0); // Set time to midnight for the current date
    const before7days = new Date(currentDateTime);
    before7days.setDate(before7days.getDate() - 7);
    const before14days = new Date(currentDateTime);
    before14days.setDate(before14days.getDate() - 14);

    const allKeys = Object.keys(localStorage);
    const last7daysData: any = [];
    let last7daysCount = 0;
    let previous7daysCount = 0;

    allKeys.forEach((key) => {
      if (key.startsWith('formResult_')) {
        const storedData = JSON.parse(localStorage.getItem(key)!);
        const timestamp_temp = storedData?.timeStamp;

        if (timestamp_temp) {
          const timestamp = new Date(timestamp_temp);
          timestamp.setHours(0, 0, 0, 0); // Set time to midnight for the entry

          if (timestamp >= before7days) {
            last7daysCount++;
          }

          if (timestamp >= before14days && timestamp < before7days) {
            previous7daysCount++;
          }

          last7daysData.push({
            timestamp: timestamp.getTime(),
            key,
          });
        }
      }
    });

    // Calculate count for each day in the last 7 days
    let daysArray = Array(7).fill(0);

    last7daysData.forEach((entry: { timestamp: number }) => {
      const item = entry.timestamp;

      if (item >= before7days.getTime()) {
        // Calculate the day index within the last 7 days
        const dayIndex = 6 - Math.floor((currentDateTime.getTime() - item) / (24 * 60 * 60 * 1000));

        // Increment the count for the corresponding day
        daysArray[dayIndex]++;
      }
    });

    const result = {
      last7days: last7daysCount,
      previous7days: previous7daysCount,
      graphArray: daysArray,
    };

    return of(result);
  }


  totalClients(): Observable<number> {
    if (localStorage.hasOwnProperty(this.clientsCounter)) {
      const formResultCounterValue = localStorage.getItem(this.clientsCounter);
      const totalClientsValue = formResultCounterValue ? parseInt(formResultCounterValue, 10) : 0;
      return of(totalClientsValue);
    } else {
      return of(0);
    }
  }

  clientsOutOfVisitors(): Observable<number> {
    if (localStorage.hasOwnProperty(this.clientsCounter) && localStorage.hasOwnProperty(this.landingPageCounter)) {
      const formResultCounterValue = localStorage.getItem(this.clientsCounter);
      const landingPageCounterValue = localStorage.getItem(this.landingPageCounter);

      const formResultCounterValue_number = formResultCounterValue ? parseInt(formResultCounterValue, 10) : 0;
      const landingPageCounterValue_number = landingPageCounterValue ? parseInt(landingPageCounterValue, 10) : 0;

      // Avoid division by zero
      if (landingPageCounterValue_number !== 0) {
        return of(formResultCounterValue_number / landingPageCounterValue_number);
      } else {
        return of(0);
      }
    } else {
      return of(0);
    }
  }


  clientTable(): Observable<any> {
    const allKeys = Object.keys(localStorage);
    let clientsCounter = 0;

    if (localStorage.hasOwnProperty(this.clientsCounter)) {
      clientsCounter = parseInt(localStorage.getItem(this.clientsCounter)!, 10);
    }

    let result = [];

    if (clientsCounter !== 0) {
      for (let index = clientsCounter; index > 0; index--) {
        if (localStorage.hasOwnProperty('formResult_' + index)) {
          const item = JSON.parse(localStorage.getItem('formResult_' + index)!);

          result.push({
            index: 0,
            fullName: item.fullName,
            email: item.email,
            timeStamp: item.timeStamp,
          });
        }
      }
    }

    let indexer: number = 1;
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jerusalem',
    };

    result = result
      .sort((a, b) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()) // Sort by timeStamp in ascending order
      .map((item) => {
        item.index = indexer;
        indexer++;
        const shortTime = new Date(item.timeStamp).toLocaleString('en-IL', options);
        item.timeStamp = shortTime

        return item; // Return the modified item
      });



    return of(result);
  }

}
