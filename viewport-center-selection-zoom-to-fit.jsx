// Viewport center on selection and zoom to fit selection in view + padding- viewport-center-selection-zoom-to-fit.jsx

// Description:
// ... it uhh centers the viewport on selection at 100%

var
  x_centerpoint = 0,
  y_centerpoint= 0,
  geometricBounds,
  topL_X = 0,
  topL_Y = 0,
  botR_X = 0,
  botR_Y = 0,
  selection = app.activeDocument.selection,

  // change this to modify the amount of padding around selection you would like to retain.
  padding = .05, // .05 = 5% of the height/width of the current selection.

  artboard = app.activeDocument.artboards[app.activeDocument.artboards.getActiveArtboardIndex()];

if (selection.length > 0) {

	for (var i = selection.length - 1; i >= 0; i--) {


		geometricBounds = selection[i].geometricBounds;

		topL_X_temp = geometricBounds[0];
		topL_Y_temp = geometricBounds[1];
		botR_X_temp = geometricBounds[2];
		botR_Y_temp = geometricBounds[3];

		topL_X = topL_X ? topL_X : topL_X_temp;
		topL_Y = topL_Y ? topL_Y : topL_Y_temp;
		botR_X = botR_X ? botR_X : botR_X_temp;
		botR_Y = botR_Y ? botR_Y : botR_Y_temp;

		if (topL_X_temp < topL_X) {topL_X = topL_X_temp; }
		if (topL_Y_temp < topL_Y) {topL_Y = topL_Y_temp; }
		if (botR_X_temp > botR_X) {botR_X = botR_X_temp; }
		if (botR_Y_temp > botR_Y) {botR_Y = botR_Y_temp; }

	}

	x_centerpoint = (topL_X + botR_X) / 2;
	y_centerpoint = (topL_Y + botR_Y) / 2;

	if ( app.documents.length > 0 ) {
		app.documents[0].views[0].bounds; // bounds of view

		var viewBounds = app.documents[0].views[0].bounds;

		var zoom100 = {
			topLeft: {
				x: viewBounds[0],
				y: viewBounds[1]
			},
			botRight: {
				x: viewBounds[2],
				y: viewBounds[3]
			}
		}

		var visibleWidth_100, visibleHeight_100;

		visibleWidth_100  = Math.abs(zoom100.topLeft.x - zoom100.botRight.x) // calc difference
		visibleHeight_100 = Math.abs(zoom100.topLeft.y - zoom100.botRight.y) // calc difference

		// get object height & width
		var elementWidth, elementHeight;

		// geometricBounds = selection[i].geometricBounds;
		elementWidth  = Math.abs(topL_X - botR_X);
		elementHeight = Math.abs(topL_Y - botR_Y);

		var newBoundary = {};
		newBoundary.width = elementWidth + (elementWidth * padding);
		newBoundary.height = elementHeight + (elementHeight * padding);

		if (elementWidth >= elementHeight) {
			newBoundary = elementWidth + (elementWidth * padding);
			layout = "landscape";
		} else {
			newBoundary = elementHeight + (elementHeight * padding);
			layout = "portrait";
		}

		var viewport_layout = "portrait";
		if (elementWidth == elementHeight) {
			if (visibleWidth_100 >= visibleHeight_100) {
				viewport_layout = "landscape";
			}
		}

		// calculate zoom level
		currentZoom = app.documents[0].views[0].zoom;

		visibleWidth_100 = visibleWidth_100 * currentZoom;
		visibleHeight_100 = visibleHeight_100 * currentZoom;

		if (layout == "landscape") {
			if (elementWidth == elementHeight && viewport_layout == "landscape") {
				newZoomLvl = visibleHeight_100 / newBoundary;
			} else {
				newZoomLvl = visibleWidth_100 / newBoundary;
			}
		}

		if (layout == "portrait") {
			if (elementWidth == elementHeight && viewport_layout == "portrait") {
				newZoomLvl = visibleWidth_100 / newBoundary;
			} else {
				newZoomLvl = visibleHeight_100 / newBoundary;
			}
		}

	}

} else {
	// Get the Height of the Artboard
	x_centerpoint = (artboard.artboardRect[0] + artboard.artboardRect[2]) / 2;
	y_centerpoint = (artboard.artboardRect[1] + artboard.artboardRect[3]) / 2;

}

// set zoom level
app.documents[0].views[0].zoom = newZoomLvl;

// set viewport centerpoint
app.documents[0].views[0].centerPoint = [x_centerpoint, y_centerpoint];

