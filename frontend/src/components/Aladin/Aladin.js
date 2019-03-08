import React, { Component } from 'react';
import { uniqueId } from 'lodash'
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme'
import { desfootprint } from './DesFootprint';

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

  componentDidMount = () => {
    this.create_aladin();
  }

  create_aladin = () => {

    this.aladin = this.libA.aladin(
      // Id da div que recebera o aladin
      '#' + this.id,
      // opcoes do aladin
      this.aladinOptions
    )

    if (this.props.desfootprint) {
      this.footprint(desfootprint, 'DES Footprint', true)
    }

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

  plotExposures = (exposures = [], name = "Exposures") => {

    this.aladin.removeLayers()
    if (exposures && exposures.length > 0) {

      var catalog = this.libA.catalog({
        name: 'Exposures',
        sourceSize: 18,
        color: '#1DFF00',
      });

      this.aladin.addCatalog(catalog);
      exposures.forEach((item) => {
        catalog.addSources(
          [
            this.libA.marker(
              item.raDeg,
              item.decDeg,
              {
                popupTitle: item.filename,
                popupDesc: `<em>Target:</em> ${item.target} <br/><em>Position: </em> ${item.ra} ${item.dec}<br/>`
              }
            )
          ]);
      })

      // Posiciona na coordenada do primeiro elemento
      this.aladin.gotoRaDec(exposures[0].raDeg, exposures[0].decDeg)

    }
  }

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

    const { position } = this.props;

    // Ajuste no Tamanho do container
    let { width, height } = this.props.size
    if (height === 0) {
      height = width / 2;
    }

    if (this.aladin) {

      this.plotExposures(this.props.exposures);
     
      if (position && position.length > 0) {
        this.aladin.gotoRaDec(position[0], position[1])
      }
    }



    return (
      <div id={this.id} className="aladin-container" style={{ width: width, height: height }}></div>
    );
  }
}

Aladin.propTypes = {
  exposures: PropTypes.array.isRequired,
  desfootprint: PropTypes.bool,
  position: PropTypes.array,
};

export default sizeMe({ monitorHeight: true, monitorWidth: true })(Aladin);

