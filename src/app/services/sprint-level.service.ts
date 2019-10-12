import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpHeaderResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class SprintLevelService {

  
  constructor(private httpClient: HttpClient) { }

  so5DetailsLevelAddDetailsAPI(so5DetailsLevelDetails) {
    {
      this.httpClient.post("http://localhost:8080/api/so5Detailss/",
        {
          "platform": so5DetailsLevelDetails[0].so5DetailsLevelPlatform,
          "sowNo": so5DetailsLevelDetails[0].sowNo,
          "sowName": so5DetailsLevelDetails[0].sowName,
          "sowType": so5DetailsLevelDetails[0].sowType,
          "hclPm": so5DetailsLevelDetails[0].hclPM,
          "hclDh": so5DetailsLevelDetails[0].hclDh,
          "cbaManager": so5DetailsLevelDetails[0].cbaManager,
          "sowStartDate": so5DetailsLevelDetails[0].sowStartDate,
          "sowEndDate": so5DetailsLevelDetails[0].sowEndDate,
          "velocity": so5DetailsLevelDetails[0].velocity,
          "featureCycleTime": so5DetailsLevelDetails[0].featureCycleTime,
          "storyCycleTime": so5DetailsLevelDetails[0].storyCycleTime,
          "onQualityCompletion": so5DetailsLevelDetails[0].onQualityCompletion,
          "qualitySitDefectLeakage": so5DetailsLevelDetails[0].qualitySITDefectLeakage,
          "sprintVariance": so5DetailsLevelDetails[0].sprintVariance,
          "releaseVariance": so5DetailsLevelDetails[0].releaseVariance,
          "storyVolatility": so5DetailsLevelDetails[0].storyVolatility,
          "featureVolatility": so5DetailsLevelDetails[0].featureVolatility,
          "sprintBurndown": so5DetailsLevelDetails[0].sprintBurndown,
          "releaseBurndown": so5DetailsLevelDetails[0].releaseBurndown,
          "sprintBurnUp": so5DetailsLevelDetails[0].sprintBurnUp,
          "releaseBurnUp": so5DetailsLevelDetails[0].releaseBurnUp,
          "retention": so5DetailsLevelDetails[0].people

        })
        .subscribe(
          data => {
            alert("Data Saved Successfully!");
          },
          error => {

            console.log(error)
            alert("Data not saved");


          });
    }
  }

  SaveSo5MappingDetailsAPI(newSo5MappingDetailsForm): any {
    this.httpClient.post("http://localhost:8080/api/so5Metricss/",
      {
        "platform_id": newSo5MappingDetailsForm.platformName,
        "so5Name": newSo5MappingDetailsForm.so5Name,
        "so5StartDate": newSo5MappingDetailsForm.so5StartDate,
        "so5EndDate": newSo5MappingDetailsForm.so5EndDate
      }).subscribe(
        data => {
          return true;
        },
        error => {
          console.log(error)
          return false;
        });

  }

  SavePlatFormDetailsAPI(newPlatFormDetailsForm): any {
    this.httpClient.post("http://localhost:8080//api/platformDetailss/",
      {
        "platformName": newPlatFormDetailsForm.platformName,
        "platformLead": newPlatFormDetailsForm.platformLead,

      }).subscribe(
        data => {
          return true;
        },
        error => {
          console.log(error)
          return false;
        });

  }
  NonDeliveryKpiAPI(selectedSo5Id, platformForm, nonDeliveryKPIDetails): any {

    nonDeliveryKPIDetails.forEach((element, index) => {
      this.httpClient.post("http://localhost:8080/api/nonDeliveryKpis/",
        {
          "so5": {
            "id": selectedSo5Id,
            "platformName": platformForm.platformName,
            "so5Name": platformForm.so5Name
          },

          "month": element.nonDeliveryKPIMonth,
          "attritionDuringTheMonth": element.attrition,
          "retentionKpi": element.retention,
          "resourcesOnboardedAsCommittedInTheSo": element.resourcesOnboarded,

        }).subscribe(
          data => {
            return true;
          },
          error => {
            console.log(error)
            return false;
          });
    })
  }

  SprintLevelCalAPI(sprintDetails_Cal) {
    sprintDetails_Cal.forEach((element, index) => {
      {
        this.httpClient.post("http://localhost:8080/api/sprintLevelCalLogics/",
          {

            // "platformLead": sprintDetails_Cal.index,
            "fc1Velocity": element.velocity,
            "fc3StoryCycleTime": element.storyCycleTime,
            "fc6SprintVariance": element.sprintVariance,
            "fc8StoryVolatillity": element.storyVolatillity,
            "fc10SprintBurndown": element.sprintBurndown

          })
          .subscribe(
            data => {
              alert("Data Saved Successfully!");

            },
            error => {

              console.log(error)
              alert("Data not saved");


            });
      }
    });
  }
  ReleaseLevelCalAPI(releaseDetails_Cal) {
    {

      this.httpClient.post("http://localhost:8080/api/releaseLevelCalLogics/",
        {

          "fc2FeatureCycleTime": releaseDetails_Cal[0].cycleTime,
          "fc4OnQualityCompletion": releaseDetails_Cal[0].qualityCompletion,
          "fc5QualitySitDefectLeakage": releaseDetails_Cal[0].defectLeakage,
          "fc7ReleaseVariance": releaseDetails_Cal[0].releaseVariance,
          "fc9FeatureVolatility": releaseDetails_Cal[0].featureVolatility,
          "fc11ReleaseBurndown": releaseDetails_Cal[0].releaseBurndown

        })
        .subscribe(
          data => {
            alert("Data Saved Successfully!");

          },
          error => {

            console.log(error)
            alert("Data not saved");


          });
    }
  }
  StoryLevelResourceAPI(so5DetailsLevelSelectedIndex, storyLevelPlatformForm, storyLevelDetails): any {
    storyLevelDetails.forEach((element, index) => {
      this.httpClient.post("http://localhost:8080/api/storyLevelDatas/",
        {
          "so5": {
            "id": so5DetailsLevelSelectedIndex,
            "platformName": storyLevelPlatformForm.platformName,
            "platformLead": storyLevelPlatformForm.platformLead,
            "so5Name": storyLevelPlatformForm.so5Name
          },
          "platformName": storyLevelPlatformForm.platformName,
          "platformLead": storyLevelPlatformForm.platformLead,
          "so5Name": storyLevelPlatformForm.so5Name,
          "sprint": element.storyLevelSprint,
          "userStoryIds": element.UserStoryIDs,
          "storyInDevStartDate": element.storyStartDate,
          "storyReadyForReleaseDate": element.storyReleaseDate,
          "storyCycleTimeFc3": element.storyCycleTime,

        }).subscribe(
          data => {
            return true;
          },
          error => {
            console.log(error)
            return false;
          });
    })
  }

  SprintResourceAPI(selectedSo5Id, platformForm, sprintDetails): any {
    sprintDetails.forEach((element, index) => {
      this.httpClient.post("http://localhost:8080/api/sprints/",
        {
          "so5": {
            "id": selectedSo5Id,
            "platformName": platformForm.platformLead,
            "so5Name": platformForm.so5Name
          },
          "platformLead": platformForm.platformLead,
          "squad": element.teamSquard,
          "sprintName": element.sprint,
          "sprintEndMonth": element.sprintEndMonth,
          "storyPointsCompleted": element.completed,
          "storyPointsCommitted": element.commited,
          "storyPointsMarkedAsDone": element.done,
          "minStoryInDevStartDate": element.startDate,
          "storyMarkedAsDoneMaxDate": element.endDate,
          "userStoriesCommittedInTheSprint": element.commitedInSprint,
          "userStoriesCompletedWithinTheSprint": element.completedInSprint,
          "userStoriesChangedDuringTheSprint": element.changedInSprint,
          "comments": element.comments,
        }).subscribe(
          data => {
            return true;
          },
          error => {
            console.log(error)
            return false;
          });
    })
  }

  releaseResourceAPI(selectedSo5Id, releasePlatformForm, releaseDetails): any {
    releaseDetails.forEach((element, index) => {
      this.httpClient.post("http://localhost:8080/api/releases/",
        {
          "so5": {
            "id": selectedSo5Id,
            "platformName": releasePlatformForm.platformLead,
            "so5Name": releasePlatformForm.so5Name
          },
          "platformLead": releasePlatformForm.platformLead,
          "squad": element.releaseTeamSquad,
          "releaseName": element.releaseNameNumber,
          "releaseMonth": element.releaseMonth,
          "releaseOnQuality": element.quality,
          "incidentsRaisedInProduction": element.incidentsRaised,
          "totalIncidents": element.totalIncidents,
          "storyPointsCommitted": element.storyPointsCommited,
          "storyPointsMarkedDone": element.storyPointDone,
          "featuresCommitted": element.featuresCommited,
          "featuresCompleted": element.featuresCompleted,
          "featuresChanged": element.featuresChanged,
          "minFeatureStartDate": element.startDatePicker,
          "maxFeatureEndDate": element.endDatePicker,
          "comments": element.comments
        })
        .subscribe(
          data => {
            alert("Data Saved Successfully!");

          },
          error => {

            console.log(error)
            alert("Data not saved");


          });
    })
  }

  get_So5() {
    return this.httpClient.get('http://localhost:8080/api/so5Metricss/page').map(
      (response) => {
        return response;
      })
    error => {
      console.log(error);
    };
  }

  get_products() {
    return this.httpClient.get('http://localhost:8080/api/platformDetailss/page').map(
      (response) => {
        return response;
      })
    
  }

  get_products1(): Observable<boolean> {
    return this.httpClient.get('http://localhost:8080/api/so5Metricss/1').map(
      (response) => {
        return true;
      })
    error => {
      console.log(error);
    };
  }
}
