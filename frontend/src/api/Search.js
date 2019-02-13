
import Client from 'api/Client'

export default class SearchApi {

  static async getAllExposures() {
    try {
      const exposures = await Client.query(`
        {
          allExposures(first:20) {
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
}