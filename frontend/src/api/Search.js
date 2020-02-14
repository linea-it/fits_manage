
import Client from 'api/Client'

export default class SearchApi {

  static parseExposureFilters ({
  target,
  telescope,
  instrument,
  band,
  exposureTime, ra, dec, radius,
  observer,}) {

  telescope = telescope === "any" ? '' : telescope;
  instrument = instrument === "any" ? '' : instrument;
  band = band === "any" ? '' : band;
  exposureTime = exposureTime === '' ? 0 : exposureTime;
  
  var coord;
  //const strFilter ;
  if(ra != undefined && dec != undefined && radius != undefined)
  {
    coord = `raDeg_Gte: ${ra - radius}, raDeg_Lte: ${ra + radius}, decDeg_Gte: ${dec-radius}, decDeg_Lte:${dec + radius}`;
  
  const strFilter = `
    target_Icontains: "${target}",
    telescope_Iexact: "${telescope}", 
    instrument_Iexact: "${instrument}",
    band_Iexact: "${band}",
    observer_Icontains: "${observer}",
    exposureTime_Gte: ${exposureTime},
    ${coord}
  `;
  return strFilter;
  }
  else{
    const strFilter = `
    target_Icontains: "${target}",
    telescope_Iexact: "${telescope}", 
    instrument_Iexact: "${instrument}",
    band_Iexact: "${band}",
    observer_Icontains: "${observer}",
    exposureTime_Gte: ${exposureTime},
  `;
  return strFilter;
  }
  
  }

  static async getAllExposures({
  target,
  telescope,
  instrument,
  band,
  exposureTime,
  observer,
  ra,
  dec
  }, pageSize, currentPage) {
  try {
    var strFilter = this.parseExposureFilters({
      target,
      telescope,
      instrument,
      band,
      exposureTime,
      observer,
      ra,
      dec
    });
    console.log('currentPage', currentPage)

    var after = "";     
    if (currentPage) {
      var offset = currentPage * pageSize;
      after = window.btoa('arrayconnection:' + (offset - 1));
    }
    

    const exposures = await Client.query(`
      {
        exposures(
          ${strFilter}
          first:${pageSize},
          after: "${after}") {
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

  static async getExposuresCount({
  target,
  telescope,
  instrument,
  band,
  exposureTime,
  observer,
  }) {
  try {
    var strFilter = this.parseExposureFilters({
      target,
      telescope,
      instrument,
      band,
      exposureTime,
      observer,
    });

    const data = await Client.query(`
      {
        exposures(
          ${strFilter}) {
          pageInfo {
            startCursor
            endCursor
          }
        } 
      }
    `);

    const temp = atob(data.exposures.pageInfo.endCursor);
    const total = parseInt(temp.split(":")[1]);
    return total;
  } catch (e) {
    return 0;
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

  static async getInstrumentsByTelescope(telescope) {
  try {
    const instruments = await Client.query(`
    {
      instruments (
        telescope: "${telescope}"
      )
    }
    `);
    return instruments;
  } catch (e) {
    return null;
  }
  }


  static async getBandsByInstrument(instrument) {
  try {
    const bands = await Client.query(`
    {
      bands (
        instrument: "${instrument}"
      ) 
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

  static async getExposureDeg(raDeg, decDeg, raio)
  {
    try
    {
      const exposureByDeg = await Client.query(`
      {
        exposures(raDeg_Gte: ${raDeg - raio}, raDeg_Lte: ${raDeg + raio}, decDeg_Gte: ${decDeg-raio}, decDeg_Lte:${decDeg + raio}) {
          edges{
            node{
              id
              raDeg
              decDeg
            }
          }
        }
      }
      `);

    return exposureByDeg;
    }
    catch(e)
    {
      return null;
    }
  }
}

