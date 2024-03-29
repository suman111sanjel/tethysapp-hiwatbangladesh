let myApp = {};

let layerCheckBoxBinding = function (AppendingDivID, LayerObject, OpacitySlider, LegendDropDown, customCSSClass) {
    this.divID = AppendingDivID;
    this.layerObj = LayerObject;
    this.DisplayOpacity = OpacitySlider;
    this.DisplayLegendDropDown = LegendDropDown;
    this.createElement = function (type, className) {
        var element = document.createElement(type);
        if (className) {
            let classList = className.split(" ")
            element.classList.add(...classList);
        }
        return element
    };
    this.createDiv = function (ClassName) {
        var div = this.createElement('div', ClassName);
        return div;
    };
    this.createSpan = function (ClassName) {
        var span = this.createElement('span', ClassName);
        return span;
    };
    this.createA = function (ClassName) {
        var a = this.createElement('a', ClassName);
        return a;
    };
    this.createButton = function (ClassName) {
        var a = this.createElement('button', ClassName);
        return a;
    };
    this.createI = function (ClassName) {
        var i = this.createElement('i', ClassName);
        return i;
    };
    this.createImg = function (ClassName) {
        var img = this.createElement('img', ClassName);
        return img;
    };
    this.createInput = function (ClassName) {
        var i = this.createElement('input', ClassName);
        return i;
    };
    this.createSelect = function (ClassName) {
        var i = this.createElement('select', ClassName);
        return i;
    };
    this.createOption = function (ClassName) {
        var i = this.createElement('option', ClassName);
        return i;
    };
    this.createH = function (HeadingNumber, ClassName) {
        var i = this.createElement('h' + HeadingNumber.toString(), ClassName);
        return i;
    };
    this.createLabel = function (ClassName) {
        var i = this.createElement('label', ClassName);
        return i;
    };
    this.createInput = function (ClassName) {
        var i = this.createElement('input', ClassName);
        return i;
    };

    this.checkLayerProperties = function () {
        this.layerPropertiesObject = this.layerObj.getProperties();
        if (!this.layerPropertiesObject.id) {
            console.error("Please Provide Layer Id");
        }
        this.layerId = this.layerPropertiesObject.id

        if (!this.layerPropertiesObject.title) {
            console.error("Please Provide Layer title");
        }
        this.layerTitle = this.layerPropertiesObject.title;

        if (!this.layerPropertiesObject.legendPath) {
            console.error("Please Provide legend Path");
        }
        this.legendPath = this.layerPropertiesObject.legendPath;

        if (this.layerPropertiesObject.visible) {
            this.layerVisible = this.layerPropertiesObject.visible;
        } else {
            this.layerVisible = true;
        }
        this.layerVisible = this.layerPropertiesObject.visible;

        if (this.layerPropertiesObject.opacity) {
            this.layerOpacity = this.layerPropertiesObject.opacity;
        } else {
            this.layerOpacity = 1;
        }
    };

    this.LayerCheckbox = function () {
        this.outDIv = this.createDiv("LayerDiv");
        if (customCSSClass) {
            let classList = customCSSClass.split(" ")
            this.outDIv.classList.add(...classList)

        }
        let paddingDiv = this.createDiv("paddingForDiv");

        let OuterDiv = this.createDiv('custom-control custom-checkbox layerCheckPadding');
        this.CheckboxInput = this.createInput('custom-control-input');
        this.CheckboxInput.setAttribute('type', 'checkbox');
        this.CheckboxInput.setAttribute('id', this.layerId);
        this.CheckboxInput.setAttribute('LayerId', this.layerId);
        this.CheckboxInput.checked = this.layerVisible;
        let LavelTag = this.createLabel('custom-control-label');
        LavelTag.setAttribute('for', this.layerId);
        LavelTag.innerText = this.layerTitle;
        OuterDiv.append(this.CheckboxInput);
        OuterDiv.append(LavelTag);

        let ChevronDiv = this.createDiv('ChevronDiv');
        this.cheveronSapn = this.createSpan('glyphicon glyphicon-chevron-left');
        this.cheveronSapn.setAttribute('title', "Show/Hide Legend");
        this.cheveronSapn.setAttribute('show-legend', false);
        ChevronDiv.append(this.cheveronSapn)
        paddingDiv.append(OuterDiv)
        paddingDiv.append(ChevronDiv)
        this.outDIv.append(paddingDiv);


        this.legendDiv = this.createDiv('legend-div');
        this.legendDiv.style.display = 'none';
        let imgTag = this.createImg("legend-image");
        imgTag.setAttribute("src", this.legendPath);
        this.legendDiv.append(imgTag)
        this.outDIv.append(this.legendDiv);

        let LayerOpacityDiv = this.createDiv('opac-div');
        let LayerOpacityDivinner = this.createDiv();
        this.rangeInput = this.createInput('');
        this.rangeInput.setAttribute('type', 'text');
        this.rangeInput.setAttribute('data-slider-min', "0");
        this.rangeInput.setAttribute('data-slider-max', "100");
        this.rangeInput.setAttribute('data-slider-step', "1");
        this.rangeInput.setAttribute('data-slider-value', "100");
        this.rangeInput.setAttribute('data-slider-id', "ex1Slider");
        this.rangeInput.setAttribute('name', "OpacityRange");
        this.rangeInput.setAttribute('LayerId', this.layerId);
        this.rangeInput.setAttribute('id', this.layerId + "-Slider");

        LayerOpacityDivinner.append(this.rangeInput);
        LayerOpacityDiv.append(LayerOpacityDivinner);
        this.outDIv.append(LayerOpacityDiv);

        if (this.DisplayOpacity === false) {
            LayerOpacityDivinner.style.display = 'none';
        }
        return this.outDIv
    };

    this.bindEvents = function () {
        this.CheckboxInput.addEventListener("change", () => {
            this.layerObj.setVisible(this.CheckboxInput.checked);
            if (this.CheckboxInput.checked) {
                this.SliderObject.enable();
            } else {
                this.SliderObject.disable();
            }
        }, true);
        this.cheveronSapn.addEventListener("click", () => {
            let currentValue = this.cheveronSapn.getAttribute("show-legend");
            var isTrueSet = (currentValue === 'true');
            if (isTrueSet === true) {
                this.cheveronSapn.setAttribute("show-legend", false);
                this.legendDiv.style.display = 'none';
            } else {
                this.cheveronSapn.setAttribute("show-legend", true);
                this.legendDiv.style.display = 'block';
            }

        }, true);

        // Create a new 'change' event
        var event = new Event('change');
        // Dispatch it.
        this.CheckboxInput.dispatchEvent(event);
    };

    this.getProperties = function () {
        return this.layerObj.getProperties()
    };

    this.getLayer = function () {
        return this.layerObj;
    }

    this.setVisible = function (param) {
        this.layerObj.setVisible(param);
        this.CheckboxInput.checked = param;
        this.outDIv.style.display = 'block';
        if (this.CheckboxInput.checked) {
            this.SliderObject.enable();
        } else {
            this.SliderObject.disable();
        }
    };

    this.setVisibleDivBind = function (param) {
        this.layerObj.setVisible(param);
        this.CheckboxInput.checked = param;
        if (param === true) {
            this.outDIv.style.display = 'block';
        } else {
            this.outDIv.style.display = 'none';
        }
        if (this.CheckboxInput.checked) {
            this.SliderObject.enable();
        } else {
            this.SliderObject.disable();
        }
    };

    this.init = function () {
        this.checkLayerProperties();
        let LayerCheckBox = this.LayerCheckbox();
        let AppendingDiv = document.querySelector(this.divID);
        AppendingDiv.append(LayerCheckBox);
        let that = this;
        // $('#' + this.layerId + '-Slider').slider({
        //     tooltip: 'always',
        //     value: this.layerOpacity * 100,
        //     step: 1,
        //     min: 0,
        //     max: 100,
        //     formatter: function (value) {
        //         var valueOp = parseInt(value) / 100;
        //         that.layerObj.setOpacity(valueOp);
        //         return value + " %";
        //     }
        // });

        // Without JQuery
        this.SliderObject = new Slider('#' + this.layerId + '-Slider', {
            tooltip: 'always',
            value: this.layerOpacity * 100,
            step: 1,
            min: 0,
            max: 100,
            formatter: function (value) {
                var valueOp = parseInt(value) / 100;
                that.layerObj.setOpacity(valueOp);
                return value + " %";
            }
        });

        this.bindEvents();
    };

    this.init();
}


myApp.makeRequest = function (method, url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
};
myApp.createElement = function (type, className) {
    var element = document.createElement(type);
    if (className) {
        let classList = className.split(" ")
        element.classList.add(...classList);
    }
    return element
}
myApp.createDiv = function (ClassName) {
    var div = myApp.createElement('div', ClassName);
    return div;
}
myApp.createSpan = function (ClassName) {
    var span = myApp.createElement('span', ClassName);
    return span;
}
myApp.createA = function (ClassName) {
    var a = myApp.createElement('a', ClassName);
    return a;
}
myApp.createButton = function (ClassName) {
    var a = myApp.createElement('button', ClassName);
    return a;
}
myApp.createI = function (ClassName) {
    var i = myApp.createElement('i', ClassName);
    return i;
}
myApp.createImg = function (ClassName) {
    var img = myApp.createElement('img', ClassName);
    return img;
}
myApp.createInput = function (ClassName) {
    var i = myApp.createElement('input', ClassName);
    return i;
}
myApp.createSelect = function (ClassName) {
    var i = myApp.createElement('select', ClassName);
    return i;
}
myApp.createOption = function (ClassName) {
    var i = myApp.createElement('option', ClassName);
    return i;
}
myApp.createH = function (HeadingNumber, ClassName) {
    var i = myApp.createElement('h' + HeadingNumber.toString(), ClassName);
    return i;
}
myApp.createLabel = function (ClassName) {
    var i = myApp.createElement('label', ClassName);
    return i;
}
myApp.createInput = function (ClassName) {
    var i = myApp.createElement('input', ClassName);
    return i;
}
myApp.createB = function (ClassName) {
    var i = myApp.createElement('b', ClassName);
    return i;
}
myApp.createBr = function (ClassName) {
    var i = myApp.createElement('br', ClassName);
    return i;
}
myApp.createHr = function (ClassName) {
    var i = myApp.createElement('hr', ClassName);
    return i;
}
myApp.createP = function (ClassName) {
    var i = myApp.createElement('p', ClassName);
    return i;
}
myApp.createStrong = function (ClassName) {
    var i = myApp.createElement('strong', ClassName);
    return i;
}
myApp.InlineRadio = function (ID, name, InnerText, checked, LayerId) {
    let OuterDiv = myApp.createDiv('custom-control custom-radio custom-control-inline')

    let RadioInput = myApp.createInput('custom-control-input');
    RadioInput.setAttribute('type', 'radio');
    RadioInput.setAttribute('id', ID);
    RadioInput.setAttribute('value', LayerId);
    RadioInput.setAttribute('LayerId', LayerId);
    RadioInput.setAttribute('name', name);
    RadioInput.checked = checked;

    let LavelTag = myApp.createLabel('custom-control-label');
    LavelTag.setAttribute('for', ID);
    LavelTag.innerText = InnerText;

    OuterDiv.append(RadioInput);
    OuterDiv.append(LavelTag);

    return OuterDiv
};
myApp.layerswitcher = function () {
    myApp.LayerSwitcherButton = myApp.createDiv('ol-unselectable ol-control');
    myApp.LayerSwitcherButton.setAttribute("id", "layer-switcher");
    let button = myApp.createButton();
    button.setAttribute("type", "button");
    button.setAttribute("title", "Layers");
    let img = myApp.createImg();
    img.setAttribute("src", "/static/hiwatnepal/images/layers.svg");
    img.setAttribute("style", "height: 20px; width: 20px;");

    button.append(img);
    myApp.LayerSwitcherButton.append(button);

    let olOverlaycontainer = document.querySelector('div.ol-overlaycontainer-stopevent');
    olOverlaycontainer.append(myApp.LayerSwitcherButton);

    myApp.layerSwitcherDiv = myApp.createDiv()
    myApp.layerSwitcherDiv.setAttribute('id', 'layer');

    // base map start
    let upperDiv = myApp.createDiv();
    let headingBaseMap = myApp.createH('6', 'centering font-weight-bold');
    headingBaseMap.innerText = 'Base Maps';

    let RadioDiv1 = myApp.InlineRadio("inlineRadio1", "inLineRadioBaseMap", "None", false, "none");
    let RadioDiv2 = myApp.InlineRadio("inlineRadio2", "inLineRadioBaseMap", "OSM", true, 'osm');
    let RadioDiv3 = myApp.InlineRadio("inlineRadio3", "inLineRadioBaseMap", "Satellite", false, 'satellite');

    upperDiv.append(headingBaseMap);
    upperDiv.append(RadioDiv1);
    upperDiv.append(RadioDiv2);
    upperDiv.append(RadioDiv3);

    myApp.layerSwitcherDiv.append(upperDiv)
    olOverlaycontainer.append(myApp.layerSwitcherDiv);

};
myApp.populateDistrictSelect = function () {
    let htmlStr = ''
    NewdistrictExtent.forEach(function (obj) {
        htmlStr = htmlStr + `<option value="${obj[0]}">${obj[1]}</option>`
    })
    $('#selDistrict').html(htmlStr)
}
myApp.getRisk = function (risk) {
    if (risk == 4) {
        return 'red'
    }
    if (risk == 3) {
        return 'orange'
    }
    if (risk == 2) {
        return 'yellow'
    } else {
        return 'blue'
    }
}
myApp.getRiskColorForVectorStyle = function (risk) {
    switch (risk) {
        case 0.0:
            return 'blue';
        case 4.0:
            return 'red';
        case 3.0:
            return 'orange';
        case 2.0:
            return 'yellow';
    }
}
myApp.myMap = function () {
    var bounds = [9628008.08280077, 2434366.476826293, 10583776.684478613, 2976152.1333116223];

    myApp.view = new ol.View({
        center: [9388155.512006583, 3291367.8109067543],
        zoom: 6
    });
    myApp.OSMLayer = new ol.layer.Tile({
        id: "osm",
        title: "Open Street Map",
        visible: true,
        opacity: 0.7,
        source: new ol.source.OSM({
            crossOrigin: 'anonymous'
        }),
        mask: 0
    });
    myApp.bingLayer = new ol.layer.Tile({
        visible: false,
        source: new ol.source.BingMaps({
            key: 'ApTJzdkyN1DdFKkRAE6QIDtzihNaf6IWJsT-nQ_2eMoO4PN__0Tzhl2-WgJtXFSp',
            imagerySet: 'AerialWithLabels'
        })
    });

    var layers = [myApp.OSMLayer, myApp.bingLayer];
    // var layers = [];
    myApp.map = new ol.Map({
        target: 'map',
        layers: layers,
        controls: ol.control.defaults({
            attribution: false
        }),
        view: myApp.view,
    });
    myApp.map.getView().fit(bounds);
};
myApp.geocoding = function () {
    // Current selection
    var sLayer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: [0, 0, 0, 0],
                opacity: 1,
                width: 3
            }),
            fill: new ol.style.Fill({
                color: '#e5e5ff40'
            })
        }), new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: '/static/hkhbasins/images/markers_default.png',
                size: ol.size.toSize([40, 45]),
                // offset:[20,20]
            }),
            stroke: new ol.style.Stroke({
                color: [0, 0, 255, 1.0],
                opacity: 1,
                width: 3,
                lineDash: [4, 8, 4, 8]
            }),
            fill: new ol.style.Fill({
                color: '#e5e5ff40'
            })
        })]
    });
    myApp.map.addLayer(sLayer);

    // Set the search control
    var search = new ol.control.SearchNominatim(
        {	//target: $(".options").get(0),
            polygon: true,
            reverse: false,
            position: true,	// Search, with priority to geo position
            maxHistory: -1,
            className: 'OSMBasedGeocoding'
        });
    // search.set('copy', false);
    myApp.map.addControl(search);

    // Select feature when click on the reference index
    search.on('select', function (e) {	// console.log(e);
        sLayer.getSource().clear();
        // Check if we get a geojson to describe the search
        if (e.search.geojson) {
            var format = new ol.format.GeoJSON();
            var f = format.readFeature(e.search.geojson, {
                dataProjection: "EPSG:4326",
                featureProjection: myApp.map.getView().getProjection()
            });
            sLayer.getSource().addFeature(f);
            var view = myApp.map.getView();
            var resolution = view.getResolutionForExtent(f.getGeometry().getExtent(), myApp.map.getSize());
            var zoom = view.getZoomForResolution(resolution);
            var center = ol.extent.getCenter(f.getGeometry().getExtent());
            // redraw before zoom
            setTimeout(function () {
                view.animate({
                    center: center,
                    zoom: Math.min(zoom, 16)
                });
            }, 100);
        } else {
            myApp.map.getView().animate({
                center: e.coordinate,
                zoom: Math.max(myApp.map.getView().getZoom(), 16)
            });
        }
    });
};
myApp.AddLegend = function () {
    let olOverlaycontainer = document.querySelector('div.ol-overlaycontainer-stopevent');
    let timeLayerLedgendDiv = myApp.createDiv('legend-botttom-right');
    var labels = ["Twenty Year Return Period ", "Ten Year Return Period ", "Two Year Return Period ", "Normal Drainage"];
    var grades = [4, 3, 2, 1];
    let div1 = myApp.createDiv();
    let b1 = myApp.createB()
    b1.innerText = 'Legend'
    div1.append(b1);
    timeLayerLedgendDiv.append(div1);
    for (var i = 0; i < grades.length; i++) {
        let i1 = myApp.createI();
        i1.style.backgroundColor = myApp.getRisk(grades[i]).toString();
        i1.appendChild(document.createTextNode('\u00A0'));
        timeLayerLedgendDiv.append(i1);
        timeLayerLedgendDiv.appendChild(document.createTextNode('\u00A0\u00A0'));
        timeLayerLedgendDiv.append(labels[i]);
        let br1 = myApp.createBr();
        timeLayerLedgendDiv.append(br1);
    }
    olOverlaycontainer.append(timeLayerLedgendDiv)
};
myApp.AddLayers = async function () {


    // let datasource = 'http://tethys.icimod.org:8181/geoserver/ows';
    // let LegendSource = 'http://tethys.icimod.org:8181/geoserver/ows?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LEGEND_OPTIONS=forceLabels:off&LAYER='
    let datasource = 'http://110.34.30.197:8080/geoserver/ows';
    let LegendSource = 'http://110.34.30.197:8080/geoserver/ows?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LEGEND_OPTIONS=forceLabels:off&LAYER='


    var CountryBoundary = new ol.layer.Tile({
        id: 'country',
        title: 'Outline',
        visible: true,
        legendPath: LegendSource + 'Bangladesh:nationalBoundaryBangladesh',
        source: new ol.source.TileWMS({
            url: datasource,
            hidpi: false,
            params: {
                'VERSION': '1.1.1',
                'LAYERS': 'Bangladesh:nationalBoundaryBangladesh',
                'TILED': true
            },
            serverType: 'geoserver',
            crossOrigin: 'anonymous'
        })
    });
    myApp.map.addLayer(CountryBoundary);
    let l1 = new layerCheckBoxBinding(".layerCollection", CountryBoundary, false, true);


    // var ProvinceBoundary = new ol.layer.Tile({
    //     id: 'province',
    //     title: 'Province',
    //     visible: false,
    //     legendPath: LegendSource + 'CRFMS:provinceNepal',
    //     source: new ol.source.TileWMS({
    //         url: datasource,
    //         hidpi: false,
    //         params: {
    //             'VERSION': '1.1.1',
    //             'LAYERS': 'CRFMS:provinceNepal',
    //         },
    //         serverType: 'geoserver'
    //     })
    // });
    // myApp.map.addLayer(ProvinceBoundary);
    // let l3 = new layerCheckBoxBinding(".layerCollection", ProvinceBoundary, false, true);


    var DistrictBoundary = new ol.layer.Tile({
        id: 'district',
        title: 'District',
        visible: false,
        legendPath: LegendSource + 'Bangladesh:districtBoundaryBangladesh',
        source: new ol.source.TileWMS({
            url: datasource,
            hidpi: false,
            params: {
                'VERSION': '1.1.1',
                'LAYERS': 'Bangladesh:districtBoundaryBangladesh',
            },
            serverType: 'geoserver',
            crossOrigin: 'anonymous'
        })
    });
    myApp.map.addLayer(DistrictBoundary);
    let l2 = new layerCheckBoxBinding(".layerCollection", DistrictBoundary, false, true);


    // var hiwatRiver = new ol.layer.Tile({
    //     id: 'hiwatriver',
    //     title: 'River Names',
    //     visible: false,
    //     legendPath: LegendSource + 'hydroviewer:rivernepal',
    //     source: new ol.source.TileWMS({
    //         url: datasource,
    //         hidpi: false,
    //         params: {
    //             'VERSION': '1.1.1',
    //             'LAYERS': 'hydroviewer:rivernepal',
    //         },
    //         serverType: 'geoserver',
    //         crossOrigin: 'anonymous'
    //     })
    // });
    // myApp.map.addLayer(hiwatRiver);
    // let l5 = new layerCheckBoxBinding(".layerCollection", hiwatRiver, false, true);
    //
    // var dhmStations = new ol.layer.Tile({
    //     id: 'dhmStations',
    //     title: 'Station Names',
    //     visible: false,
    //     legendPath: LegendSource + 'hydroviewer:dhmStations',
    //     source: new ol.source.TileWMS({
    //         url: datasource,
    //         hidpi: false,
    //         params: {
    //             'VERSION': '1.1.1',
    //             'LAYERS': 'hydroviewer:dhmStations',
    //         },
    //         serverType: 'geoserver',
    //         crossOrigin: 'anonymous'
    //     })
    // });
    // myApp.map.addLayer(dhmStations);
    // let l6 = new layerCheckBoxBinding(".layerCollection", dhmStations, false, true);
    //
    // let legend1 = ThreddsDataURL.hourly.toString() + '?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=enspmm-prec1h&colorscalerange=1,50&PALETTE=enspmm-prec1h';
    //
    // var tt1 = new ol.layer.TimeDimensionTile({
    //     id: 'HourAccumulatedPreciptation',
    //     title: '1-Hour accumulated Preciptation (mm)',
    //     visible: false,
    //     opacity: 0.7,
    //     legendPath: legend1,
    //     showlegend: true,
    //     ThreddsDataServerVersion: "4",
    //     source: {
    //         url: ThreddsDataURL.hourly.toString(),
    //         params: {
    //             'VERSION': '1.1.1',
    //             'LAYERS': 'enspmm-prec1h',
    //             'styles': 'boxfill/enspmm-prec1h',
    //             'colorscalerange': '1,50'
    //         }
    //     }
    // });
    // tt1.init().then(function (val) {
    //     myApp.map.addThreddsLayer(val);
    //     let l5 = new layerCheckBoxBinding(".layerCollection", tt1, true, true, 'withOpacSlider');
    // }, (error) => console.error(error))
    // let legend2 = ThreddsDataURL.hourly.toString() + '?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=enspmm-prectot&colorscalerange=1,200&PALETTE=enspmm-prectot';
    // var tt2 = new ol.layer.TimeDimensionTile({
    //     id: 'TotalAccumulatedPreciptation',
    //     title: 'Total Accumulated Preciptation (mm)',
    //     visible: false,
    //     opacity: 0.7,
    //     legendPath: legend2,
    //     showlegend: true,
    //     ThreddsDataServerVersion: "5",
    //     source: {
    //         url: ThreddsDataURL.hourly.toString(),
    //         params: {
    //             'VERSION': '1.1.1',
    //             'LAYERS': 'enspmm-prectot',
    //             'styles': 'boxfill/enspmm-prectot',
    //             'colorscalerange': '1,200'
    //         }
    //     }
    // });
    // tt2.init().then(function (val) {
    //     myApp.map.addThreddsLayer(val);
    //     let l5 = new layerCheckBoxBinding(".layerCollection", tt2, true, true, 'withOpacSlider');
    // }, (error) => console.error(error))

    myApp.HiwatRiverWMSSource = new ol.source.TileWMS({
        url: datasource,
        params: {
            'LAYERS': 'HIWAT:riverbangladesh', 'TILED': true
        },
        serverType: 'geoserver',
        crossOrigin: 'anonymous'
    });

    myApp.HiwatRiver = new ol.layer.Tile({
        id: 'HIWATRiverid',
        title: 'HIWAT Rivers',
        legendPath: LegendSource + 'HIWAT:riverbangladesh',
        visible: true,
        source: myApp.HiwatRiverWMSSource
    });
    myApp.map.addLayer(myApp.HiwatRiver);
    let l9 = new layerCheckBoxBinding(".layerCollection", myApp.HiwatRiver, false, true);


};
myApp.BindControls = function () {
    $('#selDistrict').change(async function () {
        let curVal = parseInt($(this).val());
        let selAr = NewdistrictExtent.filter(function (x) {
            return x[0] === curVal
        });
        let llStr = selAr[0][2].split(',')[0].split(" ")
        let urStr = selAr[0][2].split(',')[1].split(" ")
        let longMinLatMin = ol.proj.transform([parseInt(llStr[0]), parseInt(llStr[1])], 'EPSG:4326', 'EPSG:3857');
        let longMaxLatMax = ol.proj.transform([parseInt(urStr[0]), parseInt(urStr[1])], 'EPSG:4326', 'EPSG:3857');
        // let newBbox=[longMinLatMin[0],longMinLatMin[1],longMaxLatMax[0],longMaxLatMax[1]]
        let newBbox = [parseInt(llStr[0]), parseInt(llStr[1]), parseInt(urStr[0]), parseInt(urStr[1])]
        myApp.map.getView().fit(newBbox, myApp.map.getSize());


    });
    myApp.map.on('singleclick', function (evt) {
        if (evt.dragging) {
            return;
        }
        var pixel = myApp.map.getEventPixel(evt.originalEvent);
        var hit = myApp.map.forEachLayerAtPixel(pixel, function (layer) {
            var prop = layer.getProperties();
            if (prop.id == 'HIWATRiverid') {
                return true;
            } else {
                return false
            }
        });
        if (hit) {
            var viewResolution = /** @type {number} */ (myApp.view.getResolution());
            var url = myApp.HiwatRiverWMSSource.getGetFeatureInfoUrl(evt.coordinate,
                viewResolution,
                'EPSG:3857',
                {'INFO_FORMAT': 'application/json'})
            if (url) {
                fetch(url)
                    .then(function (response) {
                        return response.text();
                    })
                    .then(function (html) {
                        var parsedJson = JSON.parse(html)
                        let comid = parsedJson.features[0].properties.comid
                        $.ajax({
                            type: "GET",
                            data: {
                                "stID": comid,
                            },
                            url: "chartHiwat",
                            dataType: 'json',
                            "beforeSend": function (xhr, settings) {
                                // $.ajaxSettings.beforeSend(xhr, settings);
                            },
                            "success": function (data) {
                                $('#long-term-chart').empty();
                                $('#historical-chart').empty();
                                $('#fdc-chart').empty();
                                json_response = data;
                                var dates = [];
                                var values = [];
                                var hdate = []
                                var hval = []

                                // get_forecast_percent(feature.properties.comid);

                                if (json_response.success == "success") {
                                    json_response.dates.forEach(function (element) {
                                        dates.push(element);
                                    });
                                    for (i in json_response.values) {
                                        values.push(parseFloat(json_response.values[i]));
                                    }
                                    for (i in json_response.hval) {
                                        hval.push(parseFloat(json_response.hval[i]));
                                    }
                                    for (i in json_response.hdate) {
                                        hdate.push(json_response.hdate[i]);
                                    }
                                }
                                var avg_series = {
                                    name: 'Forecast Values',
                                    x: dates,
                                    y: values,
                                    type: 'scatter',
                                    line: {
                                        color: 'blue',
                                        width: 2
                                    }
                                };

                                // // Annotation variables
                                var anMax = "Max: " + Math.round(json_response.return_max * 100) / 100;
                                var an20 = "20-yr: " + Math.round(json_response.return_20 * 100) / 100;
                                var an10 = "10-yr: " + Math.round(json_response.return_10 * 100) / 100;
                                var an2 = "2-yr: " + Math.round(json_response.return_max * 100) / 100;
                                var anX = json_response.datetime_end;
                                //
                                var annotation_series = {
                                    x: [anX, anX, anX, anX],
                                    y: [json_response.return_max, json_response.return_20, json_response.return_10, json_response.return_2],
                                    text: [anMax, an20, an10, an2],
                                    mode: 'text',
                                    textposition: 'right',
                                };

                                var annotation_seriesF = {
                                    x: [dates[dates.length - 1], dates[dates.length - 1], dates[dates.length - 1], dates[dates.length - 1]],
                                    y: [json_response.return_max, json_response.return_20, json_response.return_10, json_response.return_2],
                                    text: [anMax, an20, an10, an2],
                                    mode: 'text',
                                    textposition: 'right',
                                };

                                var layout1 = {
                                    title: 'Forecast at Date (Bangladesh standard time) ' + json_response.rundate + ', River ID: ' + json_response.riverID,
                                    autosize: true,
                                    shapes: [{
                                        type: 'rect',
                                        xref: 'x',
                                        yref: 'y',
                                        x0: dates[0],
                                        y0: json_response.return_20,
                                        x1: dates[dates.length - 1],
                                        y1: json_response.return_max,
                                        line: {
                                            width: 0
                                        },
                                        fillcolor: 'rgba(128, 0, 128, 0.4)'
                                    },
                                        {
                                            type: 'rect',
                                            xref: 'x',
                                            yref: 'y',
                                            x0: dates[0],
                                            y0: json_response.return_10,
                                            x1: dates[dates.length - 1],
                                            y1: json_response.return_20,
                                            line: {
                                                width: 0
                                            },
                                            fillcolor: 'rgba(255, 0, 0, 0.4)'
                                        },
                                        {
                                            type: 'rect',
                                            xref: 'x',
                                            yref: 'y',
                                            x0: dates[0],
                                            y0: json_response.return_2,
                                            x1: dates[dates.length - 1],
                                            y1: json_response.return_10,
                                            line: {
                                                width: 0
                                            },
                                            fillcolor: 'rgba(255, 255, 0, 0.4)'
                                        },],
                                    xaxis: {
                                        title: 'Dates',
                                    },
                                    yaxis: {
                                        title: 'Streamflow',
                                        range: [0, json_response.range]
                                    },
                                };
                                var data = [avg_series, annotation_seriesF];

                                var hplot_series = {
                                    name: 'ERA_Interim',
                                    x: hdate,
                                    y: hval,
                                    type: 'scatter'
                                };
                                //

                                //
                                var layout2 = {
                                    title: 'Historical Streamflow (Time Zone: UTC) ' + json_response.rundate + ', River ID: ' + json_response.riverID,
                                    autoSize: true,
                                    showlegend: false,
                                    shapes: [{
                                        type: 'rect',
                                        xref: 'x',
                                        yref: 'y',
                                        x0: json_response.datetime_start,
                                        y0: json_response.return_20,
                                        x1: json_response.datetime_end,
                                        y1: json_response.return_max,
                                        line: {
                                            width: 0
                                        },
                                        fillcolor: 'rgba(128, 0, 128, 0.4)'
                                    },
                                        {
                                            type: 'rect',
                                            xref: 'x',
                                            yref: 'y',
                                            x0: json_response.datetime_start,
                                            y0: json_response.return_10,
                                            x1: json_response.datetime_end,
                                            y1: json_response.return_20,
                                            line: {
                                                width: 0
                                            },
                                            fillcolor: 'rgba(255, 0, 0, 0.4)'
                                        },
                                        {
                                            type: 'rect',
                                            xref: 'x',
                                            yref: 'y',
                                            x0: json_response.datetime_start,
                                            y0: json_response.return_2,
                                            x1: json_response.datetime_end,
                                            y1: json_response.return_10,
                                            line: {
                                                width: 0
                                            },
                                            fillcolor: 'rgba(255, 255, 0, 0.4)'
                                        },],
                                    xaxis: {
                                        title: 'Dates',
                                    },
                                    yaxis: {
                                        title: 'Streamflow'
                                    }
                                };
                                var hdata = [hplot_series, annotation_series];

                                $('#graph').on('shown.bs.modal', function () {
                                    Plotly.newPlot('long-term-chart', data, layout1);
                                    Plotly.newPlot('historical-chart', hdata, layout2);
                                    // Plotly.newPlot('fdc-chart', fdata, layout3);
                                });
                                $('#graphTab a').on('shown.bs.tab', function (e) {
                                    var id = $(this).attr('id');

                                    if (id == 'forecast_tab_link') {
                                        Plotly.newPlot('long-term-chart', data, layout1);
                                    } else if (id == 'historical_tab_link') {
                                        Plotly.newPlot('historical-chart', hdata, layout2);
                                    } else if (id == 'flow_duration_tab_link') {
                                        Plotly.newPlot('fdc-chart', fdata, layout3);
                                    }
                                })
                                // $('#historical_tab_link').click(function () {
                                //     Plotly.newPlot('historical-chart', hdata, layout2);
                                // })
                                //
                                $('#graph').modal('show');

                                var params = {
                                    comid: comid,
                                    cty: 'nepal'

                                }
                                $('#submit-download-forecast').attr({
                                    target: '_blank',
                                    href: 'getForecastCSV?' + jQuery.param(params)
                                });

                                $('#submit-download-interim-csv').attr({
                                    target: '_blank',
                                    href: 'getHistoricCSV?' + jQuery.param(params)
                                });

                            },
                            "error": function (data) {
                                alert("Return Error: " + data.status);
                                alert(data.responseJSON.error);
                            }
                        }) //ajaxCall end
                    });
            }
        }
    });
    myApp.map.on('pointermove', function (evt) {
        if (evt.dragging) {
            return;
        }
        var pixel = myApp.map.getEventPixel(evt.originalEvent);
        var hit = myApp.map.forEachLayerAtPixel(pixel, function (layer) {
            var prop = layer.getProperties();
            if (prop.id === 'HIWATRiverid') {
                return true;
            } else {
                return false
            }
        });
        myApp.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });

    myApp.LayerSwitcherButton.addEventListener("click", () => {
        if (getComputedStyle(myApp.layerSwitcherDiv)["display"] === "block") {
            myApp.layerSwitcherDiv.style.animation = 'MoveLeft 0.4s';
            setTimeout(function () {
                myApp.layerSwitcherDiv.style.display = 'none';
            }, 300)
        } else {
            myApp.layerSwitcherDiv.style.display = 'block';
            myApp.layerSwitcherDiv.style.animation = 'MoveRight 0.4s';
        }
    }, true);
    $('input[type=radio][name=inLineRadioBaseMap]').change(function () {
        if (this.value == 'osm') {
            console.log("osm");
            myApp.OSMLayer.setVisible(true);
            myApp.bingLayer.setVisible(false);
        } else if (this.value == 'satellite') {
            myApp.OSMLayer.setVisible(false);
            myApp.bingLayer.setVisible(true);
        } else if (this.value == 'none') {
            myApp.OSMLayer.setVisible(false);
            myApp.bingLayer.setVisible(false);
        }
    });
}
myApp.init = function () {
    myApp.myMap();
    myApp.AddLegend();
    myApp.AddLayers();
    myApp.layerswitcher();
    myApp.populateDistrictSelect();
    myApp.geocoding();
    myApp.BindControls();
    // myApp.LoadDefaults();
    // myApp.layerswitcher()
    // myApp.UIInit();
    // myApp.addingLayersToMap();
    //
    // myApp.BindControls();
    //
    // //Initial Update Binding
    // myApp.updateDropdownBinding();
}

myApp.init();