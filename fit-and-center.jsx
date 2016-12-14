/******************************************************************************
>> Center Viewport - Zoom to Fit (+ a little padding for aesthetics)
******************************************************************************/

var
	artboard = app.activeDocument.artboards[app.activeDocument.artboards.getActiveArtboardIndex()],
	x_centerpoint = 0,
	y_centerpoint = 0,
	geometricBounds,
	topL_X = 0,
	topL_Y = 0,
	botR_X = 0,
	botR_Y = 0,
	selection = app.activeDocument.selection,
	// change this to modify the amount of padding around selection you would like to retain.
	padding = 0.05; // .05 = 5% of the height/width of the current selection.


if (selection.length > 0) {

	// loop through selections and calc their collective center point
	for (var i = selection.length - 1; i >= 0; i--) {

		if (selection.length == 1) {

		}
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

} else {
	// use artboard boundaries if nothing is selected
	topL_X = artboard.artboardRect[0];
	topL_Y = artboard.artboardRect[1];

	botR_X = artboard.artboardRect[2];
	botR_Y = artboard.artboardRect[3];

}

x_centerpoint = (topL_X + botR_X) / 2;
y_centerpoint = (topL_Y + botR_Y) / 2;


if ( app.documents.length > 0 ) { // not sure if this line is necessary - sking

	var
		selectionWidth, selectionHeight,
		newBoundary = {},
		viewBounds,
		selectionLayout = "landscape",
		viewport_layout = "portrait",
		visibleWidth,
		visibleWidth_100,
		visibleHeight,
		visibleHeight_100;

	viewBounds = {
		topLeft: {
			x: app.documents[0].views[0].bounds[0],
			y: app.documents[0].views[0].bounds[1]
		},
		botRight: {
			x: app.documents[0].views[0].bounds[2],
			y: app.documents[0].views[0].bounds[3]
		}
	};

	visibleWidth  = Math.abs(viewBounds.topLeft.x - viewBounds.botRight.x); // calc difference
	visibleHeight = Math.abs(viewBounds.topLeft.y - viewBounds.botRight.y); // calc difference

	selectionWidth  = Math.abs(topL_X - botR_X);
	selectionHeight = Math.abs(topL_Y - botR_Y);

	newBoundary.width = selectionWidth + (selectionWidth * padding);
	newBoundary.height = selectionHeight + (selectionHeight * padding);

	if (visibleWidth >= visibleHeight) {
		viewport_layout = "landscape";
	}

	if (selectionWidth < selectionHeight) {
		selectionLayout = "portrait";
	}

	currentZoom = app.documents[0].views[0].zoom;

	// calculate visible area at 100% zoom
	visibleWidth_100 = visibleWidth * currentZoom;
	visibleHeight_100 = visibleHeight * currentZoom;

	if ( (selectionLayout == "portrait") && (selectionWidth == selectionHeight && viewport_layout == "portrait") ){
		newZoomLvl = visibleWidth_100 / newBoundary.width;

	} else if (selectionLayout == "landscape") {
		newZoomLvl = visibleWidth_100 / newBoundary.width;

	} else {
		newZoomLvl = visibleHeight_100 / newBoundary.height;

	}

}

// set zoom level
app.documents[0].views[0].zoom = newZoomLvl;

// set viewport centerpoint
app.documents[0].views[0].centerPoint = [x_centerpoint, y_centerpoint];

