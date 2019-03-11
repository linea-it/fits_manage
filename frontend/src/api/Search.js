
import Client from 'api/Client'

export default class SearchApi {

  static async getAllExposures({
    target,
    telescope,
    instrument,
    band,
    exposureTime,
    observer,
  }) {
    try {

      telescope = telescope === "any" ? '' : telescope;
      instrument = instrument === "any" ? '' : instrument;
      band = band === "any" ? '' : band;
      exposureTime = exposureTime === '' ? 0 : exposureTime;

      const exposures = await Client.query(`
        {
          exposures(
            target_Icontains: "${target}",
            telescope_Iexact: "${telescope}", 
            instrument_Iexact: "${instrument}",
            band_Iexact: "${band}",
            observer_Icontains: "${observer}",
            exposureTime_Gte: ${exposureTime},
            first:100) {
            edges {
              node {
                id
                filename
                target
                ra
                dec
                raDeg
                decDeg
                dateObs
                band
                exposureTime
                telescope
                instrument
                observer
                fileSize
                haveHeaders
              }
            }
            totalCount
          } 
        }
      `);
      return exposures;
    } catch (e) {
      return null;
    }
  }

  static async getExposureById(id) {
    try {
      const exposures = await Client.query(`
      query get_exposure_by_id {
        exposure (id:"${id}"){
          id
          filename
          target
           headers {
             edges {
               node {
                name
                value
               }
             }
           }   
        }
      }
      `);
      return exposures;
    } catch (e) {
      return null;
    }
  }

  static async getTelescopes() {
    try {
      const telescopes = await Client.query(`
      {
        telescopes
      }
      `);
      return telescopes;
    } catch (e) {
      return null;
    }
  }

  static async getInstruments() {
    try {
      const instruments = await Client.query(`
      {
        instruments
      }
      `);
      return instruments;
    } catch (e) {
      return null;
    }
  }

  static async getBands() {
    try {
      const bands = await Client.query(`
      {
        bands
      }
      `);
      return bands;
    } catch (e) {
      return null;
    }
  }  

  static async getExposureTimes() {
    try {
      const exposureTimes = await Client.query(`
      {
        exposureTimes
      }
      `);
      return exposureTimes;
    } catch (e) {
      return null;
    }
  }  

  static async getExposureCount() {
    try {
      const exposureCount = await Client.query(`
      {
        exposureCount
      }
      `);
      return exposureCount;
    } catch (e) {
      return null;
    }
  }
}