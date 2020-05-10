
import Client from 'api/Client'


export default class SearchApi {
  
  static parseExposureFilters ({
    target,
    telescope,
    instrument,
    band,
    exposureTime,
    observer, ra, dec, radius}) {
      
      console.log(exposureTime);
      telescope = telescope === "any" ? '' : telescope;
      instrument = instrument === "any" ? '' : instrument;
      band = band === "any" ? '' : band;
      exposureTime = exposureTime === '' ? 0 : exposureTime;

      // console.log(ra);
      // console.log(dec);
      // console.log(radius);

      if(ra !== '' && dec !== '' && radius !== ''){
        

        var raDegGte = parseFloat(ra) - parseFloat(radius);
        var raDegLte = parseFloat(ra) + parseFloat(radius);
        var decDegGte = parseFloat(dec) - parseFloat(radius);
        var decDegLte = parseFloat(dec) + parseFloat(radius);

        // console.log(raDegGte);
        // console.log(raDegLte);
        // console.log(decDegGte);
        // console.log(decDegLte);

  
        const strFilter = `target_Icontains: "${target}", telescope_Iexact: "${telescope}", 
        instrument_Iexact: "${instrument}", band_Iexact: "${band}", observer_Icontains: "${observer}",
        exposureTime_Gte: ${exposureTime}, raDeg_Gte: ${raDegGte}, raDeg_Lte:${raDegLte}, decDeg_Gte: ${decDegGte},
        decDeg_Lte: ${decDegLte}`;
        return strFilter;
      }
      else{

        const strFilter = `target_Icontains: "${target}", telescope_Iexact: "${telescope}", 
        instrument_Iexact: "${instrument}", band_Iexact: "${band}", observer_Icontains: "${observer}",
        exposureTime_Gte: ${exposureTime}`;

        return strFilter;
      }
     
}
  
static calcD(alfa0, delta0, alfa1, delta1, radius){

  var i;
  var alfa0R = alfa0 * Math.PI/180.0;
  var delta0R = delta0 * Math.PI/180.0;
  var alfa1R = alfa1 * Math.PI/180.0;
  var delta1R = delta1 * Math.PI/180.0;
  var temp = 0.0;
  var radiusR = radius * Math.PI/180.0;
  var ac;
  var v0 = new Array(0.0, 0.0, 0.0);
  var v1 = new Array(0.0, 0.0, 0.0);

  v0[0] = Math.cos(alfa0R) * Math.cos(delta0R);
  v0[1] = Math.sin(alfa0R) * Math.cos(delta0R);
  v0[2] = Math.sin(delta0R);


  v1[0] = Math.cos(alfa1R) * Math.cos(delta1R);
  v1[1] = Math.sin(alfa1R) * Math.cos(delta1R);
  v1[2] = Math.sin(delta1R);

  for(i = 0; i < v0.length; i++)
  {
    temp = temp + v0[i] * v1[i];
  }

  ac = Math.acos(temp);

  console.log("ac = ");
  console.log(ac*180.0/Math.PI);

  if(ac > radiusR)
  {
    return 0;
  }
  else{
    return 1;
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
  dec, radius,
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
      dec,radius
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
  ra,
  dec,
  radius,
  }) {
  try {
    var strFilter = this.parseExposureFilters({
      target,
      telescope,
      instrument,
      band,
      exposureTime,
      observer,
      ra,
      dec,
      radius,
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

}

