
import Client from 'api/Client'

export default class SearchApi {

  static async getAllExposures() {
    try {

      // allExposures(first:20) {
      // allExposures(filename_Icontains: "jup_4o2_01557", first:20) {
      const exposures = await Client.query(`
        {
          exposures(filename_Icontains: "jup_4o2_01557", first:20) {
            edges {
              node {
                id
                filename
                target
                ra
                dec
                dateObs
                band
                exposureTime
                telescope
                instrument
                observer
                fileSize
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
}