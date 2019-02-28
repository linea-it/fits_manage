import React, { Component } from 'react';
import { uniqueId } from 'lodash'
import sizeMe from 'react-sizeme'
import { desfootprint } from './DesFootprint';
// import {ExposureApi} from './ExposureApi';

class Aladin extends Component {
  // api = new ExposureApi();
  constructor(props) {
    super(props);

    this.state = this.initialState

    this.id = uniqueId("aladin-container-")

    // Instancia do Aladin linkado com a div
    this.aladin = null;

    // Verificar se a lib Aladin esta disponivel
    if (window.A) {
      this.libA = window.A;
    }
  }

  get initialState() {
    return {
    };
  }

  get aladinOptions() {
    return {
      // fov:8,
      fov: 180,
      // target: '02 23 11.851 -09 40 21.59',
      // target: '06 12 46.187 -45 45 15.40',
      cooFrame: 'J2000',
      survey: "P/DSS2/color",
      showReticle: true,
      showZoomControl: true,
      showFullscreenControl: true,
      showLayersControl: true,
      showGotoControl: true,
      showShareControl: false,
      showCatalog: true,
      showFrame: true,
      showCooGrid: false,
      fullScreen: false,
      reticleColor: 'rgb(178, 50, 178)',
      reticleSize: 28,
      log: true,
      allowFullZoomout: true
    }
  }

  componentWillMount() {
    // Antes do Render do Component

  }

  componentDidMount = () => {
    // console.log("Depois do component estar renderizado")

    this.create_aladin();

  }

  // componentWillUpdate = (nextProps) => {
  //   if (this.props.exposures !== nextProps.exposures) {
  //     this.plotExposures(nextProps.exposures);
  //   }
  // }

  create_aladin = () => {
    this.aladin = this.libA.aladin(
      // Id da div que recebera o aladin
      '#' + this.id,
      // opcoes do aladin
      this.aladinOptions
    )

    this.footprint(desfootprint, 'DES Footprint', true)

    return this.aladin;
  }

  footprint = (footprint = [], name = 'footprint', visible = true) => {
    const aladin = this.aladin;

    let overlay;

    if (aladin.view.overlays[0] !== undefined) {
      const overlays = aladin.view.overlays;

      let plotDes = false;


      for (var i = overlays.length - 1; i >= 0; i--) {
        if (overlays[i].name === name) {
          plotDes = true;

          if (visible) {
            overlays[i].show();

          } else {
            overlays[i].hide();

          }
        }
      }
      if (plotDes === false) {
        overlay = this.libA.graphicOverlay({ color: '#ee2345', lineWidth: 2, name: 'des' });

        aladin.addOverlay(overlay);
        overlay.add(this.libA.polyline(footprint));

      }
    } else {
      overlay = this.libA.graphicOverlay({ color: '#ee2345', lineWidth: 2, name: name });

      aladin.addOverlay(overlay);
      overlay.add(this.libA.polyline(footprint));

    }
  }

  // plotExposures = (exposures = [], name = "Exposures") => {
  //   console.log('plotExposures:', exposures)
  //   const aladin = this.aladin;

  //   // Verificar se os ccds ja foram plotados
  //   let overlay = this.getOverlayByName(name);
  //   if (overlay) {
  //     // Se ja existir exibir
  //     overlay.show();
  //   } else {
  //     // Se nao existir criar 
  //     overlay = this.libA.graphicOverlay({
  //       color: '#1DFF00',
  //       lineWidth: 1,
  //       name: String(name)
  //     })

  //     aladin.addOverlay(overlay);

  //     exposures.forEach((item) => {
  //       console.log('item:', item)
  //       const exposure = this.libA.circle(item.raDeg, item.decDeg, 5, {});
  //       overlay.add(exposure);
  //     })
  //   }
  // }

  plotExposures = (exposures = [], name = "Exposures") => {
    console.log('plotExposures:', exposures)
    const aladin = this.aladin;

    var catalog = this.libA.catalog({name: 'Exposures', sourceSize: 50});

    exposures.forEach((item) => {
      catalog.addSources(
        [this.libA.marker(item.raDec, item.deDec, {popupTitle: 'Alcyone', popupDesc: ''})]);
    })

    aladin.addCatalog(catalog);

    // Verificar se os ccds ja foram plotados
    let overlay = this.getOverlayByName(name);
    if (overlay) {
      // Se ja existir exibir
      overlay.show();
    } else {
      // Se nao existir criar 
      overlay = this.libA.graphicOverlay({
        color: '#1DFF00',
        lineWidth: 1,
        name: String(name)
      })

      aladin.addOverlay(overlay);

      exposures.forEach((item) => {
        console.log('item:', item)
        const exposure = this.libA.circle(item.raDeg, item.decDeg, 1, {});
        overlay.add(exposure);
      })
    }
  }


  // plot_ccds = (ccds = [], name = 'CCDs') => {

  //   const aladin = this.aladin;

  //   // Verificar se os ccds ja foram plotados
  //   let overlay = this.getOverlayByName(name);
  //   if (overlay) {
  //     // Se ja existir exibir
  //     overlay.show();
  //   } else {
  //     // Se nao existir criar 
  //     overlay = this.libA.graphicOverlay({
  //       color: '#64e544',
  //       lineWidth: 1,
  //       name: String(name)
  //     })

  //     aladin.addOverlay(overlay);

  //     ccds.forEach((item) => {
  //       const tPath = [
  //         [item.rac4, item.decc4],
  //         [item.rac3, item.decc3],
  //         [item.rac2, item.decc2],
  //         [item.rac1, item.decc1],
  //       ];

  //       overlay.add(this.libA.polygon(tPath));
  //     })
  //   }
  // }

  getOverlayByName = (name) => {
    const aladin = this.aladin;
    const overlays = aladin.view.overlays;
    let result = null;

    if (overlays.length > 0) {
      overlays.forEach(function (item) {
        if (item.name === name) {
          result = item;
        }
      });
    }

    return result;
  }


  render() {
    // Ajuste no Tamanho do container
    let { width, height } = this.props.size
    if (height === 0) {
      height = width / 2;
    }

    console.log("Render")

    if (this.aladin) {
      this.plotExposures(this.props.exposures);
    }
    

    return (
      <div id={this.id} className="aladin-container" style={{ width: width, height: height }}></div>
    );
  }
}

export default sizeMe({ monitorHeight: true, monitorWidth: true })(Aladin);

